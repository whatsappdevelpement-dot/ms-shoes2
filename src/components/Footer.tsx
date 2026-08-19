import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  ArrowRight, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles, 
  Check, 
  ArrowUp,
  Banknote
} from 'lucide-react';
import {
  SiPuma,
  SiNike,
  SiAdidas,
  SiInstagram,
  SiFacebook,
  SiX,
  SiYoutube,
  SiWhatsapp,
  SiVisa,
  SiMastercard,
  SiApplepay,
  SiGooglepay
} from 'react-icons/si';
import { CategoryType } from '../types';
import { fireAddToCartConfetti } from '../utils/confetti';

interface FooterProps {
  setActiveCategory: (category: CategoryType) => void;
  onOpenSearch?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveCategory }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      fireAddToCartConfetti();
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white pt-16 pb-10 relative overflow-hidden border-t border-white/10">
      {/* Background Watermark Marquee */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none opacity-5 select-none py-2">
        <div className="whitespace-nowrap font-syne font-black text-[90px] sm:text-[140px] tracking-tighter uppercase text-white leading-none">
          SAQIB VISUAL • CELEBRITY FOOTWEAR • LUXURY SNEAKERS • NITRO CUSHIONING • SAQIB VISUAL •
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* VIP Newsletter Hero Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-gradient-to-r from-gray-950 via-gray-900 to-black p-6 sm:p-10 border border-amber-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Subtle glow effect */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-amber-400/10 border border-amber-400/40 rounded-full text-amber-300 text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>LUXURY DROPS & VIP INSIDER</span>
              </div>
              <h3 className="font-syne text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                SUBSCRIBE FOR <span className="text-amber-400">LUXURY DROPS</span> & EXCLUSIVE SALES
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium max-w-xl">
                Join our inner circle to receive instant email notifications on limited sneaker releases, celebrity footwear collections, and unlock an instant 10% welcome coupon on code <strong className="text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">JOIN10</strong>.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 p-5 rounded-2xl flex items-center space-x-3.5 shadow-xl"
                >
                  <div className="p-2.5 bg-emerald-500 text-black rounded-xl font-black shrink-0">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-xs sm:text-sm uppercase tracking-wider text-white">YOU'RE ON THE LUXURY DROP LIST!</h5>
                    <p className="text-xs text-emerald-200/90 mt-0.5">Use welcome coupon <strong className="text-amber-300 font-bold">JOIN10</strong> for 10% off your next luxury order.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2.5">
                  <div className="flex items-center bg-black/90 border border-white/20 rounded-full p-1.5 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/30 transition-all shadow-2xl">
                    <Mail className="w-5 h-5 text-gray-400 ml-3.5 shrink-0" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address for drop updates..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent text-xs sm:text-sm text-white placeholder-gray-400 px-3 py-2 focus:outline-none w-full font-medium"
                    />
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black text-xs font-black px-5 sm:px-6 py-3 rounded-full transition-all flex items-center space-x-1.5 shrink-0 shadow-lg cursor-pointer uppercase tracking-wider"
                    >
                      <span>GET DROP ALERTS</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-gray-400 px-3 font-medium">
                    <span>⚡ Instant drop notifications & zero spam</span>
                    <span className="text-amber-400 font-bold">10% Off Code Included</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>

        {/* 4 Pillars Trust Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-white/10 text-center sm:text-left">
          <div className="flex items-center space-x-3 p-2">
            <div className="p-2.5 bg-white/10 rounded-2xl text-amber-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-extrabold uppercase tracking-wider text-white">Fast Nationwide Delivery</h5>
              <p className="text-[10px] text-gray-400">2-3 days doorstep express in PK</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-2">
            <div className="p-2.5 bg-white/10 rounded-2xl text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-extrabold uppercase tracking-wider text-white">100% Authentic</h5>
              <p className="text-[10px] text-gray-400">Guaranteed original Saqib Visual Shoes</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-2">
            <div className="p-2.5 bg-white/10 rounded-2xl text-amber-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-extrabold uppercase tracking-wider text-white">Easy Exchange</h5>
              <p className="text-[10px] text-gray-400">30 days size exchange policy</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-2">
            <div className="p-2.5 bg-white/10 rounded-2xl text-amber-400 shrink-0">
              <Banknote className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-extrabold uppercase tracking-wider text-white">Cash On Delivery</h5>
              <p className="text-[10px] text-gray-400">Pay at doorstep upon arrival</p>
            </div>
          </div>
        </div>

        {/* Main Grid Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Info & Flagship Address */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={scrollToTop}>
              <div className="relative w-11 h-11 flex items-center justify-center bg-white rounded-full overflow-hidden border-2 border-amber-400 shadow-md">
                <span className="font-syne text-[20px] font-black tracking-tighter text-black leading-none">SV</span>
              </div>
              <div className="flex flex-col">
                <span className="font-syne text-xl font-black tracking-widest text-white leading-none">
                  SAQIB VISUAL
                </span>
                <span className="text-[9px] font-extrabold tracking-widest text-amber-400 uppercase mt-1">Walk like a celebrity</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed font-medium">
              Saqib Visual is Pakistan's premier footwear destination, crafting elite street style, celebrity-grade cushioning, and high-performance sneakers designed for trendsetters.
            </p>

            <div className="space-y-2 text-xs text-gray-300 font-medium pt-2">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Flagship Studio: MM Alam Road, Gulberg III, Lahore, Pakistan</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Customer Care: +92 300 7878078 (WhatsApp Available)</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Studio Hours: Mon - Sun (11:00 AM - 10:00 PM)</span>
              </div>
            </div>

            {/* Social Icons with Real Brand Logos */}
            <div className="flex items-center space-x-2.5 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 hover:bg-gradient-to-tr hover:from-amber-500 hover:to-pink-500 hover:text-white rounded-full text-gray-300 transition-all duration-300 shadow-sm" aria-label="Instagram">
                <SiInstagram size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 hover:bg-blue-600 hover:text-white rounded-full text-gray-300 transition-all duration-300 shadow-sm" aria-label="Facebook">
                <SiFacebook size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 hover:bg-gray-200 hover:text-black rounded-full text-gray-300 transition-all duration-300 shadow-sm" aria-label="X (Twitter)">
                <SiX size={14} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 hover:bg-red-600 hover:text-white rounded-full text-gray-300 transition-all duration-300 shadow-sm" aria-label="YouTube">
                <SiYoutube size={16} />
              </a>
              <a href="https://wa.me/923007878078" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 hover:bg-emerald-500 hover:text-white rounded-full text-gray-300 transition-all duration-300 shadow-sm" aria-label="WhatsApp">
                <SiWhatsapp size={16} />
              </a>
            </div>

            {/* Official Licensed Brands Bar */}
            <div className="pt-3 border-t border-white/10">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 block mb-2">
                AUTHORIZED RETAILER FOR:
              </span>
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10 hover:border-amber-400/50 transition-colors">
                  <span className="text-amber-400"><SiPuma size={20} /></span>
                  <span className="text-[11px] font-black tracking-wider text-white">PUMA</span>
                </div>
                <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10 hover:border-amber-400/50 transition-colors">
                  <span className="text-white"><SiNike size={22} /></span>
                  <span className="text-[11px] font-black tracking-wider text-white">NIKE</span>
                </div>
                <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10 hover:border-amber-400/50 transition-colors">
                  <span className="text-gray-200"><SiAdidas size={18} /></span>
                  <span className="text-[11px] font-black tracking-wider text-white">ADIDAS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Category Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-amber-400 border-b border-white/10 pb-2">
              COLLECTIONS
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-semibold">
              <li>
                <button 
                  onClick={() => { setActiveCategory('MEN'); scrollToTop(); }}
                  className="hover:text-amber-300 transition-colors flex items-center space-x-1.5"
                >
                  <span>Men's Collection</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveCategory('WOMEN'); scrollToTop(); }}
                  className="hover:text-amber-300 transition-colors flex items-center space-x-1.5"
                >
                  <span>Women's Sneaker Bar</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveCategory('KIDS'); scrollToTop(); }}
                  className="hover:text-amber-300 transition-colors flex items-center space-x-1.5"
                >
                  <span>Kids & Youth Edition</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveCategory('SALE'); scrollToTop(); }}
                  className="hover:text-amber-300 transition-colors flex items-center space-x-1.5 text-amber-400 font-extrabold"
                >
                  <span>🔥 Special Sale Drops</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveCategory('ALL'); scrollToTop(); }}
                  className="hover:text-amber-300 transition-colors"
                >
                  <span>Browse All Sneakers</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-amber-400 border-b border-white/10 pb-2">
              HELP & SUPPORT
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-semibold">
              <li>
                <button onClick={() => setActiveCategory('FAQ' as any)} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => setActiveCategory('CONTACT' as any)} className="hover:text-white transition-colors">
                  Order Status & Tracking
                </button>
              </li>
              <li>
                <button onClick={() => setActiveCategory('ABOUT US' as any)} className="hover:text-white transition-colors">
                  30-Day Return & Exchange Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActiveCategory('SIZE GUIDE' as any)} className="hover:text-white transition-colors">
                  Shoe Size Conversion Guide
                </button>
              </li>
              <li>
                <button onClick={() => setActiveCategory('ABOUT US' as any)} className="hover:text-white transition-colors">
                  About Saqib Visual Brand
                </button>
              </li>
            </ul>
          </div>

          {/* Payment & Security Badges */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-amber-400 border-b border-white/10 pb-2">
              SECURE PAYMENTS
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed font-medium">
              We accept multiple flexible payment options at checkout across Pakistan:
            </p>

            <div className="grid grid-cols-2 gap-2 text-[10px] font-extrabold uppercase text-gray-300">
              <div className="bg-white/5 p-2 rounded-xl border border-white/10 flex items-center space-x-2">
                <Banknote className="w-4 h-4 text-emerald-400" />
                <span>Cash on Delivery</span>
              </div>
              <div className="bg-white/5 p-2 rounded-xl border border-white/10 flex items-center space-x-1.5">
                <span className="text-blue-400"><SiVisa size={18} /></span>
                <span className="text-orange-500"><SiMastercard size={18} /></span>
                <span className="text-[9px]">Visa/Master</span>
              </div>
              <div className="bg-white/5 p-2 rounded-xl border border-white/10 flex items-center space-x-2">
                <span className="text-white"><SiApplepay size={20} /></span>
                <span>Apple Pay</span>
              </div>
              <div className="bg-white/5 p-2 rounded-xl border border-white/10 flex items-center space-x-2">
                <span className="text-gray-200"><SiGooglepay size={22} /></span>
                <span>Google Pay</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[10px] font-bold text-gray-400 block uppercase mb-1">Official Delivery Partners:</span>
              <div className="flex items-center space-x-2 text-[10px] text-gray-300 font-extrabold">
                <span className="px-2 py-1 bg-white/10 rounded-md">TCS</span>
                <span className="px-2 py-1 bg-white/10 rounded-md">Leopards</span>
                <span className="px-2 py-1 bg-white/10 rounded-md">M&P</span>
                <span className="px-2 py-1 bg-white/10 rounded-md">Trax</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back To Top Button */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 font-medium gap-4">
          <div className="flex items-center space-x-2">
            <span>© {new Date().getFullYear()} <strong>SAQIB VISUAL OFFICIAL STORE</strong>. All Rights Reserved.</span>
          </div>

          <div className="flex items-center space-x-6 text-gray-400">
            <button onClick={() => setActiveCategory('PRIVACY' as any)} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => setActiveCategory('TERMS' as any)} className="hover:text-white transition-colors">Terms of Service</button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="p-2.5 bg-amber-400 text-black font-black rounded-full shadow-lg hover:bg-amber-300 transition-all flex items-center justify-center ml-2"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

      </div>
    </footer>
  );
};
