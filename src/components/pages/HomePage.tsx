'use client'

import { useState } from 'react'
import { HeroSection } from '../common/HeroSection'
import { MarqueeBanner } from '../common/MarqueeBanner'
import { ShopByShape } from '../common/ShopByShape'
import { FeaturedCollection } from '../common/FeaturedCollection'
import { RingBuilderCTA } from '../common/RingBuilderCTA'
import { ShopByMetal } from '../common/ShopByMetal'
import { BrandStory } from '../common/BrandStory'
import { TestimonialsSection } from '../common/TestimonialsSection'
import { EducationSection } from '../common/EducationSection'
import { ProductDetailModal } from '../common/ProductDetailModal'
import type { Product } from '../../types'

export const HomePage = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleView = (product: Product) => {
    setSelectedProduct(product)
  }

  const handleCloseModal = () => {
    setSelectedProduct(null)
  }

  return (
    <>
      <HeroSection />
      <MarqueeBanner />
      <ShopByShape />
      <FeaturedCollection onView={handleView} />
      <RingBuilderCTA />
      <ShopByMetal />
      <BrandStory />
      <TestimonialsSection />
      <EducationSection />
      <ProductDetailModal product={selectedProduct} onClose={handleCloseModal} />
    </>
  )
}
