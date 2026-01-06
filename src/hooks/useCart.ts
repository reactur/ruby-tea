import { useState, useEffect } from 'react';
import type { OrderItem, Product } from '../lib/supabase';

export function useCart() {
  const [items, setItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('goyard_cart');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  const addItem = (product: Product, quantity: number) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      const updated = existing
        ? prev.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...prev, {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity
          }];
      localStorage.setItem('goyard_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const removeItem = (productId: string) => {
    setItems(prev => {
      const updated = prev.filter(item => item.id !== productId);
      localStorage.setItem('goyard_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems(prev => {
      const updated = quantity <= 0
        ? prev.filter(item => item.id !== productId)
        : prev.map(item =>
            item.id === productId ? { ...item, quantity } : item
          );
      localStorage.setItem('goyard_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const clear = () => {
    setItems([]);
    localStorage.removeItem('goyard_cart');
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return { items, addItem, removeItem, updateQuantity, clear, total };
}
