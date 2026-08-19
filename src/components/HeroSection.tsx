import React, { useState } from 'react';
import { Shoe, ShoeColorway } from '../types';
import { ShoppingBag, RotateCw, Sparkles, Check, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

/* Smooth staggered character/word text animation component with slide left/right */
const AnimatedText: React.FC<{
  text: string;
  className?: string;
  delayOffset?: number;
  mode?: 'chars' | 'words';
  direction?: 'left' | 'right' | 'up';
}> = ({ text, className = "", delayOffset = 0.3, mode = 'chars', direction = 'left' }) => {
  if (!text) return null;

  const startX = direction === 'left' ? -60 : direction === 'right' ? 60 : 0;
  const startY = direction === 'up' ? 25 : 0;

  if (mode === 'words') {
    const words = text.split(" ");
    return (
      <span className={`inline-flex flex-wrap gap-x-1 ${className}`}>
        {words.map((word, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, x: startX, y: startY, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 18,
              delay: delayOffset + idx * 0.05,
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </span>
    );
  }

  const words = text.split(" ");
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.22em]">
          {word.split("").map((char, cIdx) => (
            <motion.span
              key={cIdx}
              initial={{ opacity: 0, x: startX, y: startY, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 18,
                delay: delayOffset + wIdx * 0.07 + cIdx * 0.02,
              }}
              className="inline-block origin-bottom transform-gpu"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
};

interface HeroSectionProps {
  heroShoes: Shoe[];
  currentHeroIndex: number;
  setCurrentHeroIndex: (index: number) => void;
  onAddToCart: (shoe: Shoe, size: number, color: ShoeColorway) => void;
  onQuickView: (shoe: Shoe) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heroShoes,
  currentHeroIndex,
  setCurrentHeroIndex,
  onAddToCart,
  onQuickView,
}) => {
  const currentShoe = heroShoes[currentHeroIndex] || heroShoes[0];
  const [selectedSize, setSelectedSize] = useState<number>(currentShoe?.availableSizes[2] || 8);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [is360Active, setIs360Active] = useState<boolean>(false);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  const selectedColor = currentShoe?.colorways[selectedColorIndex] || currentShoe?.colorways[0];

  const handleNextHero = () => {
    setCurrentHeroIndex((currentHeroIndex + 1) % heroShoes.length);
    setSelectedColorIndex(0);
    setRotationAngle(0);
  };

  const handlePrevHero = () => {
    setCurrentHeroIndex((currentHeroIndex - 1 + heroShoes.length) % heroShoes.length);
    setSelectedColorIndex(0);
    setRotationAngle(0);
  };

  const handleAddToCart = () => {
    if (!currentShoe) return;
    onAddToCart(currentShoe, selectedSize, selectedColor);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <section className="relative overflow-hidden pt-3 pb-6 sm:pt-6 sm:pb-10 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Background Container matching image light grey studio backdrop */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#e3e6e8] to-[#d0d4d7] border border-white/60 shadow-inner overflow-hidden flex flex-col justify-between p-4 sm:p-8 lg:p-10">
        
        {/* Dynamic Color Tint Overlay */}
        <div 
           className="absolute inset-0 mix-blend-color transition-colors duration-700 opacity-[0.15] pointer-events-none"
           style={{ backgroundColor: selectedColor.hex }}
        />

        {/* HUGE Backdrop Watermark Text "78" */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          <span className="font-syne font-black text-[160px] sm:text-[300px] md:text-[400px] lg:text-[450px] tracking-tighter text-black/[0.04] leading-none transform translate-y-4 sm:translate-y-8">
            78
          </span>
        </motion.div>

        {/* Top Header Row in Hero */}
        <motion.div 
          initial={{ opacity: 0, y: -35, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.15 }}
          className="relative z-10 flex flex-wrap items-center justify-between gap-2 mb-2 sm:mb-0"
        >
          <motion.div 
            initial={{ opacity: 0, x: -40, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="inline-flex items-center space-x-1.5 sm:space-x-2 bg-white/70 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/80 text-[10px] sm:text-xs font-bold tracking-wider text-black shadow-sm"
          >
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 animate-pulse" />
            <span>EXOTEK NITRO™ SERIES</span>
          </motion.div>

          {/* 360 View Mode Toggle */}
          <motion.button
            initial={{ opacity: 0, x: 40, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.25 }}
            onClick={() => setIs360Active(!is360Active)}
            className={`inline-flex items-center space-x-1.5 text-[10px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full transition-all duration-300 border shadow-sm ${
              is360Active
                ? 'bg-black text-white border-black'
                : 'bg-white/60 text-gray-800 border-white/80 hover:bg-white'
            }`}
          >
            <RotateCw className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${is360Active ? 'animate-spin' : ''}`} />
            <span>{is360Active ? 'Interactive 360° On' : '360° View'}</span>
          </motion.button>
        </motion.div>

        {/* Center Grid: Slogan (Left), Floating Shoe (Center), Specs & Price (Right) */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-4 sm:gap-6 my-2 sm:my-4 flex-1">
          
          {/* Floating Shoe Display (Mobile First - Order 1 on mobile, Center on desktop) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 18, delay: 0.25 }}
            className="lg:col-span-6 flex flex-col items-center justify-center relative order-1 lg:order-2 py-3 sm:py-0"
          >
            {/* Mobile Nav Arrows over Image with enhanced touch targets */}
            <button
              onClick={handlePrevHero}
              className="lg:hidden absolute left-1 sm:left-2 z-20 p-2.5 rounded-full bg-white/90 backdrop-blur-md text-black shadow-lg border border-white active:scale-90 transition-transform"
              aria-label="Previous shoe"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNextHero}
              className="lg:hidden absolute right-1 sm:right-2 z-20 p-2.5 rounded-full bg-white/90 backdrop-blur-md text-black shadow-lg border border-white active:scale-90 transition-transform"
              aria-label="Next shoe"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            {/* Interactive Shoe Rotation Slider or Drag */}
            <div 
              className="relative w-full max-w-[240px] sm:max-w-[320px] lg:max-w-[400px] aspect-[4/3] flex items-center justify-center cursor-pointer group"
              onClick={() => onQuickView(currentShoe)}
            >
              {/* Product Image with Framer Motion */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentShoe.id + selectedColor.name}
                  src={selectedColor.image || currentShoe.image}
                  alt={currentShoe.fullName}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, x: 80, y: 40, rotate: 15, scale: 0.6 }}
                  animate={{ opacity: 1, x: 0, y: is360Active ? 0 : -6, rotate: -25 + rotationAngle, scale: 1 }}
                  exit={{ opacity: 0, x: -80, y: -40, rotate: -50, scale: 0.6 }}
                  transition={{ type: "spring", stiffness: 150, damping: 16 }}
                  className={`w-full h-auto object-contain drop-shadow-2xl ${
                    is360Active ? 'cursor-ew-resize' : ''
                  }`}
                  style={{
                    filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.2))'
                  }}
                />
              </AnimatePresence>

              {/* Floor Shadow */}
              <div className="absolute -bottom-1 w-3/4 h-5 sm:h-6 shoe-shadow rounded-full pointer-events-none opacity-80 transition-all duration-300 group-hover:scale-110" />
            </div>

            {/* 360 Degree Drag slider if 360 is active */}
            {is360Active && (
              <div className="w-full max-w-[200px] mt-2 px-3 py-1.5 bg-white/80 rounded-full backdrop-blur-sm border border-black/10 flex items-center space-x-2 shadow-sm">
                <span className="text-[9px] font-extrabold text-gray-700">ROTATE</span>
                <input
                  type="range"
                  min="-30"
                  max="30"
                  value={rotationAngle}
                  onChange={(e) => setRotationAngle(Number(e.target.value))}
                  className="w-full accent-black cursor-pointer h-1 bg-gray-200 rounded-lg"
                />
              </div>
            )}
          </motion.div>

          {/* Left Column: Slogan & Colorways (Slide In From LEFT) */}
          <motion.div 
            initial={{ opacity: 0, x: -80, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 130, damping: 18, delay: 0.3 }}
            className="lg:col-span-3 text-left order-2 lg:order-1 bg-white/40 lg:bg-transparent p-3.5 sm:p-0 rounded-2xl border border-white/50 lg:border-0"
          >
            <motion.h1 
              key={`slogan-${currentShoe.id}`}
              className="font-syne font-black text-xl sm:text-3xl lg:text-4xl tracking-tight text-gray-950 uppercase leading-none drop-shadow-sm"
            >
              <AnimatedText text={currentShoe.heroSlogan || 'FOREVER FASTER..'} direction="left" delayOffset={0.35} />
            </motion.h1>
            <motion.p 
              key={`desc-${currentShoe.id}`}
              className="mt-1.5 sm:mt-2.5 text-[11px] sm:text-xs text-gray-700 font-medium max-w-xs lg:max-w-[200px] leading-relaxed"
            >
              <AnimatedText 
                text="Puma’s pinnacle NITRO™ cushioning system engineered for explosive street energy." 
                mode="words" 
                direction="left"
                delayOffset={0.45} 
              />
            </motion.p>

            {/* Available Colorways Swatches */}
            <motion.div 
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 160, damping: 18, delay: 0.55 }}
              className="mt-3 sm:mt-5 space-y-1"
            >
              <span className="text-[10px] font-extrabold text-gray-600 uppercase tracking-wider block">
                Colorways: <span className="text-black">{selectedColor.name}</span>
              </span>
              <div className="flex items-center space-x-2 pt-0.5">
                {currentShoe.colorways.map((cw, idx) => (
                  <button
                    key={cw.name}
                    onClick={() => setSelectedColorIndex(idx)}
                    className={`w-7 h-7 sm:w-6 sm:h-6 rounded-full border-2 transition-transform duration-200 flex items-center justify-center ${
                      selectedColorIndex === idx
                        ? 'border-black scale-110 shadow-sm'
                        : 'border-white hover:scale-105'
                    }`}
                    style={{ backgroundColor: cw.hex }}
                    title={cw.name}
                  >
                    {selectedColorIndex === idx && (
                      <span className="w-2 h-2 sm:w-1.5 sm:h-1.5 rounded-full bg-white shadow-sm" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Title, Price, Size & Add To Cart (Slide In From RIGHT) */}
          <motion.div 
            initial={{ opacity: 0, x: 80, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 130, damping: 18, delay: 0.35 }}
            className="lg:col-span-3 text-left lg:text-right order-3 bg-white/40 lg:bg-transparent p-3.5 sm:p-0 rounded-2xl border border-white/50 lg:border-0 space-y-3"
          >
            <div>
              <div className="inline-flex items-center space-x-1 text-amber-500 text-xs font-extrabold mb-0.5 lg:justify-end w-full">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>5.0</span>
                <span className="text-gray-500 font-normal">({currentShoe.reviewCount})</span>
              </div>

              <motion.h2 
                key={`title-${currentShoe.id}`}
                className="text-base sm:text-xl font-extrabold text-gray-900 tracking-tight leading-snug"
              >
                <AnimatedText text={currentShoe.fullName} direction="right" delayOffset={0.4} />
              </motion.h2>

              <motion.div 
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.55 }}
                className="mt-1 text-base sm:text-xl font-black text-black tracking-wide"
              >
                Rs{currentShoe.price.toLocaleString()}/-
                {currentShoe.originalPrice && (
                  <span className="text-xs text-gray-500 font-semibold line-through ml-2">
                    Rs{currentShoe.originalPrice.toLocaleString()}
                  </span>
                )}
              </motion.div>
            </div>

            {/* Shoe Size Picker */}
            <div className="space-y-1.5 lg:flex lg:flex-col lg:items-end">
              <div className="flex justify-between items-center w-full lg:w-auto">
                <span className="text-[10px] font-extrabold text-gray-700 uppercase tracking-wider">
                  Select UK Size
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 justify-start lg:justify-end">
                {currentShoe.availableSizes.map((size, idx) => (
                  <motion.button
                    key={size}
                    initial={{ opacity: 0, x: 40, scale: 0.7 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.6 + idx * 0.04 }}
                    onClick={() => setSelectedSize(size)}
                    className={`w-9 h-9 sm:w-8 sm:h-8 rounded-lg text-xs font-extrabold transition-all duration-200 active:scale-95 ${
                      selectedSize === size
                        ? 'bg-black text-white shadow-md scale-105 ring-2 ring-amber-400/50'
                        : 'bg-white/90 hover:bg-white text-gray-800 border border-black/10'
                    }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quick Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.7 }}
              className="grid grid-cols-2 lg:grid-cols-1 gap-2 pt-1"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.92 }}
                animate={addedAnimation ? { scale: [1, 1.1, 1] } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                onClick={handleAddToCart}
                disabled={addedAnimation}
                className={`w-full py-3 sm:py-2.5 px-3 rounded-full font-extrabold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-1 shadow-md active:scale-95 ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>ADDED</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>ADD TO BAG</span>
                  </>
                )}
              </motion.button>

              <button
                onClick={() => onQuickView(currentShoe)}
                className="w-full py-2.5 px-3 rounded-full font-extrabold text-[10px] sm:text-xs tracking-wider text-gray-800 bg-white/80 hover:bg-white border border-black/10 transition-colors text-center"
              >
                SPECS
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Pagination & Slide Navigation Control (Slide Up from Bottom) */}
        <motion.div 
          initial={{ opacity: 0, y: 35, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 140, damping: 18, delay: 0.8 }}
          className="relative z-10 flex items-center justify-between pt-2.5 mt-2 border-t border-black/5"
        >
          {/* Arrow Left */}
          <button
            onClick={handlePrevHero}
            className="hidden sm:flex p-2 rounded-full bg-white/70 hover:bg-white text-black border border-black/10 transition-colors shadow-sm"
            title="Previous Hero Shoe"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Slider Thumbnails */}
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 overflow-x-auto px-1 py-1 w-full sm:w-auto no-scrollbar">
            {heroShoes.map((shoe, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentHeroIndex(idx);
                  setSelectedColorIndex(0);
                  setRotationAngle(0);
                }}
                className={`relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-[1rem] sm:rounded-[1.25rem] flex-shrink-0 transition-all duration-300 flex items-center justify-center ${
                  currentHeroIndex === idx
                    ? 'bg-white shadow-md border-2 border-black scale-105 z-10'
                    : 'bg-white/50 hover:bg-white/80 border border-white/60'
                }`}
                title={shoe.fullName}
              >
                <img 
                  src={shoe.image} 
                  alt={shoe.fullName} 
                  className="w-[85%] h-[85%] object-contain -rotate-[20deg]"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>

          {/* Arrow Right */}
          <button
            onClick={handleNextHero}
            className="hidden sm:flex p-2 rounded-full bg-white/70 hover:bg-white text-black border border-black/10 transition-colors shadow-sm"
            title="Next Hero Shoe"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};
