import { z } from 'zod'; // Import z for email validation schema
export const EmailSchema = z.object({ email: z.string().email() });
// Schema for address validation (used in address routes below)
export const addressSchema = z.object({
    // id: z.string().optional(), // ID is generated on create, required on update - Handled by route logic
    fullName: z.string().min(1, "Full name is required"),
    address: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
    state: z.string().optional(),
    phoneNumber: z.string().optional(),
    isDefault: z.boolean().optional(),
});
// Schema for profile update (used in profile route below)
export const updateProfileSchema = z.object({
    name: z.string().min(1).optional(),
    bio: z.string().optional(),
    image: z.string().url().optional(), // Assuming URL
    phoneNumber: z.string().optional(),
    preferences: z.record(z.any()).optional(), // Assuming JSON object
    marketingOptIn: z.boolean().optional(),
    defaultPaymentMethod: z.string().optional(),
    // Add other updatable fields specific to your Drizzle schema or PocketBase custom fields
}).partial(); // Allow partial updates
