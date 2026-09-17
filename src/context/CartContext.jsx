import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'chronos_cart_items_v1';

const getItemKey = (product, customization) => {
  const prodId = product?.id || 'unknown';
  const color = customization?.color || 'default';
  const strap = customization?.strap || 'default';
  const watchFace = customization?.watchFace || 'default';
  return `${prodId}::${color}::${strap}::${watchFace}`;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((item) => item && item.product && item.product.id && item.quantity > 0);
        }
      }
    } catch (e) {
      console.warn('Could not restore CHRONOS cart from localStorage:', e);
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Could not save CHRONOS cart to localStorage:', e);
    }
  }, [cartItems]);

  const addItem = (product, quantity = 1, customization = null) => {
    if (!product || !product.id) return;
    const itemKey = getItemKey(product, customization);

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => (item.key || getItemKey(item.product, item.customization)) === itemKey
      );

      if (existingIndex > -1) {
        const newItems = [...prevItems];
        const maxStock = product.stock || 50;
        const currentQty = newItems[existingIndex].quantity || 1;
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: Math.min(maxStock, currentQty + quantity),
        };
        return newItems;
      }

      return [...prevItems, { key: itemKey, product, quantity: Math.max(1, quantity), customization }];
    });
  };

  const removeItem = (itemKeyOrId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => {
        const key = item.key || getItemKey(item.product, item.customization);
        return key !== itemKeyOrId && item.product.id !== itemKeyOrId;
      })
    );
  };

  const updateQuantity = (itemKeyOrId, quantity) => {
    if (quantity <= 0) {
      removeItem(itemKeyOrId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        const key = item.key || getItemKey(item.product, item.customization);
        if (key === itemKeyOrId || item.product.id === itemKeyOrId) {
          const maxStock = item.product.stock || 50;
          return { ...item, quantity: Math.min(maxStock, Math.max(1, quantity)) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItemCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0),
    [cartItems]
  );

  const cartSubtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + (item.product?.price || 0) * (item.quantity || 0), 0),
    [cartItems]
  );

  const value = {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItemCount,
    cartSubtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};

export default CartProvider;
