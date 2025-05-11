// apps/server/src/api/v1/orders/orders.service.ts

import { OrderRepository, orderRepository } from "./orders.repository.js";
import {
    DBOrder,
    NewOrder,
    NewOrderItem,
    OrderWithItems,
    CreateOrderInput,
    GetUserOrdersInput,
    GetOrderByIdInput
} from "./orders.types.js";
import { AppError, NotFoundError } from "@/lib/errors/index.js"; // Import errors
import { db } from '@/db/index.js'; // Import db for transaction
import { cartService, CartService } from '@/api/v1/cart/cart.service.js';
import { ProductService } from '@/api/v1/products/products.service.js';
import { z } from 'zod';
import { CreateOrderInputSchema, GetUserOrdersInputSchema, GetOrderByIdInputSchema } from "./orders.validators.js";

// Import Drizzle types if needed for transaction
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { schema } from '@/db/index.js';
type DBSchema = typeof schema;
type DBClient = PostgresJsDatabase<DBSchema>;

type NewOrderItemWithoutOrderId = Omit<NewOrderItem, 'orderId'>;

export class OrderService {
    constructor(
        // Inject dependencies
        private orderRepository: OrderRepository,
        private cartService: CartService,
        private productService: ProductService
    ) {}

    /**
     * Creates a new order based on the user's cart and input data.
     * Handles transaction, stock update, and cart clearing.
     * @param userId The ID of the user placing the order.
     * @param input Validated input data (address, payment method).
     * @returns The newly created order with its items.
     */
    
    async createOrder(userId: string, input: z.infer<typeof CreateOrderInputSchema>): Promise<OrderWithItems> { 
        // 1. Get User's Cart
        // Assuming session management ensures sessionId is available if no userId, but orders require userId
        const cart = await this.cartService.getOrCreateCartForUserOrSession(userId, undefined); // Pass undefined sessionId as we must have userId
        if (!cart || !cart.items || cart.items.length === 0) {
            throw new AppError("Cannot create order from an empty cart.", 400);
        }

        // 2. Verify Product Details & Stock (CRITICAL)
        let itemsPrice = 0;
        const orderItemsData: NewOrderItemWithoutOrderId[] = []; // Use the type without orderId

    
        const stockUpdates: { productId: string; variantId?: string | null; quantity: number }[] = [];

        for (const cartItem of cart.items) {

            const { product, variant } = await this.productService.getProductDetailsForCart(
                cartItem.productId,
                cartItem.variantId
            ); // Throws NotFoundError if product/variant inactive/missing

            // Determine price (use variant price if available, otherwise product price)
            // IMPORTANT: Use the prices fetched *now*, not the snapshot price from the cart item for order creation.
            // The CartItem snapshot is for display in the cart, the OrderItem snapshot uses the price at time of purchase.
            const currentPrice = variant?.salePrice ?? variant?.price ?? product.salePrice ?? product.basePrice;
             if (currentPrice === null || currentPrice === undefined) {
                 throw new AppError(`Could not determine price for product ${product.name}.`, 500);
             }
             const priceAsNumber = parseFloat(currentPrice); // Convert decimal string to number

            // Check Stock (Requires ProductService to have stock info)
            const stockToCheck = variant?.stock ?? product.stock;
             // Assuming stockManagement flag is on product
            if (product.stockManagement && (stockToCheck === null || stockToCheck < cartItem.quantity)) {
                throw new AppError(`Insufficient stock for ${product.name} ${variant ? '(variant)' : ''}. Required: ${cartItem.quantity}, Available: ${stockToCheck ?? 0}`, 400);
            }

            const skuValue = variant?.sku ?? product.sku; 
            if (skuValue === null || skuValue === undefined) {
                // Decide how to handle missing SKU - throw error or use a placeholder?
                // Throwing is safer if SKU is truly required by your logic/schema.
                 // Ensure AppError is imported in this file
                throw new AppError(`Could not determine SKU for product ${product.name}. SKU is required for order items.`);
            }

            // --- FIX 2: Determine and declare slugValue ---
            let slugValue = (variant?.slug ?? product.slug); // Keep the nullish coalescing

            if (slugValue === null || slugValue === undefined) {
                 throw new AppError(`Could not determine slug for product ${product.name}. Slug is required for order items.`);
            }
            const finalSlug: string = slugValue as string;

            const lineTotalValue = (priceAsNumber * cartItem.quantity).toFixed(2);

            orderItemsData.push({
                productId: product.id,
                variantId: variant?.id ?? null,
                name: product.name,
                sku: skuValue,
                slug: slugValue,
                image: variant?.image ?? product.images?.[0] ?? null,
                price: currentPrice,
                qty: cartItem.quantity, // Corrected property name
                lineTotal: lineTotalValue,
                attributes: cartItem.attributes,
            });

            // Accumulate item price total
            itemsPrice += priceAsNumber * cartItem.quantity;

            // Prepare stock update info (if stock management is enabled)
            if (product.stockManagement) {
                stockUpdates.push({
                    productId: product.id,
                    variantId: variant?.id ?? null,
                    quantity: cartItem.quantity, // Quantity to decrease
                });
            }
        }

        // 3. Calculate Final Totals (Consider using cart totals as a base or recalculating)
        // Example: Recalculate based on verified prices, apply cart discount/shipping/tax
         const subTotal = itemsPrice; // Price of items based on current fetch
         const discount = parseFloat(cart.discountAmount || '0'); // Use discount from cart
         const shipping = parseFloat(cart.shippingPrice || '0'); // Use shipping from cart
         const tax = parseFloat(cart.taxPrice || '0'); // Use tax from cart
         const finalTotal = (subTotal - discount + shipping + tax);


        // 4. Create Order within a Transaction
        try {
             const createdOrder = await db.transaction(async (tx) => {
                // a. Create the Order Record
                const orderData: NewOrder = {
                    userId: userId,
                    itemsPrice: subTotal.toFixed(2),
                    shippingPrice: shipping.toFixed(2),
                    taxPrice: tax.toFixed(2),
                    discountAmount: discount.toFixed(2),
                    totalPrice: finalTotal.toFixed(2),
                    shippingAddress: input.shippingAddress as ShippingAddress,
                    billingAddress: input.billingAddress as ShippingAddress,
                    paymentMethod: input.paymentMethod,
                    status: 'pending',
                    paymentStatus: 'pending',
                    orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`, 
                    ipAddress: null, 
                    userAgent: null, 
                    customerNotes: (input as any).customerNotes || null, 
                    adminNotes: null,
                    couponCode: null, 
                    isPaid: false, 
                    paidAt: null,
                    isShipped: false,
                    shippedAt: null,
                    isDelivered: false,
                    deliveredAt: null,
                    trackingNumber: null,
                    shippingCarrier: null,
                    estimatedDeliveryDate: null,
                    refundStatus: null,
                    refundAmount: null,
                    paymentResult: null, // Nullable in schema
                };
                 const newDbOrder = await this.orderRepository.createOrder(orderData, tx as DBClient);

                 // b. Create Order Items Records
                 const itemsWithOrderId = orderItemsData.map(item => ({
                     ...item,
                     orderId: newDbOrder.id, // Assign the new order ID
                 }));
                 await this.orderRepository.createOrderItems(itemsWithOrderId, tx as DBClient);

                 // c. Update Stock Levels (CRITICAL)
                 // Requires ProductService/Repository to have a method like decreaseStock
                 for (const update of stockUpdates) {
                    // await this.productService.decreaseStock(update.productId, update.variantId, update.quantity, tx);
                    console.warn(`Stock update needed for product: ${update.productId}, variant: ${update.variantId}, quantity: ${update.quantity}. Implement decreaseStock method.`);
                 }

                 // d. Clear the User's Cart (use the cart ID fetched earlier)
                 await this.cartService.clearCart(cart.id); // Assuming clearCart uses ID and doesn't need tx

                 // e. TODO: Handle Payment Processing (e.g., call PaymentService)
                 // If payment fails, the transaction should ideally rollback.
                 // This might involve updating paymentStatus and paymentResult here.
                 // await this.paymentService.processPayment(newDbOrder.id, input.paymentToken);


                 return newDbOrder; // Return the created order from the transaction
             });

             // 5. Fetch the created order with items for the response
             const finalOrder = await this.orderRepository.findOrderById(createdOrder.id);
             if (!finalOrder) {
                 // Should not happen if transaction succeeded
                 throw new AppError("Failed to retrieve created order.", 500);
             }
             return finalOrder;

        } catch (error) {
             console.error("Order creation failed:", error);
             // Handle specific errors (e.g., stock errors caught earlier, payment errors)
             if (error instanceof AppError) {
                 throw error; // Re-throw known AppErrors
             }
             throw new AppError("Failed to create order due to an unexpected error.", 500);
        }
    }

    /**
     * Retrieves a single order by its ID for a specific user.
     * @param userId The ID of the user requesting the order.
     * @param orderId The ID of the order to retrieve.
     * @returns The order with its items.
     * @throws NotFoundError if the order is not found or doesn't belong to the user.
     */
    async getOrderById(userId: string, orderId: string): Promise<OrderWithItems> {
        const order = await this.orderRepository.findOrderById(orderId);

        if (!order) {
            throw new NotFoundError(`Order with ID ${orderId} not found.`);
        }

        // Authorization check: Ensure the order belongs to the requesting user
        if (order.userId !== userId) {
             // In a real app, admins might bypass this check based on roles
            throw new AppError("You are not authorized to view this order.", 403); // Forbidden
        }

        return order;
    }

    /**
     * Retrieves a list of orders for a specific user.
     * @param userId The ID of the user whose orders to retrieve.
     * @param input Pagination, filtering, and sorting parameters (validated).
     * @returns An object containing the list of orders and the total count.
     */
    async getUserOrders(userId: string, input: z.infer<typeof GetUserOrdersInputSchema>): Promise<{ orders: OrderWithItems[]; total: number }> {
        // Repository handles filtering by userId and other params
        const result = await this.orderRepository.findOrdersByUserId(userId, input);
        return result;
    }

    // TODO: Add methods for updating order status (admin), handling payment callbacks, etc.
}

// --- FINAL INSTANTIATION ---
// Import instances of dependencies
import { productServiceInstance } from '@/api/v1/products/products.service.js'; // Assuming named export
import { ShippingAddress } from "@/types/index.js";

// Create an instance of the OrderService, injecting dependencies
const orderServiceInstance = new OrderService(
    orderRepository,
    cartService, // Pass CartService instance
    productServiceInstance // Pass ProductService instance
);

// Export the service instance
export { orderServiceInstance };