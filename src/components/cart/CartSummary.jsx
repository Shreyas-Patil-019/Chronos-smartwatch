import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, ArrowRight, ShoppingBag } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import Button from '../ui/Button';

export const CartSummary = ({ subtotal, totalItemCount = 0 }) => {
  const estimatedShipping = 0; // Complimentary global express delivery for CHRONOS
  const grandTotal = subtotal;

  return (
    <div className="p-6 sm:p-8 bg-zinc-950/90 border border-zinc-800/90 rounded-3xl space-y-6 shadow-2xl backdrop-blur-md sticky top-28">
      <div>
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 font-bold block mb-1">
          SUMMARY & CHARGES
        </span>
        <h3 className="text-xl font-mono font-black text-white uppercase tracking-tight">
          ORDER SUMMARY
        </h3>
      </div>

      {/* Subtotal & Breakdown Lines */}
      <div className="space-y-3.5 text-xs font-mono">
        <div className="flex justify-between text-zinc-400">
          <span>Items Subtotal ({totalItemCount} units)</span>
          <span className="text-white font-bold">{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between text-zinc-400">
          <span>Global Express Delivery</span>
          <span className="text-emerald-400 font-bold">COMPLIMENTARY</span>
        </div>

        <div className="flex justify-between text-zinc-400">
          <span>Estimated Import Duties</span>
          <span className="text-zinc-300">INCLUDED</span>
        </div>
      </div>

      {/* Grand Total */}
      <div className="pt-4 border-t border-zinc-800/80 flex justify-between items-baseline">
        <div>
          <span className="text-xs font-mono font-bold text-white uppercase block">
            Estimated Total
          </span>
          <span className="text-[10px] text-zinc-500 font-mono">Tax inclusive</span>
        </div>
        <span className="text-2xl sm:text-3xl font-black text-white font-mono text-gradient-gold">
          {formatCurrency(grandTotal)}
        </span>
      </div>

      {/* Primary Checkout CTA (Prepares user for checkout without implementing Phase 10) */}
      <div className="space-y-3 pt-2">
        <Link to="/checkout" className="block w-full">
          <Button
            variant="gold"
            size="lg"
            className="w-full font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 py-4 shadow-xl hover:shadow-amber-500/20 cursor-pointer"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </Button>
        </Link>

        <Link
          to="/products"
          className="block w-full text-center py-2.5 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition"
        >
          Continue Shopping
        </Link>
      </div>

      {/* Value Badges */}
      <div className="pt-4 border-t border-zinc-800/80 space-y-2.5 text-[11px] font-mono text-zinc-400">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>2-Year International Warranty Included</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Truck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Insured White-Glove Courier Dispatch</span>
        </div>
        <div className="flex items-center gap-2.5">
          <RotateCcw className="w-4 h-4 text-amber-400 shrink-0" />
          <span>30-Day Risk-Free Return Policy</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
