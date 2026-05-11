export type ProductStatus = 'Available' | 'Pre-Order' | 'Coming Soon'

export interface Product {
  slug: string
  name: string
  tagline?: string
  subtitle?: string
  description: string
  image: string | null
  status: ProductStatus
  category: string
}

export const PODCAST_MERCH: Product[] = [
  {
    slug: 'know-tomorrow-today-tote-bag',
    name: 'Know Tomorrow Today, Tote Bag',
    tagline: 'Know Tomorrow Today',
    description: 'Heavy canvas tote bag with the Solomon Atah Podcast wordmark and slogan.',
    image: null,
    status: 'Pre-Order',
    category: 'Podcast Merchandise',
  },
  {
    slug: 'know-tomorrow-today-mug',
    name: 'Know Tomorrow Today, Mug',
    tagline: 'Know Tomorrow Today',
    description: 'Ceramic mug. For the scholar who needs something to hold while thinking.',
    image: null,
    status: 'Pre-Order',
    category: 'Podcast Merchandise',
  },
]

export const HOODIES: Product[] = [
  {
    slug: 'epistemic-humility-hoodie',
    name: 'Epistemic Humility Hoodie',
    tagline: 'Epistemic Humility',
    description:
      'Premium pullover hoodie with purple lining. "Epistemic Humility, The Solomon Atah Podcast."',
    image: '/company%20resources/hoodie_1.jpeg',
    status: 'Available',
    category: 'Branded Apparel',
  },
  {
    slug: 'academic-valour-hoodie',
    name: 'Academic Valour Hoodie',
    tagline: 'Academic Valour',
    description:
      'Premium pullover hoodie with purple lining. "Academic Valour, The Solomon Atah Podcast."',
    image: '/company%20resources/hoodie_2.jpeg',
    status: 'Available',
    category: 'Branded Apparel',
  },
  {
    slug: 'academic-researcher-hoodie',
    name: 'Academic Researcher Hoodie',
    tagline: 'Academic Researcher',
    description:
      'Premium pullover hoodie with purple lining. "Academic Researcher, The Solomon Atah Podcast."',
    image: '/company%20resources/hoodie_3.jpeg',
    status: 'Available',
    category: 'Branded Apparel',
  },
  {
    slug: 'academic-personality-hoodie',
    name: 'Academic Personality Hoodie',
    tagline: 'Academic Personality',
    description:
      'Premium pullover hoodie with purple lining. "Academic Personality, The Solomon Atah Podcast."',
    image: '/company%20resources/hoodie_4.jpeg',
    status: 'Available',
    category: 'Branded Apparel',
  },
]

export const BOOKS: Product[] = [
  {
    slug: 'the-narrative-manifesto',
    name: 'The Narrative Manifesto',
    subtitle: 'How Stories Harm, And What You Can Do About It',
    description:
      'A systematic account of how stories operate as instruments of harm, and a practical framework for resistance and reconstruction.',
    image: '/company%20resources/book.jpeg',
    status: 'Available',
    category: 'Book',
  },
  {
    slug: 'the-marriage-stock-exchange',
    name: 'The Marriage Stock Exchange',
    subtitle: 'Why Marriage Was Never About Love',
    description:
      'An institutional and economic reading of marriage as a system of exchange, stripped of its romantic mythology.',
    image: '/company%20resources/book_2_cover.jpeg',
    status: 'Available',
    category: 'Book',
  },
  {
    slug: 'the-48-laws-of-personal-sovereignty',
    name: 'The 48 Laws of Personal Sovereignty',
    subtitle: 'Self Preservation Intelligence',
    description:
      'A framework for navigating power, autonomy, and self-determination in an age of institutional overreach and social manipulation.',
    image: '/company%20resources/book_3.jpeg',
    status: 'Available',
    category: 'Book',
  },
  {
    slug: 'the-university-of-money',
    name: 'The University of Money',
    subtitle: 'Financialisation and Higher Education',
    description:
      'A critical examination of the financialisation of higher education and its consequences for knowledge production.',
    image: null,
    status: 'Available',
    category: 'Book',
  },
]

export const PRODUCTS = [...PODCAST_MERCH, ...HOODIES, ...BOOKS]

export function getProductEnquiryHref(product: Product) {
  return `/merchandise?product=${encodeURIComponent(product.slug)}#merchandise-enquiry`
}
