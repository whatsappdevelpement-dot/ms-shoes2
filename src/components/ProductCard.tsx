import React, { useState } from 'react';
import { Shoe, ShoeColorway, CurrencyCode } from '../types';
import { Plus, Heart, Check, Eye, Sparkles, ShieldCheck, Scale, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { StarRating } from './StarRating';
import { formatPrice } from '../utils/currency';

interface ProductCardProps {
  shoe: Shoe;
  onAddToCart: (shoe: Shoe, size: number, color: ShoeColorway) => void;
  onQuickView: (shoe: Shoe) => void;
  isWishlisted: boolean;
  onToggleWishlist: (shoe: Shoe) => void;
  index?: number;
  isCompared?: boolean;
  onToggleCompare?: (shoe: Shoe) => void;
  viewMode?: 'grid' | 'list';
  currency?: CurrencyCode;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  shoe,
  onAddToCart,
  onQuickView,
  isWishlisted,
  onToggleWishlist,
  index = 0,
  isCompared = false,
  onToggleCompare,
  viewMode = 'grid',
  currency = 'PKR' as CurrencyCode,
}) => {
  const [added, setAdded] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ShoeColorway>(shoe.colorways[0]);
  const [selectedSize, setSelectedSize] = useState<number>(shoe.availableSizes[1] || shoe.availableSizes[0] || 8);
  const [showSizePicker, setShowSizePicker] = useState(false);

  // Active image based on selected colorway or default image
  const displayImage = selectedColor?.image || shoe.image;

  /* Simplified smooth hover state */
  const handleMouseEnter = () => {
    setShowSizePicker(false);
  };

  const handleMouseLeave = () => {
    setShowSizePicker(false);
  };

  const handleQuickAdd = (e: React.MouseEvent, sizeOverride?: number) => {
    e.stopPropagation();
    const sizeToUse = sizeOverride || selectedSize;
    onAddToCart(shoe, sizeToUse, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const discountPercent = shoe.originalPrice 
    ? Math.round(((shoe.originalPrice - shoe.price) / shoe.originalPrice) * 100) 
    : 0;

  /* ================= LIST VIEW LAYOUT ================= */
  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        onClick={() => onQuickView(shoe)}
        className="group relative bg-gradient-to-r from-[#f8f9fa] via-[#e9ecef] to-[#dee2e6] rounded-3xl p-4 sm:p-6 border border-black/10 hover:border-amber-400/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer overflow-hidden"
      >
        <div className="flex items-center space-x-4 sm:space-x-6 w-full md:w-auto">
          {/* Shoe Image */}
          <div className="relative w-32 h-28 sm:w-44 sm:h-36 flex-shrink-0 flex items-center justify-center">
            <img
              src={displayImage}
              alt={shoe.fullName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Details */}
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black tracking-widest text-amber-600 bg-amber-400/10 px-2 py-0.5 rounded-full uppercase border border-amber-400/20">
                {shoe.brand} OFFICIAL
              </span>
              {shoe.tag && (
                <span className="text-[9px] font-black tracking-wider px-2 py-0.5 rounded-full bg-black text-amber-300 uppercase shadow-xs">
                  {shoe.tag}
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-black text-black group-hover:text-amber-600 transition-colors">
              {shoe.fullName}
            </h3>

            <p className="text-xs text-gray-600 line-clamp-1 max-w-md hidden sm:block font-medium">
              {shoe.description}
            </p>

            <div className="flex items-center space-x-3 pt-1">
              <StarRating rating={shoe.rating} reviewCount={shoe.reviewCount} size="sm" />
              <span className="text-[10px] font-bold text-gray-500 uppercase">
                {shoe.specs.cushioning}
              </span>
            </div>

            {/* Color Swatches */}
            <div className="flex items-center space-x-1.5 pt-1">
              <span className="text-[10px] font-bold text-gray-500 uppercase mr-1">Colors:</span>
              {shoe.colorways.map((c) => (
                <button
                  key={c.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(c);
                  }}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    selectedColor.name === c.name ? 'scale-125 border-black ring-2 ring-amber-400' : 'border-black/20 opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Action Column */}
        <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-black/10 gap-4">
          <div className="text-left md:text-right">
            <div className="text-xl sm:text-2xl font-black text-black tracking-tight">
              {formatPrice(shoe.price, currency)}
            </div>
            {shoe.originalPrice && (
              <div className="text-xs text-gray-500 line-through">
                {formatPrice(shoe.originalPrice, currency)} (-{discountPercent}%)
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {onToggleCompare && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCompare(shoe);
                }}
                className={`p-2.5 rounded-full border transition-all ${
                  isCompared
                    ? 'bg-amber-400 text-black border-amber-500 shadow-md'
                    : 'bg-white/80 text-gray-600 border-black/10 hover:text-black'
                }`}
                title="Compare specs"
              >
                <Scale className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(shoe);
              }}
              className={`p-2.5 rounded-full border transition-all ${
                isWishlisted
                  ? 'text-rose-600 bg-white border-rose-200 shadow-md'
                  : 'text-gray-500 bg-white/80 border-black/10 hover:text-black'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={(e) => handleQuickAdd(e)}
              className="px-5 py-2.5 bg-black hover:bg-amber-400 hover:text-black text-white font-black text-xs uppercase tracking-wider rounded-full shadow-lg transition-colors flex items-center space-x-2"
            >
              {added ? <Check className="w-4 h-4 text-emerald-400" /> : <Plus className="w-4 h-4" />}
              <span>{added ? 'ADDED' : 'ADD TO BAG'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  /* ================= GRID VIEW LAYOUT ================= */
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
        whileHover={{ y: -4 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onQuickView(shoe)}
        className="group relative bg-gradient-to-b from-[#f8f9fa] via-[#e9ecef] to-[#dee2e6] rounded-3xl p-3.5 sm:p-5 border border-black/10 hover:border-amber-400/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
      >
        {/* Corner Gold Accent Line */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-400/20 to-transparent pointer-events-none rounded-tr-3xl" />

        {/* Top Badges & Actions */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center space-x-1">
            {shoe.tag ? (
              <span className="inline-flex items-center space-x-1 text-[9px] sm:text-[10px] font-black tracking-widest px-2.5 py-1 rounded-full bg-black text-amber-300 uppercase shadow-md border border-amber-400/30">
                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                <span>{shoe.tag}</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1 text-[9px] sm:text-[10px] font-extrabold text-black/70 uppercase tracking-widest bg-white/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-black/5 shadow-xs">
                <ShieldCheck className="w-2.5 h-2.5 text-black" />
                <span>{shoe.gender}</span>
              </span>
            )}

            {discountPercent > 0 && (
              <span className="text-[9px] sm:text-[10px] font-black tracking-wider px-2 py-0.5 rounded-full bg-emerald-600 text-white uppercase shadow-xs">
                -{discountPercent}%
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1.5">
            {onToggleCompare && (
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCompare(shoe);
                }}
                className={`p-1.5 sm:p-2 rounded-full transition-all duration-200 border ${
                  isCompared
                    ? 'bg-amber-400 text-black border-amber-500 shadow-md'
                    : 'text-gray-400 border-black/5 bg-white/80 hover:text-black hover:bg-white'
                }`}
                title="Compare Specs"
              >
                <Scale className="w-3.5 h-3.5" />
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(shoe);
              }}
              className={`p-1.5 sm:p-2 rounded-full transition-all duration-200 border ${
                isWishlisted
                  ? 'text-rose-600 bg-white border-rose-200 shadow-md'
                  : 'text-gray-400 border-black/5 bg-white/80 hover:text-black hover:bg-white'
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
            </motion.button>
          </div>
        </div>

        {/* Shoe Image Container */}
        <div className="relative w-full aspect-[4/3] my-2.5 flex items-center justify-center overflow-hidden rounded-2xl">
          <img
            src={displayImage}
            alt={shoe.fullName}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-108 drop-shadow-xl"
          />
          
          {/* Ground Shadow */}
          <div className="absolute bottom-1 w-3/4 h-3.5 shoe-shadow-light rounded-full pointer-events-none opacity-70 group-hover:opacity-100 transition-all duration-300" />

          {/* Quick View Overlay Button */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none rounded-2xl">
            <span className="bg-black/90 text-white text-xs font-black px-4 py-2 rounded-full shadow-xl flex items-center space-x-2 border border-amber-400/40 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span className="uppercase tracking-widest text-[10px]">QUICK VIEW</span>
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-1 space-y-1 sm:space-y-1.5">
          
          {/* Colorway Swatches Row */}
          <div className="flex items-center justify-between">
            <div className="text-[9px] sm:text-[10px] font-black tracking-widest text-black/80 uppercase truncate">
              {shoe.brand} OFFICIAL
            </div>
            {shoe.colorways.length > 1 && (
              <div className="flex items-center space-x-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                {shoe.colorways.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border transition-transform ${
                      selectedColor.name === c.name ? 'scale-125 border-black ring-1 ring-amber-400' : 'border-black/20 opacity-60 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Model Title */}
          <h3 className="text-[11px] sm:text-sm font-extrabold text-black leading-tight line-clamp-1 group-hover:text-amber-600 transition-colors">
            {shoe.fullName}
          </h3>

          {/* Price & Stock Urgency */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-baseline space-x-1">
              <span className="text-xs sm:text-lg font-black text-black tracking-tight whitespace-nowrap">
                {formatPrice(shoe.price, currency)}
              </span>
              {shoe.originalPrice && (
                <span className="text-[9px] sm:text-[11px] text-gray-500 font-semibold line-through whitespace-nowrap">
                  {formatPrice(shoe.originalPrice, currency)}
                </span>
              )}
            </div>

            {/* Micro stock alert */}
            <span className="text-[8px] sm:text-[9px] font-extrabold text-rose-600 flex items-center space-x-0.5 flex-shrink-0">
              <Flame className="w-2.5 h-2.5 text-rose-500 animate-pulse" />
              <span className="hidden sm:inline">Low Stock</span>
            </span>
          </div>

          {/* Size Pills Row on Hover / Quick Select */}
          <div className="pt-1.5 border-t border-black/5 flex items-center justify-between">
            {/* Rating Stars */}
            <StarRating rating={shoe.rating} reviewCount={shoe.reviewCount} size="sm" />

            {/* Size Dropdown / Quick Add */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                animate={added ? { scale: [1, 1.2, 1] } : {}}
                onClick={(e) => {
                  if (!showSizePicker) {
                    setShowSizePicker(true);
                  } else {
                    handleQuickAdd(e);
                  }
                }}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider border flex items-center space-x-1 sm:space-x-1.5 transition-all duration-200 shadow-sm ${
                  added
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-black text-white hover:bg-amber-400 hover:text-black border-black/30'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                    <span>ADDED</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span>UK {selectedSize}</span>
                  </>
                )}
              </motion.button>

              {/* Quick Size Dropdown Overlay */}
              {showSizePicker && !added && (
                <div className="absolute right-0 bottom-full mb-1 bg-black text-white p-2 rounded-xl shadow-2xl border border-white/20 z-40 min-w-[130px] space-y-1">
                  <div className="text-[8px] sm:text-[9px] font-bold uppercase text-gray-400 text-center border-b border-white/10 pb-0.5">
                    Select UK Size
                  </div>
                  <div className="grid grid-cols-4 gap-1 pt-0.5">
                    {shoe.availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={(e) => {
                          setSelectedSize(size);
                          setShowSizePicker(false);
                          handleQuickAdd(e, size);
                        }}
                        className={`p-1 text-[9px] sm:text-[10px] font-black rounded-md transition-colors ${
                          selectedSize === size
                            ? 'bg-amber-400 text-black'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
