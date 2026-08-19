import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Award } from 'lucide-react';

export const ClassicPennyLoafer: React.FC = () => {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.88, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-[2.5rem] overflow-hidden bg-[#d0a586] shadow-xl flex flex-col md:flex-row items-stretch border border-white/40"
      >
        
        {/* Text Content */}
        <div className="w-full md:w-1/2 p-10 sm:p-16 lg:p-20 flex flex-col justify-center relative z-10 order-2 md:order-1 bg-[#d0a586]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/50 mb-6">
              <Award className="w-3.5 h-3.5 text-[#4a2e1b]" />
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#4a2e1b] uppercase">
                Heritage Collection
              </span>
            </div>
            
            <h2 className="font-syne text-4xl sm:text-5xl lg:text-6xl font-black text-[#2d1b0f] leading-[1.05] tracking-tight mb-4 uppercase">
              Sartorial <br/>
              <span className="text-white drop-shadow-sm">Excellence</span>
            </h2>
            
            <p className="text-[#4a2e1b] text-sm sm:text-base font-medium max-w-md leading-relaxed mb-8">
              The quintessential penny loafer. Expertly crafted from full-grain calfskin leather, offering a masterclass in minimalist design and enduring sophistication.
            </p>
            
            <button className="inline-flex items-center space-x-3 bg-[#2d1b0f] text-white px-8 py-4 rounded-full font-extrabold text-[10px] sm:text-xs uppercase tracking-widest hover:bg-black shadow-xl hover:shadow-black/20 transition-all duration-300 group active:scale-95">
              <span>Discover More</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Image with Zoom-in Scroll Effect */}
        <div className="w-full md:w-1/2 h-[280px] sm:h-[600px] relative order-1 md:order-2 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 1.25 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src="https://i.pinimg.com/1200x/e8/14/fc/e814fc166e2913eef04f38b1e5b0d3ba.jpg" 
              alt="Classic Penny Loafer"
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Gradient overlays for seamless blending into the background */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#d0a586] via-transparent to-transparent md:hidden h-32 bottom-0 top-auto" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#d0a586] via-[#d0a586]/60 to-transparent hidden md:block w-40 left-0" />
          </motion.div>
        </div>
        
      </motion.div>
    </section>
  );
};
