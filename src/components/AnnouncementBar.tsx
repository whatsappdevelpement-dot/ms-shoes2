import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Tag, Truck, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const announcements = [
    {
      icon: <Sparkles className="w-3 h-3 text-amber-400 inline mr-1" />,
      text: "SAQIB VISUAL OFFICIAL STORE",
      highlight: "CELEBRITY FOOTWEAR",
    },
    {
      icon: <Truck className="w-3 h-3 text-emerald-400 inline mr-1" />,
      text: "FREE EXPRESS SHIPPING",
      highlight: "ON ORDERS OVER RS 5,000",
    },
    {
      icon: <Tag className="w-3 h-3 text-amber-300 inline mr-1" />,
      text: "SPECIAL DISCOUNT",
      highlight: "USE CODE: CELEB10 FOR 10% OFF",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-black text-white text-[10px] sm:text-[11px] font-black uppercase tracking-widest py-2 px-3 sm:px-6 relative z-50 border-b border-white/10"
    >
      {/* Desktop view: full horizontal layout */}
      <div className="hidden md:flex items-center justify-center space-x-3 text-center">
        <span className="flex items-center">
          {announcements[0].icon} {announcements[0].text}
        </span>
        <span className="text-amber-400 font-bold">•</span>
        <span className="flex items-center">
          {announcements[1].icon} {announcements[1].text} <strong className="text-amber-300 ml-1">{announcements[1].highlight}</strong>
        </span>
        <span className="text-amber-400 font-bold">•</span>
        <span className="flex items-center">
          {announcements[2].icon} {announcements[2].highlight}
        </span>
      </div>

      {/* Mobile view: animated ticker carousel with arrows */}
      <div className="flex md:hidden items-center justify-between min-h-[22px] overflow-hidden w-full">
        <button
          onClick={handlePrev}
          className="p-1 text-gray-400 hover:text-white active:scale-90 transition-transform flex-shrink-0"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="overflow-hidden relative w-full h-5 flex items-center justify-center text-center px-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-[11px] tracking-wider max-w-[80vw] mx-auto truncate"
            >
              <span className="flex items-center space-x-1 truncate">
                {announcements[currentIndex].icon}
                <span className="text-gray-200 truncate">{announcements[currentIndex].text}</span>
                <span className="text-amber-300 font-extrabold ml-1 truncate">
                  {announcements[currentIndex].highlight}
                </span>
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={handleNext}
          className="p-1 text-gray-400 hover:text-white active:scale-90 transition-transform flex-shrink-0"
          aria-label="Next announcement"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};
