'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, Diamond } from 'lucide-react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const [email, setEmail] = React.useState('');

  return (
    <footer className="bg-charcoal text-white">
      {/* Top CTA Band */}
      <div className="border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-2">
            <h3 className="font-serif text-3xl lg:text-4xl text-white font-light leading-snug">
              Start Your Journey to the<br />
              <em className="text-gold-300">Perfect Piece</em>
            </h3>
            <p className="font-sans text-sm text-white/60 mt-3 max-w-md">
              Book a complimentary virtual or in-person consultation with one of our expert jewellers.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/ring-builder">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-7 py-3.5 bg-gold-500 text-white text-xs font-sans uppercase tracking-widest hover:bg-gold-700 transition-colors"
              >
                Design Your Ring
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-7 py-3.5 border border-white/30 text-white text-xs font-sans uppercase tracking-widest hover:border-gold-500 hover:text-gold-300 transition-colors"
            >
              Book Consultation
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-5 inline-block">
              <span className="font-serif text-2xl tracking-[0.3em] text-white">AVELINE</span>
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold-400 mt-0.5">Fine Jewellery</p>
            </Link>
            <p className="text-sm text-white/50 font-sans leading-relaxed max-w-xs">
              Crafting exceptional jewellery with ethically sourced lab-grown diamonds since 2004. 
              Shipped to over 64 countries worldwide.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {['◉', '◈', '✦', '▷'].map((icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -2 }}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-gold-400 hover:border-gold-400 transition-colors text-base"
                >
                  {icon}
                </motion.a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="text-xs uppercase tracking-widest text-white/60 mb-3 font-sans">Subscribe for Exclusive Offers</p>
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-white/5 border border-white/20 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-500 transition-colors font-sans"
                />
                <button className="bg-gold-500 px-4 hover:bg-gold-700 transition-colors flex items-center justify-center">
                  <ArrowRight size={16} className="text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold-400 font-sans mb-5">Collections</h4>
            <ul className="space-y-3">
              {['Engagement Rings', 'Wedding Bands', 'Necklaces & Pendants', 'Earrings', 'Bracelets', 'Gifts'].map((item) => (
                <li key={item}>
                  <button className="text-sm text-white/50 hover:text-white transition-colors font-sans text-left">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold-400 font-sans mb-5">Services</h4>
            <ul className="space-y-3">
              {[
                { label: 'Ring Builder', href: '/ring-builder' },
                { label: 'Diamond Search', href: '/diamonds' },
                { label: 'Custom Design', href: '/ring-builder' },
                { label: 'Stack Designer', href: '/shop' },
                { label: 'Consultation', href: '/' },
                { label: 'Ring Sizing', href: '/education' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/50 hover:text-white transition-colors font-sans text-left"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold-400 font-sans mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={14} className="text-gold-400 mt-0.5 shrink-0" />
                <span className="text-sm text-white/50 font-sans">+1 (800) 123-4567<br />Mon–Sat 9am–7pm EST</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={14} className="text-gold-400 mt-0.5 shrink-0" />
                <span className="text-sm text-white/50 font-sans">hello@aveline.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-gold-400 mt-0.5 shrink-0" />
                <span className="text-sm text-white/50 font-sans">Los Angeles, CA<br />New York, NY</span>
              </li>
            </ul>

            <div className="mt-6 p-4 border border-white/10 bg-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Diamond size={12} className="text-gold-400" />
                <span className="text-xs uppercase tracking-widest text-gold-400 font-sans">Certified</span>
              </div>
              <p className="text-xs text-white/40 font-sans">GIA · IGI · AGS Certified Diamonds</p>
              <p className="text-xs text-white/40 font-sans mt-1">Lifetime Warranty Included</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 font-sans">
            © 2025 Aveline Fine Jewellery. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Accessibility', 'Cookie Preferences'].map((item) => (
              <button key={item} className="text-xs text-white/30 hover:text-white/60 transition-colors font-sans">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
