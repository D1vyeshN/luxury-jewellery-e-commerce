'use client'

import { useState } from 'react'
import { ShopPage as ShopPageComponent } from '../product/ShopPage'
import { ProductDetailModal } from '../common/ProductDetailModal'
import type { Product } from '../../types'

export const ShopPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleView = (product: Product) => {
    setSelectedProduct(product)
  }

  const handleCloseModal = () => {
    setSelectedProduct(null)
  }

  return (
    <>
      <ShopPageComponent onView={handleView} />
      <ProductDetailModal product={selectedProduct} onClose={handleCloseModal} />
    </>
  )
}
