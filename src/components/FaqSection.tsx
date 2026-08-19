import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'motion/react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unworn shoes in their original packaging. Simply contact our support team to initiate a return."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Expedited shipping is available at checkout for 1-2 day delivery."
    },
    {
      question: "Are your shoes true to size?",
      answer: "Yes, our shoes run true to size. If you are between sizes, we recommend sizing up for a more comfortable fit."
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we ship to the US, Canada, and select European countries. We are working on expanding our international shipping options."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you will receive a confirmation email with a tracking link. You can also log into your account to check the status."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.88, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
    >
      <div className="bg-[#e6e9eb] rounded-[2.5rem] border border-white/80 shadow-2xl p-6 sm:p-16">
        <div className="space-y-10">
          
          <div className="flex flex-col items-center text-center space-y-4">
            <span className="font-syne text-4xl sm:text-5xl font-black text-black tracking-wider uppercase">
              FAQ
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight leading-tight uppercase">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="pt-8 border-t border-black/10 space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ amount: 0.3 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`bg-white/80 rounded-2xl border transition-all duration-300 overflow-hidden ${
                  openIndex === idx ? 'border-black/30 shadow-md' : 'border-black/5 hover:border-black/20'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-extrabold text-base text-gray-900 pr-4">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    openIndex === idx ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {openIndex === idx ? (
                      <ChevronUp className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 flex-shrink-0" />
                    )}
                  </div>
                </button>
                {openIndex === idx && (
                  <div className="px-6 pb-6 text-base text-gray-600 font-medium leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
