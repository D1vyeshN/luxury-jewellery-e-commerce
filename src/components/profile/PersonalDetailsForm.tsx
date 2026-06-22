'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, Save } from 'lucide-react'
import toast from 'react-hot-toast'

interface UserProfile {
  name: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  postalCode: string
}

interface PersonalDetailsFormProps {
  profile: UserProfile
  onSave: (profile: UserProfile) => void
}

export const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ profile, onSave }) => {
  const [formData, setFormData] = useState<UserProfile>(profile)
  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSave = () => {
    onSave(formData)
    setIsEditing(false)
    toast.success('Profile updated successfully')
  }

  const handleCancel = () => {
    setFormData(profile)
    setIsEditing(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-2xl text-charcoal font-light">Personal Details</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="text-xs uppercase tracking-widest text-gold-500 font-sans hover:text-gold-700 transition-colors"
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={handleCancel}
              className="text-xs uppercase tracking-widest text-gray-400 font-sans hover:text-charcoal transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold-500 font-sans hover:text-gold-700 transition-colors"
            >
              <Save size={12} />
              Save
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
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
              disabled={!isEditing}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 text-sm font-sans text-charcoal focus:outline-none focus:border-gold-500 transition-colors disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
        </div>

        {/* Email */}
        <div>
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
              disabled={!isEditing}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 text-sm font-sans text-charcoal focus:outline-none focus:border-gold-500 transition-colors disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 text-sm font-sans text-charcoal focus:outline-none focus:border-gold-500 transition-colors disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
        </div>

        {/* Country */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-2">
            Country
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-200 text-sm font-sans text-charcoal focus:outline-none focus:border-gold-500 transition-colors disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-2">
            Street Address
          </label>
          <div className="relative">
            <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 text-sm font-sans text-charcoal focus:outline-none focus:border-gold-500 transition-colors disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
        </div>

        {/* City */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-2">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-200 text-sm font-sans text-charcoal focus:outline-none focus:border-gold-500 transition-colors disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>

        {/* Postal Code */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-2">
            Postal Code
          </label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-200 text-sm font-sans text-charcoal focus:outline-none focus:border-gold-500 transition-colors disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>
      </div>
    </motion.div>
  )
}
