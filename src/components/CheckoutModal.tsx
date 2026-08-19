import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { X, CheckCircle, Truck, CreditCard, Smartphone, Banknote, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { fireCheckoutConfetti } from '../utils/confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  appliedDiscountPercent: number;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  appliedDiscountPercent,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'wallet'>('cod');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Lahore',
  });
  const [orderId, setOrderId] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.shoe.price * item.quantity, 0);
  const discountAmount = subtotal * appliedDiscountPercent;
  const grandTotal = Math.max(0, subtotal - discountAmount);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert('Please fill out all required shipping fields.');
      return;
    }
    const generatedId = `SV-PK-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setStep('success');
    
    // Trigger celebratory confetti burst!
    setTimeout(() => {
      fireCheckoutConfetti();
    }, 150);
  };

  const handleFinish = () => {
    onOrderSuccess();
    onClose();
    setStep('form');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#e6e9eb] rounded-2xl sm:rounded-3xl border border-white/80 shadow-2xl p-4 sm:p-8 my-auto max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="border-b border-black/10 pb-4 mb-6">
              <h2 className="font-syne text-xl font-black text-black uppercase tracking-wider">
                EXPRESS CHECKOUT
              </h2>
              <p className="text-xs text-gray-600 font-medium">
                Enter delivery details for doorstep delivery within 2-3 business days.
              </p>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-5">
              
              {/* Shipping Form */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider">
                  1. Shipping Information
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white text-xs font-bold rounded-2xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Phone Number (03xx-xxxxxxx) *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white text-xs font-bold rounded-2xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="email"
                    placeholder="Email Address (Optional)"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="sm:col-span-2 w-full px-4 py-2.5 bg-white text-xs font-bold rounded-2xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white text-xs font-bold rounded-2xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
                  >
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Multan">Multan</option>
                    <option value="Quetta">Quetta</option>
                  </select>
                </div>

                <textarea
                  required
                  rows={2}
                  placeholder="Complete Delivery Address (House/Street/Area) *"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white text-xs font-bold rounded-2xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                />
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider">
                  2. Select Payment Method
                </h3>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      paymentMethod === 'cod'
                        ? 'bg-black text-white border-black shadow-md'
                        : 'bg-white text-gray-800 border-black/10 hover:border-black/30'
                    }`}
                  >
                    <Banknote className="w-5 h-5 mb-2" />
                    <span className="text-xs font-extrabold block">Cash on Delivery</span>
                    <span className="text-[10px] opacity-75">Pay at Doorstep</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wallet')}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      paymentMethod === 'wallet'
                        ? 'bg-black text-white border-black shadow-md'
                        : 'bg-white text-gray-800 border-black/10 hover:border-black/30'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 mb-2" />
                    <span className="text-xs font-extrabold block">JazzCash / EasyPaisa</span>
                    <span className="text-[10px] opacity-75">Mobile Wallet</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      paymentMethod === 'card'
                        ? 'bg-black text-white border-black shadow-md'
                        : 'bg-white text-gray-800 border-black/10 hover:border-black/30'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mb-2" />
                    <span className="text-xs font-extrabold block">Debit / Credit Card</span>
                    <span className="text-[10px] opacity-75">Visa / Mastercard</span>
                  </button>
                </div>
              </div>

              {/* Total Summary */}
              <div className="bg-white/70 p-4 rounded-2xl border border-black/5 space-y-1.5 text-xs font-bold text-gray-800">
                <div className="flex justify-between">
                  <span>Items Total ({cartItems.length}):</span>
                  <span>Rs{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount:</span>
                    <span>-Rs{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charge:</span>
                  <span className="text-emerald-600 font-black">FREE</span>
                </div>
                <div className="flex justify-between text-base font-black text-black pt-2 border-t border-black/10">
                  <span>Total Payable:</span>
                  <span>Rs{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 bg-black text-white rounded-full font-extrabold text-xs uppercase tracking-wider hover:bg-gray-800 shadow-xl transition-transform active:scale-95"
              >
                CONFIRM & PLACE ORDER
              </button>

            </form>
          </div>
        ) : (
          /* Success Screen with Spring Scale-Up Animations */
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="text-center py-6 sm:py-8 space-y-4"
          >
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
              className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg relative"
            >
              <CheckCircle className="w-12 h-12" />
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 rounded-full border-2 border-emerald-500"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="font-syne text-2xl sm:text-3xl font-black text-black uppercase tracking-tight flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-500" />
                <span>ORDER CONFIRMED!</span>
                <Sparkles className="w-6 h-6 text-amber-500" />
              </h2>

              <p className="text-xs text-gray-600 font-medium max-w-md mx-auto mt-2">
                Thank you <strong className="text-black">{formData.fullName}</strong>! Your order has been placed successfully. Tracking details have been dispatched to your mobile.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white/90 p-5 rounded-2xl border border-black/5 max-w-md mx-auto text-xs font-bold text-gray-800 space-y-2.5 text-left shadow-sm"
            >
              <div className="flex justify-between">
                <span className="text-gray-500">Tracking Order ID:</span>
                <span className="text-black font-black">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Destination:</span>
                <span className="text-black">{formData.city}, Pakistan</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Estimated Delivery:</span>
                <span className="text-emerald-600 font-extrabold">2-3 Business Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment:</span>
                <span className="text-black uppercase">{paymentMethod} (Rs{grandTotal.toLocaleString()})</span>
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFinish}
              className="mt-6 px-10 py-4 bg-black text-white rounded-full font-extrabold text-xs uppercase tracking-wider hover:bg-gray-800 shadow-xl transition-colors"
            >
              BACK TO STORE
            </motion.button>
          </motion.div>
        )}

      </div>
    </div>
  );
};
