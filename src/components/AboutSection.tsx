import React from 'react';
import { Zap, Shield, Globe, Award } from 'lucide-react';
import { motion } from 'motion/react';

export const AboutSection: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.88, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
    >
      <div className="bg-[#e6e9eb] rounded-[2.5rem] border border-white/80 shadow-2xl p-6 sm:p-16">
        <div className="space-y-8 sm:space-y-12">
          
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex items-center space-x-3">
              <span className="font-syne text-3xl sm:text-5xl font-black text-black tracking-wider">SAQIB VISUAL</span>
            </div>
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] text-gray-500 uppercase">
              WALK LIKE A CELEBRITY
            </span>
          </div>

          <div className="text-center max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-4xl font-black text-gray-950 tracking-tight leading-tight uppercase">
              The World's Most Dynamic Sports & Luxury Brand
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
              Saqib Visual has pushed fashion and culture forward by creating exclusive, premium footwear for trendsetters. We offer luxury, sport-inspired lifestyle products for those who want to stand out and walk like a celebrity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-black/10">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/80 p-6 rounded-3xl border border-black/5 space-y-3 hover:shadow-lg transition-all duration-300 hover:scale-102"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-500 mb-2">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-black font-extrabold text-lg uppercase tracking-wide">NITRO™ Cushion Tech</h3>
              <p className="text-sm text-gray-600 font-medium">
                Nitrogen-injected foam technology providing maximum responsiveness and energy return with minimal weight.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/80 p-6 rounded-3xl border border-black/5 space-y-3 hover:shadow-lg transition-all duration-300 hover:scale-102"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-black font-extrabold text-lg uppercase tracking-wide">SV-GRIP Outsole</h3>
              <p className="text-sm text-gray-600 font-medium">
                High-durability rubber compound that provides all-surface traction on wet and dry urban pavement.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/80 p-6 rounded-3xl border border-black/5 space-y-3 hover:shadow-lg transition-all duration-300 hover:scale-102"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-black font-extrabold text-lg uppercase tracking-wide">Forever Better</h3>
              <p className="text-sm text-gray-600 font-medium">
                10% recycled materials incorporated across all new upper meshes to reduce environmental footprint.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/80 p-6 rounded-3xl border border-black/5 space-y-3 hover:shadow-lg transition-all duration-300 hover:scale-102"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-2">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-black font-extrabold text-lg uppercase tracking-wide">100% Authentic Guarantee</h3>
              <p className="text-sm text-gray-600 font-medium">
                Direct authorized distribution guaranteeing pristine original factory packaging and quality.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </motion.div>
  );
};
