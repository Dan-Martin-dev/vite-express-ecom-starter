import { z } from 'zod';
import { orderStatusEnum, paymentStatusEnum, userRoleEnum } from '../types/index.js';

// Basic reusable schemas
const uuidSchema = z.string().uuid();
const slugSchema = z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const priceSchema = z.number().nonnegative().multipleOf(0.01);
const timestampSchema = z.string().datetime();
const positiveIntSchema = z.number().int().nonnegative();

// Address validation
export const shippingAddressSchema = z.object({
  fullName: z.string().min(2).max(100),
  address: z.string().min(5).max(200),
  city: z.string().min(2).max(100),
  postalCode: z.string().min(2).max(20),
  country: z.string().min(2).max(100),
  state: z.string().max(100).optional(),
  phoneNumber: z.string().max(20).optional(),
  isDefault: z.boolean().optional(),
});

// Payment result validation
export const paymentResultSchema = z.object({
  id: z.string().min(1),
  status: z.string().min(1),
  update_time: z.string().min(1),
  email_address: z.string().email(),
  provider: z.string().min(1),
});

// Cart item validation
export const cartItemSchema = z.object({
  productId: uuidSchema,
  name: z.string().min(1).max(255),
  slug: slugSchema,
  image: z.string().url(),
  price: priceSchema,
  qty: z.number().int().positive(),
  attributes: z.record(z.string()).optional(),
});

// User validations
export const userCreateSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  role: z.enum(['admin', 'user', 'staff', 'vendor']).optional(),
  password: z.string().min(8).max(100),
  phoneNumber: z.string().max(20).optional(),
  bio: z.string().max(500).optional(),
  preferences: z.record(z.unknown()).optional(),
  addresses: z.array(shippingAddressSchema).optional(),
  defaultPaymentMethod: z.string().optional(),
  marketingOptIn: z.boolean().optional(),
  image: z.string().url().optional(),
});

export const userUpdateSchema = userCreateSchema.partial().omit({ password: true }).extend({
  password: z.string().min(8).max(100).optional(),
});

// Account validations
export const accountSchema = z.object({
  userId: uuidSchema,
  type: z.enum(['oauth', 'email', 'credentials']),
  provider: z.string().min(1),
  providerAccountId: z.string().min(1),
  refresh_token: z.string().optional(),
  access_token: z.string().optional(),
  expires_at: z.number().int().optional(),
  token_type: z.string().optional(),
  scope: z.string().optional(),
  id_token: z.string().optional(),
  session_state: z.string().optional(),
});

// Session validations
export const sessionSchema = z.object({
  sessionToken: z.string().min(1),
  userId: uuidSchema,
  expires: z.string().datetime(),
  data: z.record(z.unknown()).optional(),
});

// Category validations
export const categoryCreateSchema = z.object({
  name: z.string().min(1).max(100),
  slug: slugSchema,
  description: z.string().max(500).optional(),
  image: z.string().url().optional(),
  icon: z.string().optional(),
  metaTitle: z.string().max(100).optional(),
  metaDescription: z.string().max(200).optional(),
  parentId: uuidSchema.optional(),
  displayOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

export const categoryUpdateSchema = categoryCreateSchema.partial();

// Brand validations
export const brandCreateSchema = z.object({
  name: z.string().min(1).max(100),
  slug: slugSchema,
  logo: z.string().url().optional(),
  description: z.string().max(500).optional(),
  website: z.string().url().optional(),
  isFeatured: z.boolean().optional(),
  metaTitle: z.string().max(100).optional(),
  metaDescription: z.string().max(200).optional(),
});

export const brandUpdateSchema = brandCreateSchema.partial();

// Product validations
export const dimensionsSchema = z.object({
  length: z.number().nonnegative().optional(),
  width: z.number().nonnegative().optional(),
  height: z.number().nonnegative().optional(),
});

export const productCreateSchema = z.object({
  name: z.string().min(1).max(255),
  slug: slugSchema,
  brandId: uuidSchema.optional(),
  description: z.string().min(1),
  shortDescription: z.string().max(500).optional(),
  images: z.array(z.string().url()).min(1),
  basePrice: priceSchema,
  salePrice: priceSchema.optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  weight: z.number().nonnegative().optional(),
  dimensions: dimensionsSchema.optional(),
  taxClass: z.string().optional(),
  stockManagement: z.boolean().optional(),
  stock: z.number().int().nonnegative().optional(),
  lowStockThreshold: z.number().int().nonnegative().optional(),
  soldIndividually: z.boolean().optional(),
  backordersAllowed: z.boolean().optional(),
  metaTitle: z.string().max(100).optional(),
  metaDescription: z.string().max(200).optional(),
  metaKeywords: z.string().max(200).optional(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  hasVariants: z.boolean().optional(),
  categories: z.array(z.object({
    categoryId: uuidSchema,
    isPrimary: z.boolean().optional(),
  })).optional(),
});

export const productUpdateSchema = productCreateSchema.partial();

// Attribute validations
export const attributeCreateSchema = z.object({
  name: z.string().min(1).max(100),
  slug: slugSchema,
  description: z.string().max(500).optional(),
  type: z.string().default('select'),
  sortOrder: z.number().int().optional(),
});

export const attributeUpdateSchema = attributeCreateSchema.partial();

// Attribute value validations
export const attributeValueCreateSchema = z.object({
  attributeId: uuidSchema,
  value: z.string().min(1),
  label: z.string().min(1),
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).optional(),
  image: z.string().url().optional(),
  sortOrder: z.number().int().optional(),
});

export const attributeValueUpdateSchema = attributeValueCreateSchema.partial();

// Product variant validations
export const productVariantCreateSchema = z.object({
  productId: uuidSchema,
  sku: z.string().optional(),
  barcode: z.string().optional(),
  price: priceSchema.optional(),
  salePrice: priceSchema.optional(),
  stock: z.number().int().nonnegative().optional(),
  weight: z.number().nonnegative().optional(),
  dimensions: dimensionsSchema.optional(),
  image: z.string().url().optional(),
  isDefault: z.boolean().optional(),
  attributes: z.record(z.string(), z.string()).refine(
    (val) => Object.keys(val).length >= 1,
    { message: "At least one attribute is required" }
  ),
});

export const productVariantUpdateSchema = productVariantCreateSchema.partial();

// Review validations
export const reviewCreateSchema = z.object({
  userId: uuidSchema,
  productId: uuidSchema,
  orderId: uuidSchema.optional(),
  rating: z.number().min(1).max(5),
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  pros: z.string().optional(),
  cons: z.string().optional(),
  mediaUrls: z.array(z.string().url()).optional(),
});

export const reviewUpdateSchema = reviewCreateSchema.partial().omit({ userId: true, productId: true });

// Cart validations
export const cartCreateSchema = z.object({
  userId: uuidSchema.optional(),
  sessionId: z.string().min(1),
  items: z.array(cartItemSchema).default([]),
  couponCode: z.string().optional(),
  itemsPrice: priceSchema,
  discountAmount: priceSchema.optional(),
  shippingPrice: priceSchema.optional(),
  taxPrice: priceSchema.optional(),
  totalPrice: priceSchema,
  notes: z.string().optional(),
  shippingMethod: z.string().optional(),
});

export const cartUpdateSchema = cartCreateSchema.partial();

// Wishlist validations
export const wishlistCreateSchema = z.object({
  userId: uuidSchema,
  name: z.string().min(1).max(100),
  isPublic: z.boolean().optional(),
});

export const wishlistUpdateSchema = wishlistCreateSchema.partial();

// Wishlist item validations
export const wishlistItemCreateSchema = z.object({
  wishlistId: uuidSchema,
  productId: uuidSchema,
  variantId: uuidSchema.optional(),
  notes: z.string().optional(),
});

export const wishlistItemUpdateSchema = wishlistItemCreateSchema.partial();

// Coupon validations
export const couponCreateSchema = z.object({
  code: z.string().min(3).max(50),
  description: z.string().optional(),
  discountType: z.enum(['percentage', 'fixed_amount', 'free_shipping']).default('percentage'),
  discountValue: priceSchema,
  minimumSpend: priceSchema.optional(),
  maximumSpend: priceSchema.optional(),
  individualUseOnly: z.boolean().optional(),
  excludeSaleItems: z.boolean().optional(),
  usageLimit: z.number().int().nonnegative().optional(),
  usageLimitPerUser: z.number().int().nonnegative().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  isActive: z.boolean().optional(),
});

export const couponUpdateSchema = couponCreateSchema.partial();

// Order validations
export const orderCreateSchema = z.object({
  orderNumber: z.string().min(1),
  userId: uuidSchema,
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']).default('pending'),
  shippingAddress: shippingAddressSchema,
  billingAddress: shippingAddressSchema,
  paymentMethod: z.string().min(1),
  paymentStatus: z.enum(['pending', 'completed', 'failed', 'refunded', 'partially_refunded']).default('pending'),
  paymentResult: paymentResultSchema.optional(),
  couponCode: z.string().optional(),
  itemsPrice: priceSchema,
  discountAmount: priceSchema.optional(),
  shippingPrice: priceSchema,
  taxPrice: priceSchema,
  totalPrice: priceSchema,
  customerNotes: z.string().optional(),
  adminNotes: z.string().optional(),
  isPaid: z.boolean().optional(),
  paidAt: z.string().datetime().optional(),
  isShipped: z.boolean().optional(),
  shippedAt: z.string().datetime().optional(),
  isDelivered: z.boolean().optional(),
  deliveredAt: z.string().datetime().optional(),
  trackingNumber: z.string().optional(),
  shippingCarrier: z.string().optional(),
  estimatedDeliveryDate: z.string().datetime().optional(),
  refundStatus: z.string().optional(),
  refundAmount: priceSchema.optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  items: z.array(z.object({
    productId: uuidSchema,
    variantId: uuidSchema.optional(),
    sku: z.string().min(1),
    name: z.string().min(1),
    slug: slugSchema,
    image: z.string().url(),
    price: priceSchema,
    discountedPrice: priceSchema.optional(),
    qty: z.number().int().positive(),
    attributes: z.record(z.string()).optional(),
    lineTotal: priceSchema,
    taxAmount: priceSchema.optional(),
  })).min(1),
});

export const orderUpdateSchema = orderCreateSchema.partial().omit({ items: true });

// Order history validation
export const orderHistoryCreateSchema = z.object({
  orderId: uuidSchema,
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']),
  comment: z.string().optional(),
  createdBy: uuidSchema.optional(),
});

// Validation functions for API requests
export const validateUser = (data: unknown) => userCreateSchema.parse(data);
export const validateUserUpdate = (data: unknown) => userUpdateSchema.parse(data);
export const validateProduct = (data: unknown) => productCreateSchema.parse(data);
export const validateProductUpdate = (data: unknown) => productUpdateSchema.parse(data);
export const validateOrder = (data: unknown) => orderCreateSchema.parse(data);
export const validateOrderUpdate = (data: unknown) => orderUpdateSchema.parse(data);

// Refined validations for specific use cases
export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name cannot exceed 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/[0-9]/, "Password must include at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must include at least one special character"),
  confirmPassword: z.string()
}).refine((data: { password: any; confirmPassword: any; }) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export const checkoutSchema = z.object({
  shippingAddress: shippingAddressSchema,
  billingAddressSameAsShipping: z.boolean(),
  billingAddress: shippingAddressSchema.optional(),
  paymentMethod: z.string().min(1, "Payment method is required"),
  savePaymentMethod: z.boolean().optional(),
  couponCode: z.string().optional(),
  orderNotes: z.string().optional(),
}).refine(
  (data) => data.billingAddressSameAsShipping || data.billingAddress !== undefined,
  {
    message: "Billing address is required when different from shipping address",
    path: ["billingAddress"],
  }
);


export const productSearchSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  minPrice: z.number().nonnegative().optional(),
  maxPrice: z.number().nonnegative().optional(),
  sortBy: z.enum(['price_asc', 'price_desc', 'newest', 'popular', 'rating']).optional(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  inStock: z.boolean().optional(),
});