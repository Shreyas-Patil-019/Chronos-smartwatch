import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search, Menu, X, Watch } from 'lucide-react';
import { BRAND, NAV_LINKS } from '../../utils/constants';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import SearchBar from '../ui/SearchBar';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50 shadow-2xl py-3'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* LEFT: Brand Logo / Wordmark */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-zinc-900/90 border border-zinc-800 group-hover:border-zinc-500 transition-colors shadow-inner">
              <Watch className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-widest text-white font-mono uppercase">
                {BRAND.NAME}
              </span>
              <span className="text-[9px] text-zinc-400 tracking-[0.25em] uppercase font-mono font-medium -mt-1">
                {BRAND.TAGLINE}
              </span>
            </div>
          </Link>

          {/* CENTER: Navigation Links */}
          <nav className="hidden md:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `text-xs font-mono tracking-widest uppercase transition-all relative py-1 ${
                    isActive
                      ? 'text-white font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-amber-400'
                      : 'text-zinc-400 hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT: Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900/80 rounded-xl transition border border-transparent hover:border-zinc-800"
              aria-label="Search Collection"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900/80 rounded-xl transition border border-transparent hover:border-zinc-800"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[9px] font-bold bg-amber-400 text-black rounded-full flex items-center justify-center font-mono">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account Link */}
            <Link
              to="/account"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-zinc-300 bg-zinc-900/60 border border-zinc-800 hover:border-zinc-600 hover:text-white rounded-xl transition shadow-sm"
              aria-label="Account"
            >
              <User className="w-3.5 h-3.5" />
              <span>ACCOUNT</span>
            </Link>

            {/* Cart Link */}
            <Link
              to="/cart"
              className="relative p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900/80 rounded-xl transition border border-transparent hover:border-zinc-800"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[9px] font-bold bg-white text-black rounded-full flex items-center justify-center font-mono">
                  {totalItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900/80 rounded-xl transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Animated Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-800/80 bg-zinc-950/95 backdrop-blur-2xl px-6 pt-4 pb-8 space-y-4 animate-fadeIn">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-sm font-mono tracking-widest uppercase text-zinc-300 hover:text-amber-400 border-b border-zinc-900/80"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <Link
                to="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-2.5 text-xs font-mono text-zinc-300 hover:text-white"
              >
                <User className="w-4 h-4 text-amber-400" />
                <span>MY ACCOUNT</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-3">
              Search CHRONOS Collection
            </h3>
            
            <form onSubmit={handleSearchSubmit}>
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search models (e.g., Chronos Pro, Titanium, Sport)..."
              />
              <div className="mt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="px-4 py-2 text-xs font-mono text-zinc-400 hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs font-bold rounded-xl transition"
                >
                  SEARCH
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
