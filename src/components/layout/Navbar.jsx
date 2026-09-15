import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Heart, User, Menu, X, Watch } from 'lucide-react';
import { BRAND, NAV_LINKS } from '../../utils/constants';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 text-white group">
          <div className="p-2 rounded-xl bg-zinc-800/80 border border-zinc-700/60 group-hover:border-zinc-500 transition">
            <Watch className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-wider font-mono">{BRAND.NAME}</span>
            <span className="text-[9px] text-zinc-400 tracking-widest uppercase font-mono">{BRAND.TAGLINE}</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-white'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-4">
          <Link
            to="/wishlist"
            className="relative p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-xl transition"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold bg-amber-500 text-black rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-xl transition"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItemCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold bg-white text-black rounded-full flex items-center justify-center">
                {totalItemCount}
              </span>
            )}
          </Link>

          <Link
            to="/login"
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-zinc-300 border border-zinc-800 hover:border-zinc-600 hover:text-white rounded-xl transition"
          >
            <User className="w-4 h-4" />
            <span>Account</span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white rounded-xl"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950 px-4 pt-3 pb-6 space-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-zinc-300 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-zinc-800">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 text-sm text-zinc-300 hover:text-white"
            >
              <User className="w-4 h-4" />
              <span>Account Sign In</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
