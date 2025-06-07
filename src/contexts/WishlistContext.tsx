import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { Property } from "@/lib/types";

interface WishlistContextType {
  wishlistItems: Property[];
  addToWishlist: (property: Property) => void;
  removeFromWishlist: (propertyId: string) => void;
  isInWishlist: (propertyId: string) => boolean;
  toggleWishlist: (property: Property) => void;
  clearWishlist: () => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wishlistItems, setWishlistItems] = useState<Property[]>([]);
  const { user } = useAuth();

  // Load wishlist from localStorage when user changes
  useEffect(() => {
    if (user) {
      const savedWishlist = localStorage.getItem(`wishlist_${user.id}`);
      if (savedWishlist) {
        try {
          const parsed = JSON.parse(savedWishlist);
          setWishlistItems(parsed);
        } catch (error) {
          console.error("Error loading wishlist:", error);
          setWishlistItems([]);
        }
      }
    } else {
      setWishlistItems([]);
    }
  }, [user]);

  // Save wishlist to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(
        `wishlist_${user.id}`,
        JSON.stringify(wishlistItems),
      );
    }
  }, [wishlistItems, user]);

  const addToWishlist = (property: Property) => {
    if (!user) {
      return; // Require authentication
    }

    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.id === property.id);
      if (!exists) {
        return [...prev, property];
      }
      return prev;
    });
  };

  const removeFromWishlist = (propertyId: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== propertyId));
  };

  const isInWishlist = (propertyId: string) => {
    return wishlistItems.some((item) => item.id === propertyId);
  };

  const toggleWishlist = (property: Property) => {
    if (isInWishlist(property.id)) {
      removeFromWishlist(property.id);
    } else {
      addToWishlist(property);
    }
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const value: WishlistContextType = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    clearWishlist,
    wishlistCount: wishlistItems.length,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
