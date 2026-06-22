'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface HeroSlide {
  id: number;
  headline: string;
  subheadline: string;
  cta: string;
  ctaSecondary: string;
  image: string;
  tag: string;
}

const slides: HeroSlide[] = [
  {
    id: 1,
    headline: 'Written in\nDiamonds',
    subheadline: 'Bespoke engagement rings crafted with ethically sourced lab-grown diamonds. Each piece tells your story.',
    cta: 'Design Your Ring',
    ctaSecondary: 'Explore Collection',
    image: 'https://images.pexels.com/photos/2849742/pexels-photo-2849742.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400',
    tag: 'New Collection 2025',
  },
  {
    id: 2,
    headline: 'Eternal\nElegance',
    subheadline: 'Our master craftsmen in Los Angeles create pieces that transcend generations. The art of fine jewellery, reimagined.',
    cta: 'Shop Wedding Bands',
    ctaSecondary: 'Our Story',
    image: 'https://images.pexels.com/photos/30541185/pexels-photo-30541185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400',
    tag: 'Bestsellers',
  },
  {
    id: 3,
    headline: 'Where Light\nMeets Gold',
    subheadline: 'Discover our curated fine jewellery collection — from statement necklaces to whisper-thin diamond bands.',
    cta: 'Explore Fine Jewellery',
    ctaSecondary: 'View Lookbook',
    image: 'https://images.pexels.com/photos/17068457/pexels-photo-17068457.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400',
    tag: 'Fine Jewellery',
  },
];

export const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const slide = slides[current];

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Images */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.headline}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center max-w-[1440px] mx-auto px-6 lg:px-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl"
          >
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-8 h-px bg-gold-300" />
              <span className="text-gold-300 text-xs uppercase tracking-[0.3em] font-sans font-medium">{slide.tag}</span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-serif font-light text-white leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', letterSpacing: '-0.02em', whiteSpace: 'pre-line' }}>
              {slide.headline}
            </h1>

            {/* Subheadline */}
            <p className="font-sans text-white/75 text-base lg:text-lg leading-relaxed mb-10 max-w-md font-light">
              {slide.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/ring-builder">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 bg-gold-500 text-white text-xs font-sans uppercase tracking-[0.2em] hover:bg-gold-700 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  {slide.cta}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/shop">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 border border-white/40 text-white text-xs font-sans uppercase tracking-[0.2em] hover:border-gold-400 hover:text-gold-300 transition-all duration-300 backdrop-blur-sm"
                >
                  {slide.ctaSecondary}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="absolute bottom-24 left-6 lg:left-12 flex items-center gap-3">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goToSlide(i)}
              className={`transition-all duration-500 ${i === current ? 'w-8 h-0.5 bg-gold-400' : 'w-4 h-0.5 bg-white/40 hover:bg-white/60'}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-white/40 text-[9px] uppercase tracking-widest font-sans">Scroll</span>
          <ChevronDown size={14} className="text-white/40" />
        </motion.div>

        {/* Side Stats */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6">
          {[{ value: '50K+', label: 'Happy Couples' }, { value: '64+', label: 'Countries' }, { value: '100%', label: 'Ethical' }].map((stat) => (
            <div key={stat.value} className="text-right">
              <p className="font-serif text-2xl text-white font-light">{stat.value}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-sans">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
