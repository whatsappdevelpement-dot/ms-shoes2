import React, { useState } from 'react';
import { Shoe, ShoeColorway, CurrencyCode } from '../types';
import { X, ShoppingBag, ShieldCheck, Truck, RefreshCw, Check, Heart, Ruler, ArrowLeft, MessageSquarePlus, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { SizeGuideModal } from './SizeGuideModal';
import { StarRating } from './StarRating';
import { CustomerReviews } from './CustomerReviews';
import { formatPrice } from '../utils/currency';

interface ProductDetailModalProps {
  shoe: Shoe | null;
  onClose: () => void;
  onAddToCart: (shoe: Shoe, size: number, color: ShoeColorway, qty: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (shoe: Shoe) => void;
  onBuyNow: (shoe: Shoe, size: number, color: ShoeColorway, qty: number) => void;
  onOpenWriteReview?: (shoe: Shoe) => void;
  currency?: CurrencyCode;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  shoe,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onBuyNow,
  onOpenWriteReview,
  currency = 'PKR' as CurrencyCode,
}) => {
  if (!shoe) return null;

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(shoe.availableSizes[2] || 8);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');
  const [added, setAdded] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const currentColor = shoe.colorways[selectedColorIndex] || shoe.colorways[0];
  const [activeGalleryImage, setActiveGalleryImage] = useState<string | null>(null);

  const displayImage = activeGalleryImage || currentColor.image || shoe.image;

  // Multi-angle gallery images fallback
  const galleryImages = shoe.images && shoe.images.length > 0
    ? shoe.images
    : [
        currentColor.image || shoe.image,
        shoe.image,
        shoe.colorways[1]?.image || shoe.image,
      ].filter(Boolean);

  const handleAddToCart = () => {
    onAddToCart(shoe, selectedSize, currentColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    onBuyNow(shoe, selectedSize, currentColor, quantity);
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6 animate-fadeIn cursor-pointer"
    >
      <div 
        className="relative w-full max-w-4xl bg-[#e6e9eb] rounded-2xl sm:rounded-3xl border border-white/80 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Bar with Back Button & Close Button */}
        <div className="sticky top-0 z-40 bg-[#e6e9eb]/95 backdrop-blur-md px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between border-b border-black/10 shadow-xs flex-shrink-0">
          <button
            onClick={onClose}
            className="inline-flex items-center space-x-1.5 bg-black text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-black text-[11px] sm:text-xs uppercase tracking-wider shadow-md hover:bg-amber-400 hover:text-black transition-all active:scale-95 group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back</span>
          </button>

          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-black/80 truncate max-w-[150px] sm:max-w-xs px-2 text-center">
            {shoe.fullName}
          </span>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full bg-black/5 hover:bg-black/10 text-black transition-transform active:scale-90 flex items-center justify-center cursor-pointer"
            title="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 overflow-y-auto flex-1">
          
          {/* Left Column: Image Showcase */}
          <div className="md:col-span-6 bg-gradient-to-b from-[#f0f3f5] to-[#dbdee0] p-4 sm:p-8 flex flex-col justify-between relative min-h-[240px] sm:min-h-[360px]">
            {/* Top Tag */}
            <div className="flex items-center space-x-2">
              <span className="bg-black text-white text-[9px] sm:text-[10px] font-extrabold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase tracking-wider">
                {shoe.brand} OFFICIAL
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-gray-600 uppercase">
                {shoe.gender}
              </span>
            </div>

            {/* Main Image */}
            <div className="my-auto py-2 sm:py-4 relative flex items-center justify-center">
              <img
                src={displayImage}
                alt={shoe.fullName}
                referrerPolicy="no-referrer"
                className="w-full max-h-48 sm:max-h-72 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -bottom-1 w-3/4 h-4 sm:h-5 shoe-shadow rounded-full opacity-70" />
            </div>

            {/* Multi-Angle Gallery Thumbnails */}
            <div className="space-y-2">
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveGalleryImage(img)}
                    className={`w-12 h-12 rounded-xl border-2 p-1 bg-white/80 transition-all shrink-0 cursor-pointer ${
                      displayImage === img ? 'border-amber-500 scale-105 shadow-md' : 'border-gray-300 hover:border-black/50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>

              {/* Color Swatch Picker */}
              <div className="space-y-1 sm:space-y-1.5 pt-1">
                <span className="text-[10px] sm:text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">
                  Colorway: {currentColor.name}
                </span>
                <div className="flex items-center space-x-2">
                  {shoe.colorways.map((cw, idx) => (
                    <button
                      key={cw.name}
                      onClick={() => { setSelectedColorIndex(idx); setActiveGalleryImage(cw.image || null); }}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-transform flex items-center justify-center cursor-pointer ${
                        selectedColorIndex === idx
                          ? 'border-black scale-110 shadow-sm'
                          : 'border-white hover:scale-105'
                      }`}
                      style={{ backgroundColor: cw.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="md:col-span-6 p-4 sm:p-8 flex flex-col justify-between space-y-4 sm:space-y-6">
            <div>
              {/* Rating & Wishlist */}
              <div className="flex items-center justify-between">
                <StarRating rating={shoe.rating} reviewCount={shoe.reviewCount} size="md" />

                <button
                  onClick={() => onToggleWishlist(shoe)}
                  className={`p-2 rounded-full border transition-colors ${
                    isWishlisted ? 'bg-rose-50 border-rose-200 text-rose-600' : 'border-gray-300 text-gray-600 hover:text-black'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Title & Price */}
              <h2 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight mt-2 leading-tight">
                {shoe.fullName}
              </h2>

              <div className="mt-2 flex items-baseline space-x-3">
                <span className="text-xl sm:text-2xl font-black text-black">
                  {formatPrice(shoe.price, currency)}
                </span>
                {shoe.originalPrice && (
                  <span className="text-xs sm:text-sm font-semibold text-gray-500 line-through">
                    {formatPrice(shoe.originalPrice, currency)}
                  </span>
                )}
              </div>

              {/* Tabs */}
              <div className="flex border-b border-black/10 mt-4 space-x-4 sm:space-x-6">
                {(['overview', 'specs', 'reviews'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors relative ${
                      activeTab === tab ? 'text-black font-extrabold' : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="mt-3 text-xs text-gray-700 leading-relaxed min-h-[60px] sm:min-h-[90px]">
                {activeTab === 'overview' && (
                  <p>{shoe.description}</p>
                )}

                {activeTab === 'specs' && (
                  <div className="space-y-1.5 font-medium">
                    <div><strong className="text-black">Upper:</strong> {shoe.specs.upper}</div>
                    <div><strong className="text-black">Midsole:</strong> {shoe.specs.midsole}</div>
                    <div><strong className="text-black">Outsole:</strong> {shoe.specs.outsole}</div>
                    <div><strong className="text-black">Cushioning Level:</strong> {shoe.specs.cushioning}</div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-3">
                    <CustomerReviews
                      reviews={shoe.reviews}
                      averageRating={shoe.rating}
                      reviewCount={shoe.reviewCount}
                    />
                    {onOpenWriteReview && (
                      <button
                        onClick={() => onOpenWriteReview(shoe)}
                        className="w-full py-2 bg-black hover:bg-gray-800 text-amber-400 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer"
                      >
                        <MessageSquarePlus className="w-4 h-4" />
                        <span>WRITE A VERIFIED REVIEW</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Size Selector */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-gray-800">
                  <span>SELECT UK SIZE</span>
                  <button 
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-gray-500 hover:text-black underline cursor-pointer transition-colors flex items-center space-x-1 font-bold text-[11px]"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {shoe.availableSizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs font-extrabold transition-all ${
                        selectedSize === sz
                          ? 'bg-black text-white shadow-md'
                          : 'bg-white hover:bg-gray-100 text-gray-900 border border-black/10'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="mt-3 flex items-center space-x-3">
                <span className="text-xs font-bold text-gray-800">QUANTITY:</span>
                <div className="flex items-center bg-white border border-black/10 rounded-full px-3 py-1 space-x-3 text-xs font-bold">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="hover:text-black text-gray-500"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="hover:text-black text-gray-500"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-3 border-t border-black/10">
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.94 }}
                  animate={added ? { scale: [1, 1.08, 1] } : {}}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  onClick={handleAddToCart}
                  className={`py-3 px-3 sm:px-4 rounded-full font-extrabold text-[10px] sm:text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 sm:space-x-2 transition-all shadow-md ${
                    added ? 'bg-emerald-600 text-white' : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {added ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  <span>{added ? 'ADDED' : 'ADD TO BAG'}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  onClick={handleBuyNow}
                  className="py-3 px-3 sm:px-4 rounded-full font-extrabold text-[10px] sm:text-xs uppercase tracking-wider bg-amber-500 text-black hover:bg-amber-400 transition-colors shadow-md"
                >
                  BUY NOW
                </motion.button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-[9px] sm:text-[10px] text-gray-600 font-bold pt-2 text-center">
                <div className="flex items-center justify-center space-x-1">
                  <Truck className="w-3.5 h-3.5 text-black flex-shrink-0" />
                  <span>Free Express Delivery</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-black flex-shrink-0" />
                  <span>100% Authentic 78 Shoes</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <RefreshCw className="w-3.5 h-3.5 text-black flex-shrink-0" />
                  <span>30 Days Free Return</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      <SizeGuideModal 
        isOpen={isSizeGuideOpen} 
        onClose={() => setIsSizeGuideOpen(false)} 
        genderCategory={shoe.gender} 
      />
    </div>
  );
};
