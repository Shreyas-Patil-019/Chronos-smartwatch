import React from 'react';
import { useCart } from '../../hooks/useCart';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export const CartPage = () => {
  const { cartItems, updateQuantity, removeItem, cartSubtotal } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Your Shopping Cart</h1>
        <p className="text-sm text-zinc-400 mt-1">Cart Page Architecture — Full functionality coming in Phase 8</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-500">
            <ShoppingBag size={28} />
          </div>
          <h3 className="text-lg font-semibold text-white">Your cart is currently empty</h3>
          <p className="text-xs text-zinc-400">Discover our high-precision 3D smartwatch collection.</p>
          <Link to="/products" className="inline-block pt-2">
            <Button variant="primary">Explore Smartwatches</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 glass-panel p-6 rounded-2xl space-y-2">
            {cartItems.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>
          <div className="lg:col-span-4">
            <CartSummary subtotal={cartSubtotal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
