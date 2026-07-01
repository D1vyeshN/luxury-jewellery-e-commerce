'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface AuthFormProps {
  type: 'login' | 'register'
  onSubmit: (data: any) => void
  isLoading?: boolean
}

export const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, isLoading = false }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '60px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-px bg-gold-500 mx-auto mb-6"
        />
        <h1 className="font-serif text-3xl lg:text-4xl text-charcoal font-light mb-3">
          {type === 'login' ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className="text-sm text-gray-500 font-sans">
          {type === 'login' 
            ? 'Sign in to access your wishlist and order history' 
            : 'Join us for exclusive offers and personalized recommendations'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {type === 'register' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-2">
              Full Name
            </label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 text-sm font-sans text-charcoal focus:outline-none focus:border-gold-500 transition-colors bg-white"
                required
              />
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: type === 'register' ? 0.4 : 0.3 }}
        >
          <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full pl-12 pr-4 py-3 border border-gray-200 text-sm font-sans text-charcoal focus:outline-none focus:border-gold-500 transition-colors bg-white"
              required
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: type === 'register' ? 0.5 : 0.4 }}
        >
          <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-2">
            Password
          </label>
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full pl-12 pr-12 py-3 border border-gray-200 text-sm font-sans text-charcoal focus:outline-none focus:border-gold-500 transition-colors bg-white"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-charcoal transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </motion.div>

        {type === 'login' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-between text-xs"
          >
            <label className="flex items-center gap-2 cursor-pointer text-gray-500 font-sans">
              <input type="checkbox" className="accent-gold-500" />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-gold-500 hover:text-gold-700 font-sans transition-colors">
              Forgot password?
            </Link>
          </motion.div>
        )}

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: type === 'register' ? 0.6 : 0.6 }}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-charcoal text-white text-xs uppercase tracking-[0.2em] font-sans hover:bg-gold-500 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-charcoal"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              {type === 'login' ? 'Sign In' : 'Create Account'}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </motion.button>
      </form>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex items-center gap-4 my-8"
      >
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400 font-sans uppercase tracking-wider">or continue with</span>
        <div className="flex-1 h-px bg-gray-200" />
      </motion.div>

      {/* Social Login */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-2 gap-4"
      >
        <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 text-sm font-sans text-charcoal hover:border-gold-500 hover:text-gold-500 transition-all">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google
        </button>
        <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 text-sm font-sans text-charcoal hover:border-gold-500 hover:text-gold-500 transition-all">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </button>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-center text-sm text-gray-500 font-sans mt-8"
      >
        {type === 'login' ? "Don't have an account? " : 'Already have an account? '}
        <Link
          href={type === 'login' ? '/register' : '/login'}
          className="text-gold-500 hover:text-gold-700 font-medium transition-colors"
        >
          {type === 'login' ? 'Create one' : 'Sign in'}
        </Link>
      </motion.p>
    </motion.div>
  )
}
