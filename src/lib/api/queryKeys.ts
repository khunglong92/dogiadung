// Centralized query keys to avoid typos and enable refactors.
// Usage: queryKey: [QUERY_KEYS.products.root]

export const QUERY_KEYS = {
  products: {
    root: "products" as const,
    byId: (id: number | string) => ["product", id] as const,
    byCategory: (category: string) => ["products", "category", category] as const,
  },
  categories: {
    root: "categories" as const,
    byId: (id: number | string) => ["category", id] as const,
  },
  auth: {
    profile: ["auth", "profile"] as const,
  },
} as const;

export type QueryKey = ReadonlyArray<unknown>;

