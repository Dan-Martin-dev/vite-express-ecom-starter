      
// apps/server/src/api/v1/products/products.utils.ts

// import { ProductWithDetails, ProductVariantWithDetails } from './products.types.js';

// Utility functions for products can go here if needed.
// Examples:
// - Formatting prices (though Drizzle gives strings, might need currency formatting)
// - Simple data transformations not handled in the repository processing
// - Stock availability checks (if not done in the service/stock module)


/**
 * Example: Check if a product (or variant) is currently in stock for a given quantity.
 * This could also live in a dedicated Stock service or in the ProductService.
 * @param product The product data.
 * @param variant The variant data (optional).
 * @param quantity The quantity to check.
 * @returns True if stock is sufficient, false otherwise.
 */
/*
export function isStockSufficient(product: { stockManagement: boolean; stock: number; }, variant: { stock: number; } | undefined, quantity: number): boolean {
    if (!product.stockManagement) {
        return true; // Stock not managed
    }
    const availableStock = variant?.stock ?? product.stock;
    return availableStock >= quantity;
}
*/

// Export any utility functions here
// export { isStockSufficient };

export {}; // Empty export if no utilities yet

    