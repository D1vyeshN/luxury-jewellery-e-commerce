'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from '../product/ProductCard';
import { FEATURED_PRODUCTS } from '../../constants';
import type { Product, ProductCategory } from '../../types';

const TABS: { label: string; value: ProductCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Engagement Rings', value: 'engagement-rings' },
  { label: 'Wedding Bands', value: 'wedding-bands' },
  { label: 'Fine Jewellery', value: 'necklaces' },
];

interface FeaturedCollectionProps {
  onView: (product: Product) => void;
}

export const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({ onView }) => {
  const [activeTab, setActiveTab] = useState<ProductCategory | 'all'>('all');

  const filtered = activeTab === 'all'
    ? FEATURED_PRODUCTS
    : FEATURED_PRODUCTS.filter(p => {
        if (activeTab === 'necklaces') return ['necklaces', 'earrings', 'bracelets'].includes(p.category);
        return p.category === activeTab;
      });

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.3em] text-gold-500 font-sans mb-3"
            >
              Curated Selection
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl lg:text-5xl text-charcoal font-light leading-tight"
            >
              The Collection
            </motion.h2>
          </div>

          {/* Tabs */}
          <div className="flex gap-0 border border-gray-200 w-fit">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2.5 text-xs font-sans uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.value
                    ? 'bg-charcoal text-white'
                    : 'text-gray-500 hover:text-charcoal hover:bg-cream'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12"
        >
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onView={onView} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-14"
        >
          <Link href={activeTab === 'all' ? '/shop' : `/shop?category=${activeTab}`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-10 py-4 border border-charcoal text-charcoal text-xs uppercase tracking-[0.2em] font-sans hover:bg-charcoal hover:text-white transition-all duration-300 group"
            >
              View All Pieces
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
