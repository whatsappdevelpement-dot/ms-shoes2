import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sun, Waves, Wind } from 'lucide-react';

export const SlideCollection: React.FC = () => {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.88, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-[2.5rem] overflow-hidden bg-[#f0ede6] shadow-xl border border-white/60"
      >
        
        {/* HUGE Backdrop Watermark Text */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, x: -60 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute -left-10 md:left-0 top-0 bottom-0 flex items-center select-none pointer-events-none z-0 overflow-hidden"
        >
          <span className="font-syne text-[15rem] md:text-[20rem] font-black text-[#e8e4db] leading-none tracking-tighter whitespace-nowrap">
            SLIDE
          </span>
        </motion.div>

        <div className="relative z-10 flex flex-col md:flex-row items-stretch">
          
          {/* Text Content */}
          <div className="w-full md:w-1/2 p-6 sm:p-16 lg:p-20 flex flex-col justify-center order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white mb-6 shadow-sm">
                <Sun className="w-3.5 h-3.5 text-[#8b7355]" />
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#8b7355] uppercase">
                  Summer Essentials
                </span>
              </div>
              
              <h2 className="font-syne text-4xl sm:text-5xl lg:text-7xl font-black text-[#2c2824] leading-[0.95] tracking-tight mb-6 uppercase">
                Effortless <br/>
                <span className="text-[#8b7355]">Comfort</span>
              </h2>
              
              <p className="text-[#5a524a] text-sm sm:text-base font-medium max-w-md leading-relaxed mb-8">
                Experience unparalleled relaxation with the 78 Signature Slide. Featuring an ergonomic contoured footbed, adjustable premium canvas straps, and cloud-like cushioning for your everyday oasis.
              </p>
              
              <button className="inline-flex items-center space-x-3 bg-[#2c2824] text-white px-8 py-4 rounded-full font-extrabold text-[10px] sm:text-xs uppercase tracking-widest hover:bg-[#8b7355] shadow-xl hover:shadow-[#8b7355]/30 transition-all duration-300 group active:scale-95">
                <span>Shop Slides</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Image & Floating Tags */}
          <div className="w-full md:w-1/2 h-[280px] sm:h-[550px] relative order-1 md:order-2 flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-transparent to-[#e4ded4]/50">
            {/* Decorative background circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="absolute w-[70%] h-[70%] bg-white/50 rounded-full blur-3xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.75, rotate: -15 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 1.2, type: "spring", stiffness: 80 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <motion.img 
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                src="https://ik.imagekit.io/19imy4f1u/lite_1786266966332_-sCWnS8YU.webp" 
                alt="78 Signature Slide"
                className="w-full max-w-lg object-contain drop-shadow-2xl scale-110 sm:scale-125"
                referrerPolicy="no-referrer"
              />

              {/* Floating Feature Tags */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute top-1/4 -left-4 sm:left-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white flex items-center space-x-2"
              >
                <div className="w-8 h-8 rounded-full bg-[#f0ede6] flex items-center justify-center text-[#8b7355]">
                  <Waves className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Footbed</span>
                  <span className="text-xs font-black text-gray-900">Ergonomic</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute bottom-1/4 right-0 sm:right-8 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white flex items-center space-x-2"
              >
                <div className="w-8 h-8 rounded-full bg-[#f0ede6] flex items-center justify-center text-[#8b7355]">
                  <Wind className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">Material</span>
                  <span className="text-xs font-black text-gray-900">Breathable</span>
                </div>
              </motion.div>

            </motion.div>
          </div>
          
        </div>
      </motion.div>
    </section>
  );
};
