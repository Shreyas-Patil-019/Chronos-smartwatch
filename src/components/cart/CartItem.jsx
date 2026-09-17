import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { product, quantity, customization, key } = item;
  const itemKey = key || product.id;

  if (!product) return null;

  const mainImage = product.images?.[0] || '/assets/chronos-pro-main.jpg';

  // Helper to extract clean color display
  const colorObj = product.colors?.find(
    (c) => c.hex === customization?.color || c.id === customization?.color
  );
  const colorName = colorObj?.name || (customization?.color ? 'Custom Finish' : null);
  const colorHex = colorObj?.hex || (customization?.color?.startsWith('#') ? customization.color : '#121214');

  // Helper to extract watch face name
  const faceObj = product.watchFaces?.find((f) => f.id === customization?.watchFace);
  const faceName = faceObj?.name || customization?.watchFace || null;

  // Max stock limit
  const maxStock = product.stock || 50;

  return (
    <div className="p-5 sm:p-6 bg-zinc-950/80 border border-zinc-800/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 transition-all duration-300 hover:border-zinc-700 shadow-lg backdrop-blur-md">
      {/* LEFT: Product Image & Details */}
      <div className="flex items-center gap-4 w-full sm:w-auto flex-1 min-w-0">
        {/* Product Image Thumbnail */}
        <Link
          to={`/products/${product.slug}`}
          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-zinc-900/90 border border-zinc-800 overflow-hidden flex items-center justify-center p-2 shrink-0 group"
          aria-label={`View ${product.name}`}
        >
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-contain filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
          />
        </Link>

        {/* Product Meta & Customizations */}
        <div className="space-y-1.5 min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-500 font-bold">
              {product.category} Series
            </span>
          </div>

          <Link
            to={`/products/${product.slug}`}
            className="inline-flex items-center gap-1.5 group/title"
          >
            <h4 className="text-base sm:text-lg font-mono font-black text-white uppercase tracking-tight group-hover/title:text-amber-400 transition-colors truncate">
              {product.name}
            </h4>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover/title:text-amber-400 opacity-0 group-hover/title:opacity-100 transition-all shrink-0" />
          </Link>

          {/* Customization Details Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono pt-0.5">
            {colorName && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-[11px] text-zinc-300">
                <span
                  className="w-2.5 h-2.5 rounded-full border border-zinc-600 shrink-0"
                  style={{ backgroundColor: colorHex }}
                />
                <span>{colorName}</span>
              </span>
            )}

            {faceName && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-[11px] text-amber-400">
                <span>Dial:</span>
                <span className="text-zinc-300">{faceName}</span>
              </span>
            )}
          </div>

          <p className="text-xs text-zinc-400 font-mono">
            Unit Price: <span className="text-white font-bold">{formatCurrency(product.price)}</span>
          </p>
        </div>
      </div>

      {/* RIGHT: Quantity Controls, Subtotal & Remove Action */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-800/80">
        {/* Quantity Controls */}
        <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1 shadow-inner">
          <button
            type="button"
            onClick={() => onUpdateQuantity(itemKey, quantity - 1)}
            disabled={quantity <= 1}
            className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400 transition cursor-pointer"
            aria-label={`Decrease quantity of ${product.name}`}
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-9 text-center text-xs font-mono font-black text-white select-none">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => onUpdateQuantity(itemKey, quantity + 1)}
            disabled={quantity >= maxStock}
            className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400 transition cursor-pointer"
            aria-label={`Increase quantity of ${product.name}`}
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Item Total Price */}
        <div className="text-right min-w-[90px]">
          <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block sm:hidden">
            Subtotal
          </span>
          <p className="text-base sm:text-lg font-black font-mono text-white">
            {formatCurrency(product.price * quantity)}
          </p>
        </div>

        {/* Remove Button */}
        <button
          type="button"
          onClick={() => onRemove(itemKey)}
          className="p-2.5 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl border border-transparent hover:border-rose-500/20 transition cursor-pointer"
          aria-label={`Remove ${product.name} from cart`}
          title={`Remove ${product.name}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
