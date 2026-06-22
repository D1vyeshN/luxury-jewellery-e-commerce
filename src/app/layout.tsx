'use client'

import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { store } from '../store'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { CartDrawer } from '../components/cart/CartDrawer'
import { SearchModal } from '../components/common/SearchModal'
import { ProductDetailModal } from '../components/common/ProductDetailModal'
import { useState } from 'react'
import type { Product } from '../types'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <html lang="en">
      <head>
        <title>Aveline - Luxury Jewellery</title>
        <meta name="description" content="Luxury jewellery featuring lab-grown diamonds and custom pieces" />
      </head>
      <body className="flex flex-col min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>
        <Provider store={store}>
          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#fff',
                color: '#2d2d2d',
                border: '1px solid #e5e5e5',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                borderRadius: '0',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
              },
            }}
          />

          {/* Navigation */}
          <Navbar
            onSearchOpen={() => setIsSearchOpen(true)}
          />

          {/* Search Modal */}
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />

          {/* Cart Drawer */}
          <CartDrawer />

          {/* Product Detail Modal */}
          {selectedProduct && (
            <ProductDetailModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}

          {/* Page Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
