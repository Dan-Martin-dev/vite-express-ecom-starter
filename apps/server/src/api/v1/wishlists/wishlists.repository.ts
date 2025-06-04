// apps/server/src/api/v1/wishlists/wishlists.repository.ts

import { db, schema } from "@/db/index.js"; // Import db instance and schema
import { eq } from "drizzle-orm";
import {
/*   WishlistWithItems,
  WishlistItemWithDetails,
  NewWishlist, */
  NewWishlistItem,
  WishlistWithItemsQueryResult,
  DBWishlist,
  DBWishlistItem,
  ActualDBClient,
  TransactionClient,
} from "./wishlists.types.js"; // Import types
import {
  eq as drizzleEq,
  and as drizzleAnd,
  isNull as drizzleIsNull,
  or as drizzleOr,
} from "drizzle-orm";

/* const wishlistWithItemsQuery = db.query.wishlists.findFirst({
  where: (wishlists, { eq }) => eq(wishlists.userId, "__USER_ID__"), 
  with: {
    items: {
      with: {
        product: true, 
        variant: true,
      },
    },
  },
});
 */
// Infer the return type of the query

export class WishlistRepository {
  constructor(private db: ActualDBClient) {}
  /**
   * Finds a user's wishlist, optionally including items with product/variant details.
   * @param userId The ID of the user.
   * @returns The user's wishlist or undefined if not found.
   */

  async findWishlistByUserId(
    userId: string,
    tx?: TransactionClient
  ): Promise<WishlistWithItemsQueryResult | undefined> {
    const client = tx ?? this.db;
    return client.query.wishlists.findFirst({
      where: (wishlists, { eq }: { eq: typeof drizzleEq }) => eq(wishlists.userId, userId),
      with: { 
        items: {
          with: {
            product: true,
            variant: true,
          },
        },
      },
    });
  }

  /**
   * Finds a specific wishlist item for a user.
   * @param userId The ID of the user.
   * @param productId The ID of the product.
   * @param variantId The ID of the variant (optional).
   * @returns The wishlist item or undefined if not found.
   */
  async findWishlistItemByProductAndVariant(
    userId: string,
    productId: string,
    variantId: string | null,
    tx?: TransactionClient
  ): Promise<DBWishlistItem | undefined> {
    const client = tx ?? this.db;
    
    return client.query.wishlistItems
      .findFirst({
        where: (
          // FIX 1: Eliminar la anotación de tipo explícita para 'wishlistItems'.
          wishlistItems, 
          {
            eq, 
            and,
            // or, // 'or' no se está usando, se puede quitar de la desestructuración.
            isNull,
          }: {
            eq: typeof drizzleEq;
            and: typeof drizzleAnd;
            or: typeof drizzleOr; // Mantener en el tipo por si se usa después.
            isNull: typeof drizzleIsNull;
          }
        ) =>
          and(
            eq(wishlistItems.productId, productId),
            variantId === null
              ? isNull(wishlistItems.variantId)
              : eq(wishlistItems.variantId, variantId!), 
            drizzleEq(schema.wishlists.userId, userId) 
          ),
        with: {
          wishlist: { 
            columns: {
              id: true,
              userId: true, 
            },
          },
        },
      })
      .then((itemWithWishlistRelation) => { // Renombrado para claridad
        // FIX 3: Corregir el objeto retornado.
        if (!itemWithWishlistRelation) {
          return undefined;
        }

        // El resultado de `client.query.wishlistItems.findFirst` con `with`
        // será un objeto que tiene los campos de `wishlistItems` directamente
        // y un campo anidado `wishlist` con las columnas seleccionadas de la tabla wishlists.
        // Por ejemplo:
        // itemWithWishlistRelation.id (de wishlistItems)
        // itemWithWishlistRelation.productId (de wishlistItems)
        // itemWithWishlistRelation.addedAt (de wishlistItems, si existe)
        // itemWithWishlistRelation.notes (de wishlistItems, si existe)
        // itemWithWishlistRelation.wishlist.id (de wishlists)
        // itemWithWishlistRelation.wishlist.userId (de wishlists)

        // DBWishlistItem se infiere de `schema.wishlistItems`.
        // El error anterior "Property 'createdAt' does not exist on type '{ ... addedAt: Date; notes: string | null; }'"
        // sugiere que `itemWithWishlistRelation` (los campos del item) tiene `addedAt` y `notes`.
        // Por lo tanto, el objeto que devuelves debe usar esos campos.
        
        // Debes verificar qué campos exactos tiene tu tabla `wishlist_items` y
        // cuáles se esperan en el tipo `DBWishlistItem`.
        // Asumimos que `DBWishlistItem` incluye: id, wishlistId, productId, variantId, addedAt, notes.
        return {
          id: itemWithWishlistRelation.id,
          wishlistId: itemWithWishlistRelation.wishlistId,
          productId: itemWithWishlistRelation.productId,
          variantId: itemWithWishlistRelation.variantId,
          
          // --- IMPORTANTE: Verifica estos campos contra tu schema.wishlistItems ---
          // Si tu tabla wishlist_items tiene 'added_at' (snake_case) Drizzle lo mapeará a 'addedAt' (camelCase) por defecto.
          // Lo mismo para 'notes'.
          addedAt: itemWithWishlistRelation.addedAt, // Asumiendo que 'addedAt' existe en itemWithWishlistRelation y es esperado por DBWishlistItem
          notes: itemWithWishlistRelation.notes,     // Asumiendo que 'notes' existe y es esperado
          // --- Fin de la sección importante ---

          // NO uses itemWithWishlistRelation.createdAt a menos que estés seguro de que existe
          // y que DBWishlistItem espera un campo 'createdAt'.
        };
      });
  }

  /**
   * Creates a new wishlist for a user.
   * @param userId The ID of the user.
   * @param tx Transaction client (optional).
   * @returns The newly created wishlist.
   */
  async createWishlist(
    userId: string,
    tx?: TransactionClient
  ): Promise<DBWishlist> {
    const client = tx ?? this.db;
    const [newWishlist] = await client
      .insert(schema.wishlists)
      .values({ userId: userId })
      .returning(); // Return the newly created wishlist
    if (!newWishlist) {
      throw new Error("Failed to create new wishlist."); // Should not happen with returning()
    }
    return newWishlist;
  }

  /**
   * Adds an item to a wishlist.
   * @param wishlistId The ID of the wishlist.
   * @param item The item data to insert (without wishlistId).
   * @param tx Transaction client (optional).
   * @returns The newly created wishlist item.
   */
  async addWishlistItem(
    wishlistId: string,
    item: Omit<NewWishlistItem, "wishlistId">,
    tx?: TransactionClient
  ): Promise<DBWishlistItem> {
    const client = tx ?? this.db;
    const [newWishlistItem] = await client
      .insert(schema.wishlistItems)
      .values({ ...item, wishlistId: wishlistId })
      .returning();
    if (!newWishlistItem) {
      throw new Error("Failed to add item to wishlist."); // Should not happen
    }
    return newWishlistItem;
  }

  /**
   * Removes a specific item from the wishlist by its ID.
   * @param wishlistItemId The ID of the wishlist item to remove.
   * @param tx Transaction client (optional).
   * @returns The removed item or undefined if not found.
   */
  async removeWishlistItemById(
    wishlistItemId: string,
    tx?: TransactionClient
  ): Promise<DBWishlistItem | undefined> {
    const client = tx ?? this.db;
    const [removedItem] = await client
      .delete(schema.wishlistItems)
      .where(eq(schema.wishlistItems.id, wishlistItemId))
      .returning();
    return removedItem;
  }

  /**
   * Removes an item from the wishlist by product and variant ID.
   * Requires finding the item first based on the user's wishlist.
   * @param userId The ID of the user.
   * @param productId The ID of the product.
   * @param variantId The ID of the variant (optional).
   * @param tx Transaction client (optional).
   * @returns The removed item or undefined if not found.
   */
  async removeWishlistItemByProductAndVariant(
    userId: string,
    productId: string,
    variantId: string | null,
    tx?: TransactionClient
  ): Promise<DBWishlistItem | undefined> {
    const client = tx ?? this.db;

    // Find the item first using the user's wishlist ID implicitly via join
    const itemToRemove = await client.query.wishlistItems.findFirst({
      where: (wishlistItems, { eq, and, isNull }) =>
        and(
          eq(wishlistItems.productId, productId),
          variantId === null
            ? isNull(wishlistItems.variantId)
            : eq(wishlistItems.variantId, variantId!),
          eq(schema.wishlists.userId, userId) // Ensure item is in the user's wishlist
        ),
      with: {
        // Join to the wishlist table to filter by user ID
        wishlist: {
          columns: {
            id: true,
            userId: true,
          },
        },
      },
    });

    if (!itemToRemove) {
      return undefined; // Item not found in user's wishlist
    }

    // Now delete the item using its ID
    const [removedItem] = await client
      .delete(schema.wishlistItems)
      .where(eq(schema.wishlistItems.id, itemToRemove.id))
      .returning();

    return removedItem; // Should return the item that was just deleted
  }

  /**
   * Clears all items from a specific wishlist.
   * @param wishlistId The ID of the wishlist.
   * @param tx Transaction client (optional).
   * @returns The number of items deleted (Drizzle might return an array).
   */
  async clearWishlistItems(
    wishlistId: string,
    tx?: TransactionClient
  ): Promise<DBWishlistItem[]> {
    // Drizzle delete returning might return an array
    const client = tx ?? this.db;
    // This deletes items related to the wishlistId
    // Drizzle's delete().returning() returns the deleted rows.
    return client
      .delete(schema.wishlistItems)
      .where(eq(schema.wishlistItems.wishlistId, wishlistId))
      .returning(); // Return deleted items
  }
}

// --- FINAL INSTANTIATION ---
// Create an instance of the WishlistRepository, injecting the db client
const wishlistRepositoryInstance = new WishlistRepository(db);

// Export the repository instance
export { wishlistRepositoryInstance };
