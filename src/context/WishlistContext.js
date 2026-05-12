'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('oubra_wishlist');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('oubra_wishlist', JSON.stringify(items));
  }, [items]);

  const toggleItem = useCallback((product) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.filter(i => i.id !== product.id);
      return [...prev, product];
    });
  }, []);

  const isInWishlist = useCallback((id) => items.some(i => i.id === id), [items]);
  const removeItem = useCallback((id) => setItems(prev => prev.filter(i => i.id !== id)), []);

  return (
    <WishlistContext.Provider value={{ items, toggleItem, isInWishlist, removeItem, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
