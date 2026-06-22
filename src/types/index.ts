// ─── Product Types ───────────────────────────────────────────────────────────

export type MetalType = 'yellow-gold' | 'white-gold' | 'rose-gold' | 'platinum';
export type DiamondShape = 'round' | 'oval' | 'pear' | 'princess' | 'cushion' | 'emerald' | 'marquise' | 'radiant' | 'asscher' | 'heart';
export type ProductCategory = 'engagement-rings' | 'wedding-bands' | 'necklaces' | 'earrings' | 'bracelets' | 'custom';

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  metal: MetalType;
  diamondShape?: DiamondShape;
  caratWeight?: number;
  clarity?: string;
  color?: string;
  cut?: string;
  certification?: string;
  images: ProductImage[];
  tags: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  stock: number;
  rating: number;
  reviewCount: number;
  sku: string;
}

// ─── Diamond Types ────────────────────────────────────────────────────────────

export interface Diamond {
  id: string;
  shape: DiamondShape;
  caratWeight: number;
  color: string;
  clarity: string;
  cut: string;
  price: number;
  certification: 'GIA' | 'IGI' | 'AGS';
  depth: number;
  table: number;
  measurements: string;
  fluorescence: string;
  polish: string;
  symmetry: string;
  imageUrl?: string;
}

export interface DiamondFilter {
  shapes: DiamondShape[];
  caratMin: number;
  caratMax: number;
  priceMin: number;
  priceMax: number;
  colors: string[];
  clarities: string[];
  cuts: string[];
}

// ─── Cart Types ───────────────────────────────────────────────────────────────

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedMetal?: MetalType;
  selectedSize?: number;
  engraving?: string;
  customization?: RingCustomization;
  unitPrice: number;
  totalPrice: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  couponCode?: string;
}

// ─── Wishlist Types ───────────────────────────────────────────────────────────

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: string;
}

// ─── Ring Builder Types ───────────────────────────────────────────────────────

export interface RingCustomization {
  settingId?: string;
  diamondId?: string;
  metal: MetalType;
  size: number;
  engraving?: string;
  step: 'setting' | 'diamond' | 'summary';
}

export interface RingSetting {
  id: string;
  name: string;
  style: string;
  metal: MetalType;
  price: number;
  imageUrl: string;
  compatibleShapes: DiamondShape[];
  description: string;
}

// ─── User Types ───────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  addresses: Address[];
  orders: Order[];
  wishlistIds: string[];
  createdAt: string;
}

export interface Address {
  id: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

// ─── Order Types ──────────────────────────────────────────────────────────────

export type OrderStatus = 'pending' | 'confirmed' | 'crafting' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: CartItem[];
  total: number;
  createdAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

// ─── Filter Types ─────────────────────────────────────────────────────────────

export interface ProductFilter {
  categories: ProductCategory[];
  metals: MetalType[];
  shapes: DiamondShape[];
  priceMin: number;
  priceMax: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
  searchQuery: string;
}

// ─── Navigation Types ─────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export interface NavChild {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  image?: string;
}

// ─── Education Types ─────────────────────────────────────────────────────────

export interface EducationArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: 'diamonds' | 'metals' | 'care' | 'styles' | 'guide';
  readTime: number;
  publishedAt: string;
}
