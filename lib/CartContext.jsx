'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dragoffice-cart');
      if (saved) setCart(JSON.parse(saved));
    } catch {}
  }, []);

  const addToCart = (productId) => {
    setCart((prev) => {
      if (prev.includes(productId)) return prev;
      const next = [...prev, productId];
      localStorage.setItem('dragoffice-cart', JSON.stringify(next));
      return next;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const next = prev.filter((id) => id !== productId);
      localStorage.setItem('dragoffice-cart', JSON.stringify(next));
      return next;
    });
  };

  const isInCart = (productId) => cart.includes(productId);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
