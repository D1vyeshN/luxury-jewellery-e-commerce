import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, Star, Shield, Info } from 'lucide-react';
import { SAMPLE_DIAMONDS, DIAMOND_SHAPES } from '../../constants';
import type { Diamond, DiamondShape } from '../../types';

const COLORS = ['D', 'E', 'F', 'G', 'H', 'I', 'J'];
const CLARITIES = ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2'];


interface DiamondSearchProps {
  onSelect?: (diamond: Diamond) => void;
}

export const DiamondSearch: React.FC<DiamondSearchProps> = ({ onSelect }) => {
  const [selectedShapes, setSelectedShapes] = useState<DiamondShape[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedClarities, setSelectedClarities] = useState<string[]>([]);
  const [caratMin, setCaratMin] = useState(0.5);
  const [caratMax, setCaratMax] = useState(3);
  const [priceMin] = useState(0);
  const [priceMax] = useState(20000);
  const [showFilters, setShowFilters] = useState(true);
  const [selectedDiamond, setSelectedDiamond] = useState<Diamond | null>(null);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'carat-desc'>('price-asc');

  const toggleShape = (shape: DiamondShape) => {
    setSelectedShapes(prev => prev.includes(shape) ? prev.filter(s => s !== shape) : [...prev, shape]);
  };
  const toggleColor = (c: string) => {
    setSelectedColors(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };
  const toggleClarity = (c: string) => {
    setSelectedClarities(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };

  const filtered = SAMPLE_DIAMONDS
    .filter(d => selectedShapes.length === 0 || selectedShapes.includes(d.shape))
    .filter(d => selectedColors.length === 0 || selectedColors.includes(d.color))
    .filter(d => selectedClarities.length === 0 || selectedClarities.includes(d.clarity))
    .filter(d => d.caratWeight >= caratMin && d.caratWeight <= caratMax)
    .filter(d => d.price >= priceMin && d.price <= priceMax)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return b.caratWeight - a.caratWeight;
    });

  const formatPrice = (p: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-500 font-sans mb-3">Lab-Grown Certified</p>
          <div className="flex items-end justify-between">
            <h1 className="font-serif text-4xl lg:text-5xl text-charcoal font-light">
              Diamond <em>Search</em>
            </h1>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-xs uppercase tracking-widest font-sans text-gray-500 hover:text-charcoal transition-colors"
            >
              <SlidersHorizontal size={14} />
              {showFilters ? 'Hide' : 'Show'} Filters
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-64 shrink-0 space-y-8"
            >
              {/* Shape Filter */}
              <div>
                <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-3 flex items-center gap-2">
                  <Filter size={10} /> Diamond Shape
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {DIAMOND_SHAPES.slice(0, 9).map((shape) => (
                    <button
                      key={shape.id}
                      onClick={() => toggleShape(shape.id as DiamondShape)}
                      className={`py-2 text-center text-[10px] uppercase tracking-wide font-sans border transition-all ${
                        selectedShapes.includes(shape.id as DiamondShape)
                          ? 'border-gold-500 bg-gold-50 text-gold-600'
                          : 'border-gray-200 text-gray-400 hover:border-gray-300'
                      }`}
                    >
                      {shape.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Carat Range */}
              <div>
                <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-3">Carat Weight</h3>
                <div className="flex gap-3">
                  <div>
                    <label className="text-[10px] text-gray-400 font-sans block mb-1">Min</label>
                    <input
                      type="number"
                      min={0.5} max={caratMax} step={0.1}
                      value={caratMin}
                      onChange={(e) => setCaratMin(Number(e.target.value))}
                      className="w-full border border-gray-200 px-2 py-1.5 text-sm font-sans focus:outline-none focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 font-sans block mb-1">Max</label>
                    <input
                      type="number"
                      min={caratMin} max={10} step={0.1}
                      value={caratMax}
                      onChange={(e) => setCaratMax(Number(e.target.value))}
                      className="w-full border border-gray-200 px-2 py-1.5 text-sm font-sans focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>
              </div>

              {/* Color */}
              <div>
                <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-3">Color Grade</h3>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => toggleColor(c)}
                      className={`w-9 h-9 border text-xs font-sans font-medium transition-all ${
                        selectedColors.includes(c)
                          ? 'border-gold-500 bg-gold-500 text-white'
                          : 'border-gray-200 text-charcoal hover:border-gold-300'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-[9px] text-gray-400 font-sans">
                  <span>← Colorless</span>
                  <span>Near Colorless →</span>
                </div>
              </div>

              {/* Clarity */}
              <div>
                <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-3">Clarity</h3>
                <div className="flex flex-wrap gap-2">
                  {CLARITIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => toggleClarity(c)}
                      className={`px-2 py-1 border text-xs font-sans transition-all ${
                        selectedClarities.includes(c)
                          ? 'border-gold-500 bg-gold-500 text-white'
                          : 'border-gray-200 text-charcoal hover:border-gold-300'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset */}
              <button
                onClick={() => { setSelectedShapes([]); setSelectedColors([]); setSelectedClarities([]); setCaratMin(0.5); setCaratMax(3); }}
                className="text-xs uppercase tracking-widest text-gold-500 font-sans hover:text-gold-700 transition-colors"
              >
                Reset All Filters
              </button>
            </motion.div>
          )}

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-400 font-sans">{filtered.length} diamonds found</p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="text-xs font-sans border border-gray-200 px-3 py-2 focus:outline-none focus:border-gold-500 bg-white"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="carat-desc">Carat: Largest First</option>
              </select>
            </div>

            <div className="space-y-3">
              {filtered.map((diamond) => (
                <motion.div
                  key={diamond.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ x: 2 }}
                  onClick={() => setSelectedDiamond(selectedDiamond?.id === diamond.id ? null : diamond)}
                  className={`bg-white border cursor-pointer transition-all duration-300 ${
                    selectedDiamond?.id === diamond.id ? 'border-gold-500 shadow-md' : 'border-gray-100 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-6 p-4">
                    {/* Shape indicator */}
                    <div className="w-12 h-12 bg-cream flex items-center justify-center shrink-0">
                      <span className="text-xs font-sans font-medium text-charcoal capitalize">{diamond.shape.slice(0, 3).toUpperCase()}</span>
                    </div>

                    <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-gray-400 font-sans">Shape</p>
                        <p className="font-sans text-charcoal capitalize font-medium mt-0.5">{diamond.shape}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-gray-400 font-sans">Carat</p>
                        <p className="font-sans text-charcoal font-medium mt-0.5">{diamond.caratWeight}ct</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-gray-400 font-sans">Color · Clarity</p>
                        <p className="font-sans text-charcoal font-medium mt-0.5">{diamond.color} · {diamond.clarity}</p>
                      </div>
                      <div className="hidden md:block">
                        <p className="text-[9px] uppercase tracking-widest text-gray-400 font-sans">Cut · Cert.</p>
                        <p className="font-sans text-charcoal font-medium mt-0.5">{diamond.cut} · <span className="text-blue-600">{diamond.certification}</span></p>
                      </div>
                      <div className="hidden md:block">
                        <p className="text-[9px] uppercase tracking-widest text-gray-400 font-sans">Measurements</p>
                        <p className="font-sans text-xs text-gray-500 mt-0.5">{diamond.measurements}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <p className="font-serif text-xl text-charcoal">{formatPrice(diamond.price)}</p>
                        <div className="flex items-center gap-1 justify-end mt-0.5">
                          <Shield size={10} className="text-gold-500" />
                          <span className="text-[9px] text-gray-400 font-sans">Certified</span>
                        </div>
                      </div>
                      {onSelect ? (
                        <button
                          onClick={(e) => { e.stopPropagation(); onSelect(diamond); }}
                          className="px-4 py-2 bg-charcoal text-white text-[10px] uppercase tracking-widest font-sans hover:bg-gold-500 transition-colors"
                        >
                          Select
                        </button>
                      ) : (
                        <button className="flex items-center gap-1 text-[10px] text-gold-500 font-sans uppercase tracking-wider">
                          <Info size={12} />
                          Details
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {selectedDiamond?.id === diamond.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="border-t border-gray-100 px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 bg-cream"
                    >
                      {[
                        { label: 'Polish', value: diamond.polish },
                        { label: 'Symmetry', value: diamond.symmetry },
                        { label: 'Fluorescence', value: diamond.fluorescence },
                        { label: 'Table', value: `${diamond.table}%` },
                        { label: 'Depth', value: `${diamond.depth}%` },
                        { label: 'Measurements', value: diamond.measurements },
                      ].map((spec) => (
                        <div key={spec.label}>
                          <p className="text-[9px] uppercase tracking-widest text-gray-400 font-sans">{spec.label}</p>
                          <p className="text-sm font-sans text-charcoal font-medium mt-0.5">{spec.value}</p>
                        </div>
                      ))}
                      <div className="flex items-center gap-2 md:col-span-2">
                        <Star size={12} className="text-gold-500" />
                        <span className="text-xs text-gray-500 font-sans">Lab-grown: identical to natural diamonds in every physical, chemical, and optical property</span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {filtered.length === 0 && (
                <div className="text-center py-16">
                  <p className="font-serif text-2xl text-charcoal mb-2">No diamonds found</p>
                  <p className="text-sm text-gray-400 font-sans">Try adjusting your filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
