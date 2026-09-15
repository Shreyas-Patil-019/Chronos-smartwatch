import React from 'react';
import { Link } from 'react-router-dom';
import { Watch, ArrowRight } from 'lucide-react';
import { BRAND, FOOTER_LINKS } from '../../utils/constants';

export const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/80 text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 text-white">
              <div className="p-2 rounded-xl bg-zinc-800 border border-zinc-700">
                <Watch className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-wider font-mono">{BRAND.NAME}</span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              {BRAND.DESCRIPTION}
            </p>
            <div className="pt-2">
              <p className="text-xs uppercase tracking-widest text-zinc-500 font-mono mb-2">Subscribe to Newsletter</p>
              <div className="flex max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-l-xl text-white text-xs placeholder-zinc-500 focus:outline-none"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-white text-black text-xs font-semibold rounded-r-xl hover:bg-zinc-200 transition"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4 font-mono">Shop</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-white transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4 font-mono">Company</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-white transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4 font-mono">Support</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-white transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} {BRAND.NAME} Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-zinc-300">Privacy</Link>
            <Link to="/terms" className="hover:text-zinc-300">Terms</Link>
            <Link to="/shipping" className="hover:text-zinc-300">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
