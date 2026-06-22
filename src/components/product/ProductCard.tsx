import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Star, Zap } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { addToCart } from '../../store/cartSlice';
import { addToWishlist, removeFromWishlist, selectIsWishlisted } from '../../store/wishlistSlice';
import type { Product } from '../../types';
import { METALS } from '../../constants';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  onView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onView }) => {
  const dispatch = useAppDispatch();
  const isWishlisted = useAppSelector(selectIsWishlisted(product.id));
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart({ product, selectedMetal: product.metal }));
    toast.success(`${product.name} added to bag`, {
      style: { fontFamily: 'Inter, sans-serif', fontSize: '13px' },
      iconTheme: { primary: '#b8860b', secondary: '#fff' },
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
      toast.success('Removed from wishlist', { style: { fontFamily: 'Inter, sans-serif', fontSize: '13px' } });
    } else {
      dispatch(addToWishlist(product));
      toast.success('Added to wishlist', {
        icon: '♥',
        style: { fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#b76e79' },
      });
    }
  };

  const metalColor = METALS.find(m => m.id === product.metal)?.color || '#b8860b';

  return (
    <motion.div
      className="group cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onView?.(product)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-[#faf9f6] aspect-square mb-4">
        <motion.img
          src={product.images[0]?.url}
          alt={product.images[0]?.alt || product.name}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.06 : 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-charcoal text-white text-[9px] uppercase tracking-widest px-2.5 py-1 font-sans">New</span>
          )}
          {product.isBestseller && (
            <span className="bg-gold-500 text-white text-[9px] uppercase tracking-widest px-2.5 py-1 font-sans">Bestseller</span>
          )}
          {product.originalPrice && (
            <span className="bg-rose-gold text-white text-[9px] uppercase tracking-widest px-2.5 py-1 font-sans">Sale</span>
          )}
        </div>

        {/* Actions */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute inset-x-3 bottom-3 flex gap-2"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="flex-1 py-2.5 bg-charcoal text-white text-[10px] uppercase tracking-widest font-sans hover:bg-gold-500 transition-colors flex items-center justify-center gap-1.5"
              >
                <ShoppingBag size={11} />
                Add to Bag
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); onView?.(product); }}
                className="w-10 bg-white flex items-center justify-center hover:bg-cream transition-colors border border-gray-100"
              >
                <Eye size={13} className="text-charcoal" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all hover:bg-white shadow-sm"
        >
          <Heart
            size={14}
            className={`transition-colors ${isWishlisted ? 'fill-rose-gold text-rose-gold' : 'text-charcoal'}`}
          />
        </button>

        {/* Stock Warning */}
        {product.stock <= 2 && (
          <div className="absolute bottom-14 left-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 flex items-center gap-1.5">
            <Zap size={11} className="text-amber-500" />
            <span className="text-[10px] font-sans text-charcoal">Only {product.stock} left</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-1.5">
        {/* Category & Metal */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-sans">
            {product.category.replace('-', ' ')}
          </span>
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-full border border-gray-200"
              style={{ backgroundColor: metalColor }}
              title={METALS.find(m => m.id === product.metal)?.label}
            />
            {product.diamondShape && (
              <span className="text-[10px] text-gray-400 font-sans capitalize">{product.diamondShape}</span>
            )}
          </div>
        </div>

        {/* Name */}
        <h3 className="font-serif text-lg text-charcoal leading-tight group-hover:text-gold-600 transition-colors">
          {product.name}
        </h3>

        {/* Specs */}
        {(product.caratWeight || product.clarity) && (
          <p className="text-xs text-gray-400 font-sans">
            {product.caratWeight && `${product.caratWeight}ct`}
            {product.caratWeight && product.clarity && ' · '}
            {product.clarity}
            {product.color && ` · ${product.color}`}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                className={i < Math.floor(product.rating) ? 'text-gold-500 fill-gold-500' : 'text-gray-200 fill-gray-200'}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-400 font-sans">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="font-serif text-xl text-charcoal">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through font-sans">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
