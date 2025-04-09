// src/features/auth/auth.routes.ts
import express, { Request, Response, NextFunction } from 'express';
import { pb, ensurePbAdminAuth } from "@/lib/pocketbase.js"
import { isAuthenticated } from '@/middleware/auth.middleware.js';
import { db } from '@/db/index.js';
import * as schema from '@/db/schema.js'
import { eq } from 'drizzle-orm';
import crypto from 'crypto'; // For generating address IDs if needed
import { ShippingAddress } from '@/types/index.js';

// Call this when setting up routes or server
ensurePbAdminAuth(); // Attempt admin authentication on startup

const registerSchema = {}; // Define Zod schema
const loginSchema = {}; // Define Zod schema
const updateProfileSchema = {}; // Define Zod schema
const passwordChangeSchema = {}; // Define Zod schema
const addressSchema = {}; // Define Zod schema
const router = express.Router();

// --- Input Validation (Placeholder - Use Zod or similar) ---
const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    // Your validation logic here
    next();
};

router.get('/users/me', isAuthenticated, (req: Request, res: Response) => {
    // The middleware already verified the token and fetched the user
    res.json({ user: req.user, token: req.token });
});


router.put('/users/me', isAuthenticated, validate(updateProfileSchema), async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id; // Get PocketBase User ID from authenticated request
    if (!userId) {
        return res.status(401).json({ message: 'Authentication required.' }); // Should be caught by middleware
    }

    const { name, bio, image, phoneNumber, preferences, marketingOptIn, addresses, defaultPaymentMethod, ...otherData } = req.body;

    // --- Option A: Update PocketBase User Record ---
    // Use this if profile fields (name, bio, etc.) are primarily stored in PocketBase
    const pbDataToUpdate: { [key: string]: any } = {};
    if (name !== undefined) pbDataToUpdate.name = name;
    // Add other PocketBase fields you want to update from req.body (e.g., custom fields)


    // --- Option B: Update Drizzle User Record ---
    // Use this for fields specific to your PostgreSQL DB (like preferences, marketingOptIn)
    const drizzleDataToUpdate: Partial<typeof schema.users.$inferInsert> = {
        updatedAt: new Date()
    };
    if (bio !== undefined) drizzleDataToUpdate.bio = bio;
    if (image !== undefined) drizzleDataToUpdate.image = image; // Assuming image is a URL managed elsewhere or stored in PB
    if (phoneNumber !== undefined) drizzleDataToUpdate.phoneNumber = phoneNumber;
    if (preferences !== undefined) drizzleDataToUpdate.preferences = preferences; // Must be valid JSON
    if (marketingOptIn !== undefined) drizzleDataToUpdate.marketingOptIn = Boolean(marketingOptIn);
    if (defaultPaymentMethod !== undefined) drizzleDataToUpdate.defaultPaymentMethod = defaultPaymentMethod;
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
            } else {
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

    } catch (error: any) {
         console.error("Profile Update Error:", error?.response || error)
         const message = error?.response?.message || 'Profile update failed.';
         const details = error?.response?.data || {};
         res.status(error?.response?.status || 400).json({ message, details });
    }
});


router.patch('/users/me/password', isAuthenticated, validate(passwordChangeSchema), async (req: Request, res: Response, next: NextFunction) => {
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

async function getUserAddresses(userId: string): Promise<schema.ShippingAddress[]> {
    const user = await db.select({ addresses: schema.users.addresses })
        .from(schema.users)
        .where(eq(schema.users.id, userId))
        .limit(1);
    return user[0]?.addresses || [];
}

router.get('/users/me/addresses', isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Authentication required.' });

    try {
        const addresses = await getUserAddresses(userId);
        res.json(addresses);
    } catch (error) {
        next(error);
    }
});

router.post('/users/me/addresses', isAuthenticated, validate(addressSchema), async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Authentication required.' });

    const newAddressData = req.body;
    // Basic validation
    if (!newAddressData.street || !newAddressData.city || !newAddressData.postalCode || !newAddressData.country) {
        return res.status(400).json({ message: 'Missing required address fields.' });
    }

    try {
        const currentAddresses = await getUserAddresses(userId);
        // Generate a simple unique ID for the address within the JSON array
        const newAddress: schema.ShippingAddress = {
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
    } catch (error) {
        next(error);
    }
});

router.put('/users/me/addresses/:addressId', isAuthenticated, validate(addressSchema), async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const { addressId } = req.params;
    if (!userId) return res.status(401).json({ message: 'Authentication required.' });

    const updatedAddressData = req.body;
     // Basic validation
    if (!updatedAddressData.street || !updatedAddressData.city || !updatedAddressData.postalCode || !updatedAddressData.country) {
        return res.status(400).json({ message: 'Missing required address fields.' });
    }


    try {
        let currentAddresses = await getUserAddresses(userId);
        let addressFound = false;
        let resultingAddress: schema.ShippingAddress | null = null;

        // If setting this address as default, unset others first
         if (updatedAddressData.isDefault) {
            currentAddresses.forEach(addr => { if(addr.id !== addressId) addr.isDefault = false});
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
        });

        if (!addressFound) {
            return res.status(404).json({ message: `Address with ID ${addressId} not found.` });
        }

        await db.update(schema.users)
            .set({ addresses: updatedAddresses, updatedAt: new Date() })
            .where(eq(schema.users.id, userId));

        res.json(resultingAddress);
    } catch (error) {
        next(error);
    }
});


router.delete('/users/me/addresses/:addressId', isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
     const userId = req.user?.id;
     const { addressId } = req.params;
    if (!userId) return res.status(401).json({ message: 'Authentication required.' });

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

    } catch (error) {
         next(error);
    }
});

export default router;