'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

const EDUCATION_CARDS = [
  {
    id: '4cs',
    title: 'The 4Cs of Diamonds',
    subtitle: 'Cut · Color · Clarity · Carat',
    description: 'Everything you need to know about evaluating diamond quality. Learn to read a diamond certificate and find the best value.',
    image: 'https://images.pexels.com/photos/5370650/pexels-photo-5370650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=600',
    readTime: 8,
    tag: 'Diamonds',
  },
  {
    id: 'shapes',
    title: 'Diamond Shape Guide',
    subtitle: 'Finding Your Signature Style',
    description: 'From the classic round brilliant to the elegant emerald cut, explore which diamond shape best reflects your personality.',
    image: 'https://images.pexels.com/photos/9430437/pexels-photo-9430437.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=600',
    readTime: 6,
    tag: 'Shapes',
  },
  {
    id: 'metals',
    title: 'Choosing Your Metal',
    subtitle: 'Gold, Rose Gold & Platinum',
    description: 'Understand the differences between white gold, yellow gold, rose gold and platinum to make the perfect choice.',
    image: 'https://images.pexels.com/photos/12427695/pexels-photo-12427695.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=600',
    readTime: 5,
    tag: 'Metals',
  },
];

export const EducationSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.3em] text-gold-500 font-sans mb-3"
            >
              Education
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl lg:text-4xl text-charcoal font-light"
            >
              Your <em>Jewellery Guide</em>
            </motion.h2>
          </div>
          <Link href="/education">
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-widest text-gold-500 font-sans hover:text-gold-700 flex items-center gap-2 group mt-4 lg:mt-0"
            >
              Full Education Centre
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {EDUCATION_CARDS.map((card, i) => (
            <Link key={card.id} href="/education">
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group text-left overflow-hidden bg-cream relative w-full"
              >
              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-widest text-gold-500 font-sans bg-gold-50 px-2.5 py-1">
                    {card.tag}
                  </span>
                  <span className="text-[10px] text-gray-400 font-sans flex items-center gap-1">
                    <BookOpen size={10} /> {card.readTime} min read
                  </span>
                </div>
                <h3 className="font-serif text-xl text-charcoal mb-1 group-hover:text-gold-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-gold-500 font-sans mb-3">{card.subtitle}</p>
                <p className="text-sm text-gray-500 font-sans leading-relaxed">{card.description}</p>
                <div className="flex items-center gap-2 mt-4 text-charcoal group-hover:text-gold-500 transition-colors">
                  <span className="text-xs uppercase tracking-widest font-sans">Read Guide</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              </motion.button>
            </Link>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-charcoal p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-serif text-2xl text-white font-light mb-2">
              Speak with an Expert Jeweller
            </h3>
            <p className="font-sans text-white/60 text-sm">
              Our team is available 7 days a week for personalised guidance — by phone, email, or video consultation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="px-7 py-3 bg-gold-500 text-white text-xs uppercase tracking-widest font-sans hover:bg-gold-700 transition-colors whitespace-nowrap"
            >
              Book Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="px-7 py-3 border border-white/20 text-white text-xs uppercase tracking-widest font-sans hover:border-gold-400 hover:text-gold-300 transition-colors whitespace-nowrap"
            >
              Live Chat
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
