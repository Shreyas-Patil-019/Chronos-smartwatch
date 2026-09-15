import React from 'react';
import { Link } from 'react-router-dom';
import { Watch } from 'lucide-react';
import { BRAND } from '../../utils/constants';

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-zinc-900 text-zinc-400 text-xs z-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 text-white group">
              <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-zinc-500 transition">
                <Watch className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-widest font-mono uppercase">{BRAND.NAME}</span>
                <span className="text-[9px] text-amber-400 tracking-[0.25em] uppercase font-mono">{BRAND.TAGLINE}</span>
              </div>
            </Link>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm font-sans">
              Precision engineering meets futuristic web design. Crafted for those who master time.
            </p>

            {/* Social Icons (Inline SVGs for Instagram, YouTube, X) */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                className="p-2.5 bg-zinc-900 border border-zinc-800 hover:border-amber-400 text-zinc-400 hover:text-white rounded-xl transition"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#youtube"
                onClick={(e) => e.preventDefault()}
                className="p-2.5 bg-zinc-900 border border-zinc-800 hover:border-amber-400 text-zinc-400 hover:text-white rounded-xl transition"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="#x"
                onClick={(e) => e.preventDefault()}
                className="p-2.5 bg-zinc-900 border border-zinc-800 hover:border-amber-400 text-zinc-400 hover:text-white rounded-xl transition"
                aria-label="X"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white mb-4">Navigation</h4>
            <ul className="space-y-2.5 font-mono text-[11px]">
              <li>
                <Link to="/" className="hover:text-amber-400 transition">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-amber-400 transition">Collection</Link>
              </li>
              <li>
                <a href="#technology" className="hover:text-amber-400 transition">Technology</a>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition">About</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-400 transition">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Customer Column */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white mb-4">Customer</h4>
            <ul className="space-y-2.5 font-mono text-[11px]">
              <li>
                <Link to="/account" className="hover:text-amber-400 transition">Account</Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-amber-400 transition">Wishlist</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-amber-400 transition">Cart</Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-amber-400 transition">Shipping</Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-amber-400 transition">Returns</Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white mb-4">Legal</h4>
            <ul className="space-y-2.5 font-mono text-[11px]">
              <li>
                <Link to="/privacy" className="hover:text-amber-400 transition">Privacy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-amber-400 transition">Terms</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-14 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between font-mono text-[10px] text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} {BRAND.NAME} INC. ALL RIGHTS RESERVED.</p>
          <p className="text-zinc-600">LUXURY VIRTUAL SHOWROOM ARCHITECTURE</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
