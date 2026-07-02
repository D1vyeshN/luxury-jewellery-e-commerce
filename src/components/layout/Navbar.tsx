'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { toggleCart, selectCartCount } from '../../store/cartSlice';
import { selectWishlistItems } from '../../store/wishlistSlice';
import { selectIsAuthenticated } from '../../store/userSlice';
import { NAV_ITEMS } from '../../constants';

interface NavbarProps {
  onSearchOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchOpen }) => {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(selectCartCount);
  const wishlistItems = useAppSelector(selectWishlistItems);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  };


  const navTextColor = isScrolled ? 'text-charcoal' : (pathname === '/' ? 'text-white' : 'text-charcoal');
  const navBg = isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : (pathname === '/' ? 'bg-transparent' : 'bg-white');

  return (
    <>
      {/* Announcement Bar */}
      <AnimatePresence>
        {announcementVisible && (
          <motion.div
            initial={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#2d2d2d] fixed top-0 left-0 right-0 z-50 text-white text-xs font-sans tracking-widest text-center py-2.5 overflow-hidden"
          >
            <span className="uppercase">
              ✦ Complimentary Express Shipping on Orders Over $500 &nbsp;·&nbsp; Lifetime Warranty &nbsp;·&nbsp; Free Returns ✦
            </span>
            <button
              onClick={() => setAnnouncementVisible(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-gold-300 transition-colors"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <motion.nav
        initial={false}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg} ${announcementVisible ? 'top-[36px]' : 'top-0'}`}
        style={{ position: 'fixed' }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Left: Nav Links */}
            <div className="hidden lg:flex items-center gap-8" ref={menuRef}>
              {NAV_ITEMS.slice(0, 3).map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 text-xs font-sans uppercase tracking-[0.15em] font-medium transition-colors duration-300 hover:text-gold-500 ${navTextColor}`}
                  >
                    {item.label}
                    {item.children && <ChevronDown size={10} className={`transition-transform duration-200 ${activeMenu === item.label ? 'rotate-180' : ''}`} />}
                  </Link>

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {item.children && activeMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={() => handleMouseEnter(item.label)}
                        onMouseLeave={handleMouseLeave}
                        className="absolute top-full left-0 mt-4 w-72 bg-white shadow-xl border border-gray-100 rounded-sm overflow-hidden"
                      >
                        <div className="p-6">
                          <p className="text-xs uppercase tracking-widest text-gold-500 font-medium mb-4">{item.label}</p>
                          <div className="space-y-3">
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                onClick={() => setActiveMenu(null)}
                                className="flex flex-col items-start w-full group"
                              >
                                <span className="text-sm font-sans text-charcoal group-hover:text-gold-500 transition-colors font-medium">
                                  {child.label}
                                </span>
                                {child.description && (
                                  <span className="text-xs text-gray-400 mt-0.5">{child.description}</span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Center: Logo */}
            <Link
              href="/"
              className="flex flex-col items-center"
            >
              <motion.span
                className={`font-serif text-2xl lg:text-4xl tracking-[0.25em] font-light transition-colors duration-300 ${navTextColor}`}
                // whileHover={{ letterSpacing: '0.3em' }}
                // transition={{ duration: 0.3 }}
              >
                {/* ASHCLAIR */}
                {/* Montaire */}
                AVELINE
                {/* AURELIA */}
                {/* MONTAIRE */}
              </motion.span>
              <span className={`text-[9px] uppercase tracking-[0.4em] font-sans font-light mt-0.5 transition-colors duration-300 ${isScrolled ? 'text-gold-500' : (pathname === '/' ? 'text-gold-300' : 'text-gold-500')}`}>
                Fine Jewellery
              </span>
            </Link>

            {/* Right: Nav Links + Icons */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_ITEMS.slice(3).map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 text-xs font-sans uppercase tracking-[0.15em] font-medium transition-colors duration-300 hover:text-gold-500 ${navTextColor} ${item.label === 'Ring Builder' ? 'text-gold-500 border-b border-gold-500 pb-0.5' : ''}`}
                  >
                    {item.label}
                    {item.children && <ChevronDown size={10} className={`transition-transform duration-200 ${activeMenu === item.label ? 'rotate-180' : ''}`} />}
                  </Link>
                  <AnimatePresence>
                    {item.children && activeMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={() => handleMouseEnter(item.label)}
                        onMouseLeave={handleMouseLeave}
                        className="absolute top-full right-0 mt-4 w-72 bg-white shadow-xl border border-gray-100 rounded-sm overflow-hidden"
                      >
                        <div className="p-6">
                          <p className="text-xs uppercase tracking-widest text-gold-500 font-medium mb-4">{item.label}</p>
                          <div className="space-y-3">
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                onClick={() => setActiveMenu(null)}
                                className="flex flex-col items-start w-full group"
                              >
                                <span className="text-sm font-sans text-charcoal group-hover:text-gold-500 transition-colors font-medium">
                                  {child.label}
                                </span>
                                {child.description && (
                                  <span className="text-xs text-gray-400 mt-0.5">{child.description}</span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Icons */}
              <div className={`flex items-center gap-5 border-l border-current/20 pl-8 ${navTextColor}`}>
                <button onClick={onSearchOpen} className="hover:text-gold-500 transition-colors">
                  <Search size={18} strokeWidth={1.5} />
                </button>
                <Link href="/wishlist" className="relative hover:text-gold-500 transition-colors">
                  <Heart size={18} strokeWidth={1.5} />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gold-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-sans font-medium">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
                <Link
                  href={isAuthenticated ? '/profile' : '/login'}
                  className={`hover:text-gold-500 transition-colors ${pathname === '/profile' || pathname === '/login' || pathname === '/register' ? 'text-gold-500' : ''}`}
                >
                  <User size={18} strokeWidth={1.5} />
                </Link>
                <button onClick={() => dispatch(toggleCart())} className="relative hover:text-gold-500 transition-colors">
                  <ShoppingBag size={18} strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-gold-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-sans font-medium"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center gap-4">
              <button onClick={onSearchOpen} className={`${navTextColor} hover:text-gold-500 transition-colors`}>
                <Search size={20} strokeWidth={1.5} />
              </button>
              <button onClick={() => dispatch(toggleCart())} className={`relative ${navTextColor} hover:text-gold-500 transition-colors`}>
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button onClick={() => setIsMobileOpen(!isMobileOpen)} className={`${navTextColor} hover:text-gold-500 transition-colors`}>
                {isMobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="px-6 py-6 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center justify-between w-full py-3 text-sm font-sans uppercase tracking-[0.15em] text-charcoal font-medium border-b border-gray-50"
                    >
                      {item.label}
                      {item.children && <ChevronDown size={14} />}
                    </Link>
                    {item.children && (
                      <div className="pl-4 pt-2 pb-3 space-y-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setIsMobileOpen(false)}
                            className="block w-full text-left py-1.5 text-sm text-gray-500 hover:text-gold-500 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 flex items-center gap-6 border-t border-gray-100">
                  <button className="flex items-center gap-2 text-sm text-charcoal">
                    <Phone size={14} /> <span>+1 (800) 123-4567</span>
                  </button>
                  <button className="flex items-center gap-2 text-sm text-charcoal">
                    <Mail size={14} /> <span>hello@aveline.com</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};
