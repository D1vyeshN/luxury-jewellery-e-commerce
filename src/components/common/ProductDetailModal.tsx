import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Star, Shield, Truck, RotateCcw, Plus, Minus, ChevronDown } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { addToCart, openCart } from '../../store/cartSlice';
import { addToWishlist, removeFromWishlist, selectIsWishlisted } from '../../store/wishlistSlice';
import type { Product, MetalType } from '../../types';
import { METALS } from '../../constants';
import toast from 'react-hot-toast';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const dispatch = useAppDispatch();
  const isWishlisted = useAppSelector(state => product ? selectIsWishlisted(product.id)(state) : false);
  const [selectedMetal, setSelectedMetal] = useState<MetalType>(product?.metal || 'white-gold');
  const [selectedSize, setSelectedSize] = useState<number>(6);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  if (!product) return null;

  const formatPrice = (p: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, selectedMetal, selectedSize, quantity }));
    dispatch(openCart());
    onClose();
    toast.success(`${product.name} added to bag`, {
      style: { fontFamily: 'Inter, sans-serif', fontSize: '13px' },
      iconTheme: { primary: '#b8860b', secondary: '#fff' },
    });
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
      toast.success('Added to wishlist ♥', {
        style: { fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#b76e79' },
      });
    }
  };

  const SIZES = [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9];

  const ACCORDION_ITEMS = [
    {
      id: 'details',
      label: 'Product Details',
      content: (
        <div className="grid grid-cols-2 gap-3 text-sm font-sans">
          {product.caratWeight && <div><span className="text-gray-400">Carat:</span> <span className="text-charcoal">{product.caratWeight}ct</span></div>}
          {product.clarity && <div><span className="text-gray-400">Clarity:</span> <span className="text-charcoal">{product.clarity}</span></div>}
          {product.color && <div><span className="text-gray-400">Color:</span> <span className="text-charcoal">{product.color}</span></div>}
          {product.cut && <div><span className="text-gray-400">Cut:</span> <span className="text-charcoal">{product.cut}</span></div>}
          {product.certification && <div><span className="text-gray-400">Cert.:</span> <span className="text-blue-600">{product.certification}</span></div>}
          <div><span className="text-gray-400">SKU:</span> <span className="text-charcoal">{product.sku}</span></div>
        </div>
      ),
    },
    {
      id: 'shipping',
      label: 'Shipping & Returns',
      content: (
        <div className="space-y-2 text-sm font-sans text-gray-500">
          <p>✦ Complimentary express shipping worldwide</p>
          <p>✦ Insured & tracked delivery in signature box</p>
          <p>✦ Free 30-day returns & exchanges</p>
          <p>✦ Ships within 7-10 business days for custom pieces</p>
        </div>
      ),
    },
    {
      id: 'warranty',
      label: 'Warranty & Care',
      content: (
        <div className="space-y-2 text-sm font-sans text-gray-500">
          <p>✦ Lifetime manufacturing warranty</p>
          <p>✦ Complimentary cleaning & polishing service</p>
          <p>✦ Free resizing within first 30 days</p>
          <p>✦ Certificate of authenticity included</p>
        </div>
      ),
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl relative custom-scrollbar"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 flex items-center justify-center hover:text-gold-500 transition-colors shadow-sm rounded-full"
          >
            <X size={16} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="relative bg-cream aspect-square md:aspect-auto md:min-h-[500px]">
              {!imgLoaded && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse" />
              )}
              <img
                src={product.images[0]?.url}
                alt={product.images[0]?.alt}
                className="w-full h-full object-cover"
                onLoad={() => setImgLoaded(true)}
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.isNew && <span className="bg-charcoal text-white text-[9px] uppercase tracking-widest px-2.5 py-1 font-sans">New</span>}
                {product.isBestseller && <span className="bg-gold-500 text-white text-[9px] uppercase tracking-widest px-2.5 py-1 font-sans">Bestseller</span>}
              </div>
            </div>

            {/* Details */}
            <div className="p-8 flex flex-col">
              {/* Category */}
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold-500 font-sans mb-2">
                {product.category.replace('-', ' ')}
              </p>

              {/* Name */}
              <h2 className="font-serif text-2xl lg:text-3xl text-charcoal font-light mb-2">{product.name}</h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className={i < Math.floor(product.rating) ? 'fill-gold-500 text-gold-500' : 'fill-gray-100 text-gray-100'} />
                  ))}
                </div>
                <span className="text-xs text-gray-400 font-sans">{product.rating} ({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-serif text-3xl text-charcoal">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-base text-gray-400 line-through font-sans">{formatPrice(product.originalPrice)}</span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-500 font-sans leading-relaxed mb-6">{product.description}</p>

              {/* Metal Selector */}
              <div className="mb-5">
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-sans mb-2">
                  Metal: <span className="text-charcoal">{METALS.find(m => m.id === selectedMetal)?.label}</span>
                </p>
                <div className="flex gap-2">
                  {METALS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMetal(m.id as MetalType)}
                      title={m.label}
                      className={`w-8 h-8 rounded-full transition-all border-2 ${selectedMetal === m.id ? 'border-charcoal scale-110 shadow-md' : 'border-transparent hover:border-gray-300'}`}
                      style={{ backgroundColor: m.color }}
                    />
                  ))}
                </div>
              </div>

              {/* Ring Size */}
              {product.category.includes('ring') && (
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-sans">Ring Size</p>
                    <button className="text-[10px] text-gold-500 font-sans uppercase tracking-wider hover:text-gold-700">Size Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {SIZES.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-9 h-9 border text-xs font-sans transition-all ${selectedSize === size ? 'bg-charcoal text-white border-charcoal' : 'border-gray-200 text-charcoal hover:border-gold-500'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-gray-200">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center hover:text-gold-500 transition-colors">
                    <Minus size={12} />
                  </button>
                  <span className="w-10 text-center text-sm font-sans">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="w-9 h-9 flex items-center justify-center hover:text-gold-500 transition-colors">
                    <Plus size={12} />
                  </button>
                </div>
                {product.stock <= 3 && (
                  <span className="text-xs text-amber-600 font-sans">Only {product.stock} left</span>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3 mb-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-charcoal text-white text-xs uppercase tracking-widest font-sans hover:bg-gold-500 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={14} /> Add to Bag
                </motion.button>
                <button
                  onClick={handleWishlist}
                  className={`w-12 h-12 border flex items-center justify-center transition-all ${isWishlisted ? 'border-rose-400 bg-rose-50' : 'border-gray-200 hover:border-rose-400'}`}
                >
                  <Heart size={16} className={isWishlisted ? 'fill-rose-gold text-rose-gold' : 'text-charcoal'} />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 text-xs text-gray-400 font-sans mb-6">
                <span className="flex items-center gap-1.5"><Shield size={11} className="text-gold-500" /> Certified</span>
                <span className="flex items-center gap-1.5"><Truck size={11} className="text-gold-500" /> Free Shipping</span>
                <span className="flex items-center gap-1.5"><RotateCcw size={11} className="text-gold-500" /> 30-Day Returns</span>
              </div>

              {/* Accordion */}
              <div className="border-t border-gray-100">
                {ACCORDION_ITEMS.map((item) => (
                  <div key={item.id} className="border-b border-gray-100">
                    <button
                      onClick={() => setActiveAccordion(activeAccordion === item.id ? null : item.id)}
                      className="flex items-center justify-between w-full py-3 text-xs uppercase tracking-widest font-sans text-charcoal hover:text-gold-500 transition-colors"
                    >
                      {item.label}
                      <ChevronDown size={14} className={`transition-transform ${activeAccordion === item.id ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {activeAccordion === item.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-4">{item.content}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
