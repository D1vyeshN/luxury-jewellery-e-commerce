import type { Product, Diamond, NavItem, RingSetting } from '../types';

// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Engagement Rings',
    href: '/shop?category=engagement-rings',
    children: [
      { label: 'Shop All Rings', href: '/shop?category=engagement-rings', description: 'Browse our full collection' },
      { label: 'Round Cut', href: '/shop?category=engagement-rings&shape=round', description: 'Classic brilliance' },
      { label: 'Oval Cut', href: '/shop?category=engagement-rings&shape=oval', description: 'Elongated elegance' },
      { label: 'Pear Cut', href: '/shop?category=engagement-rings&shape=pear', description: 'Tearful beauty' },
      { label: 'Princess Cut', href: '/shop?category=engagement-rings&shape=princess', description: 'Modern sophistication' },
      { label: 'Cushion Cut', href: '/shop?category=engagement-rings&shape=cushion', description: 'Vintage romance' },
      { label: 'Emerald Cut', href: '/shop?category=engagement-rings&shape=emerald', description: 'Art deco glamour' },
      { label: 'Design Your Own', href: '/ring-builder', description: 'Start with a setting' },
    ],
  },
  {
    label: 'Wedding Bands',
    href: '/shop?category=wedding-bands',
    children: [
      { label: 'Shop All Bands', href: '/shop?category=wedding-bands', description: 'Browse our full collection' },
      { label: 'Women\'s Bands', href: '/shop?category=wedding-bands', description: 'Elegant and timeless' },
      { label: 'Men\'s Bands', href: '/shop?category=wedding-bands', description: 'Bold and refined' },
      { label: 'Diamond Bands', href: '/shop?category=wedding-bands', description: 'Sparkling brilliance' },
      { label: 'Plain Bands', href: '/shop?category=wedding-bands', description: 'Pure simplicity' },
    ],
  },
  {
    label: 'Fine Jewellery',
    href: '/shop',
    children: [
      { label: 'Necklaces & Pendants', href: '/shop?category=necklaces', description: 'Statement pieces' },
      { label: 'Earrings', href: '/shop?category=earrings', description: 'From studs to drops' },
      { label: 'Bracelets', href: '/shop?category=bracelets', description: 'Wrist elegance' },
      { label: 'Custom Design', href: '/shop?category=custom', description: 'Create your own' },
    ],
  },
  {
    label: 'Diamonds',
    href: '/diamonds',
    children: [
      { label: 'Search Diamonds', href: '/diamonds/search', description: 'Find your perfect stone' },
      { label: 'Lab-Grown Diamonds', href: '/diamonds/lab-grown', description: 'Ethical & sustainable' },
      { label: 'Diamond Education', href: '/education/diamonds', description: 'The 4Cs explained' },
      { label: 'Compare Diamonds', href: '/diamonds/compare', description: 'Side-by-side comparison' },
    ],
  },
  {
    label: 'Ring Builder',
    href: '/ring-builder',
  },
  {
    label: 'Education',
    href: '/education',
    children: [
      { label: 'The 4Cs Guide', href: '/education/4cs', description: 'Cut, Color, Clarity, Carat' },
      { label: 'Diamond Shapes', href: '/education/shapes', description: 'Find your style' },
      { label: 'Metal Guide', href: '/education/metals', description: 'Gold, platinum & more' },
      { label: 'Ring Sizing', href: '/education/sizing', description: 'Find your perfect fit' },
      { label: 'Care & Maintenance', href: '/education/care', description: 'Keep it sparkling' },
    ],
  },
];

// ─── Diamond Shapes ───────────────────────────────────────────────────────────

export const DIAMOND_SHAPES = [
  { id: 'round', label: 'Round', emoji: '⬤' },
  { id: 'oval', label: 'Oval', emoji: '⬭' },
  { id: 'pear', label: 'Pear', emoji: '🔻' },
  { id: 'princess', label: 'Princess', emoji: '◾' },
  { id: 'cushion', label: 'Cushion', emoji: '🔲' },
  { id: 'emerald', label: 'Emerald', emoji: '▬' },
  { id: 'marquise', label: 'Marquise', emoji: '◇' },
  { id: 'radiant', label: 'Radiant', emoji: '◈' },
  { id: 'asscher', label: 'Asscher', emoji: '⬡' },
  { id: 'heart', label: 'Heart', emoji: '♡' },
];

// ─── Metals ───────────────────────────────────────────────────────────────────

export const METALS = [
  { id: 'yellow-gold', label: 'Yellow Gold', color: '#b8860b', description: 'Classic & warm' },
  { id: 'white-gold', label: 'White Gold', color: '#d0d0d0', description: 'Modern & sleek' },
  { id: 'rose-gold', label: 'Rose Gold', color: '#b76e79', description: 'Romantic & unique' },
  { id: 'platinum', label: 'Platinum', color: '#e5e4e2', description: 'Pure & rare' },
];

// ─── Price Ranges ─────────────────────────────────────────────────────────────

export const PRICE_RANGES = [
  { label: 'Under $1,000', min: 0, max: 1000 },
  { label: '$1,000 – $3,000', min: 1000, max: 3000 },
  { label: '$3,000 – $5,000', min: 3000, max: 5000 },
  { label: '$5,000 – $10,000', min: 5000, max: 10000 },
  { label: '$10,000 – $20,000', min: 10000, max: 20000 },
  { label: '$20,000+', min: 20000, max: Infinity },
];

// ─── Categories ───────────────────────────────────────────────────────────────

export const CATEGORIES = [
  { id: 'engagement-rings', label: 'Engagement Rings' },
  { id: 'wedding-bands', label: 'Wedding Bands' },
  { id: 'necklaces', label: 'Necklaces' },
  { id: 'earrings', label: 'Earrings' },
  { id: 'bracelets', label: 'Bracelets' },
  { id: 'custom', label: 'Custom Design' },
];

// ─── Mock Products ────────────────────────────────────────────────────────────

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Lumière Solitaire Ring',
    slug: 'lumiere-solitaire-ring',
    category: 'engagement-rings',
    description: 'A breathtaking solitaire featuring a perfectly cut round brilliant diamond set in a delicate 18k white gold band with a hidden halo detail.',
    shortDescription: 'Round brilliant solitaire with hidden halo',
    price: 4850,
    originalPrice: 5200,
    metal: 'white-gold',
    diamondShape: 'round',
    caratWeight: 1.2,
    clarity: 'VS1',
    color: 'F',
    cut: 'Excellent',
    certification: 'GIA',
    images: [
      { id: '1a', url: 'https://images.pexels.com/photos/2849742/pexels-photo-2849742.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', alt: 'Lumière Solitaire Ring front view', isPrimary: true },
    ],
    tags: ['solitaire', 'round', 'white-gold', 'bestseller'],
    isBestseller: true,
    isFeatured: true,
    stock: 3,
    rating: 4.9,
    reviewCount: 128,
    sku: 'ASH-ER-001',
  },
  {
    id: '2',
    name: 'Céleste Oval Halo',
    slug: 'celeste-oval-halo',
    category: 'engagement-rings',
    description: 'An ethereal oval diamond surrounded by a delicate micro-pavé halo, set in romantic 18k rose gold.',
    shortDescription: 'Oval with micro-pavé rose gold halo',
    price: 6200,
    metal: 'rose-gold',
    diamondShape: 'oval',
    caratWeight: 1.5,
    clarity: 'VS2',
    color: 'G',
    cut: 'Excellent',
    certification: 'GIA',
    images: [
      { id: '2a', url: 'https://images.pexels.com/photos/17068457/pexels-photo-17068457.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', alt: 'Céleste Oval Halo Ring', isPrimary: true },
    ],
    tags: ['halo', 'oval', 'rose-gold', 'new'],
    isNew: true,
    isFeatured: true,
    stock: 2,
    rating: 4.8,
    reviewCount: 87,
    sku: 'ASH-ER-002',
  },
  {
    id: '3',
    name: 'Aurore Pavé Band',
    slug: 'aurore-pave-band',
    category: 'wedding-bands',
    description: 'A luminous wedding band featuring 36 brilliant-cut diamonds set in continuous pavé across 18k yellow gold.',
    shortDescription: 'Full eternity pavé yellow gold band',
    price: 2400,
    metal: 'yellow-gold',
    caratWeight: 0.75,
    clarity: 'VS1',
    color: 'F',
    images: [
      { id: '3a', url: 'https://images.pexels.com/photos/13524236/pexels-photo-13524236.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', alt: 'Aurore Pavé Band', isPrimary: true },
    ],
    tags: ['pavé', 'yellow-gold', 'wedding-band'],
    isFeatured: true,
    stock: 8,
    rating: 4.9,
    reviewCount: 214,
    sku: 'ASH-WB-001',
  },
  {
    id: '4',
    name: 'Éclat Diamond Pendant',
    slug: 'eclat-diamond-pendant',
    category: 'necklaces',
    description: 'A floating pear-shaped diamond suspended from a whisper-thin 18k white gold chain.',
    shortDescription: 'Floating pear diamond white gold pendant',
    price: 3100,
    metal: 'white-gold',
    diamondShape: 'pear',
    caratWeight: 0.8,
    clarity: 'VVS2',
    color: 'E',
    images: [
      { id: '4a', url: 'https://images.pexels.com/photos/10215179/pexels-photo-10215179.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', alt: 'Éclat Diamond Pendant', isPrimary: true },
    ],
    tags: ['pendant', 'pear', 'white-gold'],
    isNew: true,
    isFeatured: true,
    stock: 5,
    rating: 4.7,
    reviewCount: 63,
    sku: 'ASH-NK-001',
  },
  {
    id: '5',
    name: 'Sérénité Emerald Cut',
    slug: 'serenite-emerald-cut',
    category: 'engagement-rings',
    description: 'Art deco-inspired emerald cut diamond with tapered baguette side stones in platinum.',
    shortDescription: 'Emerald cut with baguette side stones in platinum',
    price: 8900,
    metal: 'platinum',
    diamondShape: 'emerald',
    caratWeight: 2.1,
    clarity: 'VS1',
    color: 'D',
    cut: 'Excellent',
    certification: 'GIA',
    images: [
      { id: '5a', url: 'https://images.pexels.com/photos/30541185/pexels-photo-30541185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', alt: 'Sérénité Emerald Cut Ring', isPrimary: true },
    ],
    tags: ['emerald', 'platinum', 'art-deco', 'bestseller'],
    isBestseller: true,
    isFeatured: true,
    stock: 1,
    rating: 5.0,
    reviewCount: 41,
    sku: 'ASH-ER-003',
  },
  {
    id: '6',
    name: 'Rivière Tennis Bracelet',
    slug: 'riviere-tennis-bracelet',
    category: 'bracelets',
    description: 'Classic 4-prong set diamond tennis bracelet featuring 5 carats of round brilliant diamonds in 18k white gold.',
    shortDescription: '5ct round brilliant tennis bracelet',
    price: 7800,
    metal: 'white-gold',
    caratWeight: 5.0,
    clarity: 'VS2',
    color: 'G',
    images: [
      { id: '6a', url: 'https://images.pexels.com/photos/9430439/pexels-photo-9430439.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', alt: 'Rivière Tennis Bracelet', isPrimary: true },
    ],
    tags: ['tennis', 'bracelet', 'white-gold'],
    isFeatured: true,
    stock: 4,
    rating: 4.8,
    reviewCount: 156,
    sku: 'ASH-BR-001',
  },
  {
    id: '7',
    name: 'Princesse Cushion Halo',
    slug: 'princesse-cushion-halo',
    category: 'engagement-rings',
    description: 'A romantic cushion cut diamond embraced by a double halo of micro-pavé diamonds in rose gold.',
    shortDescription: 'Cushion cut double halo in rose gold',
    price: 5650,
    metal: 'rose-gold',
    diamondShape: 'cushion',
    caratWeight: 1.8,
    clarity: 'VS2',
    color: 'H',
    cut: 'Excellent',
    certification: 'IGI',
    images: [
      { id: '7a', url: 'https://images.pexels.com/photos/31728371/pexels-photo-31728371.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', alt: 'Princesse Cushion Halo Ring', isPrimary: true },
    ],
    tags: ['cushion', 'double-halo', 'rose-gold'],
    isNew: true,
    stock: 3,
    rating: 4.7,
    reviewCount: 52,
    sku: 'ASH-ER-004',
  },
  {
    id: '8',
    name: 'Lumière Drop Earrings',
    slug: 'lumiere-drop-earrings',
    category: 'earrings',
    description: 'Elongating drop earrings featuring oval diamonds suspended from diamond-studded ear wires in yellow gold.',
    shortDescription: 'Oval diamond drops in yellow gold',
    price: 2900,
    metal: 'yellow-gold',
    diamondShape: 'oval',
    caratWeight: 0.6,
    clarity: 'VS1',
    color: 'F',
    images: [
      { id: '8a', url: 'https://images.pexels.com/photos/7615245/pexels-photo-7615245.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', alt: 'Lumière Drop Earrings', isPrimary: true },
    ],
    tags: ['earrings', 'drop', 'yellow-gold', 'oval'],
    isFeatured: true,
    stock: 6,
    rating: 4.6,
    reviewCount: 78,
    sku: 'ASH-EA-001',
  },
];

// ─── Mock Diamonds ────────────────────────────────────────────────────────────

export const SAMPLE_DIAMONDS: Diamond[] = [
  { id: 'd1', shape: 'round', caratWeight: 1.01, color: 'F', clarity: 'VS1', cut: 'Excellent', price: 4200, certification: 'GIA', depth: 61.2, table: 57, measurements: '6.45 × 6.47 × 3.95', fluorescence: 'None', polish: 'Excellent', symmetry: 'Excellent' },
  { id: 'd2', shape: 'oval', caratWeight: 1.52, color: 'G', clarity: 'VS2', cut: 'Excellent', price: 5800, certification: 'GIA', depth: 59.1, table: 56, measurements: '8.62 × 6.11 × 3.61', fluorescence: 'Faint', polish: 'Excellent', symmetry: 'Very Good' },
  { id: 'd3', shape: 'pear', caratWeight: 1.21, color: 'E', clarity: 'VVS2', cut: 'Excellent', price: 6100, certification: 'GIA', depth: 60.4, table: 58, measurements: '8.85 × 5.72 × 3.46', fluorescence: 'None', polish: 'Excellent', symmetry: 'Excellent' },
  { id: 'd4', shape: 'emerald', caratWeight: 2.01, color: 'D', clarity: 'VS1', cut: 'Excellent', price: 12400, certification: 'GIA', depth: 62.1, table: 67, measurements: '8.72 × 6.78 × 4.21', fluorescence: 'None', polish: 'Excellent', symmetry: 'Excellent' },
  { id: 'd5', shape: 'cushion', caratWeight: 1.75, color: 'H', clarity: 'VS2', cut: 'Excellent', price: 4900, certification: 'IGI', depth: 63.2, table: 59, measurements: '7.28 × 6.95 × 4.40', fluorescence: 'Medium', polish: 'Very Good', symmetry: 'Very Good' },
  { id: 'd6', shape: 'princess', caratWeight: 1.32, color: 'F', clarity: 'SI1', cut: 'Excellent', price: 3800, certification: 'GIA', depth: 70.1, table: 73, measurements: '5.68 × 5.61 × 3.94', fluorescence: 'None', polish: 'Excellent', symmetry: 'Excellent' },
];

// ─── Ring Settings ─────────────────────────────────────────────────────────

export const RING_SETTINGS: RingSetting[] = [
  {
    id: 's1',
    name: 'Classic Solitaire',
    style: 'Solitaire',
    metal: 'white-gold',
    price: 1200,
    imageUrl: 'https://images.pexels.com/photos/2849742/pexels-photo-2849742.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=300',
    compatibleShapes: ['round', 'oval', 'cushion', 'princess'],
    description: 'A timeless four-prong setting that lets the diamond take centre stage.',
  },
  {
    id: 's2',
    name: 'Pavé Halo',
    style: 'Halo',
    metal: 'rose-gold',
    price: 1800,
    imageUrl: 'https://images.pexels.com/photos/17068457/pexels-photo-17068457.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=300',
    compatibleShapes: ['round', 'oval', 'cushion', 'pear'],
    description: 'Micro-pavé diamonds encircle your centre stone for maximum brilliance.',
  },
  {
    id: 's3',
    name: 'Three Stone',
    style: 'Three Stone',
    metal: 'yellow-gold',
    price: 2100,
    imageUrl: 'https://images.pexels.com/photos/13524236/pexels-photo-13524236.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=300',
    compatibleShapes: ['round', 'oval', 'emerald'],
    description: 'Representing past, present & future. Three brilliant diamonds in harmony.',
  },
  {
    id: 's4',
    name: 'Art Deco Bezel',
    style: 'Bezel',
    metal: 'platinum',
    price: 2400,
    imageUrl: 'https://images.pexels.com/photos/30541185/pexels-photo-30541185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=300',
    compatibleShapes: ['round', 'emerald', 'princess', 'asscher'],
    description: 'Art deco-inspired with a full bezel setting for maximum protection.',
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────

export const BRAND_STATS = [
  { value: '20+', label: 'Years of Craftsmanship' },
  { value: '64+', label: 'Countries Served' },
  { value: '50K+', label: 'Happy Couples' },
  { value: '100%', label: 'Ethically Sourced' },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sophia & Marcus',
    location: 'New York, USA',
    text: 'Aveline crafted the most breathtaking ring I\'ve ever seen. The attention to detail and the quality of the diamond exceeded every expectation. We\'ll be customers for life.',
    rating: 5,
    product: 'Lumière Solitaire Ring',
    avatar: 'https://images.pexels.com/photos/7615245/pexels-photo-7615245.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=80&w=80',
  },
  {
    id: 2,
    name: 'Isabella Thompson',
    location: 'London, UK',
    text: 'The Design Your Own experience was seamless and the consultants were genuinely knowledgeable. My custom piece arrived in a stunning box and brought me to tears.',
    rating: 5,
    product: 'Custom Oval Halo Ring',
    avatar: 'https://images.pexels.com/photos/15743944/pexels-photo-15743944.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=80&w=80',
  },
  {
    id: 3,
    name: 'Daniel & Priya Chen',
    location: 'Singapore',
    text: 'We designed our wedding bands together using Aveline\'s ring builder. The platinum finish is absolutely perfect. Nothing compares to this level of luxury.',
    rating: 5,
    product: 'Matching Wedding Bands',
    avatar: 'https://images.pexels.com/photos/9430466/pexels-photo-9430466.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=80&w=80',
  },
];
