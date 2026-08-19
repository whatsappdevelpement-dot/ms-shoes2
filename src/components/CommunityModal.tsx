import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  Gift, 
  Check, 
  Copy, 
  Mail, 
  Users, 
  ArrowRight, 
  Percent, 
  ShieldCheck, 
  Truck 
} from 'lucide-react';
import { fireCheckoutConfetti } from '../utils/confetti';

interface CommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaimDiscount: (code: string) => void;
}

export const COMMUNITY_PROMO_CODE = 'JOIN10';

export const CommunityModal: React.FC<CommunityModalProps> = ({
  isOpen,
  onClose,
  onClaimDiscount,
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setErrorMsg('');
    setIsSubmitted(true);
    fireCheckoutConfetti();
  };

  const handleCopyAndApply = () => {
    navigator.clipboard.writeText(COMMUNITY_PROMO_CODE);
    setCopied(true);
    onClaimDiscount(COMMUNITY_PROMO_CODE);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ type: 'spring', stiffness: 320, damping: 25 }}
            className="bg-gradient-to-b from-gray-900/95 via-gray-950/98 to-black text-white w-full max-w-lg rounded-3xl border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden my-auto p-6 sm:p-8 relative backdrop-blur-2xl"
          >
            {/* Background Ambient Glow FX */}
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white rounded-full transition-all duration-200 z-10 active:scale-95"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div className="space-y-6 relative z-10">
                {/* Header Icon & Badge */}
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-amber-400/10 border border-amber-400/30 rounded-full text-amber-300 text-xs font-bold tracking-wider uppercase shadow-inner">
                    <Users className="w-4 h-4 text-amber-400" />
                    <span>JOIN OUR COMMUNITY</span>
                  </div>

                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 text-black rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20 rotate-3">
                    <Percent className="w-8 h-8 font-black" />
                  </div>

                  <h2 className="font-syne text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                    UNLOCK <span className="text-amber-400">10% OFF</span> YOUR FIRST ORDER
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium max-w-xs sm:max-w-sm mx-auto">
                    Subscribe to the Puma Insiders Club for instant 10% savings, secret drop alerts, and VIP nationwide delivery perks.
                  </p>
                </div>

                {/* VIP Perks List */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-2 text-xs">
                  <div className="flex items-center space-x-2.5 text-gray-200">
                    <div className="p-1 bg-emerald-500/20 text-emerald-400 rounded-md">
                      <Gift className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-bold text-white">10% Instant Discount Code</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-gray-200">
                    <div className="p-1 bg-amber-500/20 text-amber-400 rounded-md">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium">Early access to limited celebrity drops</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-gray-200">
                    <div className="p-1 bg-blue-500/20 text-blue-400 rounded-md">
                      <Truck className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium">Free express door-step delivery nationwide</span>
                  </div>
                </div>

                {/* Email Signup Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all font-medium"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-[11px] text-rose-400 font-semibold">{errorMsg}</p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black uppercase text-xs sm:text-sm tracking-wider rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>CLAIM 10% DISCOUNT</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </form>

                {/* Dismiss Text Link */}
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-[11px] text-gray-400 hover:text-gray-200 underline underline-offset-4 font-medium transition-colors cursor-pointer"
                  >
                    No thanks, I'll pay full price
                  </button>
                </div>
              </div>
            ) : (
              /* Success Claim View */
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center relative z-10 py-2"
              >
                <div className="w-16 h-16 bg-emerald-500 text-black rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/30">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-syne text-2xl font-black uppercase tracking-tight text-white">
                    WELCOME TO THE <span className="text-emerald-400">COMMUNITY!</span>
                  </h3>
                  <p className="text-xs text-gray-300 font-medium max-w-xs mx-auto">
                    Your 10% VIP discount code is ready to use below.
                  </p>
                </div>

                {/* Promo Code Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/80 to-gray-900 border border-amber-400/40 shadow-inner space-y-2">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
                    YOUR EXCLUSIVE PROMO CODE
                  </span>
                  <div className="font-syne text-2xl font-black tracking-widest text-amber-400 bg-black/60 py-2 rounded-xl border border-amber-400/30 select-all">
                    {COMMUNITY_PROMO_CODE}
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Valid for 10% off any pair in your cart!
                  </p>
                </div>

                {/* Apply CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCopyAndApply}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-black font-black uppercase text-xs sm:text-sm tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>COPIED & APPLIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>COPY CODE & START SHOPPING</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
