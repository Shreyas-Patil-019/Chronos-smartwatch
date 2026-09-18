import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search, Menu, X, Watch } from 'lucide-react';
import { BRAND, NAV_LINKS } from '../../utils/constants';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { useAuth } from '../../hooks/useAuth';
import SearchBar from '../ui/SearchBar';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated, user, logout } = useAuth();
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

  // Keyboard accessibility: Escape key closes active overlays
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (searchOpen) setSearchOpen(false);
        if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, mobileMenuOpen]);

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
          <Link
            to="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-xl"
            aria-label="CHRONOS Home"
          >
            <div className="p-2 rounded-xl bg-zinc-900/90 border border-zinc-800 group-hover:border-zinc-500 transition-colors shadow-inner">
              <Watch className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
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
          <nav className="hidden md:flex items-center gap-9" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `text-xs font-mono tracking-widest uppercase transition-all relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-sm ${
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
              className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900/80 rounded-xl transition border border-transparent hover:border-zinc-800 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label="Open Search Dialog"
              aria-haspopup="dialog"
            >
              <Search className="w-4 h-4" aria-hidden="true" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900/80 rounded-xl transition border border-transparent hover:border-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label={`Wishlist (${wishlistCount} ${wishlistCount === 1 ? 'item' : 'items'})`}
            >
              <Heart className="w-4 h-4" aria-hidden="true" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[9px] font-bold bg-amber-400 text-black rounded-full flex items-center justify-center font-mono">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account / Login Link */}
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-zinc-300 bg-zinc-900/60 border border-zinc-800 hover:border-zinc-600 hover:text-white rounded-xl transition shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label={isAuthenticated ? `Account (${user?.name || 'Member'})` : 'Sign In to Account'}
            >
              {isAuthenticated ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                  <span>{user?.name?.split(' ')[0]?.toUpperCase() || 'ACCOUNT'}</span>
                </>
              ) : (
                <>
                  <User className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>SIGN IN</span>
                </>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              to="/cart"
              className="relative p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900/80 rounded-xl transition border border-transparent hover:border-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label={`Shopping Bag (${totalItemCount} ${totalItemCount === 1 ? 'item' : 'items'})`}
            >
              <ShoppingBag className="w-4 h-4" aria-hidden="true" />
              {totalItemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[9px] font-bold bg-white text-black rounded-full flex items-center justify-center font-mono">
                  {totalItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-900/80 rounded-xl transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Animated Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="md:hidden border-t border-zinc-800/80 bg-zinc-950/98 backdrop-blur-2xl px-6 pt-4 pb-8 space-y-4 animate-fadeIn max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            <nav className="space-y-1" aria-label="Mobile Menu Navigation">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-3 px-3 rounded-xl text-xs font-mono tracking-widest uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                      isActive
                        ? 'bg-zinc-900 text-amber-400 font-bold border-l-2 border-amber-400'
                        : 'text-zinc-300 hover:text-white hover:bg-zinc-900/50'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            <div className="pt-3 border-t border-zinc-900 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-3 px-3 rounded-xl text-xs font-mono text-zinc-200 hover:text-white hover:bg-zinc-900/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    <User className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
                    <span className="truncate">ACCOUNT ({user?.name || 'MEMBER'})</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-xs font-mono text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 text-left transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                  >
                    <span>SIGN OUT</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <User className="w-4 h-4 text-black" aria-hidden="true" />
                  <span>SIGN IN / REGISTER</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Search Modal Overlay */}
      {searchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-modal-title"
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md animate-fadeIn"
        >
          <div className="relative w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
              aria-label="Close search dialog"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <h2 id="search-modal-title" className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-3 font-bold">
              Search CHRONOS Collection
            </h2>
            
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
                  className="px-4 py-2 text-xs font-mono text-zinc-400 hover:text-white rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs font-bold rounded-xl transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
