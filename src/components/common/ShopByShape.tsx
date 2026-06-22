'use client'

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { DIAMOND_SHAPES } from '../../constants';

// SVG paths for diamond shapes
const ShapeSVGs: Record<string, React.ReactNode> = {
  round: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="1.5" />
      <line x1="40" y1="12" x2="40" y2="68" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="12" y1="40" x2="68" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="20" y1="20" x2="60" y2="60" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="60" y1="20" x2="20" y2="60" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    </svg>
  ),
  oval: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="40" cy="40" rx="20" ry="30" stroke="currentColor" strokeWidth="1.5" />
      <line x1="40" y1="10" x2="40" y2="70" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="20" y1="40" x2="60" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    </svg>
  ),
  pear: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M40 70 C20 70 12 55 14 45 C14 32 24 22 32 18 C36 16 40 8 40 8 C40 8 44 16 48 18 C56 22 66 32 66 45 C68 55 60 70 40 70Z" stroke="currentColor" strokeWidth="1.5" />
      <line x1="40" y1="8" x2="40" y2="70" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    </svg>
  ),
  princess: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="18" y="18" width="44" height="44" stroke="currentColor" strokeWidth="1.5" />
      <line x1="18" y1="18" x2="62" y2="62" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="62" y1="18" x2="18" y2="62" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="18" y1="40" x2="62" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="40" y1="18" x2="40" y2="62" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    </svg>
  ),
  cushion: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M40 12 Q62 12 68 40 Q62 68 40 68 Q18 68 12 40 Q18 12 40 12Z" stroke="currentColor" strokeWidth="1.5" />
      <line x1="40" y1="12" x2="40" y2="68" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="12" y1="40" x2="68" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    </svg>
  ),
  emerald: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M22 16 L58 16 L68 28 L68 52 L58 64 L22 64 L12 52 L12 28 Z" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="40" x2="68" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="40" y1="16" x2="40" y2="64" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    </svg>
  ),
  marquise: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M40 10 Q65 30 65 40 Q65 50 40 70 Q15 50 15 40 Q15 30 40 10Z" stroke="currentColor" strokeWidth="1.5" />
      <line x1="40" y1="10" x2="40" y2="70" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="15" y1="40" x2="65" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    </svg>
  ),
  radiant: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M24 14 L56 14 L66 26 L66 54 L56 66 L24 66 L14 54 L14 26 Z" stroke="currentColor" strokeWidth="1.5" />
      <line x1="14" y1="40" x2="66" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="40" y1="14" x2="40" y2="66" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="14" y1="26" x2="66" y2="54" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="66" y1="26" x2="14" y2="54" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    </svg>
  ),
  asscher: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M28 14 L52 14 L66 28 L66 52 L52 66 L28 66 L14 52 L14 28 Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M32 22 L48 22 L58 32 L58 48 L48 58 L32 58 L22 48 L22 32 Z" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M40 68 C40 68 12 50 12 30 C12 19 20 12 28 12 C34 12 38 16 40 20 C42 16 46 12 52 12 C60 12 68 19 68 30 C68 50 40 68 40 68Z" stroke="currentColor" strokeWidth="1.5" />
      <line x1="40" y1="20" x2="40" y2="68" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    </svg>
  ),
};

export const ShopByShape: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.3em] text-gold-500 font-sans mb-3"
            >
              Browse by Shape
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl lg:text-4xl text-charcoal font-light"
            >
              Find Your <em>Perfect Shape</em>
            </motion.h2>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <button onClick={() => scroll('left')} className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-gold-500 hover:text-gold-500 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scroll('right')} className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-gold-500 hover:text-gold-500 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Shape Grid */}
        <div
          ref={scrollRef}
          className="flex gap-4 lg:grid lg:grid-cols-5 xl:grid-cols-10 overflow-x-auto pb-4 lg:overflow-visible scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {DIAMOND_SHAPES.map((shape, index) => (
            <Link key={shape.id} href="/shop">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="group flex flex-col items-center gap-3 flex-shrink-0 lg:flex-shrink w-full"
              >
              <div className="w-16 h-16 lg:w-full lg:aspect-square max-w-[80px] lg:max-w-none border border-gray-200 group-hover:border-gold-500 flex items-center justify-center transition-all duration-300 bg-white group-hover:bg-gold-50 text-gray-400 group-hover:text-gold-500 p-4">
                {ShapeSVGs[shape.id]}
              </div>
              <span className="text-[11px] uppercase tracking-widest text-gray-500 group-hover:text-gold-500 transition-colors font-sans whitespace-nowrap">
                {shape.label}
              </span>
              </motion.button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
