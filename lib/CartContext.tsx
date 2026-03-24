'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartContextValue {
  cart: number[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  isInCart: (productId: number) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<number[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dragoffice-cart');
      if (saved) setCart(JSON.parse(saved));
    } catch {}
  }, []);

  const addToCart = (productId: number) => {
    setCart((prev) => {
      if (prev.includes(productId)) return prev;
      const next = [...prev, productId];
      localStorage.setItem('dragoffice-cart', JSON.stringify(next));
      return next;
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      const next = prev.filter((id) => id !== productId);
      localStorage.setItem('dragoffice-cart', JSON.stringify(next));
      return next;
    });
  };

  const isInCart = (productId: number) => cart.includes(productId);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
