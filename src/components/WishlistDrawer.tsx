import React from 'react';
import { Shoe, ShoeColorway } from '../types';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistShoes: Shoe[];
  onRemoveFromWishlist: (shoe: Shoe) => void;
  onAddToCart: (shoe: Shoe, size: number, color: ShoeColorway) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistShoes,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#e6e9eb] border-l border-white/60 shadow-2xl flex flex-col justify-between p-4 sm:p-6 overflow-y-auto">
          
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/10 pb-4">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-rose-600 fill-current" />
                <h2 className="font-syne text-lg font-black text-black uppercase tracking-wider">
                  WISHLIST ({wishlistShoes.length})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-black/10 text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="mt-6 space-y-4">
              {wishlistShoes.length > 0 ? (
                wishlistShoes.map((shoe) => (
                  <div
                    key={shoe.id}
                    className="bg-white/80 p-3.5 rounded-2xl border border-black/5 flex items-center space-x-3 shadow-sm"
                  >
                    <div className="w-16 h-16 bg-[#dcdfe1] rounded-xl p-1 flex-shrink-0 flex items-center justify-center">
                      <img
                        src={shoe.image}
                        alt={shoe.fullName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-black truncate">
                        {shoe.fullName}
                      </h4>
                      <div className="text-xs font-black text-black mt-1">
                        Rs{shoe.price.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 items-end">
                      <button
                        onClick={() => onRemoveFromWishlist(shoe)}
                        className="text-gray-400 hover:text-rose-600 p-1"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          onAddToCart(shoe, shoe.availableSizes[2] || 8, shoe.colorways[0]);
                          onRemoveFromWishlist(shoe);
                        }}
                        className="px-3 py-1 bg-black text-white text-[10px] font-extrabold rounded-full hover:bg-gray-800 transition-colors flex items-center space-x-1"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>MOVE TO BAG</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 space-y-3">
                  <Heart className="w-12 h-12 text-gray-400 mx-auto" />
                  <p className="text-sm font-bold text-gray-600">Your wishlist is empty.</p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-black text-white rounded-full font-bold text-xs uppercase tracking-wider hover:bg-gray-800 transition-colors mt-6"
          >
            CLOSE WISHLIST
          </button>

        </div>
      </div>
    </div>
  );
};
