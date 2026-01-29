'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import type { FoodItem, CartItem } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: FoodItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (item: FoodItem, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.item.id === item.id);
      if (existingItem) {
        // Update quantity if item already exists
        return prevCart.map((cartItem) =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      // Add new item
      return [...prevCart, { item, quantity }];
    });
    toast({
      title: 'Added to Cart',
      description: `${item.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.item.id !== itemId));
    toast({
      title: 'Item Removed',
      description: 'The item has been removed from your cart.',
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.item.id === itemId ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const itemCount = useMemo(() => {
    return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return cart.reduce(
      (total, cartItem) => total + cartItem.item.discountedPrice * cartItem.quantity,
      0
    );
  }, [cart]);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
