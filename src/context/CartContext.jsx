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
          return parsed.filter(
            (item) =>
              item &&
              item.product &&
              item.product.id &&
              typeof item.product.price === 'number' &&
              Number.isFinite(item.product.price) &&
              typeof item.quantity === 'number' &&
              item.quantity > 0
          );
        }
      }
    } catch (e) {
      console.warn('Could not restore CHRONOS cart from localStorage, initializing fresh state:', e);
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync with localStorage safely
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Could not save CHRONOS cart to localStorage:', e);
    }
  }, [cartItems]);

  const addItem = (product, quantity = 1, customization = null) => {
    if (!product || !product.id || typeof product.price !== 'number') return;
    const sanitizedQty = Math.max(1, Math.floor(Number(quantity) || 1));
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
          quantity: Math.min(maxStock, currentQty + sanitizedQty),
        };
        return newItems;
      }

      return [...prevItems, { key: itemKey, product, quantity: sanitizedQty, customization }];
    });
  };

  const removeItem = (itemKeyOrId) => {
    if (!itemKeyOrId) return;
    setCartItems((prevItems) =>
      prevItems.filter((item) => {
        const key = item.key || getItemKey(item.product, item.customization);
        return key !== itemKeyOrId && item.product?.id !== itemKeyOrId;
      })
    );
  };

  const updateQuantity = (itemKeyOrId, quantity) => {
    const numQty = Number(quantity);
    if (!Number.isFinite(numQty) || numQty <= 0) {
      removeItem(itemKeyOrId);
      return;
    }
    const sanitizedQty = Math.floor(numQty);
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        const key = item.key || getItemKey(item.product, item.customization);
        if (key === itemKeyOrId || item.product?.id === itemKeyOrId) {
          const maxStock = item.product?.stock || 50;
          return { ...item, quantity: Math.min(maxStock, Math.max(1, sanitizedQty)) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItemCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0),
    [cartItems]
  );

  const cartSubtotal = useMemo(
    () =>
      cartItems.reduce((acc, item) => {
        const price = Number(item.product?.price) || 0;
        const qty = Number(item.quantity) || 0;
        return acc + price * qty;
      }, 0),
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
