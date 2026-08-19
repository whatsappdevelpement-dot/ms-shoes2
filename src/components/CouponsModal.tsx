import React, { useState } from 'react';
import { PROMO_DETAILS } from '../data/shoes';
import { X, Tag, Copy, Check, Sparkles, Truck, ShieldCheck, Clock, Percent } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CouponsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCoupon?: (code: string) => void;
}

export const CouponsModal: React.FC<CouponsModalProps> = ({
  isOpen,
  onClose,
  onApplyCoupon,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    if (onApplyCoupon) {
      onApplyCoupon(code);
    }
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[90] overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white w-full max-w-lg rounded-3xl border border-amber-400/30 shadow-2xl overflow-hidden my-auto p-6 relative"
        >
          {/* Top Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center space-y-2 pb-6 border-b border-white/10">
            <div className="w-12 h-12 bg-amber-400 text-black rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <Tag className="w-6 h-6" />
            </div>
            <h2 className="font-syne text-2xl font-black uppercase tracking-tight text-white">
              EXCLUSIVE <span className="text-amber-400">COUPON CODES</span>
            </h2>
            <p className="text-xs text-gray-400 font-medium max-w-xs mx-auto">
              Tap any coupon to copy code and unlock instant discounts + Free Nationwide Express Delivery!
            </p>
          </div>

          {/* Free Shipping Highlight Card */}
          <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border border-emerald-500/30 flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-500 text-black rounded-xl font-bold flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <div className="font-black text-emerald-300 uppercase tracking-wide flex items-center space-x-1">
                <span>FREE EXPRESS SHIPPING NATIONWIDE</span>
                <Sparkles className="w-3 h-3 text-amber-300" />
              </div>
              <p className="text-emerald-100/80 text-[11px] font-medium mt-0.5">
                All orders in Pakistan qualify for zero delivery fee. Delivered in 2-3 business days with door-step tracking!
              </p>
            </div>
          </div>

          {/* List of Coupon Cards */}
          <div className="mt-5 space-y-3 max-h-[340px] overflow-y-auto pr-1">
            {PROMO_DETAILS.map((promo) => (
              <div
                key={promo.code}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-3 transition-colors group relative overflow-hidden"
              >
                {/* Left Side Info */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-syne text-sm font-black text-amber-400 tracking-wider bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30 uppercase">
                      {promo.code}
                    </span>
                    <span className="text-xs font-black text-white bg-emerald-600/80 px-2 py-0.5 rounded-md">
                      {promo.discount}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-300 font-medium">
                    {promo.description}
                  </p>
                  {promo.minSpend > 0 && (
                    <span className="text-[10px] text-gray-400 font-bold block">
                      Min spend: Rs {promo.minSpend.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Right Action Button */}
                <button
                  onClick={() => handleCopy(promo.code)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center space-x-1.5 transition-all flex-shrink-0 ${
                    copiedCode === promo.code
                      ? 'bg-emerald-500 text-black'
                      : 'bg-amber-400 hover:bg-amber-300 text-black shadow-md'
                  }`}
                >
                  {copiedCode === promo.code ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>APPLY</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400 font-bold">
            <span className="flex items-center space-x-1">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>Offers valid for limited time only</span>
            </span>
            <span className="flex items-center space-x-1 text-emerald-400">
              <ShieldCheck className="w-3 h-3" />
              <span>100% Guaranteed Savings</span>
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
