import React from 'react';
import { motion } from 'motion/react';
import { Shoe, CurrencyCode } from '../types';
import { Clock, Eye, ShoppingBag, Sparkles } from 'lucide-react';
import { formatPrice } from '../utils/currency';

interface RecentlyViewedProps {
  shoes?: Shoe[];
  allShoes?: Shoe[];
  recentlyViewedIds?: string[];
  onSelectShoe?: (shoe: Shoe) => void;
  onQuickView?: (shoe: Shoe) => void;
  onAddToCart?: (shoe: Shoe, size: number, color: any) => void;
  currency?: CurrencyCode;
}

export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
  shoes: directShoes,
  allShoes = [],
  recentlyViewedIds = [],
  onSelectShoe,
  onQuickView,
  onAddToCart,
  currency = 'PKR' as CurrencyCode,
}) => {
  const handleSelect = onQuickView || onSelectShoe || (() => {});

  // Compute viewed shoes
  const shoes = directShoes || recentlyViewedIds
    .map((id) => allShoes.find((s) => s.id === id))
    .filter((s): s is Shoe => Boolean(s));

  if (!shoes || shoes.length === 0) return null;

  return (
    <section className="py-12 bg-gradient-to-b from-gray-950 to-black text-white border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-amber-400/10 border border-amber-400/30 rounded-xl text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-syne text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                RECENTLY <span className="text-amber-400">VIEWED</span>
              </h3>
              <p className="text-xs text-gray-400 font-medium">Your recently browsed sneakers & footwear</p>
            </div>
          </div>

          <span className="text-[11px] font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full uppercase tracking-wider hidden sm:inline-flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>SAVED FOR YOU</span>
          </span>
        </div>

        {/* Horizontal Carousel Row */}
        <div className="flex items-center space-x-4 overflow-x-auto pb-4 pt-1 scrollbar-thin scrollbar-thumb-amber-400/20">
          {shoes.map((shoe) => (
            <motion.div
              key={shoe.id}
              whileHover={{ y: -4 }}
              className="min-w-[200px] sm:min-w-[240px] max-w-[240px] bg-white/5 border border-white/10 hover:border-amber-400/40 rounded-2xl p-3 flex flex-col justify-between transition-all group shrink-0 relative overflow-hidden"
            >
              <div 
                className="cursor-pointer"
                onClick={() => handleSelect(shoe)}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] bg-gradient-to-b from-white/10 to-transparent rounded-xl flex items-center justify-center p-2 mb-2 group-hover:scale-105 transition-transform">
                  <img
                    src={shoe.image}
                    alt={shoe.model}
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                  <div className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest block">
                    {shoe.brand}
                  </span>
                  <h4 className="font-syne text-xs font-black text-white truncate">
                    {shoe.model}
                  </h4>
                  <p className="text-xs font-black text-amber-300">
                    {formatPrice(shoe.price, currency)}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              {onAddToCart && (
                <button
                  onClick={() => onAddToCart(shoe, shoe.availableSizes[0] || 8, shoe.colorways[0])}
                  className="mt-3 w-full py-2 bg-white/10 hover:bg-amber-400 hover:text-black text-white text-[10px] font-black uppercase rounded-lg transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>QUICK ADD</span>
                </button>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
