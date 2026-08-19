import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export const ContactSection: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.88, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
    >
      <div className="bg-[#e6e9eb] rounded-[2.5rem] border border-white/80 shadow-2xl p-6 sm:p-16">
        <div className="space-y-10 sm:space-y-14">
          
          <div className="flex flex-col items-center text-center space-y-4">
            <span className="font-syne text-4xl sm:text-5xl font-black text-black tracking-wider uppercase">
              Contact Us
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight leading-tight uppercase">
              We're Here to Help
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium max-w-2xl mx-auto">
              Have a question, need assistance with your order, or just want to say hi? We'd love to hear from you. Reach out through any of the channels below.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-black/10">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/80 p-8 rounded-3xl border border-black/5 space-y-4 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 hover:scale-102 group"
            >
              <div className="w-16 h-16 bg-black/5 group-hover:bg-black group-hover:text-white transition-colors duration-300 rounded-full flex items-center justify-center mb-2">
                <Mail className="w-8 h-8" />
              </div>
              <span className="text-black font-extrabold text-lg uppercase tracking-wide">Email Support</span>
              <p className="text-sm text-gray-600 font-medium">
                support@saqibvisual.com<br/>
                We aim to reply within 24h.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/80 p-8 rounded-3xl border border-black/5 space-y-4 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 hover:scale-102 group"
            >
              <div className="w-16 h-16 bg-black/5 group-hover:bg-black group-hover:text-white transition-colors duration-300 rounded-full flex items-center justify-center mb-2">
                <Phone className="w-8 h-8" />
              </div>
              <span className="text-black font-extrabold text-lg uppercase tracking-wide">Phone Line</span>
              <p className="text-sm text-gray-600 font-medium">
                +1 (800) 123-4567<br/>
                Mon-Fri, 9am - 6pm EST
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/80 p-8 rounded-3xl border border-black/5 space-y-4 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 hover:scale-102 group"
            >
              <div className="w-16 h-16 bg-black/5 group-hover:bg-black group-hover:text-white transition-colors duration-300 rounded-full flex items-center justify-center mb-2">
                <MapPin className="w-8 h-8" />
              </div>
              <span className="text-black font-extrabold text-lg uppercase tracking-wide">Headquarters</span>
              <p className="text-sm text-gray-600 font-medium">
                123 Sneaker Avenue<br/>
                New York, NY 10012
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/80 p-8 rounded-3xl border border-black/5 space-y-4 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 hover:scale-102 group"
            >
              <div className="w-16 h-16 bg-black/5 group-hover:bg-black group-hover:text-white transition-colors duration-300 rounded-full flex items-center justify-center mb-2">
                <Clock className="w-8 h-8" />
              </div>
              <span className="text-black font-extrabold text-lg uppercase tracking-wide">Live Chat</span>
              <p className="text-sm text-gray-600 font-medium">
                Available on our website<br/>
                during business hours.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </motion.div>
  );
};
