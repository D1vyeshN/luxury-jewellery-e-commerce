'use client'

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FEATURED_PRODUCTS } from '../../constants';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TRENDING_SEARCHES = ['Oval engagement ring', 'Rose gold band', 'Diamond pendant', 'Halo setting', 'Tennis bracelet'];
const RECENT_SEARCHES = ['Solitaire ring', 'White gold earrings'];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const filteredProducts = query.length > 1
    ? FEATURED_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 4)
    : [];

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white shadow-2xl max-h-[85vh] overflow-hidden"
          >
            {/* Search Input */}
            <div className="px-6 lg:px-12 py-6 border-b border-gray-100">
              <div className="max-w-3xl mx-auto flex items-center gap-4">
                <Search size={20} className="text-gold-500 shrink-0" strokeWidth={1.5} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for rings, diamonds, necklaces..."
                  className="flex-1 text-lg font-sans text-charcoal placeholder-gray-300 focus:outline-none bg-transparent"
                />
                <button onClick={onClose} className="text-gray-400 hover:text-charcoal transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="max-w-3xl mx-auto px-6 lg:px-12 py-6 overflow-y-auto">
              {query.length > 1 && filteredProducts.length > 0 ? (
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 font-sans mb-4">Products</p>
                  <div className="space-y-3">
                    {filteredProducts.map((product) => (
                      <motion.button
                        key={product.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => { router.push('/shop'); onClose(); }}
                        className="w-full flex items-center gap-4 p-3 hover:bg-cream rounded-sm transition-colors group text-left"
                      >
                        <img
                          src={product.images[0]?.url}
                          alt={product.name}
                          className="w-16 h-16 object-cover bg-cream"
                        />
                        <div className="flex-1">
                          <p className="font-serif text-base text-charcoal">{product.name}</p>
                          <p className="text-xs text-gray-400 font-sans capitalize">{product.category.replace('-', ' ')}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-serif text-lg text-charcoal">{formatPrice(product.price)}</p>
                          <ArrowRight size={14} className="text-gold-500 ml-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                  <button
                    onClick={() => { router.push('/shop'); onClose(); }}
                    className="mt-4 text-xs uppercase tracking-widest text-gold-500 font-sans hover:text-gold-700 flex items-center gap-2"
                  >
                    View all results for "{query}" <ArrowRight size={12} />
                  </button>
                </div>
              ) : query.length > 1 ? (
                <div className="text-center py-8">
                  <p className="font-serif text-lg text-charcoal mb-2">No results found</p>
                  <p className="text-sm text-gray-400 font-sans">Try searching for "engagement ring" or "diamond necklace"</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Recent */}
                  {RECENT_SEARCHES.length > 0 && (
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-400 font-sans mb-3 flex items-center gap-2">
                        <Clock size={11} /> Recent
                      </p>
                      <div className="space-y-2">
                        {RECENT_SEARCHES.map((s) => (
                          <button
                            key={s}
                            onClick={() => setQuery(s)}
                            className="block text-sm text-charcoal hover:text-gold-500 transition-colors font-sans"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Trending */}
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 font-sans mb-3 flex items-center gap-2">
                      <TrendingUp size={11} /> Trending
                    </p>
                    <div className="space-y-2">
                      {TRENDING_SEARCHES.map((s) => (
                        <button
                          key={s}
                          onClick={() => setQuery(s)}
                          className="block text-sm text-charcoal hover:text-gold-500 transition-colors font-sans"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
