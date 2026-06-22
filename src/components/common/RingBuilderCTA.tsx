'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Settings, Gem } from 'lucide-react';
import Link from 'next/link';

export const RingBuilderCTA: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="relative overflow-hidden bg-[#1a1a1a] grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left: Image */}
          <div className="relative min-h-[400px] lg:min-h-[520px]">
            <img
              src="https://images.pexels.com/photos/31728371/pexels-photo-31728371.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=700&w=600"
              alt="Ring Builder"
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/80 to-transparent" />
          </div>

          {/* Right: Content */}
          <div className="relative z-10 p-12 lg:p-16 flex flex-col justify-center">
            {/* Decorative line */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-8 bg-gold-400" />
              <span className="text-gold-400 text-[10px] uppercase tracking-[0.4em] font-sans">Bespoke Creation</span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl lg:text-5xl text-white font-light leading-tight mb-6"
            >
              Design Your<br />
              <em className="text-gold-300">Perfect Ring</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-sans text-white/60 leading-relaxed mb-10 max-w-sm"
            >
              Start with a setting or a diamond. Mix metals, choose your stone, add an engraving. 
              Create a ring as unique as your love story.
            </motion.p>

            {/* Two Path Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/ring-builder">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 px-6 py-4 bg-gold-500 text-white text-xs font-sans uppercase tracking-[0.2em] hover:bg-gold-700 transition-all group"
                >
                  <Settings size={14} />
                  Start with a Setting
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform ml-auto" />
                </motion.button>
              </Link>

              <Link href="/diamonds">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 px-6 py-4 border border-white/30 text-white text-xs font-sans uppercase tracking-[0.2em] hover:border-gold-400 hover:text-gold-300 transition-all group"
                >
                  <Gem size={14} />
                  Start with a Diamond
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform ml-auto" />
                </motion.button>
              </Link>
            </div>

            {/* Trust */}
            <div className="flex flex-wrap gap-6 text-xs text-white/40 font-sans">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                GIA & IGI Certified
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                Lifetime Warranty
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                Free Resizing
              </span>
            </div>
          </div>

          {/* Decorative corner */}
          <div className="absolute top-6 right-6 hidden lg:flex flex-col items-end gap-1 opacity-30">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-px bg-gold-400" style={{ width: `${(i + 1) * 16}px` }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
