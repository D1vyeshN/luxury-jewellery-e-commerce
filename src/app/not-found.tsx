'use client'

import { motion } from 'framer-motion'
import { Home, ShoppingBag, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="font-serif text-[12rem] lg:text-[16rem] text-charcoal font-light leading-none tracking-tight">
            404
          </h1>
        </motion.div>

        {/* Decorative Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '120px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-px bg-gold-500 mx-auto mb-8"
        />

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gold-500 font-sans mb-4">
            Page Not Found
          </p>
          <h2 className="font-serif text-2xl lg:text-3xl text-charcoal font-light mb-4">
            This page has vanished into thin air
          </h2>
          <p className="text-sm text-gray-500 font-sans leading-relaxed mb-12 max-w-md mx-auto">
            The piece you're looking for may have been moved, or perhaps it never existed. 
            Let us guide you back to our collection.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-charcoal text-white text-xs uppercase tracking-[0.2em] font-sans hover:bg-gold-500 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Home size={14} />
              Return Home
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 border border-charcoal text-charcoal text-xs uppercase tracking-[0.2em] font-sans hover:border-gold-500 hover:text-gold-500 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ShoppingBag size={14} />
              Browse Collection
            </motion.button>
          </Link>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none"
        >
          <div className="w-[600px] h-[600px] rounded-full border border-gold-500/20" />
        </motion.div>
      </div>
    </div>
  )
}
