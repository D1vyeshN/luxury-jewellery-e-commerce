'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { METALS } from '../../constants';

const METAL_IMAGES: Record<string, string> = {
  'yellow-gold': 'https://images.pexels.com/photos/13524236/pexels-photo-13524236.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=400',
  'white-gold': 'https://images.pexels.com/photos/2849742/pexels-photo-2849742.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=400',
  'rose-gold': 'https://images.pexels.com/photos/17068457/pexels-photo-17068457.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=400',
  'platinum': 'https://images.pexels.com/photos/30541185/pexels-photo-30541185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=400',
};

export const ShopByMetal: React.FC = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.3em] text-gold-500 font-sans mb-3"
            >
              Browse by Metal
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl lg:text-4xl text-charcoal font-light"
            >
              Choose Your <em>Precious Metal</em>
            </motion.h2>
          </div>
          <Link href="/education">
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-widest text-gold-500 font-sans hover:text-gold-700 flex items-center gap-2 group mt-4 lg:mt-0"
            >
              Metal Education Guide
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {METALS.map((metal, i) => (
            <Link key={metal.id} href={`/shop?metal=${metal.id}`}>
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden aspect-[3/4] text-left w-full"
              >
              {/* Image */}
              <img
                src={METAL_IMAGES[metal.id]}
                alt={metal.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(to top, ${metal.color}aa, transparent 60%)`,
                  opacity: 0.7,
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white/50"
                    style={{ backgroundColor: metal.color }}
                  />
                  <span className="text-[10px] uppercase tracking-widest text-white/80 font-sans">{metal.description}</span>
                </div>
                <h3 className="font-serif text-xl lg:text-2xl text-white font-light">{metal.label}</h3>
                <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs text-white/80 font-sans uppercase tracking-wider">Shop Now</span>
                  <ArrowRight size={12} className="text-white" />
                </div>
              </div>
              </motion.button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
