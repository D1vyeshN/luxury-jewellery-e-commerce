'use client'

import { AuthForm } from '../../components/auth/AuthForm'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const handleSubmit = (data: any) => {
    // TODO: Implement actual login logic
    console.log('Login data:', data)
    toast.success('Welcome back!')
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Image/Branding */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src="https://images.pexels.com/photos/2849742/pexels-photo-2849742.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=600"
              alt="Luxury Jewellery"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-gold-300 text-xs uppercase tracking-[0.3em] font-sans mb-3">
                Avaline Luxury
              </p>
              <h2 className="font-serif text-3xl text-white font-light leading-tight mb-4">
                Where elegance meets exceptional craftsmanship
              </h2>
              <p className="text-white/80 text-sm font-sans leading-relaxed">
                Join thousands of discerning customers who trust us for their most precious moments.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <div className="flex items-center justify-center">
          <AuthForm type="login" onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  )
}
