import React, { useState } from 'react';
import { CartItem, CurrencyCode } from '../types';
import { PROMO_CODES, PROMO_DETAILS } from '../data/shoes';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { formatPrice } from '../utils/currency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onCheckout: (appliedDiscountPercent: number) => void;
  currency?: CurrencyCode;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  currency = 'PKR' as CurrencyCode,
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState<string | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.shoe.price * item.quantity, 0);
  const freeDeliveryThreshold = 5000;
  const isFreeShipping = subtotal >= freeDeliveryThreshold || subtotal === 0;
  const freeShippingProgress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  const discountAmount = subtotal * discountPercent;
  const shipping = isFreeShipping ? 0 : 250; // Free above threshold, otherwise Rs 250
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping);

  const handleApplyPromoCode = (codeToApply: string) => {
    const code = codeToApply.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setDiscountPercent(PROMO_CODES[code]);
      setAppliedPromo(code);
      setPromoInput(code);
      setPromoError(null);
    } else {
      setPromoError('Invalid code. Try "CELEB10" or "78FREE"');
    }
  };

  const handleApplyPromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleApplyPromoCode(promoInput);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#e6e9eb] border-l border-white/60 shadow-2xl flex flex-col justify-between p-4 sm:p-6 overflow-y-auto">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between border-b border-black/10 pb-4">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-black" />
                <h2 className="font-syne text-lg font-black text-black uppercase tracking-wider">
                  YOUR BAG ({cartItems.reduce((sum, i) => sum + i.quantity, 0)})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-black/10 text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dynamic Free Shipping Tracker */}
            <div className="mt-4 bg-white/80 p-3.5 rounded-2xl border border-black/5 text-xs font-bold text-gray-800 space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-[11px]">
                <span className="flex items-center space-x-1 font-black text-black uppercase">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>NATIONWIDE DELIVERY</span>
                </span>
                {isFreeShipping ? (
                  <span className="text-emerald-600 font-black uppercase flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>FREE SHIPPING UNLOCKED</span>
                  </span>
                ) : (
                  <span className="text-gray-600 font-bold">
                    Add <strong className="text-black">Rs {(freeDeliveryThreshold - subtotal).toLocaleString()}</strong> more
                  </span>
                )}
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>

              <p className="text-[10px] text-gray-500 text-center">
                {isFreeShipping
                  ? '✓ Free door-step delivery applied automatically!'
                  : 'Free express shipping on all orders above Rs 5,000 in Pakistan'}
              </p>
            </div>

            {/* Cart Items List */}
            <div className="mt-5 space-y-3">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/80 p-3.5 rounded-2xl border border-black/5 flex items-center space-x-3 shadow-sm hover:shadow transition-shadow"
                  >
                    {/* Item Image */}
                    <div className="w-16 h-16 bg-[#dcdfe1] rounded-xl p-1 flex-shrink-0 flex items-center justify-center">
                      <img
                        src={item.selectedColor.image || item.shoe.image}
                        alt={item.shoe.fullName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-black truncate">
                        {item.shoe.fullName}
                      </h4>
                      
                      <div className="flex items-center space-x-2 mt-1 text-[11px] text-gray-600 font-semibold">
                        <span>UK {item.selectedSize}</span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block border border-gray-300"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span className="truncate max-w-[80px]">{item.selectedColor.name}</span>
                        </span>
                      </div>

                      <div className="text-xs font-black text-black mt-1">
                        {formatPrice(item.shoe.price * item.quantity, currency)}
                      </div>
                    </div>

                    {/* Quantity & Delete */}
                    <div className="flex flex-col items-end space-y-2">
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-400 hover:text-rose-600 p-1 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center border border-black/10 rounded-full bg-white px-2 py-0.5 space-x-2 text-xs font-bold">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="hover:text-black text-gray-500"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="hover:text-black text-gray-500"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 space-y-3">
                  <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto" />
                  <p className="text-sm font-bold text-gray-600">Your shopping bag is empty.</p>
                  <button
                    onClick={onClose}
                    className="px-5 py-2 bg-black text-white text-xs font-bold rounded-full hover:bg-gray-800 transition-colors"
                  >
                    EXPLORE SNEAKERS
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Footer Calculations & Checkout */}
          {cartItems.length > 0 && (
            <div className="border-t border-black/10 pt-4 space-y-3 mt-6">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromoSubmit} className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Enter coupon code (e.g. 78FREE)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-white text-xs font-bold rounded-full border border-black/10 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-black text-white text-xs font-bold rounded-full hover:bg-gray-800 transition-colors"
                >
                  APPLY
                </button>
              </form>

              {/* Available Quick Promo Chips */}
              <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
                <span className="text-[10px] font-extrabold text-gray-500 uppercase mr-1">COUPONS:</span>
                {PROMO_DETAILS.slice(0, 4).map((p) => (
                  <button
                    key={p.code}
                    type="button"
                    onClick={() => handleApplyPromoCode(p.code)}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border transition-all ${
                      appliedPromo === p.code
                        ? 'bg-amber-400 text-black border-amber-500 shadow-xs ring-1 ring-black'
                        : 'bg-white text-gray-800 border-black/10 hover:border-black/30'
                    }`}
                  >
                    {p.code}
                  </button>
                ))}
              </div>

              {appliedPromo && (
                <div className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 p-2 rounded-xl flex items-center justify-between border border-emerald-300">
                  <span>Code <strong>{appliedPromo}</strong> applied ({Math.round(discountPercent * 100)}% off)</span>
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                </div>
              )}

              {promoError && (
                <p className="text-[11px] font-bold text-rose-600">{promoError}</p>
              )}

              {/* Price breakdown */}
              <div className="space-y-1.5 text-xs font-bold text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-black">{formatPrice(subtotal, currency)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Coupon Discount:</span>
                    <span>-{formatPrice(discountAmount, currency)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className={isFreeShipping ? "text-emerald-600 font-black" : "text-black font-bold"}>
                    {isFreeShipping ? "FREE" : formatPrice(250, currency)}
                  </span>
                </div>

                <div className="flex justify-between text-base font-black text-black pt-2 border-t border-black/10">
                  <span>Grand Total:</span>
                  <span>{formatPrice(grandTotal, currency)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => onCheckout(discountPercent)}
                className="w-full py-4 bg-black text-white rounded-full font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-gray-800 shadow-lg active:scale-95 transition-all"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-1 text-[10px] text-gray-500 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-black" />
                <span>100% Secure Doorstep Delivery Guaranteed</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
