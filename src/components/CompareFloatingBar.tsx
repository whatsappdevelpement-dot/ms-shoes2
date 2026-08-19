import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shoe } from '../types';
import { SlidersHorizontal, X, ArrowRight, Sparkles } from 'lucide-react';

interface CompareFloatingBarProps {
  compareShoes: Shoe[];
  onOpenCompare: () => void;
  onRemoveFromCompare: (shoeId: string) => void;
  onClearCompare: () => void;
}

export const CompareFloatingBar: React.FC<CompareFloatingBarProps> = ({
  compareShoes,
  onOpenCompare,
  onRemoveFromCompare,
  onClearCompare,
}) => {
  if (compareShoes.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-2xl bg-black/90 text-white border border-amber-400/40 rounded-2xl p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center justify-between gap-3"
      >
        {/* Left Side Info */}
        <div className="flex items-center space-x-3 overflow-x-auto pr-2">
          <div className="p-2 bg-amber-400 text-black rounded-xl shrink-0 font-black">
            <SlidersHorizontal className="w-4 h-4" />
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-syne text-xs font-black uppercase text-amber-400 tracking-wider shrink-0 hidden sm:inline">
              COMPARE ({compareShoes.length}/4):
            </span>

            {/* Micro Shoes Thumbnails */}
            <div className="flex items-center space-x-2">
              {compareShoes.map((shoe) => (
                <div
                  key={shoe.id}
                  className="relative group bg-white/10 border border-white/20 rounded-lg p-1 w-9 h-9 flex items-center justify-center shrink-0"
                >
                  <img src={shoe.image} alt={shoe.model} className="w-full h-full object-contain" />
                  <button
                    onClick={() => onRemoveFromCompare(shoe.id)}
                    className="absolute -top-1.5 -right-1.5 p-0.5 bg-rose-600 text-white rounded-full opacity-90 hover:opacity-100 transition-opacity"
                    title="Remove"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right CTA Buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={onClearCompare}
            className="text-[10px] font-bold text-gray-400 hover:text-rose-400 transition-colors uppercase px-2 py-1 hidden sm:block"
          >
            Clear
          </button>

          <button
            onClick={onOpenCompare}
            className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black text-xs font-black px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 shadow-lg active:scale-95 cursor-pointer uppercase tracking-wider"
          >
            <span>COMPARE SPECS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
