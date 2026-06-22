'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Leaf, Globe, Heart } from 'lucide-react';
import Link from 'next/link';
import { BRAND_STATS } from '../../constants';

const PILLARS = [
  {
    icon: Award,
    title: 'Master Craftsmanship',
    description: 'Each piece is handcrafted in our Los Angeles atelier by artisans with decades of expertise.',
  },
  {
    icon: Leaf,
    title: 'Ethically Sourced',
    description: 'We use only conflict-free, lab-grown diamonds — identical in brilliance but kinder to the planet.',
  },
  {
    icon: Globe,
    title: 'Globally Trusted',
    description: 'Shipped to 64+ countries with insured express delivery and GIA/IGI certification.',
  },
  {
    icon: Heart,
    title: 'Lifetime Guarantee',
    description: 'Every Aveline piece comes with a lifetime warranty, free resizing, and complimentary polishing.',
  },
];

export const BrandStory: React.FC = () => {
  return (
    <section className="py-20 lg:py-32 bg-charcoal overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Story */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.3em] text-gold-400 font-sans mb-4"
            >
              Our Story
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl lg:text-5xl text-white font-light leading-tight mb-6"
            >
              Two Decades of
              <br />
              <em className="text-gold-300">Exceptional Beauty</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-sans text-white/60 leading-relaxed mb-6 text-base"
            >
              Founded in 2004, Aveline was born from a simple belief: that extraordinary jewellery should celebrate 
              love, not compromise on ethics. Our master craftsmen in Los Angeles blend time-honoured techniques with 
              modern innovation to create pieces of lasting beauty.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="font-sans text-white/60 leading-relaxed mb-8 text-base"
            >
              Today, we're proud to have been recognised as the best online jeweller by leading American magazines 
              and ranked 5th among over 10,000 e-commerce sites worldwide.
            </motion.p>
            <Link href="/about">
              <motion.button
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 text-gold-400 text-xs uppercase tracking-widest font-sans group"
              >
                Our Full Story
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </Link>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-12 border-t border-white/10"
            >
              {BRAND_STATS.map((stat) => (
                <div key={stat.value} className="text-center">
                  <p className="font-serif text-3xl text-gold-300 font-light">{stat.value}</p>
                  <p className="text-xs text-white/40 font-sans mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Image Grid */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/7615245/pexels-photo-7615245.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=400"
                    alt="Aveline craftsmanship"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/9430439/pexels-photo-9430439.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400"
                    alt="Fine jewellery collection"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/3871582/pexels-photo-3871582.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400"
                    alt="Diamond engagement ring"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/10215179/pexels-photo-10215179.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=400"
                    alt="Diamond pendant necklace"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
            </motion.div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-8 -left-8 bg-gold-500 text-white px-6 py-5 hidden lg:block"
            >
              <p className="font-serif text-3xl font-light">#1</p>
              <p className="text-xs uppercase tracking-widest font-sans mt-1 opacity-90">Rated Online Jeweller</p>
              <p className="text-[10px] opacity-60 font-sans mt-0.5">Best Online Shops 2021</p>
            </motion.div>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-24 pt-16 border-t border-white/10">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="w-10 h-10 border border-gold-500/40 group-hover:border-gold-500 flex items-center justify-center mb-4 transition-colors">
                <pillar.icon size={18} className="text-gold-400" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-lg text-white mb-2">{pillar.title}</h3>
              <p className="text-sm text-white/40 font-sans leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
