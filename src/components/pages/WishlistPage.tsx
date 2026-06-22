'use client'

import { useState } from 'react'
import { WishlistPage as WishlistPageComponent } from '../wishlist/WishlistPage'
import { ProductDetailModal } from '../common/ProductDetailModal'
import type { Product } from '../../types'

export const WishlistPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleView = (product: Product) => {
    setSelectedProduct(product)
  }

  const handleCloseModal = () => {
    setSelectedProduct(null)
  }

  return (
    <>
      <WishlistPageComponent onView={handleView} />
      <ProductDetailModal product={selectedProduct} onClose={handleCloseModal} />
    </>
  )
}
