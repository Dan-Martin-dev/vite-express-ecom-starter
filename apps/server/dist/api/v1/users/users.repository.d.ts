import * as schema from '@/db/schema/auth.schema.js';
import { ShippingAddress } from '@/types/index.js';
export declare class UserRepository {
    findUserById(userId: string): Promise<{
        id: string;
        name: string;
        email: string;
        role: "admin" | "user" | "staff" | "vendor";
        password: string | null;
        emailVerified: Date | null;
        image: string | null;
        phoneNumber: string | null;
        bio: string | null;
        preferences: unknown;
        lastLoginAt: Date | null;
        addresses: ShippingAddress[] | null;
        defaultPaymentMethod: string | null;
        marketingOptIn: boolean | null;
        stripeCustomerId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUserProfile(userId: string, data: Partial<typeof schema.users.$inferInsert>): Promise<{
        id: string;
        name: string;
        email: string;
        role: "admin" | "user" | "staff" | "vendor";
        password: string | null;
        emailVerified: Date | null;
        image: string | null;
        phoneNumber: string | null;
        bio: string | null;
        preferences: unknown;
        lastLoginAt: Date | null;
        addresses: ShippingAddress[] | null;
        defaultPaymentMethod: string | null;
        marketingOptIn: boolean | null;
        stripeCustomerId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getUserAddresses(userId: string): Promise<ShippingAddress[]>;
    updateUserAddresses(userId: string, addresses: ShippingAddress[]): Promise<void>;
}
export declare const userRepository: UserRepository;
