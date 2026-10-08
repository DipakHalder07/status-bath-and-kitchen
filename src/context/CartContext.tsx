"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem } from "@/types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  cartSavings: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  isConsultationOpen: boolean;
  consultationType: string;
  openConsultation: (type?: string) => void;
  closeConsultation: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([
    // Initialize with 1 sample item so user can immediately see the rich cart state
    {
      product: {
        id: "cur-sofa-2",
        name: "Bevelark 3-Seater Fabric Sofa",
        category: "Living room",
        price: 38990,
        mrp: 54990,
        discount: "29% OFF",
        image: "https://interio.com/media/wysiwyg/Curated-for-you/1.jpg",
        warranty: "3-Years Warranty",
        material: "Pinewood Frame & Fabric",
        color: "Forest Green",
        rating: 4.9,
      },
      quantity: 1,
    },
  ]);

  const [wishlist, setWishlist] = useState<string[]>(["cur-bed-2"]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationType, setConsultationType] = useState("Modular Kitchen");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name.slice(0, 32)}..." to your cart!`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast("Item removed from cart");
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartSavings = cart.reduce(
    (sum, item) =>
      sum + (item.product.mrp - item.product.price) * item.quantity,
    0
  );

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast("Removed from Wishlist");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Saved to your Wishlist!");
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const openConsultation = (type = "Modular Kitchen") => {
    setConsultationType(type);
    setIsConsultationOpen(true);
  };

  const closeConsultation = () => setIsConsultationOpen(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        cartSavings,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        wishlist,
        toggleWishlist,
        isWishlisted,
        isConsultationOpen,
        consultationType,
        openConsultation,
        closeConsultation,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
