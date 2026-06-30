'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from './ProductCard';
import { FEATURED_PRODUCTS, METALS, DIAMOND_SHAPES, PRICE_RANGES } from '../../constants';
import type { Product, MetalType, DiamondShape } from '../../types';

interface ShopPageProps {
  onView: (product: Product) => void;
}

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Top Rated' },
];

export const ShopPage: React.FC<ShopPageProps> = ({ onView }) => {
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMetals, setSelectedMetals] = useState<MetalType[]>([]);
  const [selectedShapes, setSelectedShapes] = useState<DiamondShape[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [onlyNew, setOnlyNew] = useState(false);
  const [onlyBestseller, setOnlyBestseller] = useState(false);

  useEffect(() => {
    const shapeParam = searchParams.get('shape');
    const metalParam = searchParams.get('metal');
    const categoryParam = searchParams.get('category');

    if (shapeParam && DIAMOND_SHAPES.some(s => s.id === shapeParam)) {
      setSelectedShapes([shapeParam as DiamondShape]);
      setShowFilters(true);
    }

    if (metalParam && METALS.some(m => m.id === metalParam)) {
      setSelectedMetals([metalParam as MetalType]);
      setShowFilters(true);
    }

    if (categoryParam === 'new') {
      setOnlyNew(true);
      setShowFilters(true);
    }

    if (categoryParam === 'bestseller') {
      setOnlyBestseller(true);
      setShowFilters(true);
    }
  }, [searchParams]);

  const toggleMetal = (m: MetalType) => setSelectedMetals(p => p.includes(m) ? p.filter(x => x !== m) : [...p, m]);
  const toggleShape = (s: DiamondShape) => setSelectedShapes(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);

  const filtered = FEATURED_PRODUCTS
    .filter(p => selectedMetals.length === 0 || selectedMetals.includes(p.metal))
    .filter(p => selectedShapes.length === 0 || (p.diamondShape && selectedShapes.includes(p.diamondShape)))
    .filter(p => !priceRange || (p.price >= priceRange.min && p.price <= (priceRange.max === Infinity ? 999999 : priceRange.max)))
    .filter(p => !onlyNew || p.isNew)
    .filter(p => !onlyBestseller || p.isBestseller)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (a.isNew ? -1 : 1);
      return 0;
    });

  const activeFilterCount = selectedMetals.length + selectedShapes.length + (priceRange ? 1 : 0) + (onlyNew ? 1 : 0) + (onlyBestseller ? 1 : 0);

  const resetFilters = () => {
    setSelectedMetals([]);
    setSelectedShapes([]);
    setPriceRange(null);
    setOnlyNew(false);
    setOnlyBestseller(false);
  };

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      {/* Hero Banner */}
      <div className="bg-cream py-12 mb-10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.3em] text-gold-500 font-sans mb-3"
          >
            Our Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl lg:text-5xl text-charcoal font-light"
          >
            Fine Jewellery
          </motion.h1>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-xs uppercase tracking-widest font-sans text-charcoal hover:text-gold-500 transition-colors border border-gray-200 px-4 py-2 hover:border-gold-500"
            >
              <Filter size={13} />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-gold-500 text-white text-[9px] rounded-full flex items-center justify-center">{activeFilterCount}</span>
              )}
            </button>

            {/* Active filter chips */}
            <div className="flex flex-wrap gap-2">
              {selectedMetals.map(m => (
                <span key={m} className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide font-sans bg-charcoal text-white px-3 py-1">
                  {METALS.find(x => x.id === m)?.label}
                  <button onClick={() => toggleMetal(m)}><X size={10} /></button>
                </span>
              ))}
              {selectedShapes.map(s => (
                <span key={s} className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide font-sans bg-charcoal text-white px-3 py-1 capitalize">
                  {s}
                  <button onClick={() => toggleShape(s)}><X size={10} /></button>
                </span>
              ))}
              {priceRange && (
                <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide font-sans bg-charcoal text-white px-3 py-1">
                  {PRICE_RANGES.find(r => r.min === priceRange.min)?.label}
                  <button onClick={() => setPriceRange(null)}><X size={10} /></button>
                </span>
              )}
              {activeFilterCount > 0 && (
                <button onClick={resetFilters} className="text-[10px] text-gray-400 hover:text-gold-500 font-sans uppercase tracking-wide transition-colors">
                  Clear All
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 font-sans hidden sm:inline">{filtered.length} pieces</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 border border-gray-200 text-xs font-sans text-charcoal focus:outline-none focus:border-gold-500 bg-white cursor-pointer"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-56 shrink-0 space-y-8"
            >
              {/* Badges */}
              <div>
                <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-3">Collection</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={onlyNew} onChange={e => setOnlyNew(e.target.checked)} className="accent-gold-500" />
                    <span className="text-sm font-sans text-charcoal">New Arrivals</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={onlyBestseller} onChange={e => setOnlyBestseller(e.target.checked)} className="accent-gold-500" />
                    <span className="text-sm font-sans text-charcoal">Bestsellers</span>
                  </label>
                </div>
              </div>

              {/* Metal */}
              <div>
                <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-3">Metal</h3>
                <div className="space-y-2">
                  {METALS.map((m) => (
                    <label key={m.id} className="flex items-center gap-3 cursor-pointer group">
                      <button
                        onClick={() => toggleMetal(m.id as MetalType)}
                        className={`w-5 h-5 border-2 rounded-full transition-all shrink-0 ${selectedMetals.includes(m.id as MetalType) ? 'border-charcoal' : 'border-gray-200'}`}
                        style={{ backgroundColor: m.color }}
                      />
                      <span className="text-sm font-sans text-charcoal group-hover:text-gold-500 transition-colors">{m.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Shape */}
              <div>
                <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-3">Diamond Shape</h3>
                <div className="space-y-2">
                  {DIAMOND_SHAPES.slice(0, 8).map((s) => (
                    <label key={s.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedShapes.includes(s.id as DiamondShape)}
                        onChange={() => toggleShape(s.id as DiamondShape)}
                        className="accent-gold-500"
                      />
                      <span className="text-sm font-sans text-charcoal capitalize">{s.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-3">Price Range</h3>
                <div className="space-y-1.5">
                  {PRICE_RANGES.map((r) => (
                    <button
                      key={r.label}
                      onClick={() => setPriceRange(priceRange?.min === r.min ? null : r)}
                      className={`block w-full text-left text-sm font-sans py-1 transition-colors ${
                        priceRange?.min === r.min ? 'text-gold-500 font-medium' : 'text-charcoal hover:text-gold-500'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-serif text-2xl text-charcoal mb-2">No pieces match your selection</p>
                <button onClick={resetFilters} className="text-sm text-gold-500 font-sans hover:text-gold-700">
                  Clear all filters
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12"
              >
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} onView={onView} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
