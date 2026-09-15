import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { product, quantity, customization } = item;

  return (
    <div className="flex items-center gap-4 py-4 border-b border-zinc-800/80">
      <div className="w-20 h-20 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center p-2 flex-shrink-0">
        <div className="w-12 h-12 rounded-full border border-zinc-700 bg-zinc-800 flex items-center justify-center font-mono text-[10px] text-zinc-400">
          3D
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-white truncate">{product.name}</h4>
        <p className="text-xs text-zinc-400 font-mono mt-0.5">{formatCurrency(product.price)}</p>
        {customization && (
          <p className="text-[10px] text-zinc-500 mt-1 uppercase font-mono">
            Strap: {customization.strap || 'Default'}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
        <button
          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
          className="p-1 text-zinc-400 hover:text-white transition"
          aria-label="Decrease quantity"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="text-xs font-mono font-bold text-white px-2">{quantity}</span>
        <button
          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
          className="p-1 text-zinc-400 hover:text-white transition"
          aria-label="Increase quantity"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="text-right">
        <p className="text-sm font-bold font-mono text-white">{formatCurrency(product.price * quantity)}</p>
        <button
          onClick={() => onRemove(product.id)}
          className="mt-1 p-1 text-zinc-500 hover:text-rose-400 transition"
          aria-label="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
