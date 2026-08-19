import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight, Tag, Sparkles, Package, Globe } from 'lucide-react';
import { CategoryType, CurrencyCode } from '../types';
import { CURRENCIES } from '../utils/currency';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeCategory: CategoryType | 'ABOUT US' | 'CONTACT' | 'FAQ';
  setActiveCategory: (cat: CategoryType | 'ABOUT US' | 'CONTACT' | 'FAQ') => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenCoupons?: () => void;
  onOpenTrackOrder?: () => void;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  setActiveCategory,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenCoupons,
  onOpenTrackOrder,
  currency,
  setCurrency,
  searchQuery,
  setSearchQuery
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; value: CategoryType | 'ABOUT US' | 'CONTACT' | 'FAQ' }[] = [
    { label: 'SALE', value: 'SALE' },
    { label: 'ABOUT US', value: 'ABOUT US' },
    { label: 'CONTACT', value: 'CONTACT' },
    { label: 'FAQ', value: 'FAQ' }
  ];

  const handleNavClick = (value: CategoryType | 'ABOUT US' | 'CONTACT' | 'FAQ') => {
    setActiveCategory(value);
    setMobileMenuOpen(false);
  };

  return (
    <motion.header 
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 120 }}
      className="sticky top-0 z-40 bg-[#d8dcde]/90 backdrop-blur-md border-b border-black/5 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between w-full">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group flex-shrink-0" onClick={() => setActiveCategory('ALL')}>
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-black rounded-full transition-transform duration-300 group-hover:scale-105 overflow-hidden border-2 border-white shadow-md">
            <span className="font-syne text-[18px] sm:text-[22px] font-black tracking-tighter text-white leading-none">SV</span>
          </div>
          <div className="flex flex-col">
            <span className="font-syne text-base sm:text-lg font-black tracking-widest text-black leading-none">
              SAQIB VISUAL
            </span>
            <span className="text-[7px] sm:text-[8px] font-bold tracking-widest text-gray-500 uppercase mt-0.5">Walk like a celebrity</span>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.value)}
              className={`text-sm font-bold tracking-widest transition-all duration-200 relative py-2 ${
                activeCategory === item.value
                  ? 'text-black font-extrabold'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              {item.label}
              {activeCategory === item.value && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-black rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Right: Search, Wishlist & Cart */}
        <div className="flex items-center space-x-1 sm:space-x-3 flex-shrink-0">
          {/* Quick Search bar */}
          <div className="hidden lg:flex items-center bg-[#e8eaec]/80 hover:bg-[#e8eaec] border border-black/10 rounded-full px-3.5 py-1.5 transition-all duration-200 focus-within:ring-2 focus-within:ring-black/20 focus-within:bg-white">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={onOpenSearch}
              className="bg-transparent text-sm text-black placeholder-gray-500 focus:outline-none w-28 focus:w-40 transition-all duration-300"
            />
          </div>

          <button
            onClick={onOpenSearch}
            className="lg:hidden p-1.5 sm:p-2 rounded-full hover:bg-black/5 text-gray-800 transition-colors"
            title="Search"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Track Order Button */}
          {onOpenTrackOrder && (
            <button
              onClick={onOpenTrackOrder}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-black/5 hover:bg-black/10 text-black border border-black/10 transition-all flex items-center space-x-1 font-extrabold text-xs cursor-pointer"
              title="Track Your Order"
            >
              <Package className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden xl:inline uppercase tracking-wider text-[10px]">TRACK ORDER</span>
            </button>
          )}

          {/* Currency Switcher */}
          <div className="flex items-center space-x-1 bg-black/5 hover:bg-black/10 border border-black/10 rounded-full px-2 py-1 text-xs font-black">
            <Globe className="w-3.5 h-3.5 text-gray-700 hidden sm:inline" />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              className="bg-transparent text-black font-black text-[10px] sm:text-xs focus:outline-none cursor-pointer uppercase"
            >
              <option value="PKR">Rs PKR</option>
              <option value="USD">$ USD</option>
              <option value="AED">AED</option>
              <option value="EUR">€ EUR</option>
            </select>
          </div>

          {/* Coupons & Offers Button */}
          {onOpenCoupons && (
            <button
              onClick={onOpenCoupons}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-amber-400/20 hover:bg-amber-400 text-black border border-amber-400/40 transition-all flex items-center space-x-1 font-black text-xs shadow-xs"
              title="Exclusive Coupon Codes"
            >
              <Tag className="w-4 h-4 text-amber-700 sm:text-black" />
              <span className="hidden sm:inline uppercase tracking-wider text-[10px]">COUPONS</span>
            </button>
          )}

          {/* Wishlist Icon */}
          <button
            onClick={onOpenWishlist}
            className="p-1.5 sm:p-2 rounded-full hover:bg-black/5 text-gray-800 relative transition-colors"
            title="Wishlist"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[9px] sm:text-[10px] font-bold rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon matching image dark oval button */}
          <button
            onClick={onOpenCart}
            className="bg-black text-white p-2 sm:p-2.5 px-2.5 sm:px-3.5 rounded-full hover:bg-gray-800 transition-transform active:scale-95 flex items-center space-x-1.5 sm:space-x-2 shadow-sm"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            {cartCount > 0 && (
              <span className="bg-white text-black font-extrabold text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 text-gray-800 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Full-screen Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#121212] text-white md:hidden flex flex-col justify-between p-6 sm:p-8 overflow-y-auto"
          >
            {/* Top Bar: Brand Logo & Close Button */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div 
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => {
                  setActiveCategory('ALL');
                  setMobileMenuOpen(false);
                }}
              >
                <div className="w-11 h-11 flex items-center justify-center bg-white text-black rounded-full border-2 border-white shadow-md">
                  <span className="font-syne text-xl font-black tracking-tighter leading-none">SV</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-syne text-base font-black tracking-widest text-white leading-none">
                    SAQIB VISUAL
                  </span>
                  <span className="text-[8px] font-bold tracking-widest text-gray-400 uppercase mt-0.5">Walk like a celebrity</span>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-90"
                aria-label="Close Mobile Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Middle: Navigation Items */}
            <div className="py-8 my-auto space-y-4">
              <span className="text-[10px] font-extrabold tracking-[0.25em] text-gray-400 uppercase block mb-2">
                NAVIGATION
              </span>
              <div className="space-y-2">
                {navItems.map((item, index) => {
                  const isActive = activeCategory === item.value;
                  return (
                    <motion.button
                      key={item.label}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.05 * index }}
                      onClick={() => handleNavClick(item.value)}
                      className={`group w-full flex items-center justify-between py-3.5 px-4 rounded-2xl transition-all ${
                        isActive
                          ? 'bg-white text-black font-black'
                          : 'text-gray-300 hover:text-white hover:bg-white/5 font-bold'
                      }`}
                    >
                      <span className="font-syne text-2xl tracking-wider uppercase">
                        {item.label}
                      </span>
                      <ArrowRight className={`w-5 h-5 transition-transform ${
                        isActive ? 'text-black translate-x-1' : 'text-gray-500 group-hover:translate-x-1 group-hover:text-white'
                      }`} />
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions & Footer */}
            <div className="pt-6 border-t border-white/10 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenWishlist();
                  }}
                  className="flex items-center justify-center space-x-2 py-3.5 px-4 bg-white/10 hover:bg-white/15 rounded-2xl text-xs font-bold uppercase tracking-wider transition-colors relative"
                >
                  <Heart className="w-4 h-4 text-rose-400" />
                  <span>Wishlist ({wishlistCount})</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCart();
                  }}
                  className="flex items-center justify-center space-x-2 py-3.5 px-4 bg-white text-black rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Bag ({cartCount})</span>
                </button>
              </div>

              <div className="text-center text-[10px] text-gray-500 font-medium tracking-wider">
                © 2026 SAQIB VISUAL. ALL RIGHTS RESERVED.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
