import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import usePageSEO from '../../hooks/usePageSEO';
import {
  User,
  LogOut,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Watch,
  Headphones,
  Award,
  ArrowRight,
  Clock,
  Key,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useWishlist } from '../../hooks/useWishlist';
import { useCart } from '../../hooks/useCart';
import { getUserOrders } from '../../services/orderService';
import { formatCurrency } from '../../utils/formatters';
import Button from '../../components/ui/Button';

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      delay: custom * 0.1,
    },
  }),
};

export const AccountPage = () => {
  const { user, logout } = useAuth();
  const { wishlistCount } = useWishlist();
  const { totalItemCount } = useCart();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState('profile');

  usePageSEO({
    title: user ? `CHRONOS — Collector Account (${user.name})` : 'CHRONOS — Member Account',
    description: 'Manage your CHRONOS timepiece portfolio, allocations, concierge support, and global warranty records.',
  });

  const userOrders = getUserOrders(user?.email || user?.id);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Derive user initials
  const initials = (user?.name || 'Client')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black overflow-x-hidden">
      {/* Background Soft Studio Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-28 space-y-12 relative z-10">
        {/* Profile Hero Header Card */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="p-8 sm:p-12 bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-black border border-zinc-800/90 rounded-3xl space-y-8 shadow-2xl backdrop-blur-xl relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
            {/* User Meta Left */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-zinc-800 to-zinc-900 border border-amber-400/30 flex items-center justify-center text-amber-400 font-mono text-2xl sm:text-3xl font-black shadow-inner shrink-0">
                {initials}
              </div>

              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-zinc-900 border border-amber-400/30 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase">
                    {user?.tier || 'PLATINUM FOUNDING MEMBER'}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-mono font-black text-white uppercase tracking-wider leading-tight">
                  {user?.name || 'CHRONOS CLIENT'}
                </h1>

                <p className="text-xs sm:text-sm font-mono text-zinc-400 tracking-wide">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Logout Action */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2.5 px-5 py-3 bg-zinc-900/80 hover:bg-rose-500/10 text-zinc-300 hover:text-rose-400 border border-zinc-800 hover:border-rose-500/30 rounded-xl text-xs font-mono uppercase tracking-widest transition cursor-pointer font-bold"
                aria-label="Sign out of account"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-6 border-t border-zinc-800/80">
            <Link
              to="/wishlist"
              className="p-5 bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-400/40 rounded-2xl flex items-center justify-between transition group"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-amber-400/10 text-amber-400">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">Saved Timepieces</span>
                  <span className="text-base font-mono font-bold text-white tracking-wide">{wishlistCount} Models</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              to="/cart"
              className="p-5 bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-400/40 rounded-2xl flex items-center justify-between transition group"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-amber-400/10 text-amber-400">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">Shopping Bag</span>
                  <span className="text-base font-mono font-bold text-white tracking-wide">{totalItemCount} Units</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
            </Link>

            <div className="p-5 bg-zinc-950/80 border border-zinc-800/80 rounded-2xl flex items-center gap-3.5">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">Security Protocol</span>
                <span className="text-xs font-mono font-bold text-emerald-400 tracking-wide">256-Bit Encrypted Session</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Tabbed Sections */}
        <div className="space-y-8">
          {/* Tabs Navigation */}
          <div className="flex items-center gap-3 border-b border-zinc-800 pb-3 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              style={{
                backgroundColor: activeTab === 'profile' ? '#d4af37' : 'transparent',
                color: activeTab === 'profile' ? '#000000' : '#a1a1aa',
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-widest transition font-bold cursor-pointer ${
                activeTab === 'profile' ? 'shadow-lg' : 'hover:text-white'
              }`}
            >
              Profile & Security
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('ecosystem')}
              style={{
                backgroundColor: activeTab === 'ecosystem' ? '#d4af37' : 'transparent',
                color: activeTab === 'ecosystem' ? '#000000' : '#a1a1aa',
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-widest transition font-bold cursor-pointer ${
                activeTab === 'ecosystem' ? 'shadow-lg' : 'hover:text-white'
              }`}
            >
              Hardware Ecosystem
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              style={{
                backgroundColor: activeTab === 'orders' ? '#d4af37' : 'transparent',
                color: activeTab === 'orders' ? '#000000' : '#a1a1aa',
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-widest transition font-bold cursor-pointer ${
                activeTab === 'orders' ? 'shadow-lg' : 'hover:text-white'
              }`}
            >
              Order Archive
            </button>
          </div>

          {/* Active Tab Panel */}
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Account Details Card */}
              <div className="p-8 sm:p-10 bg-zinc-950/80 border border-zinc-800 rounded-3xl space-y-7">
                <div className="flex items-center gap-3 pb-5 border-b border-zinc-800/80">
                  <User className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest">
                    Member Credentials
                  </h3>
                </div>

                <div className="space-y-5 text-xs font-mono">
                  <div className="space-y-1">
                    <span className="text-zinc-500 uppercase tracking-[0.2em] block text-[10px]">Client Name</span>
                    <span className="text-white text-sm font-bold tracking-wide block">{user?.name || 'Chronos Member'}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-zinc-500 uppercase tracking-[0.2em] block text-[10px]">Primary Email</span>
                    <span className="text-white text-sm font-bold tracking-wide block">{user?.email}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-zinc-500 uppercase tracking-[0.2em] block text-[10px]">Membership Tier</span>
                    <span className="text-amber-400 font-bold tracking-wide block">{user?.tier || 'Titanium Founding Member'}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-zinc-500 uppercase tracking-[0.2em] block text-[10px]">Member Since</span>
                    <span className="text-zinc-300 tracking-wide block">{user?.memberSince || '2026'}</span>
                  </div>
                </div>
              </div>

              {/* Security & Access Card */}
              <div className="p-8 sm:p-10 bg-zinc-950/80 border border-zinc-800 rounded-3xl space-y-7">
                <div className="flex items-center gap-3 pb-5 border-b border-zinc-800/80">
                  <Key className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest">
                    Security & Session
                  </h3>
                </div>

                <div className="space-y-6 text-xs font-mono">
                  <div className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl space-y-2">
                    <span className="text-emerald-400 font-bold flex items-center gap-2 tracking-wide">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Session Active & Authenticated
                    </span>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed tracking-normal">
                      Your authentication token is secured. Protected from cross-site injection attacks.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-white font-bold block tracking-wide">Password Recovery</span>
                      <span className="text-zinc-500 text-xs tracking-normal">Last verified recently</span>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="px-4 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl text-xs font-mono text-amber-400 uppercase tracking-wider font-bold transition"
                    >
                      Update Password
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ecosystem' && (
            <div className="p-8 sm:p-10 bg-zinc-950/80 border border-zinc-800 rounded-3xl space-y-8">
              <div className="flex items-center gap-3 pb-5 border-b border-zinc-800/80">
                <Watch className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest">
                  Paired Hardware Telemetry
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl space-y-3">
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">CHRONOS Telemetry Hub</span>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed tracking-normal">
                    Sync your biometric ECG telemetry, dual-band GPS waypoints, and battery diagnostics directly to your account.
                  </p>
                  <span className="inline-block px-3 py-1.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono rounded-lg tracking-wider">
                    Ready to Pair via Bluetooth 5.3
                  </span>
                </div>

                <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl space-y-3">
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">Sapphire Care Guarantee</span>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed tracking-normal">
                    2-Year worldwide coverage against mechanical failure, sensor deviation, and titanium enclosure damage.
                  </p>
                  <span className="inline-block px-3 py-1.5 bg-amber-400/10 text-amber-400 text-[10px] font-mono rounded-lg tracking-wider">
                    Active Worldwide Policy
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              {userOrders.length > 0 ? (
                <div className="space-y-4">
                  {userOrders.map((order) => {
                    const formattedOrderDate = order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : 'Recent';

                    return (
                      <div
                        key={order.orderId}
                        className="p-6 sm:p-8 bg-zinc-950/80 border border-zinc-800 rounded-3xl space-y-5 shadow-xl backdrop-blur-xl"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-white tracking-wider">
                                ORDER #{order.orderId}
                              </span>
                              <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono rounded-md font-bold">
                                {order.status}
                              </span>
                            </div>
                            <span className="text-[11px] font-mono text-zinc-500 block">
                              Placed on {formattedOrderDate} // {order.items?.length || 1} Timepiece{(order.items?.length || 1) > 1 ? 's' : ''}
                            </span>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-left sm:text-right">
                              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">Total</span>
                              <span className="text-base font-mono font-black text-amber-400">
                                {formatCurrency(order.total || 0)}
                              </span>
                            </div>

                            <Link to={`/order-success?orderId=${order.orderId}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="font-mono text-xs uppercase tracking-wider font-bold"
                              >
                                View Allocation Receipt
                              </Button>
                            </Link>
                          </div>
                        </div>

                        {/* Order Items Preview */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {order.items?.map((it, idx) => (
                            <div
                              key={it.key || idx}
                              className="p-3 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl flex items-center gap-3"
                            >
                              <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center p-1 shrink-0">
                                <img
                                  src={it.image || '/assets/chronos-pro-main.jpg'}
                                  alt={it.name}
                                  className="w-full h-full object-contain filter drop-shadow"
                                />
                              </div>
                              <div className="space-y-0.5 min-w-0 flex-1">
                                <h5 className="text-xs font-mono font-bold text-white uppercase truncate">
                                  {it.name}
                                </h5>
                                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                                  <span>Qty: {it.quantity}</span>
                                  <span>•</span>
                                  <span>{formatCurrency(it.price || 0)}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-12 bg-zinc-950/80 border border-zinc-800 rounded-3xl text-center space-y-6">
                  <Clock className="w-12 h-12 text-zinc-600 mx-auto" />
                  <div className="space-y-2 max-w-md mx-auto">
                    <h4 className="text-sm font-mono font-bold text-white uppercase tracking-widest">No Active Orders Yet</h4>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed tracking-normal">
                      Your customized timepieces and accessories will appear here once orders are confirmed during checkout.
                    </p>
                  </div>
                  <div className="pt-3">
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
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Dedicated 24/7 Concierge Support Banner */}
        <div className="p-8 sm:p-10 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-zinc-950 border border-zinc-800/80 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-5 text-left">
            <div className="p-3.5 rounded-2xl bg-amber-400/10 text-amber-400 border border-amber-400/20 shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
                CHRONOS Direct Concierge Service
              </h4>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed tracking-normal">
                Dedicated horology experts and software engineers on standby 24/7 for founding members.
              </p>
            </div>
          </div>

          <Link
            to="/contact"
            className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-amber-400 hover:text-amber-300 border border-amber-400/30 rounded-xl text-xs font-mono uppercase tracking-widest transition whitespace-nowrap font-bold"
          >
            Contact Concierge
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
