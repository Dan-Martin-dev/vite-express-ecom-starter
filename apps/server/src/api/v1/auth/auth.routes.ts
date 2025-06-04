// src/api/v1/routes/auth.routes.ts
import { Router } from 'express';
import express, { Request, Response, NextFunction } from 'express';
import { pb, ensurePbAdminAuth } from "@/lib/pocketbase.js";
import { isAuthenticated } from '@/middleware/auth.middleware.js';
import { validateRequestBody } from '@/middleware/validation.middleware.js'; // Import validation middleware
import { authController } from '@/api/v1/auth/auth.controller.js'; // Import Auth Controller
import { UserCreateSchema, UserLoginSchema } from '@/api/v1/auth/auth.types.js'; // Import Zod Schemas
import { db } from '@/db/index.js';
import * as schema from '@/db/schema/auth.schema.js';
import { eq } from 'drizzle-orm';
import crypto from 'crypto'; // For generating address IDs if needed
import { ShippingAddress } from '@/types/index.js';
import { EmailSchema, addressSchema, updateProfileSchema } from '@/api/v1/auth/auth.validator.js';
import { getUserAddresses } from '@/api/v1/auth/auth.utils.js';

// Call this when setting up routes or server
ensurePbAdminAuth(); // Attempt admin authentication on startup

const router: Router = express.Router();

// === CORE AUTH ROUTES (Using Controller/Service/Validation) ===
router.post('/auth/register', validateRequestBody(UserCreateSchema), authController.register);
router.post('/auth/login', validateRequestBody(UserLoginSchema), authController.login);
router.post('/auth/logout', authController.logout);
router.get('/auth/session', isAuthenticated, authController.getSession);
router.post('/auth/request-password-reset', validateRequestBody(EmailSchema), authController.requestPasswordReset);

// --- Placeholder/Informational Routes (Using Controller placeholders) ---
router.post('/auth/refresh', authController.refresh);
router.post('/auth/verify-email', authController.verifyEmail);
router.post('/auth/reset-password', authController.resetPassword);


// === USER PROFILE & ADDRESS ROUTES ===

// USERS
router.get('/users/me', isAuthenticated, (req: Request, res: Response) => {
    res.json({ user: req.user, token: req.token });
});

// Line 50 in your error log
router.put('/users/me', isAuthenticated, validateRequestBody(updateProfileSchema), async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).json({ message: 'Authentication required.' });
    }

    // FIX: Prefixed unused 'otherData' with an underscore (Line 56 in your error log)
    const { name, bio, image, phoneNumber, preferences, marketingOptIn, defaultPaymentMethod } = req.body;
    
    const pbDataToUpdate: { [key: string]: any } = {};
    if (name !== undefined) pbDataToUpdate.name = name;

    const drizzleDataToUpdate: Partial<typeof schema.users.$inferInsert> = {
        updatedAt: new Date()
    };
    if (bio !== undefined) drizzleDataToUpdate.bio = bio;
    if (image !== undefined) drizzleDataToUpdate.image = image;
    if (phoneNumber !== undefined) drizzleDataToUpdate.phoneNumber = phoneNumber;
    if (preferences !== undefined) drizzleDataToUpdate.preferences = preferences;
    if (marketingOptIn !== undefined) drizzleDataToUpdate.marketingOptIn = Boolean(marketingOptIn);
    if (defaultPaymentMethod !== undefined) drizzleDataToUpdate.defaultPaymentMethod = defaultPaymentMethod;

    try {
        let updatedPbRecord = req.user;

        if (Object.keys(pbDataToUpdate).length > 0) {
            updatedPbRecord = await pb.collection('users').update(userId, pbDataToUpdate);
        }

        let updatedDrizzleRecord = null;
        if (Object.keys(drizzleDataToUpdate).length > 1) {
            const result = await db.update(schema.users)
                .set(drizzleDataToUpdate)
                .where(eq(schema.users.id, userId))
                .returning();
            if (result.length > 0) {
                updatedDrizzleRecord = result[0];
            } else {
                 console.warn(`Attempted to update profile in Drizzle for user ID ${userId}, but no matching record found.`);
            }
        }

        const combinedUser = {
           ...(updatedDrizzleRecord ? {
               id: updatedDrizzleRecord.id,
               email: updatedDrizzleRecord.email,
               role: updatedDrizzleRecord.role,
               name: updatedDrizzleRecord.name,
               bio: updatedDrizzleRecord.bio,
               image: updatedDrizzleRecord.image,
               phoneNumber: updatedDrizzleRecord.phoneNumber,
               preferences: updatedDrizzleRecord.preferences,
               lastLoginAt: updatedDrizzleRecord.lastLoginAt,
               addresses: updatedDrizzleRecord.addresses,
               defaultPaymentMethod: updatedDrizzleRecord.defaultPaymentMethod,
               marketingOptIn: updatedDrizzleRecord.marketingOptIn,
               createdAt: updatedDrizzleRecord.createdAt,
               updatedAt: updatedDrizzleRecord.updatedAt,
           } : {
               id: updatedPbRecord?.id,
               email: updatedPbRecord?.email,
               name: updatedPbRecord?.name,
           }),
        };
        res.json({ user: combinedUser });
    } catch (error: any) {
         console.error("Profile Update Error:", error?.response || error);
         // FIX: Added 'return' before next(error)
         return next(error);
    }
});

router.patch('/auth/users/me/password', isAuthenticated, /* validateRequestBody(passwordChangeSchema), */ async (_req: Request, res: Response, _next: NextFunction) => {
     res.status(501).json({ message: 'Password changes should be handled via PocketBase password reset flow or SDK methods requiring the old password for security.' });
    /*
    const userId = _req.user?.id;
    const { oldPassword, password, passwordConfirm } = _req.body;
    if (!userId || !oldPassword || !password || !passwordConfirm) {
         return res.status(400).json({ message: "Missing required fields." });
    }
     if (password !== passwordConfirm) {
        return res.status(400).json({ message: 'New passwords do not match.' });
    }
    try {
        await pb.collection('users').update(userId, {
            oldPassword: oldPassword,
            password: password,
            passwordConfirm: passwordConfirm
        });
        res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error: any) {
        console.error("Password Update Error:", error?.response || error)
        const message = error?.response?.message || 'Password update failed.';
        const details = error?.response?.data || {};
        // If uncommenting, ensure this catch block also uses _next(error) or sends a response
        // return _next(error) or similar
        res.status(error?.response?.status || 400).json({ message, details  });
    }
    */
});

// Line 172 in your error log
router.get('/auth/users/me/addresses', isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).json({ message: 'Authentication required.' });
    }

    try {
        const addresses = await getUserAddresses(userId);
        res.json(addresses);
    } catch (error) {
        // FIX: Added 'return' before next(error)
        return next(error);
    }
});

// Line 185 in your error log
router.post('/auth/users/me/addresses', isAuthenticated, validateRequestBody(addressSchema), async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).json({ message: 'Authentication required.' });
    }

    const newAddressData = req.body as Omit<ShippingAddress, 'id'>;

    try {
        const currentAddresses = await getUserAddresses(userId);
        const newAddress: ShippingAddress = {
            id: crypto.randomUUID(),
            isDefault: newAddressData.isDefault || false,
            ...newAddressData,
        };

        if (newAddress.isDefault) {
            currentAddresses.forEach(addr => addr.isDefault = false);
        }

        const updatedAddresses = [...currentAddresses, newAddress];

        await db.update(schema.users)
            .set({ addresses: updatedAddresses, updatedAt: new Date() })
            .where(eq(schema.users.id, userId));

        res.status(201).json(newAddress);
    } catch (error) {
        // FIX: Added 'return' before next(error)
        return next(error);
    }
});

// Line 219 in your error log
router.put('/auth/users/me/addresses/:addressId', isAuthenticated, validateRequestBody(addressSchema), async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const { addressId } = req.params;
    if (!userId) {
        return res.status(401).json({ message: 'Authentication required.' });
    }

    const updatedAddressData = req.body as Partial<ShippingAddress>;

    try {
        let currentAddresses = await getUserAddresses(userId);
        let addressFound = false;
        let resultingAddress: ShippingAddress | null = null;

         if (updatedAddressData.isDefault) {
            currentAddresses.forEach(addr => { if(addr.id !== addressId) addr.isDefault = false});
        }

        const updatedAddresses = currentAddresses.map(addr => {
            if (addr.id === addressId) {
                addressFound = true;
                resultingAddress = {
                    ...addr,
                    ...updatedAddressData,
                     isDefault: updatedAddressData.isDefault !== undefined ? updatedAddressData.isDefault : addr.isDefault,
                };
                return resultingAddress;
            }
            return addr;
        }).filter((addr): addr is ShippingAddress => addr !== null);

        if (!addressFound) {
            return res.status(404).json({ message: `Address with ID ${addressId} not found.` });
        }

        await db.update(schema.users)
            .set({ addresses: updatedAddresses, updatedAt: new Date() })
            .where(eq(schema.users.id, userId));

        res.json(resultingAddress);
    } catch (error) {
        // FIX: Added 'return' before next(error)
        return next(error);
    }
});

// Line 265 in your error log
router.delete('/auth/users/me/addresses/:addressId', isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
     const userId = req.user?.id;
     const { addressId } = req.params;
    if (!userId) {
        return res.status(401).json({ message: 'Authentication required.' });
    }

    try {
         let currentAddresses = await getUserAddresses(userId);
         const initialLength = currentAddresses.length;

         const updatedAddresses = currentAddresses.filter(addr => addr.id !== addressId);

          if (updatedAddresses.length === initialLength) {
            return res.status(404).json({ message: `Address with ID ${addressId} not found.` });
        }

         await db.update(schema.users)
            .set({ addresses: updatedAddresses, updatedAt: new Date() })
            .where(eq(schema.users.id, userId));

        res.status(204).send();
    } catch (error) {
         // FIX: Added 'return' before next(error)
         return next(error);
    }
});

export default router;