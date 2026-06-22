'use client'

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { selectWishlistItems, removeFromWishlist } from '../../store/wishlistSlice';
import { addToCart, openCart } from '../../store/cartSlice';
import type { Product } from '../../types';
import toast from 'react-hot-toast';

interface WishlistPageProps {
  onView: (product: Product) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({ onView }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectWishlistItems);

  const formatPrice = (p: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);

  const handleMoveToCart = (product: Product) => {
    dispatch(addToCart({ product, selectedMetal: product.metal }));
    dispatch(removeFromWishlist(product.id));
    dispatch(openCart());
    toast.success('Moved to bag', {
      style: { fontFamily: 'Inter, sans-serif', fontSize: '13px' },
      iconTheme: { primary: '#b8860b', secondary: '#fff' },
    });
  };

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Heart size={20} className="text-rose-gold" strokeWidth={1.5} />
            <h1 className="font-serif text-4xl text-charcoal font-light">My Wishlist</h1>
          </div>
          <p className="font-sans text-gray-400 text-sm">{items.length} saved {items.length === 1 ? 'piece' : 'pieces'}</p>
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <Heart size={64} strokeWidth={1} className="text-gray-200 mx-auto mb-6" />
            <h2 className="font-serif text-2xl text-charcoal mb-3">Your wishlist is empty</h2>
            <p className="text-sm text-gray-400 font-sans mb-8">Save your favourite pieces to revisit them later</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => router.push('/shop')}
              className="px-8 py-3.5 bg-charcoal text-white text-xs uppercase tracking-widest font-sans hover:bg-gold-500 transition-colors flex items-center gap-2 mx-auto"
            >
              Explore Collection <ArrowRight size={14} />
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                  className="group bg-white border border-gray-100 hover:border-gray-200 transition-all"
                >
                  {/* Image */}
                  <div
                    className="aspect-square overflow-hidden cursor-pointer relative"
                    onClick={() => onView(item.product)}
                  >
                    <img
                      src={item.product.images[0]?.url}
                      alt={item.product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button
                      onClick={(e) => { e.stopPropagation(); dispatch(removeFromWishlist(item.product.id)); }}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:text-rose-500 transition-colors shadow-sm"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <p className="text-[10px] uppercase tracking-widest text-gold-500 font-sans mb-1">
                      {item.product.category.replace('-', ' ')}
                    </p>
                    <h3 className="font-serif text-lg text-charcoal leading-tight mb-1">{item.product.name}</h3>
                    <p className="text-xs text-gray-400 font-sans mb-3">{item.product.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-xl text-charcoal">{formatPrice(item.product.price)}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleMoveToCart(item.product)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-charcoal text-white text-[10px] uppercase tracking-widest font-sans hover:bg-gold-500 transition-colors"
                      >
                        <ShoppingBag size={11} />
                        Add to Bag
                      </motion.button>
                    </div>
                    <p className="text-[10px] text-gray-300 font-sans mt-2">
                      Saved {new Date(item.addedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
