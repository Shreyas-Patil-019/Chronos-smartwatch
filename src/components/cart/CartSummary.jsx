import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';
import Button from '../ui/Button';

export const CartSummary = ({ subtotal }) => {
  const estimatedShipping = subtotal > 500 || subtotal === 0 ? 0 : 25;
  const estimatedTax = subtotal * 0.08;
  const grandTotal = subtotal + estimatedShipping + estimatedTax;

  return (
    <div className="glass-panel p-6 rounded-2xl space-y-4">
      <h3 className="text-lg font-bold text-white tracking-tight">Order Summary</h3>

      <div className="space-y-2 text-sm text-zinc-400">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="text-white font-mono">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Estimated Shipping</span>
          <span className="text-white font-mono">
            {estimatedShipping === 0 ? 'FREE' : formatCurrency(estimatedShipping)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Estimated Tax (8%)</span>
          <span className="text-white font-mono">{formatCurrency(estimatedTax)}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-zinc-800 flex justify-between items-center">
        <span className="text-base font-bold text-white">Total</span>
        <span className="text-xl font-extrabold text-white font-mono">{formatCurrency(grandTotal)}</span>
      </div>

      <Link to="/checkout" className="block pt-2">
        <Button variant="primary" size="lg" className="w-full">
          Proceed to Checkout
        </Button>
      </Link>
    </div>
  );
};

export default CartSummary;
