import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug } from '../../data/products';
import ProductViewer from '../../components/product/ProductViewer';
import WatchCustomizer from '../../components/three/WatchCustomizer';
import Button from '../../components/ui/Button';
import { formatCurrency, formatRating } from '../../utils/formatters';
import { useCart } from '../../hooks/useCart';
import { useCustomizer } from '../../hooks/useCustomizer';
import { Star, ArrowLeft } from 'lucide-react';

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const product = getProductBySlug(slug) || getProductBySlug('chronos-pro');
  const { addItem } = useCart();
  const { customization } = useCustomizer();

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Product Not Found</h2>
        <Link to="/products"><Button variant="outline">Back to Products</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <Link to="/products" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition">
        <ArrowLeft size={16} />
        <span>Back to Collection</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* 3D Real-Time Render Viewer */}
        <div className="lg:col-span-7 space-y-4">
          <ProductViewer color={customization.color} strap={customization.strap} className="h-[480px] sm:h-[550px]" />
          <p className="text-xs text-center text-zinc-500 font-mono">
            Interactive 3D model architecture — Full interaction coming in Phase 7
          </p>
        </div>

        {/* Product Details & Customizer Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-2">
              <Star className="w-4 h-4 fill-current" />
              <span>{formatRating(product.rating)}</span>
              <span className="text-zinc-500">({product.reviewCount} reviews)</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">{product.name}</h1>
            <p className="text-2xl font-extrabold text-white font-mono mt-2">{formatCurrency(product.price)}</p>
            <p className="text-sm text-zinc-400 mt-4 leading-relaxed">{product.description}</p>
          </div>

          {/* Customizer Studio Controls */}
          <WatchCustomizer product={product} />

          <Button
            variant="gold"
            size="lg"
            className="w-full"
            onClick={() => addItem(product, 1, customization)}
          >
            Add Custom Chronos to Bag — {formatCurrency(product.price)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
