import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';

export const LoaferCollection: React.FC = () => {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.88, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-[2.5rem] overflow-hidden bg-[#e0d6cb] shadow-xl flex flex-col md:flex-row items-stretch border border-white/50"
      >
        
        {/* Image with Zoom-in Scroll Effect */}
        <div className="w-full md:w-1/2 h-[280px] sm:h-[600px] relative order-1 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 1.25 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src="https://i.pinimg.com/736x/55/10/ba/5510ba64fe019d0cd8f2d90916268ca4.jpg" 
              alt="Classic Leather Loafers"
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Gradient overlays for seamless blending into the background */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#e0d6cb] via-transparent to-transparent md:hidden h-32 bottom-0 top-auto" />
            <div className="absolute inset-0 bg-gradient-to-l from-[#e0d6cb] via-[#e0d6cb]/60 to-transparent hidden md:block w-40 right-0 left-auto" />
          </motion.div>
        </div>
        
        {/* Text Content */}
        <div className="w-full md:w-1/2 p-6 sm:p-16 lg:p-20 flex flex-col justify-center relative z-10 order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/60 mb-6">
              <Star className="w-3.5 h-3.5 text-[#8b5a2b]" />
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#8b5a2b] uppercase">
                The Modern Classic
              </span>
            </div>
            
            <h2 className="font-syne text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.05] tracking-tight mb-4 uppercase">
              Ease Stitched <br/>
              <span className="text-[#8b5a2b]">In Style</span>
            </h2>
            
            <p className="text-gray-700 text-sm sm:text-base font-medium max-w-md leading-relaxed mb-8">
              Discover the perfect harmony of comfort and sophistication. Hand-stitched detailing, premium buttery leather, and a silhouette that transitions effortlessly from the boardroom to the weekend lounge.
            </p>
            
            <button className="inline-flex items-center space-x-3 bg-[#6b4423] text-white px-8 py-4 rounded-full font-extrabold text-[10px] sm:text-xs uppercase tracking-widest hover:bg-black shadow-xl hover:shadow-black/20 transition-all duration-300 group active:scale-95">
              <span>Shop Loafers</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
        
      </motion.div>
    </section>
  );
};
