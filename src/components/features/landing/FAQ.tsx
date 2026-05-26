import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const faqs = [
  {
    q: "How accurate is the AI-generated business plan?",
    a: "Our AI model (powered by Google Gemini) is trained on thousands of successful startups and current market data. While extremely robust, we recommend treating it as a powerful first draft to be refined with your unique insights."
  },
  {
    q: "Can I export the data?",
    a: "Yes! You can export your business plans as PDF, Markdown, and even download the financial models directly into CSV/Excel formats for ease of use."
  },
  {
    q: "Is my startup idea secure?",
    a: "Absolutely. We do not use your proprietary ideas to train our models, and all your workspace data is securely stored and encrypted."
  },
  {
    q: "How long does it take to generate a full plan?",
    a: "Once you answer the initial intake questions, the platform generates a comprehensive business plan, including financials and pitch deck outlines, in under 2 minutes."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-black relative z-10 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16 tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 transition-colors hover:bg-white/10 cursor-pointer"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                <div className="p-6 flex items-center justify-between">
                  <h3 className="text-white font-medium pr-8">{faq.q}</h3>
                  <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform duration-300", isOpen && "rotate-180")} />
                </div>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
