import { productsService } from "@/services/api/productsService";
import { useQuery } from "@tanstack/react-query";

export function useProductsByCategory(categoryId?: number) {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", { categoryId }],
    queryFn: () => productsService.findAll({ categoryId, limit: 100 }), // Fetch up to 100 products per category
    select: (data) => data.data,
    enabled: !!categoryId, // Only run the query if categoryId is provided
  });

  return { products, isLoading };
}
