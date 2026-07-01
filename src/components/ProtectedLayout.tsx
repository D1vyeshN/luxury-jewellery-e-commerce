'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated, selectIsLoading } from '../store/userSlice'

interface ProtectedLayoutProps {
  children: React.ReactNode
}

export const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  const router = useRouter()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const isLoading = useSelector(selectIsLoading)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-gray-500 font-sans">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
