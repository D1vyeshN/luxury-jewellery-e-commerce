'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, ShoppingBag, LogOut, Settings } from 'lucide-react'
import { PersonalDetailsForm } from './PersonalDetailsForm'
import { OrderHistory } from './OrderHistory'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import toast from 'react-hot-toast'
import Link from 'next/link'

interface UserProfile {
  name: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  postalCode: string
}

interface Order {
  id: string
  date: string
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: number
}

type Tab = 'personal' | 'orders'

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('personal')
  
  const [profile, setProfile] = useLocalStorage<UserProfile>('user-profile', {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
  })

  const [orders] = useLocalStorage<Order[]>('user-orders', [
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 2500,
      items: 2,
    },
    {
      id: 'ORD-2024-002',
      date: '2024-02-20',
      status: 'shipped',
      total: 4500,
      items: 1,
    },
  ])

  const handleProfileSave = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile)
  }

  const handleLogout = () => {
    localStorage.removeItem('user-profile')
    localStorage.removeItem('user-orders')
    toast.success('Logged out successfully')
    window.location.href = '/'
  }

  const TABS = [
    { id: 'personal' as Tab, label: 'Personal Details', icon: User },
    { id: 'orders' as Tab, label: 'Order History', icon: ShoppingBag },
  ]

  return (
    <div className="min-h-screen bg-cream pt-28 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '60px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-gold-500 mb-6"
          />
          <h1 className="font-serif text-4xl lg:text-5xl text-charcoal font-light mb-2">
            My Profile
          </h1>
          <p className="text-sm text-gray-500 font-sans">
            Manage your account and view your order history
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white p-6 border border-gray-100 sticky top-28">
              {/* User Info */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="w-14 h-14 bg-cream rounded-full flex items-center justify-center">
                  <User size={24} className="text-charcoal" />
                </div>
                <div>
                  <p className="font-serif text-lg text-charcoal">{profile.name || 'Guest'}</p>
                  <p className="text-xs text-gray-400 font-sans">{profile.email || 'Not logged in'}</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2 mb-6">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-sans transition-all ${
                      activeTab === tab.id
                        ? 'bg-charcoal text-white'
                        : 'text-gray-600 hover:bg-cream hover:text-charcoal'
                    }`}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                ))}
              </nav>

              {/* Actions */}
              <div className="pt-6 border-t border-gray-100 space-y-2">
                <Link href="/settings">
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-sans text-gray-600 hover:bg-cream hover:text-charcoal transition-all">
                    <Settings size={16} />
                    Settings
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-sans text-rose-600 hover:bg-rose-50 transition-all"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {activeTab === 'personal' && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <PersonalDetailsForm profile={profile} onSave={handleProfileSave} />
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <OrderHistory orders={orders} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
