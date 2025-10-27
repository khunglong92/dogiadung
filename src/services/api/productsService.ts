import { apiClient } from './base';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  description?: string;
  inStock?: boolean;
}

export const productsService = {
  getAll: async (): Promise<Product[]> => {
    // Mock implementation
    return [
      {
        id: 1,
        name: 'Bàn ăn gỗ hiện đại',
        price: 8500000,
        originalPrice: 12000000,
        image: 'https://images.unsplash.com/photo-1722084059243-b0ec46398446',
        category: 'Bàn',
        isNew: false,
      },
      {
        id: 2,
        name: 'Ghế gỗ sang trọng',
        price: 2500000,
        image: 'https://images.unsplash.com/photo-1761052180945-9fcefc9a07d5',
        category: 'Ghế',
        isNew: true,
      },
    ];
  },

  getById: async (id: number): Promise<Product | null> => {
    const products = await productsService.getAll();
    return products.find(p => p.id === id) || null;
  },

  getByCategory: async (category: string): Promise<Product[]> => {
    const products = await productsService.getAll();
    return products.filter(p => p.category === category);
  },
};
