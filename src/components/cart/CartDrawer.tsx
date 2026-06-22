import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Shield, Truck } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { closeCart, selectCartItems, selectCartOpen, removeFromCart, updateQuantity, selectCartTotal } from '../../store/cartSlice';

export const CartDrawer: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectCartOpen);
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeCart())}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[440px] bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} strokeWidth={1.5} className="text-gold-500" />
                <span className="font-serif text-xl text-charcoal">Your Bag</span>
                <span className="font-sans text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <button
                onClick={() => dispatch(closeCart())}
                className="w-8 h-8 flex items-center justify-center hover:text-gold-500 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <ShoppingBag size={48} strokeWidth={1} className="text-gray-200 mb-4" />
                  <p className="font-serif text-xl text-charcoal mb-2">Your bag is empty</p>
                  <p className="text-sm text-gray-400 font-sans mb-6">Discover our exquisite collection</p>
                  <button
                    onClick={() => dispatch(closeCart())}
                    className="px-6 py-3 bg-charcoal text-white text-xs uppercase tracking-widest font-sans hover:bg-gold-500 transition-colors"
                  >
                    Explore Collection
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4"
                    >
                      {/* Image */}
                      <div className="w-24 h-24 bg-cream flex-shrink-0 overflow-hidden">
                        <img
                          src={item.product.images[0]?.url}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-serif text-base text-charcoal leading-tight">{item.product.name}</p>
                            {item.selectedMetal && (
                              <p className="text-xs text-gray-400 font-sans mt-0.5 capitalize">
                                {item.selectedMetal.replace('-', ' ')}
                              </p>
                            )}
                            {item.selectedSize && (
                              <p className="text-xs text-gray-400 font-sans">Size {item.selectedSize}</p>
                            )}
                            {item.product.caratWeight && (
                              <p className="text-xs text-gold-500 font-sans mt-0.5">{item.product.caratWeight}ct · {item.product.clarity} · {item.product.color}</p>
                            )}
                          </div>
                          <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="text-gray-300 hover:text-red-400 transition-colors ml-2"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity */}
                          <div className="flex items-center border border-gray-200 rounded-sm">
                            <button
                              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                              className="w-7 h-7 flex items-center justify-center hover:text-gold-500 transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-sm font-sans">{item.quantity}</span>
                            <button
                              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                              className="w-7 h-7 flex items-center justify-center hover:text-gold-500 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="font-serif text-lg text-charcoal">{formatPrice(item.totalPrice)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 px-8 py-6 space-y-4">
                {/* Trust badges */}
                <div className="flex items-center gap-4 text-xs text-gray-400 font-sans">
                  <div className="flex items-center gap-1.5">
                    <Shield size={12} className="text-gold-500" />
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck size={12} className="text-gold-500" />
                    <span>Free Express Shipping</span>
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-sans text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(total * 0.926)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-sans text-gray-600">
                    <span>Shipping</span>
                    <span className="text-gold-500">Complimentary</span>
                  </div>
                  <div className="flex justify-between font-serif text-xl text-charcoal pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-4 bg-charcoal text-white text-xs uppercase tracking-widest font-sans hover:bg-gold-500 transition-colors flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight size={14} />
                </motion.button>
                <button className="w-full text-center text-xs text-gray-400 hover:text-charcoal transition-colors font-sans uppercase tracking-wider pt-1" onClick={() => dispatch(closeCart())}>
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
