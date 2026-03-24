'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WishlistContextValue {
  wishlist: number[];
  toggle: (productId: number) => void;
  isWishlisted: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dragoffice-wishlist');
      if (saved) setWishlist(JSON.parse(saved));
    } catch {}
  }, []);

  const toggle = (productId: number) => {
    setWishlist((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      localStorage.setItem('dragoffice-wishlist', JSON.stringify(next));
      return next;
    });
  };

  const isWishlisted = (productId: number) => wishlist.includes(productId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggle, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
