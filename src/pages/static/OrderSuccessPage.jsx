import React, { useMemo } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  MapPin,
  Clock,
  User,
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { getOrderById, getLatestOrder } from '../../services/orderService';
import Button from '../../components/ui/Button';

export const OrderSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  const orderIdFromQuery = searchParams.get('orderId');

  // Retrieve order from location state, by orderId from query params, or latest stored order
  const order = useMemo(() => {
    if (location.state?.order) {
      return location.state.order;
    }
    if (orderIdFromQuery) {
      const found = getOrderById(orderIdFromQuery);
      if (found) return found;
    }
    return getLatestOrder();
  }, [location.state, orderIdFromQuery]);

  // Graceful fallback if no order can be found
  if (!order) {
    return (
      <div className="relative min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black flex items-center justify-center px-4 py-28 overflow-x-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="p-10 sm:p-14 bg-zinc-950/90 border border-zinc-800 rounded-3xl text-center space-y-6 max-w-lg mx-auto shadow-2xl backdrop-blur-xl relative z-10"
        >
          <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mx-auto text-amber-400 shadow-inner">
            <Package className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-mono font-black text-white uppercase tracking-tight">
              NO RECENT ORDER FOUND
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
              We could not find an active receipt with this order identifier. You can browse the collection or access your account history.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/products">
              <Button
                variant="gold"
                size="md"
                style={{ color: '#000000', backgroundColor: '#d4af37' }}
                className="font-mono text-xs uppercase tracking-widest font-bold px-6 py-3"
              >
                <span style={{ color: '#000000', fontWeight: 800 }}>Explore Collection</span>
              </Button>
            </Link>
            <Link to="/account">
              <Button
                variant="outline"
                size="md"
                className="font-mono text-xs uppercase tracking-widest font-bold px-6 py-3"
              >
                Account History
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const formattedDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Confirmed Recently';

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black overflow-x-hidden">
      {/* Background Soft Studio Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 space-y-10 relative z-10">
        {/* Success Header Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 sm:p-12 bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-black border border-zinc-800/90 rounded-3xl text-center space-y-6 shadow-2xl backdrop-blur-xl relative overflow-hidden"
        >
          {/* Animated Success Check Icon */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-zinc-900 to-zinc-900 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 animate-pulse" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-zinc-900 border border-amber-400/30 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
                ALLOCATION CONFIRMED
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-black text-white uppercase tracking-tight">
              ORDER <span className="text-gradient-gold">CONFIRMED.</span>
            </h1>

            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed max-w-lg mx-auto">
              Thank you for choosing CHRONOS. Your precision timepiece reservation has been recorded and queued for white-glove inspection.
            </p>
          </div>

          {/* Order ID & Meta Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="px-4 py-2 bg-zinc-900/90 border border-zinc-800 rounded-xl text-xs font-mono">
              <span className="text-zinc-500 mr-2">ORDER ID:</span>
              <span className="text-amber-400 font-bold tracking-wider">{order.orderId}</span>
            </div>

            <div className="px-4 py-2 bg-zinc-900/90 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-400">
              <span>{formattedDate}</span>
            </div>

            <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-mono text-emerald-400 font-bold">
              <span>STATUS: {order.status}</span>
            </div>
          </div>
        </motion.div>

        {/* Two-Column Detail Grid: Items List vs Shipping & Charges */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* LEFT: Purchased Product Manifest */}
          <div className="md:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 bg-zinc-950/80 border border-zinc-800 rounded-3xl space-y-6 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-3 pb-4 border-b border-zinc-800/80">
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest">
                  Ordered Timepieces ({order.items?.length || 0})
                </h3>
              </div>

              <div className="space-y-4">
                {order.items?.map((item, idx) => {
                  const colorObj = item.customization?.color;
                  const colorHex = colorObj?.startsWith('#') ? colorObj : '#d4af37';
                  const faceName = item.customization?.watchFace;

                  return (
                    <div
                      key={item.key || idx}
                      className="p-4 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl flex items-center gap-4"
                    >
                      <div className="w-16 h-16 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center p-1.5 shrink-0">
                        <img
                          src={item.image || '/assets/chronos-pro-main.jpg'}
                          alt={item.name}
                          className="w-full h-full object-contain filter drop-shadow"
                        />
                      </div>

                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-mono font-bold text-white uppercase truncate">
                            {item.name}
                          </h4>
                          <span className="text-xs font-mono font-bold text-white shrink-0">
                            {formatCurrency((item.price || 0) * (item.quantity || 1))}
                          </span>
                        </div>

                        {/* Customization Details */}
                        <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                          {colorObj && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-zinc-950 border border-zinc-800 rounded text-zinc-300">
                              <span
                                className="w-2 h-2 rounded-full border border-zinc-600 shrink-0"
                                style={{ backgroundColor: colorHex }}
                              />
                              <span>{item.customization?.colorName || 'Selected Finish'}</span>
                            </span>
                          )}
                          {faceName && (
                            <span className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 rounded text-amber-400">
                              {faceName}
                            </span>
                          )}
                          <span className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 rounded text-zinc-400">
                            Qty: {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Price Calculation Summary */}
              <div className="pt-4 border-t border-zinc-800/80 space-y-3 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">{formatCurrency(order.subtotal || 0)}</span>
                </div>

                <div className="flex justify-between text-zinc-400">
                  <span>{order.shippingMethod?.name || 'White-Glove Delivery'}</span>
                  <span className={order.shippingFee === 0 ? 'text-emerald-400 font-bold' : 'text-white font-bold'}>
                    {order.shippingFee === 0 ? 'COMPLIMENTARY' : formatCurrency(order.shippingFee || 0)}
                  </span>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex justify-between items-baseline">
                  <span className="text-xs font-mono font-bold text-white uppercase">Grand Total</span>
                  <span className="text-xl sm:text-2xl font-black text-white font-mono text-gradient-gold">
                    {formatCurrency(order.total || order.subtotal || 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Delivery Destination & Tracking Details */}
          <div className="md:col-span-5 space-y-6">
            {/* Delivery Destination */}
            <div className="p-6 sm:p-8 bg-zinc-950/80 border border-zinc-800 rounded-3xl space-y-6 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-3 pb-4 border-b border-zinc-800/80">
                <MapPin className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest">
                  Shipping Information
                </h3>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Recipient</span>
                  <span className="text-white font-bold block">{order.shippingAddress?.fullName || order.customer?.name}</span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Delivery Address</span>
                  <p className="text-zinc-300 font-sans leading-relaxed">
                    {order.shippingAddress?.addressLine1}
                    {order.shippingAddress?.addressLine2 && <><br />{order.shippingAddress.addressLine2}</>}
                    <br />
                    {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}
                    <br />
                    {order.shippingAddress?.country || 'India'}
                  </p>
                </div>

                <div className="space-y-0.5 pt-2 border-t border-zinc-800/60">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Contact Notification</span>
                  <span className="text-zinc-300 block">{order.customer?.email}</span>
                  <span className="text-zinc-400 block">{order.shippingAddress?.phone || order.customer?.phone}</span>
                </div>

                <div className="p-4 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl space-y-1.5 pt-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                    <Truck className="w-3.5 h-3.5" />
                    <span>{order.shippingMethod?.name || 'Global Express'}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-sans">
                    Estimated Delivery: <span className="text-white font-mono">{order.shippingMethod?.estimatedDelivery || '3–5 Business Days'}</span>
                  </p>
                  <p className="text-[10px] font-mono text-zinc-500">
                    Tracking Allocation: <span className="text-amber-400/80">{order.trackingNumber || 'TRK-CHRONOS-ACTIVE'}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Actions: Continue Shopping & Account */}
            <div className="space-y-3">
              <Link to="/products" className="block w-full">
                <Button
                  variant="gold"
                  size="lg"
                  style={{ color: '#000000', backgroundColor: '#d4af37' }}
                  className="w-full font-mono text-xs uppercase tracking-widest font-bold py-4 flex items-center justify-center gap-2 shadow-xl hover:shadow-amber-500/20 cursor-pointer"
                >
                  <span style={{ color: '#000000', fontWeight: 800 }}>Continue Shopping</span>
                  <ArrowRight className="w-4 h-4 text-black" style={{ color: '#000000' }} />
                </Button>
              </Link>

              <Link to="/account" className="block w-full">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full font-mono text-xs uppercase tracking-widest font-bold py-4 flex items-center justify-center gap-2 cursor-pointer"
                >
                  View in Account Archive
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
