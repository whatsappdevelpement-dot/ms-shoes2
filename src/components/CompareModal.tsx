import React from 'react';
import { Shoe, ShoeColorway } from '../types';
import { X, Check, ShoppingBag, Sparkles, Sliders, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  compareShoes: Shoe[];
  onRemoveFromCompare: (shoeId: string) => void;
  onAddToCart: (shoe: Shoe, size: number, color: ShoeColorway) => void;
  onQuickView: (shoe: Shoe) => void;
  onClearCompare: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  compareShoes,
  onRemoveFromCompare,
  onAddToCart,
  onQuickView,
  onClearCompare,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white w-full max-w-5xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/5">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-amber-400 text-black rounded-2xl shadow-lg">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-syne text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                  SPECIFICATION <span className="text-amber-400">COMPARISON</span>
                </h2>
                <p className="text-xs text-gray-400 font-medium">
                  Side-by-side performance & luxury breakdown ({compareShoes.length}/4 selected)
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {compareShoes.length > 0 && (
                <button
                  onClick={onClearCompare}
                  className="text-xs font-bold text-gray-400 hover:text-rose-400 transition-colors uppercase tracking-wider hidden sm:block"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Comparison Matrix */}
          <div className="p-6 overflow-x-auto">
            {compareShoes.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto text-amber-400">
                  <Sliders className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white">No Shoes Selected to Compare</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto">
                  Click the compare icon on any product card in the store to select up to 4 pairs and compare specs!
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-amber-400 text-black font-black text-xs uppercase tracking-widest rounded-full hover:bg-amber-300 transition-colors shadow-lg"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-4 w-48 text-xs font-black uppercase tracking-widest text-amber-400 bg-white/5 rounded-tl-2xl">
                      SPECIFICATIONS
                    </th>
                    {compareShoes.map((shoe) => (
                      <th key={shoe.id} className="p-4 text-center min-w-[200px] relative group">
                        <button
                          onClick={() => onRemoveFromCompare(shoe.id)}
                          className="absolute top-2 right-2 p-1 bg-white/10 hover:bg-rose-600 text-white rounded-full transition-colors"
                          title="Remove from compare"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex flex-col items-center space-y-2">
                          <img
                            src={shoe.image}
                            alt={shoe.fullName}
                            className="w-28 h-20 object-contain drop-shadow-xl cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => onQuickView(shoe)}
                            referrerPolicy="no-referrer"
                          />
                          <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase">
                            {shoe.brand}
                          </span>
                          <h4 className="text-xs font-extrabold text-white line-clamp-1">{shoe.fullName}</h4>
                          <span className="text-sm font-black text-amber-300">
                            Rs {shoe.price.toLocaleString()}
                          </span>
                          <button
                            onClick={() => {
                              onAddToCart(shoe, shoe.availableSizes[1] || 8, shoe.colorways[0]);
                            }}
                            className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-black text-[10px] font-black uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center space-x-1.5 transition-colors"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Quick Add</span>
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10 text-xs">
                  {/* Category & Gender */}
                  <tr>
                    <td className="p-4 font-bold uppercase tracking-wider text-gray-400 bg-white/5">
                      Collection / Gender
                    </td>
                    {compareShoes.map((shoe) => (
                      <td key={shoe.id} className="p-4 text-center font-bold text-gray-200">
                        {shoe.category} ({shoe.gender})
                      </td>
                    ))}
                  </tr>

                  {/* Rating */}
                  <tr>
                    <td className="p-4 font-bold uppercase tracking-wider text-gray-400 bg-white/5">
                      User Rating
                    </td>
                    {compareShoes.map((shoe) => (
                      <td key={shoe.id} className="p-4 text-center">
                        <div className="inline-flex items-center space-x-1 text-amber-400 font-extrabold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{shoe.rating.toFixed(1)}</span>
                          <span className="text-[10px] text-gray-400">({shoe.reviewCount})</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Cushioning Tech */}
                  <tr>
                    <td className="p-4 font-bold uppercase tracking-wider text-gray-400 bg-white/5">
                      Cushioning Tech
                    </td>
                    {compareShoes.map((shoe) => (
                      <td key={shoe.id} className="p-4 text-center">
                        <span className="px-2.5 py-1 bg-amber-400/10 text-amber-300 border border-amber-400/20 rounded-full text-[11px] font-black">
                          {shoe.specs.cushioning}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Upper Material */}
                  <tr>
                    <td className="p-4 font-bold uppercase tracking-wider text-gray-400 bg-white/5">
                      Upper Construction
                    </td>
                    {compareShoes.map((shoe) => (
                      <td key={shoe.id} className="p-4 text-center font-medium text-gray-300">
                        {shoe.specs.upper}
                      </td>
                    ))}
                  </tr>

                  {/* Midsole */}
                  <tr>
                    <td className="p-4 font-bold uppercase tracking-wider text-gray-400 bg-white/5">
                      Midsole
                    </td>
                    {compareShoes.map((shoe) => (
                      <td key={shoe.id} className="p-4 text-center font-medium text-gray-300">
                        {shoe.specs.midsole}
                      </td>
                    ))}
                  </tr>

                  {/* Weight */}
                  <tr>
                    <td className="p-4 font-bold uppercase tracking-wider text-gray-400 bg-white/5">
                      Weight
                    </td>
                    {compareShoes.map((shoe) => (
                      <td key={shoe.id} className="p-4 text-center font-bold text-gray-200">
                        {shoe.specs.weight}
                      </td>
                    ))}
                  </tr>

                  {/* Colorways */}
                  <tr>
                    <td className="p-4 font-bold uppercase tracking-wider text-gray-400 bg-white/5">
                      Colorways
                    </td>
                    {compareShoes.map((shoe) => (
                      <td key={shoe.id} className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-1.5">
                          {shoe.colorways.map((c) => (
                            <span
                              key={c.name}
                              className="w-4 h-4 rounded-full border border-white/30 shadow-xs"
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Available Sizes */}
                  <tr>
                    <td className="p-4 font-bold uppercase tracking-wider text-gray-400 bg-white/5">
                      Available Sizes (UK)
                    </td>
                    {compareShoes.map((shoe) => (
                      <td key={shoe.id} className="p-4 text-center font-extrabold text-gray-300">
                        {shoe.availableSizes.join(', ')}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
