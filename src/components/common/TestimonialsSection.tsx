import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../constants';

export const TestimonialsSection: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  const testimonial = TESTIMONIALS[current];

  return (
    <section className="py-20 lg:py-28 bg-cream overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center">
          {/* Left: Label */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-gold-500 font-sans mb-3">Client Stories</p>
              <h2 className="font-serif text-4xl text-charcoal font-light leading-tight">
                Words from<br />
                <em>Our Couples</em>
              </h2>
              <div className="flex gap-1 mt-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-gold-500 text-gold-500" />
                ))}
              </div>
              <p className="text-xs text-gray-400 font-sans mt-2">4.9/5 from 3,200+ reviews</p>
              <div className="flex items-center gap-3 mt-8">
                <button
                  onClick={prev}
                  className="w-10 h-10 border border-gray-200 hover:border-gold-500 hover:text-gold-500 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 border border-gray-200 hover:border-gold-500 hover:text-gold-500 flex items-center justify-center transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="flex gap-2 mt-4">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-0.5 transition-all duration-300 ${i === current ? 'w-8 bg-gold-500' : 'w-4 bg-gray-300 hover:bg-gray-400'}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Center: Main Testimonial */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-8 lg:p-12 relative shadow-sm"
              >
                <Quote size={40} className="text-gold-200 absolute top-8 left-8" strokeWidth={1} />

                <div className="flex gap-1 mb-6 pt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-gold-500 text-gold-500" />
                  ))}
                </div>

                <blockquote className="font-serif text-xl lg:text-2xl text-charcoal leading-relaxed font-light italic mb-8">
                  "{testimonial.text}"
                </blockquote>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gold-200"
                    />
                    <div>
                      <p className="font-sans font-medium text-sm text-charcoal">{testimonial.name}</p>
                      <p className="font-sans text-xs text-gray-400">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] uppercase tracking-widest text-gold-500 font-sans">Purchased</p>
                    <p className="text-sm text-charcoal font-sans font-medium mt-0.5">{testimonial.product}</p>
                  </div>
                </div>

                {/* Gold accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Mobile controls */}
            <div className="flex items-center justify-center gap-4 mt-6 lg:hidden">
              <button onClick={prev} className="w-10 h-10 border border-gray-200 flex items-center justify-center">
                <ChevronLeft size={16} />
              </button>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-gold-500' : 'w-4 bg-gray-300'}`}
                />
              ))}
              <button onClick={next} className="w-10 h-10 border border-gray-200 flex items-center justify-center">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Press Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 pt-12 border-t border-gray-200"
        >
          <p className="text-center text-xs uppercase tracking-[0.3em] text-gray-400 font-sans mb-8">As Seen In</p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-40">
            {['Vogue', 'Harper\'s Bazaar', 'Town & Country', 'The Knot', 'Brides', 'Forbes'].map((press) => (
              <span key={press} className="font-serif text-lg text-charcoal tracking-wide">{press}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
