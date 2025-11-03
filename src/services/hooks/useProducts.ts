import { useQuery } from '@tanstack/react-query';
import { productsService } from '../api/productsService';
import { QUERY_KEYS } from '@/lib/api/queryKeys';

export const useProducts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.products.root],
    queryFn: () => productsService.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.products.byId(id),
    queryFn: () => productsService.getById(id),
    enabled: !!id,
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.products.byCategory(category),
    queryFn: () => productsService.getByCategory(category),
    enabled: !!category,
  });
};
