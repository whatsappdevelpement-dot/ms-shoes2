import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const LuxuryBanner: React.FC = () => {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.88, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-[2.5rem] overflow-hidden bg-[#e8d2bd] shadow-2xl flex flex-col md:flex-row items-stretch border border-white/50"
      >
        
        {/* Text Content */}
        <div className="w-full md:w-1/2 p-6 sm:p-16 lg:p-20 flex flex-col justify-center relative z-10 order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/60 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#8c2a3e]" />
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#8c2a3e] uppercase">
                Exclusive Drop
              </span>
            </div>
            
            <h2 className="font-syne text-4xl sm:text-5xl lg:text-7xl font-black text-gray-950 leading-[0.95] tracking-tight mb-6 uppercase">
              Timeless <br/>
              <span className="text-white drop-shadow-sm">Heritage</span>
            </h2>
            
            <p className="text-gray-900 text-sm sm:text-base font-medium max-w-md leading-relaxed mb-8">
              Step into a world of curated luxury. Handcrafted perfection meets contemporary streetwear in our most exclusive release of the season, designed for those who walk like a celebrity.
            </p>
            
            <button className="inline-flex items-center space-x-3 bg-black text-white px-8 py-4 rounded-full font-extrabold text-[10px] sm:text-xs uppercase tracking-widest hover:bg-[#8c2a3e] shadow-xl hover:shadow-[#8c2a3e]/30 transition-all duration-300 group active:scale-95">
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Image with Scroll Zoom Effect */}
        <div className="w-full md:w-1/2 h-[280px] sm:h-[500px] md:h-auto relative order-1 md:order-2 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 1.25 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src="https://i.pinimg.com/1200x/a7/aa/e5/a7aae5971c8259c13dcd55f702c45720.jpg" 
              alt="Luxury Heritage Collection"
              className="w-full h-full object-cover object-center md:object-left hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Gradient overlays for seamless blending into the beige background */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#e8d2bd] via-transparent to-transparent md:hidden h-24 bottom-0 top-auto" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#e8d2bd] via-[#e8d2bd]/50 to-transparent hidden md:block w-32 left-0" />
          </motion.div>
        </div>
        
      </motion.div>
    </section>
  );
};
