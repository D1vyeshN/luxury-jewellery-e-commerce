import React from 'react';
import { motion } from 'framer-motion';

const ITEMS = [
  'Complimentary Express Worldwide Shipping',
  'GIA & IGI Certified Lab-Grown Diamonds',
  'Lifetime Warranty on Every Piece',
  'Free Ring Resizing Within 30 Days',
  'Bespoke Ring Builder — Design Your Dream Ring',
  'Recognised Best Online Jeweller 2021',
];

export const MarqueeBanner: React.FC = () => {
  return (
    <div className="overflow-hidden bg-gold-500 py-3">
      <motion.div
        animate={{ x: [0, '-50%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="flex whitespace-nowrap"
      >
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 text-white text-[11px] uppercase tracking-[0.2em] font-sans font-medium px-8">
            {item}
            <span className="text-gold-300 opacity-60">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};
