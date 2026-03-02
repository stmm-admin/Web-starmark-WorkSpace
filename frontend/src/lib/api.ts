// Strapi API Logic for MOGEN

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN; // Set this in your .env

export interface Category {
  id: string | number;
  documentId?: string;
  name: string;
  slug: string;
  description: string;
  cover_image?: any;
}

export interface Collection {
  id: string | number;
  documentId?: string;
  name: string;
  slug: string;
  description: string;
  hero_image?: any;
  products?: Product[];
}

export interface Product {
  id: string | number;
  documentId?: string;
  name: string;
  slug: string;
  short_description: string;
  full_description: string;
  category: any;
  collection: any;
  gallery: any[];
  specifications: Record<string, string>;
  downloads: any[];
  seo_title?: string;
  seo_description?: string;
}

/**
 * Helper to fetch from Strapi REST API
 */
async function fetchAPI(path: string, options: RequestInit = {}) {
  const url = `${STRAPI_URL}/api${path}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as any,
  };

  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      // Use warn instead of error to avoid triggering Next.js error overlays for handled failures
      console.warn(`Strapi API Fetch Warning: ${response.status} ${response.statusText} at ${path}`);
      return null;
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.warn('Fetch error:', error);
    return null;
  }
}

/**
 * Helper to get the absolute URL for a Strapi media object
 */
export function getStrapiMedia(url: string | null | undefined) {
  if (url == null) {
    return null;
  }

  // Return the full URL if it's already an absolute external link
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }

  // Prepend the Strapi URL for relative links
  return `${STRAPI_URL}${url}`;
}

// --- Mock Data ---

const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Washbasins', slug: 'washbasins', description: 'Elegant washbasins for modern bathrooms. Minimalist aesthetics combined with highest functionality.' },
  { id: '2', name: 'Toilets', slug: 'toilets', description: 'High-performance toilets with minimalist design. Precision engineering for comfort and sustainability.' },
  { id: '3', name: 'Bathtubs', slug: 'bathtubs', description: 'Luxurious freestanding bathtubs. The centerpiece of your sanctuary.' },
  { id: '4', name: 'Faucets', slug: 'faucets', description: 'Sophisticated water delivery. Sculptural forms meet innovative technology.' },
];

const MOCK_COLLECTIONS: Collection[] = [
  { id: '1', name: 'Aero Collection', slug: 'aero-collection', description: 'Monolithic forms and matte finishes.' },
  { id: '2', name: 'Zenith Series', slug: 'zenith-series', description: 'The peak of hygiene and efficiency.' },
  { id: '3', name: 'Lunar Elements', slug: 'lunar-elements', description: 'Weightless curves and mineral-cast warmth.' },
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Aero Freestanding Washbasin',
    slug: 'aero-freestanding-washbasin',
    short_description: 'A monolithic freestanding washbasin in matte white.',
    full_description: 'The Aero freestanding washbasin redefines minimalist luxury. Its seamless, monolithic design creates a bold statement in any bathroom, while its matte ceramic finish offers a tactile experience like no other.',
    category: 'washbasins',
    collection: 'Aero Collection',
    gallery: [],
    specifications: { 'Dimensions': '400 x 400 x 850 mm', 'Material': 'DuraCeram®', 'Finish': 'Matte White' },
    downloads: ['#']
  },
  {
    id: '2',
    name: 'Zenith Rimless Toilet',
    slug: 'zenith-rimless-toilet',
    short_description: 'Wall-mounted rimless toilet with soft-close seat.',
    full_description: 'The Zenith rimless toilet represents the peak of hygiene and efficiency. The rimless design ensures easy cleaning, while the integrated soft-close technology provides silent comfort.',
    category: 'toilets',
    collection: 'Zenith Series',
    gallery: [],
    specifications: { 'Flush Rate': '4.5 / 3 L', 'Weight': '28 kg', 'Material': 'VitroCeram' },
    downloads: ['#']
  },
  {
    id: '3',
    name: 'Lunar Freestanding Bathtub',
    slug: 'lunar-freestanding-bathtub',
    short_description: 'Oval freestanding bathtub in Stone-look finish.',
    full_description: 'Experience weightlessness in the Lunar bathtub. Designed with deep ergonomic curves, it offers the ultimate bathing ritual. Crafted from mineral-cast material for superior heat retention.',
    category: 'bathtubs',
    collection: 'Lunar Elements',
    gallery: [],
    specifications: { 'Length': '1800 mm', 'Width': '850 mm', 'Capacity': '220 L' },
    downloads: ['#']
  },
  {
    id: '4',
    name: 'Flow Minimal Basin Mixer',
    slug: 'flow-minimal-basin-mixer',
    short_description: 'Single lever basin mixer in brushed chrome.',
    full_description: 'The Flow mixer focuses on the essentials. Its slender profile and precise water control make it the perfect companion for our minimalist washbasin series.',
    category: 'faucets',
    collection: 'Flow Essentials',
    gallery: [],
    specifications: { 'Height': '165 mm', 'Connection': 'Flexible G3/8', 'Flow Rate': '5 L/min' },
    downloads: ['#']
  }
];

// --- API Methods ---

export async function getCategories(locale: string = 'en'): Promise<Category[]> {
  const data = await fetchAPI(`/categories?populate=*&locale=${locale}`);
  return data || MOCK_CATEGORIES;
}

export async function getCategoryBySlug(slug: string, locale: string = 'en'): Promise<Category | null> {
  const data = await fetchAPI(`/categories?filters[slug][$eq]=${slug}&populate=*&locale=${locale}`);
  if (data && data.length > 0) return data[0];

  const mock = MOCK_CATEGORIES.find(c => c.slug === slug);
  return mock || null;
}

export async function getProducts(categorySlug?: string, locale: string = 'en'): Promise<Product[]> {
  const filter = categorySlug ? `&filters[category][slug][$eq]=${categorySlug}` : '';
  const data = await fetchAPI(`/products?populate=*${filter}&locale=${locale}`);

  if (data) return data;

  return categorySlug
    ? MOCK_PRODUCTS.filter(p => p.category === categorySlug)
    : MOCK_PRODUCTS;
}

export async function getProductBySlug(slug: string, locale: string = 'en'): Promise<Product | null> {
  const data = await fetchAPI(`/products?filters[slug][$eq]=${slug}&populate=*&locale=${locale}`);
  if (data && data.length > 0) return data[0];

  const mock = MOCK_PRODUCTS.find(p => p.slug === slug);
  return mock || null;
}

export async function getCollections(locale: string = 'en'): Promise<Collection[]> {
  const data = await fetchAPI(`/collections?populate=*&locale=${locale}`);
  return data || MOCK_COLLECTIONS;
}

export async function getCollectionBySlug(slug: string, locale: string = 'en'): Promise<Collection | null> {
  const data = await fetchAPI(`/collections?filters[slug][$eq]=${slug}&populate[products][populate]=*&populate[hero_image]=*&locale=${locale}`);
  if (data && data.length > 0) return data[0];

  const mock = MOCK_COLLECTIONS.find(c => c.slug === slug);
  if (mock) {
    // Add mock products to the mock collection if needed
    mock.products = MOCK_PRODUCTS.filter(p => p.collection === mock.name);
    return mock;
  }
  return null;
}

export interface About {
  id: string | number;
  documentId?: string;
  About: any[]; // Strapi blocks type
}

export async function getAbout(locale: string = 'en'): Promise<About | null> {
  const data = await fetchAPI(`/abouts?populate=*&locale=${locale}`);
  if (data && data.length > 0) return data[0];
  return null;
}
