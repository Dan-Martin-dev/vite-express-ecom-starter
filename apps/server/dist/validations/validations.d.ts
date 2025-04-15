import { z } from 'zod';
export declare const shippingAddressSchema: z.ZodObject<{
    fullName: z.ZodString;
    address: z.ZodString;
    city: z.ZodString;
    postalCode: z.ZodString;
    country: z.ZodString;
    state: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodString>;
    isDefault: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phoneNumber?: string | undefined;
    isDefault?: boolean | undefined;
    state?: string | undefined;
}, {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phoneNumber?: string | undefined;
    isDefault?: boolean | undefined;
    state?: string | undefined;
}>;
export declare const paymentResultSchema: z.ZodObject<{
    id: z.ZodString;
    status: z.ZodString;
    update_time: z.ZodString;
    email_address: z.ZodString;
    provider: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: string;
    provider: string;
    update_time: string;
    email_address: string;
}, {
    id: string;
    status: string;
    provider: string;
    update_time: string;
    email_address: string;
}>;
export declare const cartItemSchema: z.ZodObject<{
    productId: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    image: z.ZodString;
    price: z.ZodNumber;
    qty: z.ZodNumber;
    attributes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    image: string;
    slug: string;
    productId: string;
    price: number;
    qty: number;
    attributes?: Record<string, string> | undefined;
}, {
    name: string;
    image: string;
    slug: string;
    productId: string;
    price: number;
    qty: number;
    attributes?: Record<string, string> | undefined;
}>;
export declare const userCreateSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    role: z.ZodOptional<z.ZodEnum<["admin", "user", "staff", "vendor"]>>;
    password: z.ZodString;
    phoneNumber: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    preferences: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    addresses: z.ZodOptional<z.ZodArray<z.ZodObject<{
        fullName: z.ZodString;
        address: z.ZodString;
        city: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
        state: z.ZodOptional<z.ZodString>;
        phoneNumber: z.ZodOptional<z.ZodString>;
        isDefault: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    }, {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    }>, "many">>;
    defaultPaymentMethod: z.ZodOptional<z.ZodString>;
    marketingOptIn: z.ZodOptional<z.ZodBoolean>;
    image: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    name: string;
    password: string;
    role?: "admin" | "user" | "staff" | "vendor" | undefined;
    image?: string | undefined;
    phoneNumber?: string | undefined;
    bio?: string | undefined;
    preferences?: Record<string, unknown> | undefined;
    addresses?: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    }[] | undefined;
    defaultPaymentMethod?: string | undefined;
    marketingOptIn?: boolean | undefined;
}, {
    email: string;
    name: string;
    password: string;
    role?: "admin" | "user" | "staff" | "vendor" | undefined;
    image?: string | undefined;
    phoneNumber?: string | undefined;
    bio?: string | undefined;
    preferences?: Record<string, unknown> | undefined;
    addresses?: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    }[] | undefined;
    defaultPaymentMethod?: string | undefined;
    marketingOptIn?: boolean | undefined;
}>;
export declare const userUpdateSchema: z.ZodObject<z.objectUtil.extendShape<Omit<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodOptional<z.ZodEnum<["admin", "user", "staff", "vendor"]>>>;
    password: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    bio: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    preferences: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    addresses: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
        fullName: z.ZodString;
        address: z.ZodString;
        city: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
        state: z.ZodOptional<z.ZodString>;
        phoneNumber: z.ZodOptional<z.ZodString>;
        isDefault: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    }, {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    }>, "many">>>;
    defaultPaymentMethod: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    marketingOptIn: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    image: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "password">, {
    password: z.ZodOptional<z.ZodString>;
}>, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    name?: string | undefined;
    role?: "admin" | "user" | "staff" | "vendor" | undefined;
    password?: string | undefined;
    image?: string | undefined;
    phoneNumber?: string | undefined;
    bio?: string | undefined;
    preferences?: Record<string, unknown> | undefined;
    addresses?: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    }[] | undefined;
    defaultPaymentMethod?: string | undefined;
    marketingOptIn?: boolean | undefined;
}, {
    email?: string | undefined;
    name?: string | undefined;
    role?: "admin" | "user" | "staff" | "vendor" | undefined;
    password?: string | undefined;
    image?: string | undefined;
    phoneNumber?: string | undefined;
    bio?: string | undefined;
    preferences?: Record<string, unknown> | undefined;
    addresses?: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    }[] | undefined;
    defaultPaymentMethod?: string | undefined;
    marketingOptIn?: boolean | undefined;
}>;
export declare const accountSchema: z.ZodObject<{
    userId: z.ZodString;
    type: z.ZodEnum<["oauth", "email", "credentials"]>;
    provider: z.ZodString;
    providerAccountId: z.ZodString;
    refresh_token: z.ZodOptional<z.ZodString>;
    access_token: z.ZodOptional<z.ZodString>;
    expires_at: z.ZodOptional<z.ZodNumber>;
    token_type: z.ZodOptional<z.ZodString>;
    scope: z.ZodOptional<z.ZodString>;
    id_token: z.ZodOptional<z.ZodString>;
    session_state: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    type: "oauth" | "email" | "credentials";
    provider: string;
    providerAccountId: string;
    expires_at?: number | undefined;
    refresh_token?: string | undefined;
    access_token?: string | undefined;
    token_type?: string | undefined;
    scope?: string | undefined;
    id_token?: string | undefined;
    session_state?: string | undefined;
}, {
    userId: string;
    type: "oauth" | "email" | "credentials";
    provider: string;
    providerAccountId: string;
    expires_at?: number | undefined;
    refresh_token?: string | undefined;
    access_token?: string | undefined;
    token_type?: string | undefined;
    scope?: string | undefined;
    id_token?: string | undefined;
    session_state?: string | undefined;
}>;
export declare const sessionSchema: z.ZodObject<{
    sessionToken: z.ZodString;
    userId: z.ZodString;
    expires: z.ZodString;
    data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    sessionToken: string;
    expires: string;
    data?: Record<string, unknown> | undefined;
}, {
    userId: string;
    sessionToken: string;
    expires: string;
    data?: Record<string, unknown> | undefined;
}>;
export declare const categoryCreateSchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    icon: z.ZodOptional<z.ZodString>;
    metaTitle: z.ZodOptional<z.ZodString>;
    metaDescription: z.ZodOptional<z.ZodString>;
    parentId: z.ZodOptional<z.ZodString>;
    displayOrder: z.ZodOptional<z.ZodNumber>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;
    image?: string | undefined;
    description?: string | undefined;
    metaTitle?: string | undefined;
    metaDescription?: string | undefined;
    isActive?: boolean | undefined;
    icon?: string | undefined;
    parentId?: string | undefined;
    displayOrder?: number | undefined;
}, {
    name: string;
    slug: string;
    image?: string | undefined;
    description?: string | undefined;
    metaTitle?: string | undefined;
    metaDescription?: string | undefined;
    isActive?: boolean | undefined;
    icon?: string | undefined;
    parentId?: string | undefined;
    displayOrder?: number | undefined;
}>;
export declare const categoryUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    image: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    icon: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    metaTitle: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    metaDescription: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    parentId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    displayOrder: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    isActive: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    image?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    metaTitle?: string | undefined;
    metaDescription?: string | undefined;
    isActive?: boolean | undefined;
    icon?: string | undefined;
    parentId?: string | undefined;
    displayOrder?: number | undefined;
}, {
    name?: string | undefined;
    image?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    metaTitle?: string | undefined;
    metaDescription?: string | undefined;
    isActive?: boolean | undefined;
    icon?: string | undefined;
    parentId?: string | undefined;
    displayOrder?: number | undefined;
}>;
export declare const brandCreateSchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
    logo: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    website: z.ZodOptional<z.ZodString>;
    isFeatured: z.ZodOptional<z.ZodBoolean>;
    metaTitle: z.ZodOptional<z.ZodString>;
    metaDescription: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;
    logo?: string | undefined;
    description?: string | undefined;
    website?: string | undefined;
    isFeatured?: boolean | undefined;
    metaTitle?: string | undefined;
    metaDescription?: string | undefined;
}, {
    name: string;
    slug: string;
    logo?: string | undefined;
    description?: string | undefined;
    website?: string | undefined;
    isFeatured?: boolean | undefined;
    metaTitle?: string | undefined;
    metaDescription?: string | undefined;
}>;
export declare const brandUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    logo: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    website: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    isFeatured: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    metaTitle: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    metaDescription: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    slug?: string | undefined;
    logo?: string | undefined;
    description?: string | undefined;
    website?: string | undefined;
    isFeatured?: boolean | undefined;
    metaTitle?: string | undefined;
    metaDescription?: string | undefined;
}, {
    name?: string | undefined;
    slug?: string | undefined;
    logo?: string | undefined;
    description?: string | undefined;
    website?: string | undefined;
    isFeatured?: boolean | undefined;
    metaTitle?: string | undefined;
    metaDescription?: string | undefined;
}>;
export declare const dimensionsSchema: z.ZodObject<{
    length: z.ZodOptional<z.ZodNumber>;
    width: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    length?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
}, {
    length?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
}>;
export declare const productCreateSchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
    brandId: z.ZodOptional<z.ZodString>;
    description: z.ZodString;
    shortDescription: z.ZodOptional<z.ZodString>;
    images: z.ZodArray<z.ZodString, "many">;
    basePrice: z.ZodNumber;
    salePrice: z.ZodOptional<z.ZodNumber>;
    sku: z.ZodOptional<z.ZodString>;
    barcode: z.ZodOptional<z.ZodString>;
    weight: z.ZodOptional<z.ZodNumber>;
    dimensions: z.ZodOptional<z.ZodObject<{
        length: z.ZodOptional<z.ZodNumber>;
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        length?: number | undefined;
        width?: number | undefined;
        height?: number | undefined;
    }, {
        length?: number | undefined;
        width?: number | undefined;
        height?: number | undefined;
    }>>;
    taxClass: z.ZodOptional<z.ZodString>;
    stockManagement: z.ZodOptional<z.ZodBoolean>;
    stock: z.ZodOptional<z.ZodNumber>;
    lowStockThreshold: z.ZodOptional<z.ZodNumber>;
    soldIndividually: z.ZodOptional<z.ZodBoolean>;
    backordersAllowed: z.ZodOptional<z.ZodBoolean>;
    metaTitle: z.ZodOptional<z.ZodString>;
    metaDescription: z.ZodOptional<z.ZodString>;
    metaKeywords: z.ZodOptional<z.ZodString>;
    isFeatured: z.ZodOptional<z.ZodBoolean>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    hasVariants: z.ZodOptional<z.ZodBoolean>;
    categories: z.ZodOptional<z.ZodArray<z.ZodObject<{
        categoryId: z.ZodString;
        isPrimary: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        categoryId: string;
        isPrimary?: boolean | undefined;
    }, {
        categoryId: string;
        isPrimary?: boolean | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;
    description: string;
    images: string[];
    basePrice: number;
    isFeatured?: boolean | undefined;
    metaTitle?: string | undefined;
    metaDescription?: string | undefined;
    brandId?: string | undefined;
    shortDescription?: string | undefined;
    salePrice?: number | undefined;
    sku?: string | undefined;
    barcode?: string | undefined;
    weight?: number | undefined;
    dimensions?: {
        length?: number | undefined;
        width?: number | undefined;
        height?: number | undefined;
    } | undefined;
    taxClass?: string | undefined;
    stockManagement?: boolean | undefined;
    stock?: number | undefined;
    lowStockThreshold?: number | undefined;
    soldIndividually?: boolean | undefined;
    backordersAllowed?: boolean | undefined;
    metaKeywords?: string | undefined;
    isActive?: boolean | undefined;
    hasVariants?: boolean | undefined;
    categories?: {
        categoryId: string;
        isPrimary?: boolean | undefined;
    }[] | undefined;
}, {
    name: string;
    slug: string;
    description: string;
    images: string[];
    basePrice: number;
    isFeatured?: boolean | undefined;
    metaTitle?: string | undefined;
    metaDescription?: string | undefined;
    brandId?: string | undefined;
    shortDescription?: string | undefined;
    salePrice?: number | undefined;
    sku?: string | undefined;
    barcode?: string | undefined;
    weight?: number | undefined;
    dimensions?: {
        length?: number | undefined;
        width?: number | undefined;
        height?: number | undefined;
    } | undefined;
    taxClass?: string | undefined;
    stockManagement?: boolean | undefined;
    stock?: number | undefined;
    lowStockThreshold?: number | undefined;
    soldIndividually?: boolean | undefined;
    backordersAllowed?: boolean | undefined;
    metaKeywords?: string | undefined;
    isActive?: boolean | undefined;
    hasVariants?: boolean | undefined;
    categories?: {
        categoryId: string;
        isPrimary?: boolean | undefined;
    }[] | undefined;
}>;
export declare const productUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    brandId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    description: z.ZodOptional<z.ZodString>;
    shortDescription: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    images: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    basePrice: z.ZodOptional<z.ZodNumber>;
    salePrice: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    sku: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    barcode: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    weight: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    dimensions: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        length: z.ZodOptional<z.ZodNumber>;
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        length?: number | undefined;
        width?: number | undefined;
        height?: number | undefined;
    }, {
        length?: number | undefined;
        width?: number | undefined;
        height?: number | undefined;
    }>>>;
    taxClass: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    stockManagement: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    stock: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    lowStockThreshold: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    soldIndividually: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    backordersAllowed: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    metaTitle: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    metaDescription: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    metaKeywords: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    isFeatured: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    isActive: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    hasVariants: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    categories: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
        categoryId: z.ZodString;
        isPrimary: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        categoryId: string;
        isPrimary?: boolean | undefined;
    }, {
        categoryId: string;
        isPrimary?: boolean | undefined;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    isFeatured?: boolean | undefined;
    metaTitle?: string | undefined;
    metaDescription?: string | undefined;
    brandId?: string | undefined;
    shortDescription?: string | undefined;
    images?: string[] | undefined;
    basePrice?: number | undefined;
    salePrice?: number | undefined;
    sku?: string | undefined;
    barcode?: string | undefined;
    weight?: number | undefined;
    dimensions?: {
        length?: number | undefined;
        width?: number | undefined;
        height?: number | undefined;
    } | undefined;
    taxClass?: string | undefined;
    stockManagement?: boolean | undefined;
    stock?: number | undefined;
    lowStockThreshold?: number | undefined;
    soldIndividually?: boolean | undefined;
    backordersAllowed?: boolean | undefined;
    metaKeywords?: string | undefined;
    isActive?: boolean | undefined;
    hasVariants?: boolean | undefined;
    categories?: {
        categoryId: string;
        isPrimary?: boolean | undefined;
    }[] | undefined;
}, {
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    isFeatured?: boolean | undefined;
    metaTitle?: string | undefined;
    metaDescription?: string | undefined;
    brandId?: string | undefined;
    shortDescription?: string | undefined;
    images?: string[] | undefined;
    basePrice?: number | undefined;
    salePrice?: number | undefined;
    sku?: string | undefined;
    barcode?: string | undefined;
    weight?: number | undefined;
    dimensions?: {
        length?: number | undefined;
        width?: number | undefined;
        height?: number | undefined;
    } | undefined;
    taxClass?: string | undefined;
    stockManagement?: boolean | undefined;
    stock?: number | undefined;
    lowStockThreshold?: number | undefined;
    soldIndividually?: boolean | undefined;
    backordersAllowed?: boolean | undefined;
    metaKeywords?: string | undefined;
    isActive?: boolean | undefined;
    hasVariants?: boolean | undefined;
    categories?: {
        categoryId: string;
        isPrimary?: boolean | undefined;
    }[] | undefined;
}>;
export declare const attributeCreateSchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    type: z.ZodDefault<z.ZodString>;
    sortOrder: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;
    type: string;
    description?: string | undefined;
    sortOrder?: number | undefined;
}, {
    name: string;
    slug: string;
    description?: string | undefined;
    type?: string | undefined;
    sortOrder?: number | undefined;
}>;
export declare const attributeUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    type: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    sortOrder: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    type?: string | undefined;
    sortOrder?: number | undefined;
}, {
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    type?: string | undefined;
    sortOrder?: number | undefined;
}>;
export declare const attributeValueCreateSchema: z.ZodObject<{
    attributeId: z.ZodString;
    value: z.ZodString;
    label: z.ZodString;
    color: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    attributeId: string;
    value: string;
    label: string;
    image?: string | undefined;
    sortOrder?: number | undefined;
    color?: string | undefined;
}, {
    attributeId: string;
    value: string;
    label: string;
    image?: string | undefined;
    sortOrder?: number | undefined;
    color?: string | undefined;
}>;
export declare const attributeValueUpdateSchema: z.ZodObject<{
    attributeId: z.ZodOptional<z.ZodString>;
    value: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodString>;
    color: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    image: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    sortOrder: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    image?: string | undefined;
    sortOrder?: number | undefined;
    attributeId?: string | undefined;
    value?: string | undefined;
    label?: string | undefined;
    color?: string | undefined;
}, {
    image?: string | undefined;
    sortOrder?: number | undefined;
    attributeId?: string | undefined;
    value?: string | undefined;
    label?: string | undefined;
    color?: string | undefined;
}>;
export declare const productVariantCreateSchema: z.ZodObject<{
    productId: z.ZodString;
    sku: z.ZodOptional<z.ZodString>;
    barcode: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    salePrice: z.ZodOptional<z.ZodNumber>;
    stock: z.ZodOptional<z.ZodNumber>;
    weight: z.ZodOptional<z.ZodNumber>;
    dimensions: z.ZodOptional<z.ZodObject<{
        length: z.ZodOptional<z.ZodNumber>;
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        length?: number | undefined;
        width?: number | undefined;
        height?: number | undefined;
    }, {
        length?: number | undefined;
        width?: number | undefined;
        height?: number | undefined;
    }>>;
    image: z.ZodOptional<z.ZodString>;
    isDefault: z.ZodOptional<z.ZodBoolean>;
    attributes: z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodString>, Record<string, string>, Record<string, string>>;
}, "strip", z.ZodTypeAny, {
    productId: string;
    attributes: Record<string, string>;
    image?: string | undefined;
    salePrice?: number | undefined;
    sku?: string | undefined;
    barcode?: string | undefined;
    weight?: number | undefined;
    dimensions?: {
        length?: number | undefined;
        width?: number | undefined;
        height?: number | undefined;
    } | undefined;
    stock?: number | undefined;
    price?: number | undefined;
    isDefault?: boolean | undefined;
}, {
    productId: string;
    attributes: Record<string, string>;
    image?: string | undefined;
    salePrice?: number | undefined;
    sku?: string | undefined;
    barcode?: string | undefined;
    weight?: number | undefined;
    dimensions?: {
        length?: number | undefined;
        width?: number | undefined;
        height?: number | undefined;
    } | undefined;
    stock?: number | undefined;
    price?: number | undefined;
    isDefault?: boolean | undefined;
}>;
export declare const productVariantUpdateSchema: z.ZodObject<{
    productId: z.ZodOptional<z.ZodString>;
    sku: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    barcode: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    price: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    salePrice: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    stock: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    weight: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    dimensions: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        length: z.ZodOptional<z.ZodNumber>;
        width: z.ZodOptional<z.ZodNumber>;
        height: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        length?: number | undefined;
        width?: number | undefined;
        height?: number | undefined;
    }, {
        length?: number | undefined;
        width?: number | undefined;
        height?: number | undefined;
    }>>>;
    image: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    isDefault: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    attributes: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodString>, Record<string, string>, Record<string, string>>>;
}, "strip", z.ZodTypeAny, {
    image?: string | undefined;
    salePrice?: number | undefined;
    sku?: string | undefined;
    barcode?: string | undefined;
    weight?: number | undefined;
    dimensions?: {
        length?: number | undefined;
        width?: number | undefined;
        height?: number | undefined;
    } | undefined;
    stock?: number | undefined;
    productId?: string | undefined;
    price?: number | undefined;
    isDefault?: boolean | undefined;
    attributes?: Record<string, string> | undefined;
}, {
    image?: string | undefined;
    salePrice?: number | undefined;
    sku?: string | undefined;
    barcode?: string | undefined;
    weight?: number | undefined;
    dimensions?: {
        length?: number | undefined;
        width?: number | undefined;
        height?: number | undefined;
    } | undefined;
    stock?: number | undefined;
    productId?: string | undefined;
    price?: number | undefined;
    isDefault?: boolean | undefined;
    attributes?: Record<string, string> | undefined;
}>;
export declare const reviewCreateSchema: z.ZodObject<{
    userId: z.ZodString;
    productId: z.ZodString;
    orderId: z.ZodOptional<z.ZodString>;
    rating: z.ZodNumber;
    title: z.ZodString;
    content: z.ZodString;
    pros: z.ZodOptional<z.ZodString>;
    cons: z.ZodOptional<z.ZodString>;
    mediaUrls: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    rating: number;
    productId: string;
    title: string;
    content: string;
    orderId?: string | undefined;
    pros?: string | undefined;
    cons?: string | undefined;
    mediaUrls?: string[] | undefined;
}, {
    userId: string;
    rating: number;
    productId: string;
    title: string;
    content: string;
    orderId?: string | undefined;
    pros?: string | undefined;
    cons?: string | undefined;
    mediaUrls?: string[] | undefined;
}>;
export declare const reviewUpdateSchema: z.ZodObject<Omit<{
    userId: z.ZodOptional<z.ZodString>;
    productId: z.ZodOptional<z.ZodString>;
    orderId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    rating: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    pros: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    cons: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    mediaUrls: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
}, "userId" | "productId">, "strip", z.ZodTypeAny, {
    rating?: number | undefined;
    orderId?: string | undefined;
    title?: string | undefined;
    content?: string | undefined;
    pros?: string | undefined;
    cons?: string | undefined;
    mediaUrls?: string[] | undefined;
}, {
    rating?: number | undefined;
    orderId?: string | undefined;
    title?: string | undefined;
    content?: string | undefined;
    pros?: string | undefined;
    cons?: string | undefined;
    mediaUrls?: string[] | undefined;
}>;
export declare const cartCreateSchema: z.ZodObject<{
    userId: z.ZodOptional<z.ZodString>;
    sessionId: z.ZodString;
    items: z.ZodDefault<z.ZodArray<z.ZodObject<{
        productId: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        image: z.ZodString;
        price: z.ZodNumber;
        qty: z.ZodNumber;
        attributes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        image: string;
        slug: string;
        productId: string;
        price: number;
        qty: number;
        attributes?: Record<string, string> | undefined;
    }, {
        name: string;
        image: string;
        slug: string;
        productId: string;
        price: number;
        qty: number;
        attributes?: Record<string, string> | undefined;
    }>, "many">>;
    couponCode: z.ZodOptional<z.ZodString>;
    itemsPrice: z.ZodNumber;
    discountAmount: z.ZodOptional<z.ZodNumber>;
    shippingPrice: z.ZodOptional<z.ZodNumber>;
    taxPrice: z.ZodOptional<z.ZodNumber>;
    totalPrice: z.ZodNumber;
    notes: z.ZodOptional<z.ZodString>;
    shippingMethod: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    itemsPrice: number;
    totalPrice: number;
    items: {
        name: string;
        image: string;
        slug: string;
        productId: string;
        price: number;
        qty: number;
        attributes?: Record<string, string> | undefined;
    }[];
    sessionId: string;
    userId?: string | undefined;
    couponCode?: string | undefined;
    discountAmount?: number | undefined;
    shippingPrice?: number | undefined;
    taxPrice?: number | undefined;
    notes?: string | undefined;
    shippingMethod?: string | undefined;
}, {
    itemsPrice: number;
    totalPrice: number;
    sessionId: string;
    userId?: string | undefined;
    couponCode?: string | undefined;
    discountAmount?: number | undefined;
    shippingPrice?: number | undefined;
    taxPrice?: number | undefined;
    notes?: string | undefined;
    items?: {
        name: string;
        image: string;
        slug: string;
        productId: string;
        price: number;
        qty: number;
        attributes?: Record<string, string> | undefined;
    }[] | undefined;
    shippingMethod?: string | undefined;
}>;
export declare const cartUpdateSchema: z.ZodObject<{
    userId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    sessionId: z.ZodOptional<z.ZodString>;
    items: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
        productId: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        image: z.ZodString;
        price: z.ZodNumber;
        qty: z.ZodNumber;
        attributes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        image: string;
        slug: string;
        productId: string;
        price: number;
        qty: number;
        attributes?: Record<string, string> | undefined;
    }, {
        name: string;
        image: string;
        slug: string;
        productId: string;
        price: number;
        qty: number;
        attributes?: Record<string, string> | undefined;
    }>, "many">>>;
    couponCode: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    itemsPrice: z.ZodOptional<z.ZodNumber>;
    discountAmount: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    shippingPrice: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    taxPrice: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    totalPrice: z.ZodOptional<z.ZodNumber>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    shippingMethod: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    userId?: string | undefined;
    couponCode?: string | undefined;
    itemsPrice?: number | undefined;
    discountAmount?: number | undefined;
    shippingPrice?: number | undefined;
    taxPrice?: number | undefined;
    totalPrice?: number | undefined;
    notes?: string | undefined;
    items?: {
        name: string;
        image: string;
        slug: string;
        productId: string;
        price: number;
        qty: number;
        attributes?: Record<string, string> | undefined;
    }[] | undefined;
    sessionId?: string | undefined;
    shippingMethod?: string | undefined;
}, {
    userId?: string | undefined;
    couponCode?: string | undefined;
    itemsPrice?: number | undefined;
    discountAmount?: number | undefined;
    shippingPrice?: number | undefined;
    taxPrice?: number | undefined;
    totalPrice?: number | undefined;
    notes?: string | undefined;
    items?: {
        name: string;
        image: string;
        slug: string;
        productId: string;
        price: number;
        qty: number;
        attributes?: Record<string, string> | undefined;
    }[] | undefined;
    sessionId?: string | undefined;
    shippingMethod?: string | undefined;
}>;
export declare const wishlistCreateSchema: z.ZodObject<{
    userId: z.ZodString;
    name: z.ZodString;
    isPublic: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    userId: string;
    isPublic?: boolean | undefined;
}, {
    name: string;
    userId: string;
    isPublic?: boolean | undefined;
}>;
export declare const wishlistUpdateSchema: z.ZodObject<{
    userId: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    isPublic: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    userId?: string | undefined;
    isPublic?: boolean | undefined;
}, {
    name?: string | undefined;
    userId?: string | undefined;
    isPublic?: boolean | undefined;
}>;
export declare const wishlistItemCreateSchema: z.ZodObject<{
    wishlistId: z.ZodString;
    productId: z.ZodString;
    variantId: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    productId: string;
    wishlistId: string;
    variantId?: string | undefined;
    notes?: string | undefined;
}, {
    productId: string;
    wishlistId: string;
    variantId?: string | undefined;
    notes?: string | undefined;
}>;
export declare const wishlistItemUpdateSchema: z.ZodObject<{
    wishlistId: z.ZodOptional<z.ZodString>;
    productId: z.ZodOptional<z.ZodString>;
    variantId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    productId?: string | undefined;
    wishlistId?: string | undefined;
    variantId?: string | undefined;
    notes?: string | undefined;
}, {
    productId?: string | undefined;
    wishlistId?: string | undefined;
    variantId?: string | undefined;
    notes?: string | undefined;
}>;
export declare const couponCreateSchema: z.ZodObject<{
    code: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    discountType: z.ZodDefault<z.ZodEnum<["percentage", "fixed_amount", "free_shipping"]>>;
    discountValue: z.ZodNumber;
    minimumSpend: z.ZodOptional<z.ZodNumber>;
    maximumSpend: z.ZodOptional<z.ZodNumber>;
    individualUseOnly: z.ZodOptional<z.ZodBoolean>;
    excludeSaleItems: z.ZodOptional<z.ZodBoolean>;
    usageLimit: z.ZodOptional<z.ZodNumber>;
    usageLimitPerUser: z.ZodOptional<z.ZodNumber>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    code: string;
    discountType: "percentage" | "fixed_amount" | "free_shipping";
    discountValue: number;
    description?: string | undefined;
    isActive?: boolean | undefined;
    minimumSpend?: number | undefined;
    maximumSpend?: number | undefined;
    individualUseOnly?: boolean | undefined;
    excludeSaleItems?: boolean | undefined;
    usageLimit?: number | undefined;
    usageLimitPerUser?: number | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}, {
    code: string;
    discountValue: number;
    description?: string | undefined;
    isActive?: boolean | undefined;
    discountType?: "percentage" | "fixed_amount" | "free_shipping" | undefined;
    minimumSpend?: number | undefined;
    maximumSpend?: number | undefined;
    individualUseOnly?: boolean | undefined;
    excludeSaleItems?: boolean | undefined;
    usageLimit?: number | undefined;
    usageLimitPerUser?: number | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}>;
export declare const couponUpdateSchema: z.ZodObject<{
    code: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    discountType: z.ZodOptional<z.ZodDefault<z.ZodEnum<["percentage", "fixed_amount", "free_shipping"]>>>;
    discountValue: z.ZodOptional<z.ZodNumber>;
    minimumSpend: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    maximumSpend: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    individualUseOnly: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    excludeSaleItems: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    usageLimit: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    usageLimitPerUser: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    startDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    endDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    isActive: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    description?: string | undefined;
    isActive?: boolean | undefined;
    code?: string | undefined;
    discountType?: "percentage" | "fixed_amount" | "free_shipping" | undefined;
    discountValue?: number | undefined;
    minimumSpend?: number | undefined;
    maximumSpend?: number | undefined;
    individualUseOnly?: boolean | undefined;
    excludeSaleItems?: boolean | undefined;
    usageLimit?: number | undefined;
    usageLimitPerUser?: number | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}, {
    description?: string | undefined;
    isActive?: boolean | undefined;
    code?: string | undefined;
    discountType?: "percentage" | "fixed_amount" | "free_shipping" | undefined;
    discountValue?: number | undefined;
    minimumSpend?: number | undefined;
    maximumSpend?: number | undefined;
    individualUseOnly?: boolean | undefined;
    excludeSaleItems?: boolean | undefined;
    usageLimit?: number | undefined;
    usageLimitPerUser?: number | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}>;
export declare const orderCreateSchema: z.ZodObject<{
    orderNumber: z.ZodString;
    userId: z.ZodString;
    status: z.ZodDefault<z.ZodEnum<["pending", "processing", "shipped", "delivered", "cancelled", "refunded"]>>;
    shippingAddress: z.ZodObject<{
        fullName: z.ZodString;
        address: z.ZodString;
        city: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
        state: z.ZodOptional<z.ZodString>;
        phoneNumber: z.ZodOptional<z.ZodString>;
        isDefault: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    }, {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    }>;
    billingAddress: z.ZodObject<{
        fullName: z.ZodString;
        address: z.ZodString;
        city: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
        state: z.ZodOptional<z.ZodString>;
        phoneNumber: z.ZodOptional<z.ZodString>;
        isDefault: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    }, {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    }>;
    paymentMethod: z.ZodString;
    paymentStatus: z.ZodDefault<z.ZodEnum<["pending", "completed", "failed", "refunded", "partially_refunded"]>>;
    paymentResult: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        status: z.ZodString;
        update_time: z.ZodString;
        email_address: z.ZodString;
        provider: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        status: string;
        provider: string;
        update_time: string;
        email_address: string;
    }, {
        id: string;
        status: string;
        provider: string;
        update_time: string;
        email_address: string;
    }>>;
    couponCode: z.ZodOptional<z.ZodString>;
    itemsPrice: z.ZodNumber;
    discountAmount: z.ZodOptional<z.ZodNumber>;
    shippingPrice: z.ZodNumber;
    taxPrice: z.ZodNumber;
    totalPrice: z.ZodNumber;
    customerNotes: z.ZodOptional<z.ZodString>;
    adminNotes: z.ZodOptional<z.ZodString>;
    isPaid: z.ZodOptional<z.ZodBoolean>;
    paidAt: z.ZodOptional<z.ZodString>;
    isShipped: z.ZodOptional<z.ZodBoolean>;
    shippedAt: z.ZodOptional<z.ZodString>;
    isDelivered: z.ZodOptional<z.ZodBoolean>;
    deliveredAt: z.ZodOptional<z.ZodString>;
    trackingNumber: z.ZodOptional<z.ZodString>;
    shippingCarrier: z.ZodOptional<z.ZodString>;
    estimatedDeliveryDate: z.ZodOptional<z.ZodString>;
    refundStatus: z.ZodOptional<z.ZodString>;
    refundAmount: z.ZodOptional<z.ZodNumber>;
    ipAddress: z.ZodOptional<z.ZodString>;
    userAgent: z.ZodOptional<z.ZodString>;
    items: z.ZodArray<z.ZodObject<{
        productId: z.ZodString;
        variantId: z.ZodOptional<z.ZodString>;
        sku: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        image: z.ZodString;
        price: z.ZodNumber;
        discountedPrice: z.ZodOptional<z.ZodNumber>;
        qty: z.ZodNumber;
        attributes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        lineTotal: z.ZodNumber;
        taxAmount: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        image: string;
        slug: string;
        sku: string;
        productId: string;
        price: number;
        qty: number;
        lineTotal: number;
        attributes?: Record<string, string> | undefined;
        variantId?: string | undefined;
        discountedPrice?: number | undefined;
        taxAmount?: number | undefined;
    }, {
        name: string;
        image: string;
        slug: string;
        sku: string;
        productId: string;
        price: number;
        qty: number;
        lineTotal: number;
        attributes?: Record<string, string> | undefined;
        variantId?: string | undefined;
        discountedPrice?: number | undefined;
        taxAmount?: number | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    userId: string;
    orderNumber: string;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
    shippingAddress: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    };
    billingAddress: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    };
    paymentMethod: string;
    paymentStatus: "pending" | "refunded" | "completed" | "failed" | "partially_refunded";
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    items: {
        name: string;
        image: string;
        slug: string;
        sku: string;
        productId: string;
        price: number;
        qty: number;
        lineTotal: number;
        attributes?: Record<string, string> | undefined;
        variantId?: string | undefined;
        discountedPrice?: number | undefined;
        taxAmount?: number | undefined;
    }[];
    paymentResult?: {
        id: string;
        status: string;
        provider: string;
        update_time: string;
        email_address: string;
    } | undefined;
    couponCode?: string | undefined;
    discountAmount?: number | undefined;
    customerNotes?: string | undefined;
    adminNotes?: string | undefined;
    isPaid?: boolean | undefined;
    paidAt?: string | undefined;
    isShipped?: boolean | undefined;
    shippedAt?: string | undefined;
    isDelivered?: boolean | undefined;
    deliveredAt?: string | undefined;
    trackingNumber?: string | undefined;
    shippingCarrier?: string | undefined;
    estimatedDeliveryDate?: string | undefined;
    refundStatus?: string | undefined;
    refundAmount?: number | undefined;
    ipAddress?: string | undefined;
    userAgent?: string | undefined;
}, {
    userId: string;
    orderNumber: string;
    shippingAddress: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    };
    billingAddress: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    };
    paymentMethod: string;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    items: {
        name: string;
        image: string;
        slug: string;
        sku: string;
        productId: string;
        price: number;
        qty: number;
        lineTotal: number;
        attributes?: Record<string, string> | undefined;
        variantId?: string | undefined;
        discountedPrice?: number | undefined;
        taxAmount?: number | undefined;
    }[];
    status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded" | undefined;
    paymentStatus?: "pending" | "refunded" | "completed" | "failed" | "partially_refunded" | undefined;
    paymentResult?: {
        id: string;
        status: string;
        provider: string;
        update_time: string;
        email_address: string;
    } | undefined;
    couponCode?: string | undefined;
    discountAmount?: number | undefined;
    customerNotes?: string | undefined;
    adminNotes?: string | undefined;
    isPaid?: boolean | undefined;
    paidAt?: string | undefined;
    isShipped?: boolean | undefined;
    shippedAt?: string | undefined;
    isDelivered?: boolean | undefined;
    deliveredAt?: string | undefined;
    trackingNumber?: string | undefined;
    shippingCarrier?: string | undefined;
    estimatedDeliveryDate?: string | undefined;
    refundStatus?: string | undefined;
    refundAmount?: number | undefined;
    ipAddress?: string | undefined;
    userAgent?: string | undefined;
}>;
export declare const orderUpdateSchema: z.ZodObject<Omit<{
    orderNumber: z.ZodOptional<z.ZodString>;
    userId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["pending", "processing", "shipped", "delivered", "cancelled", "refunded"]>>>;
    shippingAddress: z.ZodOptional<z.ZodObject<{
        fullName: z.ZodString;
        address: z.ZodString;
        city: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
        state: z.ZodOptional<z.ZodString>;
        phoneNumber: z.ZodOptional<z.ZodString>;
        isDefault: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    }, {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    }>>;
    billingAddress: z.ZodOptional<z.ZodObject<{
        fullName: z.ZodString;
        address: z.ZodString;
        city: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
        state: z.ZodOptional<z.ZodString>;
        phoneNumber: z.ZodOptional<z.ZodString>;
        isDefault: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    }, {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    }>>;
    paymentMethod: z.ZodOptional<z.ZodString>;
    paymentStatus: z.ZodOptional<z.ZodDefault<z.ZodEnum<["pending", "completed", "failed", "refunded", "partially_refunded"]>>>;
    paymentResult: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        status: z.ZodString;
        update_time: z.ZodString;
        email_address: z.ZodString;
        provider: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        status: string;
        provider: string;
        update_time: string;
        email_address: string;
    }, {
        id: string;
        status: string;
        provider: string;
        update_time: string;
        email_address: string;
    }>>>;
    couponCode: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    itemsPrice: z.ZodOptional<z.ZodNumber>;
    discountAmount: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    shippingPrice: z.ZodOptional<z.ZodNumber>;
    taxPrice: z.ZodOptional<z.ZodNumber>;
    totalPrice: z.ZodOptional<z.ZodNumber>;
    customerNotes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    adminNotes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    isPaid: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    paidAt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    isShipped: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    shippedAt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    isDelivered: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    deliveredAt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    trackingNumber: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    shippingCarrier: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    estimatedDeliveryDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    refundStatus: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    refundAmount: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    ipAddress: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    userAgent: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    items: z.ZodOptional<z.ZodArray<z.ZodObject<{
        productId: z.ZodString;
        variantId: z.ZodOptional<z.ZodString>;
        sku: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        image: z.ZodString;
        price: z.ZodNumber;
        discountedPrice: z.ZodOptional<z.ZodNumber>;
        qty: z.ZodNumber;
        attributes: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        lineTotal: z.ZodNumber;
        taxAmount: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        image: string;
        slug: string;
        sku: string;
        productId: string;
        price: number;
        qty: number;
        lineTotal: number;
        attributes?: Record<string, string> | undefined;
        variantId?: string | undefined;
        discountedPrice?: number | undefined;
        taxAmount?: number | undefined;
    }, {
        name: string;
        image: string;
        slug: string;
        sku: string;
        productId: string;
        price: number;
        qty: number;
        lineTotal: number;
        attributes?: Record<string, string> | undefined;
        variantId?: string | undefined;
        discountedPrice?: number | undefined;
        taxAmount?: number | undefined;
    }>, "many">>;
}, "items">, "strip", z.ZodTypeAny, {
    userId?: string | undefined;
    orderNumber?: string | undefined;
    status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded" | undefined;
    shippingAddress?: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    } | undefined;
    billingAddress?: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    } | undefined;
    paymentMethod?: string | undefined;
    paymentStatus?: "pending" | "refunded" | "completed" | "failed" | "partially_refunded" | undefined;
    paymentResult?: {
        id: string;
        status: string;
        provider: string;
        update_time: string;
        email_address: string;
    } | undefined;
    couponCode?: string | undefined;
    itemsPrice?: number | undefined;
    discountAmount?: number | undefined;
    shippingPrice?: number | undefined;
    taxPrice?: number | undefined;
    totalPrice?: number | undefined;
    customerNotes?: string | undefined;
    adminNotes?: string | undefined;
    isPaid?: boolean | undefined;
    paidAt?: string | undefined;
    isShipped?: boolean | undefined;
    shippedAt?: string | undefined;
    isDelivered?: boolean | undefined;
    deliveredAt?: string | undefined;
    trackingNumber?: string | undefined;
    shippingCarrier?: string | undefined;
    estimatedDeliveryDate?: string | undefined;
    refundStatus?: string | undefined;
    refundAmount?: number | undefined;
    ipAddress?: string | undefined;
    userAgent?: string | undefined;
}, {
    userId?: string | undefined;
    orderNumber?: string | undefined;
    status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded" | undefined;
    shippingAddress?: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    } | undefined;
    billingAddress?: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    } | undefined;
    paymentMethod?: string | undefined;
    paymentStatus?: "pending" | "refunded" | "completed" | "failed" | "partially_refunded" | undefined;
    paymentResult?: {
        id: string;
        status: string;
        provider: string;
        update_time: string;
        email_address: string;
    } | undefined;
    couponCode?: string | undefined;
    itemsPrice?: number | undefined;
    discountAmount?: number | undefined;
    shippingPrice?: number | undefined;
    taxPrice?: number | undefined;
    totalPrice?: number | undefined;
    customerNotes?: string | undefined;
    adminNotes?: string | undefined;
    isPaid?: boolean | undefined;
    paidAt?: string | undefined;
    isShipped?: boolean | undefined;
    shippedAt?: string | undefined;
    isDelivered?: boolean | undefined;
    deliveredAt?: string | undefined;
    trackingNumber?: string | undefined;
    shippingCarrier?: string | undefined;
    estimatedDeliveryDate?: string | undefined;
    refundStatus?: string | undefined;
    refundAmount?: number | undefined;
    ipAddress?: string | undefined;
    userAgent?: string | undefined;
}>;
export declare const orderHistoryCreateSchema: z.ZodObject<{
    orderId: z.ZodString;
    status: z.ZodEnum<["pending", "processing", "shipped", "delivered", "cancelled", "refunded"]>;
    comment: z.ZodOptional<z.ZodString>;
    createdBy: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
    orderId: string;
    comment?: string | undefined;
    createdBy?: string | undefined;
}, {
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
    orderId: string;
    comment?: string | undefined;
    createdBy?: string | undefined;
}>;
export declare const validateUser: (data: unknown) => {
    email: string;
    name: string;
    password: string;
    role?: "admin" | "user" | "staff" | "vendor" | undefined;
    image?: string | undefined;
    phoneNumber?: string | undefined;
    bio?: string | undefined;
    preferences?: Record<string, unknown> | undefined;
    addresses?: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    }[] | undefined;
    defaultPaymentMethod?: string | undefined;
    marketingOptIn?: boolean | undefined;
};
export declare const validateUserUpdate: (data: unknown) => {
    email?: string | undefined;
    name?: string | undefined;
    role?: "admin" | "user" | "staff" | "vendor" | undefined;
    password?: string | undefined;
    image?: string | undefined;
    phoneNumber?: string | undefined;
    bio?: string | undefined;
    preferences?: Record<string, unknown> | undefined;
    addresses?: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    }[] | undefined;
    defaultPaymentMethod?: string | undefined;
    marketingOptIn?: boolean | undefined;
};
export declare const validateProduct: (data: unknown) => {
    name: string;
    slug: string;
    description: string;
    images: string[];
    basePrice: number;
    isFeatured?: boolean | undefined;
    metaTitle?: string | undefined;
    metaDescription?: string | undefined;
    brandId?: string | undefined;
    shortDescription?: string | undefined;
    salePrice?: number | undefined;
    sku?: string | undefined;
    barcode?: string | undefined;
    weight?: number | undefined;
    dimensions?: {
        length?: number | undefined;
        width?: number | undefined;
        height?: number | undefined;
    } | undefined;
    taxClass?: string | undefined;
    stockManagement?: boolean | undefined;
    stock?: number | undefined;
    lowStockThreshold?: number | undefined;
    soldIndividually?: boolean | undefined;
    backordersAllowed?: boolean | undefined;
    metaKeywords?: string | undefined;
    isActive?: boolean | undefined;
    hasVariants?: boolean | undefined;
    categories?: {
        categoryId: string;
        isPrimary?: boolean | undefined;
    }[] | undefined;
};
export declare const validateProductUpdate: (data: unknown) => {
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    isFeatured?: boolean | undefined;
    metaTitle?: string | undefined;
    metaDescription?: string | undefined;
    brandId?: string | undefined;
    shortDescription?: string | undefined;
    images?: string[] | undefined;
    basePrice?: number | undefined;
    salePrice?: number | undefined;
    sku?: string | undefined;
    barcode?: string | undefined;
    weight?: number | undefined;
    dimensions?: {
        length?: number | undefined;
        width?: number | undefined;
        height?: number | undefined;
    } | undefined;
    taxClass?: string | undefined;
    stockManagement?: boolean | undefined;
    stock?: number | undefined;
    lowStockThreshold?: number | undefined;
    soldIndividually?: boolean | undefined;
    backordersAllowed?: boolean | undefined;
    metaKeywords?: string | undefined;
    isActive?: boolean | undefined;
    hasVariants?: boolean | undefined;
    categories?: {
        categoryId: string;
        isPrimary?: boolean | undefined;
    }[] | undefined;
};
export declare const validateOrder: (data: unknown) => {
    userId: string;
    orderNumber: string;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
    shippingAddress: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    };
    billingAddress: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    };
    paymentMethod: string;
    paymentStatus: "pending" | "refunded" | "completed" | "failed" | "partially_refunded";
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
    items: {
        name: string;
        image: string;
        slug: string;
        sku: string;
        productId: string;
        price: number;
        qty: number;
        lineTotal: number;
        attributes?: Record<string, string> | undefined;
        variantId?: string | undefined;
        discountedPrice?: number | undefined;
        taxAmount?: number | undefined;
    }[];
    paymentResult?: {
        id: string;
        status: string;
        provider: string;
        update_time: string;
        email_address: string;
    } | undefined;
    couponCode?: string | undefined;
    discountAmount?: number | undefined;
    customerNotes?: string | undefined;
    adminNotes?: string | undefined;
    isPaid?: boolean | undefined;
    paidAt?: string | undefined;
    isShipped?: boolean | undefined;
    shippedAt?: string | undefined;
    isDelivered?: boolean | undefined;
    deliveredAt?: string | undefined;
    trackingNumber?: string | undefined;
    shippingCarrier?: string | undefined;
    estimatedDeliveryDate?: string | undefined;
    refundStatus?: string | undefined;
    refundAmount?: number | undefined;
    ipAddress?: string | undefined;
    userAgent?: string | undefined;
};
export declare const validateOrderUpdate: (data: unknown) => {
    userId?: string | undefined;
    orderNumber?: string | undefined;
    status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded" | undefined;
    shippingAddress?: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    } | undefined;
    billingAddress?: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    } | undefined;
    paymentMethod?: string | undefined;
    paymentStatus?: "pending" | "refunded" | "completed" | "failed" | "partially_refunded" | undefined;
    paymentResult?: {
        id: string;
        status: string;
        provider: string;
        update_time: string;
        email_address: string;
    } | undefined;
    couponCode?: string | undefined;
    itemsPrice?: number | undefined;
    discountAmount?: number | undefined;
    shippingPrice?: number | undefined;
    taxPrice?: number | undefined;
    totalPrice?: number | undefined;
    customerNotes?: string | undefined;
    adminNotes?: string | undefined;
    isPaid?: boolean | undefined;
    paidAt?: string | undefined;
    isShipped?: boolean | undefined;
    shippedAt?: string | undefined;
    isDelivered?: boolean | undefined;
    deliveredAt?: string | undefined;
    trackingNumber?: string | undefined;
    shippingCarrier?: string | undefined;
    estimatedDeliveryDate?: string | undefined;
    refundStatus?: string | undefined;
    refundAmount?: number | undefined;
    ipAddress?: string | undefined;
    userAgent?: string | undefined;
};
export declare const signupSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
}, {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
}>, {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
}, {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    rememberMe: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    rememberMe?: boolean | undefined;
}, {
    email: string;
    password: string;
    rememberMe?: boolean | undefined;
}>;
export declare const checkoutSchema: z.ZodEffects<z.ZodObject<{
    shippingAddress: z.ZodObject<{
        fullName: z.ZodString;
        address: z.ZodString;
        city: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
        state: z.ZodOptional<z.ZodString>;
        phoneNumber: z.ZodOptional<z.ZodString>;
        isDefault: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    }, {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    }>;
    billingAddressSameAsShipping: z.ZodBoolean;
    billingAddress: z.ZodOptional<z.ZodObject<{
        fullName: z.ZodString;
        address: z.ZodString;
        city: z.ZodString;
        postalCode: z.ZodString;
        country: z.ZodString;
        state: z.ZodOptional<z.ZodString>;
        phoneNumber: z.ZodOptional<z.ZodString>;
        isDefault: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    }, {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    }>>;
    paymentMethod: z.ZodString;
    savePaymentMethod: z.ZodOptional<z.ZodBoolean>;
    couponCode: z.ZodOptional<z.ZodString>;
    orderNotes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    shippingAddress: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    };
    paymentMethod: string;
    billingAddressSameAsShipping: boolean;
    billingAddress?: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    } | undefined;
    couponCode?: string | undefined;
    savePaymentMethod?: boolean | undefined;
    orderNotes?: string | undefined;
}, {
    shippingAddress: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    };
    paymentMethod: string;
    billingAddressSameAsShipping: boolean;
    billingAddress?: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    } | undefined;
    couponCode?: string | undefined;
    savePaymentMethod?: boolean | undefined;
    orderNotes?: string | undefined;
}>, {
    shippingAddress: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    };
    paymentMethod: string;
    billingAddressSameAsShipping: boolean;
    billingAddress?: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    } | undefined;
    couponCode?: string | undefined;
    savePaymentMethod?: boolean | undefined;
    orderNotes?: string | undefined;
}, {
    shippingAddress: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    };
    paymentMethod: string;
    billingAddressSameAsShipping: boolean;
    billingAddress?: {
        fullName: string;
        address: string;
        city: string;
        postalCode: string;
        country: string;
        phoneNumber?: string | undefined;
        isDefault?: boolean | undefined;
        state?: string | undefined;
    } | undefined;
    couponCode?: string | undefined;
    savePaymentMethod?: boolean | undefined;
    orderNotes?: string | undefined;
}>;
export declare const productSearchSchema: z.ZodObject<{
    query: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    brand: z.ZodOptional<z.ZodString>;
    minPrice: z.ZodOptional<z.ZodNumber>;
    maxPrice: z.ZodOptional<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodEnum<["price_asc", "price_desc", "newest", "popular", "rating"]>>;
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    inStock: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    page: number;
    brand?: string | undefined;
    query?: string | undefined;
    category?: string | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    sortBy?: "rating" | "price_asc" | "price_desc" | "newest" | "popular" | undefined;
    inStock?: boolean | undefined;
}, {
    brand?: string | undefined;
    query?: string | undefined;
    category?: string | undefined;
    limit?: number | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    sortBy?: "rating" | "price_asc" | "price_desc" | "newest" | "popular" | undefined;
    page?: number | undefined;
    inStock?: boolean | undefined;
}>;
