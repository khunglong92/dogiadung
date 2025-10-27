import { useQuery } from '@tanstack/react-query';
import { productsService } from '../api/productsService';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productsService.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productsService.getById(id),
    enabled: !!id,
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => productsService.getByCategory(category),
    enabled: !!category,
  });
};
