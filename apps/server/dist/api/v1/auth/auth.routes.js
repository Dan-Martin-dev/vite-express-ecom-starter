// src/api/v1/routes/auth.routes.ts
import express from 'express';
import { pb, ensurePbAdminAuth } from "../../../lib/pocketbase.js";
import { isAuthenticated } from '../../../middleware/auth.middleware.js';
import { validateRequestBody } from '../../../middleware/validation.middleware.js'; // Import validation middleware
import { authController } from '../../../api/v1/auth/auth.controller.js'; // Import Auth Controller
import { UserCreateSchema, UserLoginSchema } from '../../../api/v1/auth/auth.types.js'; // Import Zod Schemas
import { db } from '../../../db/index.js';
import * as schema from '../../../db/schema/auth.schema.js';
import { eq } from 'drizzle-orm';
import crypto from 'crypto'; // For generating address IDs if needed
import { EmailSchema, addressSchema, updateProfileSchema } from '../../../api/v1/auth/auth.validator.js';
import { getUserAddresses } from '../../../api/v1/auth/auth.utils.js';
// Call this when setting up routes or server
ensurePbAdminAuth(); // Attempt admin authentication on startup
const router = express.Router();
// --- Schemas for validation ---
// Schema for routes needing only email
// === CORE AUTH ROUTES (Using Controller/Service/Validation) ===
router.post('/auth/register', validateRequestBody(UserCreateSchema), authController.register);
router.post('/auth/login', validateRequestBody(UserLoginSchema), authController.login);
router.post('/auth/logout', authController.logout); // No validation needed
router.get('/auth/session', isAuthenticated, authController.getSession); // Protected by isAuthenticated
router.post('/auth/request-password-reset', validateRequestBody(EmailSchema), authController.requestPasswordReset);
// --- Placeholder/Informational Routes (Using Controller placeholders) ---
router.post('/auth/refresh', authController.refresh);
router.post('/auth/verify-email', authController.verifyEmail);
router.post('/auth/reset-password', authController.resetPassword);
// === USER PROFILE & ADDRESS ROUTES (Direct DB/PB interaction, kept separate for now) ===
// These routes interact with both PocketBase and Drizzle user tables directly.
// They could potentially be moved to a separate UserController/Service later if complexity grows.
// USERS
router.get('/users/me', isAuthenticated, (req, res) => {
    // The middleware already verified the token and fetched the user
    res.json({ user: req.user, token: req.token });
});
// Apply validation middleware to PUT /users/me
router.put('/users/me', isAuthenticated, validateRequestBody(updateProfileSchema), async (req, res, next) => {
    const userId = req.user?.id; // Get PocketBase User ID from authenticated request
    if (!userId) {
        return res.status(401).json({ message: 'Authentication required.' }); // Should be caught by middleware
    }
    const { name, bio, image, phoneNumber, preferences, marketingOptIn, addresses, defaultPaymentMethod, ...otherData } = req.body;
    // --- Option A: Update PocketBase User Record ---
    // Use this if profile fields (name, bio, etc.) are primarily stored in PocketBase
    const pbDataToUpdate = {};
    if (name !== undefined)
        pbDataToUpdate.name = name;
    // Add other PocketBase fields you want to update from req.body (e.g., custom fields)
    // --- Option B: Update Drizzle User Record ---
    // Use this for fields specific to your PostgreSQL DB (like preferences, marketingOptIn)
    const drizzleDataToUpdate = {
        updatedAt: new Date()
    };
    if (bio !== undefined)
        drizzleDataToUpdate.bio = bio;
    if (image !== undefined)
        drizzleDataToUpdate.image = image; // Assuming image is a URL managed elsewhere or stored in PB
    if (phoneNumber !== undefined)
        drizzleDataToUpdate.phoneNumber = phoneNumber;
    if (preferences !== undefined)
        drizzleDataToUpdate.preferences = preferences; // Must be valid JSON
    if (marketingOptIn !== undefined)
        drizzleDataToUpdate.marketingOptIn = Boolean(marketingOptIn);
    if (defaultPaymentMethod !== undefined)
        drizzleDataToUpdate.defaultPaymentMethod = defaultPaymentMethod;
    // Note: `addresses` JSONB is handled by separate endpoints below.
    // Note: `role`, `email`, `password` should typically not be updated here.
    try {
        let updatedPbRecord = req.user; // Start with current user data
        // Update PocketBase record if there's data for it
        if (Object.keys(pbDataToUpdate).length > 0) {
            updatedPbRecord = await pb.collection('users').update(userId, pbDataToUpdate);
        }
        // Update Drizzle record if there's data for it
        let updatedDrizzleRecord = null;
        if (Object.keys(drizzleDataToUpdate).length > 1) { // > 1 because updatedAt is always added
            // Update Drizzle DB using the PocketBase User ID as the key
            const result = await db.update(schema.users)
                .set(drizzleDataToUpdate)
                .where(eq(schema.users.id, userId)) // Assumes Drizzle `users.id` matches PocketBase `users.id`
                .returning(); // Get updated record
            if (result.length > 0) {
                updatedDrizzleRecord = result[0];
            }
            else {
                console.warn(`Attempted to update profile in Drizzle for user ID ${userId}, but no matching record found.`);
                // Decide how to handle this - maybe create the record if missing?
            }
        }
        // Combine results (prioritize updated data)
        // Be careful not to leak sensitive data like password hashes if they exist in updatedDrizzleRecord
        const combinedUser = {
            ...(updatedDrizzleRecord ? {
                // Select safe fields from Drizzle record
                id: updatedDrizzleRecord.id,
                email: updatedDrizzleRecord.email, // Email likely won't change here
                role: updatedDrizzleRecord.role,
                name: updatedDrizzleRecord.name,
                bio: updatedDrizzleRecord.bio,
                image: updatedDrizzleRecord.image,
                phoneNumber: updatedDrizzleRecord.phoneNumber,
                preferences: updatedDrizzleRecord.preferences,
                lastLoginAt: updatedDrizzleRecord.lastLoginAt,
                addresses: updatedDrizzleRecord.addresses, // Addresses from Drizzle
                defaultPaymentMethod: updatedDrizzleRecord.defaultPaymentMethod,
                marketingOptIn: updatedDrizzleRecord.marketingOptIn,
                createdAt: updatedDrizzleRecord.createdAt,
                updatedAt: updatedDrizzleRecord.updatedAt,
            } : {
                // Fallback to PocketBase data if Drizzle update didn't happen or target Drizzle fields
                id: updatedPbRecord?.id,
                email: updatedPbRecord?.email,
                name: updatedPbRecord?.name,
                // ... other relevant safe fields from PocketBase model
            }),
        };
        res.json({ user: combinedUser });
    }
    catch (error) {
        console.error("Profile Update Error:", error?.response || error);
        const message = error?.response?.message || 'Profile update failed.';
        const details = error?.response?.data || {};
        res.status(error?.response?.status || 400).json({ message, details });
    }
});
// This route remains informational as password changes are complex
router.patch('/auth/users/me/password', isAuthenticated, /* validateRequestBody(passwordChangeSchema), */ async (req, res, next) => {
    // TODO: Define passwordChangeSchema if implementing this route
    res.status(501).json({ message: 'Password changes should be handled via PocketBase password reset flow or SDK methods requiring the old password for security.' });
    // If you absolutely must proxy the update (requires old password):
    /*
    const userId = req.user?.id;
    const { oldPassword, password, passwordConfirm } = req.body;
    if (!userId || !oldPassword || !password || !passwordConfirm) {
         return res.status(400).json({ message: "Missing required fields." });
    }
     if (password !== passwordConfirm) {
        return res.status(400).json({ message: 'New passwords do not match.' });
    }
    try {
        // This requires ADMIN privileges or the user's current password
        await pb.collection('users').update(userId, {
            oldPassword: oldPassword, // Crucial for security check by PocketBase
            password: password,
            passwordConfirm: passwordConfirm
        });
        res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error: any) {
        console.error("Password Update Error:", error?.response || error)
        const message = error?.response?.message || 'Password update failed.';
        const details = error?.response?.data || {};
        res.status(error?.response?.status || 400).json({ message, details });
    }
    */
});
router.get('/auth/users/me/addresses', isAuthenticated, async (req, res, next) => {
    const userId = req.user?.id;
    if (!userId)
        return res.status(401).json({ message: 'Authentication required.' });
    try {
        const addresses = await getUserAddresses(userId);
        res.json(addresses);
    }
    catch (error) {
        next(error);
    }
});
// Apply validation middleware to POST /auth/users/me/addresses
router.post('/auth/users/me/addresses', isAuthenticated, validateRequestBody(addressSchema), async (req, res, next) => {
    const userId = req.user?.id;
    if (!userId)
        return res.status(401).json({ message: 'Authentication required.' });
    // Body is already validated by middleware
    const newAddressData = req.body; // Type assertion after validation
    try {
        const currentAddresses = await getUserAddresses(userId);
        // Generate a simple unique ID for the address within the JSON array
        const newAddress = {
            id: crypto.randomUUID(), // Add an ID to identify within the JSON
            isDefault: newAddressData.isDefault || false, // Handle default flag
            ...newAddressData,
        };
        // If setting new address as default, unset others
        if (newAddress.isDefault) {
            currentAddresses.forEach(addr => addr.isDefault = false);
        }
        const updatedAddresses = [...currentAddresses, newAddress];
        await db.update(schema.users)
            .set({ addresses: updatedAddresses, updatedAt: new Date() })
            .where(eq(schema.users.id, userId));
        res.status(201).json(newAddress); // Return the newly added address with its ID
    }
    catch (error) {
        next(error);
    }
});
// Apply validation middleware to PUT /auth/users/me/addresses/:addressId
router.put('/auth/users/me/addresses/:addressId', isAuthenticated, validateRequestBody(addressSchema), async (req, res, next) => {
    const userId = req.user?.id;
    const { addressId } = req.params;
    if (!userId)
        return res.status(401).json({ message: 'Authentication required.' });
    // Body is already validated by middleware
    const updatedAddressData = req.body; // Type assertion after validation
    try {
        let currentAddresses = await getUserAddresses(userId);
        let addressFound = false;
        let resultingAddress = null; // Use imported ShippingAddress
        // If setting this address as default, unset others first
        if (updatedAddressData.isDefault) {
            currentAddresses.forEach(addr => { if (addr.id !== addressId)
                addr.isDefault = false; });
        }
        const updatedAddresses = currentAddresses.map(addr => {
            if (addr.id === addressId) {
                addressFound = true;
                resultingAddress = {
                    ...addr, // Keep original ID and other fields not being updated
                    ...updatedAddressData, // Apply updates
                    isDefault: updatedAddressData.isDefault !== undefined ? updatedAddressData.isDefault : addr.isDefault,
                };
                return resultingAddress;
            }
            return addr;
        }).filter((addr) => addr !== null); // Ensure type correctness
        if (!addressFound) {
            return res.status(404).json({ message: `Address with ID ${addressId} not found.` });
        }
        await db.update(schema.users)
            .set({ addresses: updatedAddresses, updatedAt: new Date() })
            .where(eq(schema.users.id, userId));
        res.json(resultingAddress);
    }
    catch (error) {
        next(error);
    }
});
router.delete('/auth/users/me/addresses/:addressId', isAuthenticated, async (req, res, next) => {
    const userId = req.user?.id;
    const { addressId } = req.params;
    if (!userId)
        return res.status(401).json({ message: 'Authentication required.' });
    try {
        let currentAddresses = await getUserAddresses(userId);
        const initialLength = currentAddresses.length;
        const updatedAddresses = currentAddresses.filter(addr => addr.id !== addressId);
        if (updatedAddresses.length === initialLength) {
            return res.status(404).json({ message: `Address with ID ${addressId} not found.` });
        }
        // If the deleted address was the default, potentially set another one as default (optional logic)
        // const wasDefault = currentAddresses.find(a => a.id === addressId)?.isDefault;
        // if (wasDefault && updatedAddresses.length > 0 && !updatedAddresses.some(a => a.isDefault)) {
        //     updatedAddresses[0].isDefault = true; // Example: set the first one as default
        // }
        await db.update(schema.users)
            .set({ addresses: updatedAddresses, updatedAt: new Date() })
            .where(eq(schema.users.id, userId));
        res.status(204).send(); // No content on successful delete
    }
    catch (error) {
        next(error);
    }
});
export default router; // Export the router
//# sourceMappingURL=auth.routes.js.map