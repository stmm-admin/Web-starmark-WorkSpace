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
  hero?: {
    id: number;
    title: string;
    subtitle: string;
    hero_video: any;
    poster_image: any;
  };
  story?: {
    id: number;
    meta: string;
    title: string;
    description_1: string;
    description_2: string;
  };
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
  video?: any;
  seo_title?: string;
  seo_description?: string;
}

export interface Homepage {
  id: string | number;
  documentId?: string;
  hero?: {
    id: number;
    title: string;
    subtitle: string;
    hero_video: any;
    poster_image: any;
  };
  philosophy?: {
    id: number;
    title: string;
    description: string;
    cta_text: string;
    cta_link: string;
  };
  featured?: {
    id: number;
    meta: string;
    title: string;
    view_all_text: string;
    view_all_link: string;
  };
  cta?: {
    id: number;
    title: string;
    button_text: string;
    button_link: string;
  };
  featured_products?: Product[];
}

export interface Trending {
  id: string | number;
  documentId?: string;
  title: string;
  slug: string;
  description: string;
  hero_image: any;
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
    downloads: ['#'],
    video: { url: 'https://vjs.zencdn.net/v/oceans.mp4' }
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

const MOCK_HOMEPAGE: Homepage = {
  id: '1',
  hero: {
    id: 1,
    title: "Clarity. Comfort. Longevity.",
    subtitle: "A NEW STANDARD IN SANITARYWARE",
    hero_video: { url: "/uploads/video_referent_e686712d5e.mp4" },
    poster_image: { url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2000" }
  }
};

const MOCK_TRENDINGS: Trending[] = [
  {
    id: '1',
    title: "TRENDING TOPICS",
    slug: "trending-topics",
    description: "Discover our latest trending products and curated series. From modern bathroom essentials to innovative design solutions, explore what's making waves in contemporary architecture.",
    hero_image: { url: "https://images.unsplash.com/photo-1620626011761-9963d7521576?q=80&w=1200" }
  }
];

// --- API Methods ---

export async function getCategories(locale: string = 'th'): Promise<Category[]> {
  const data = await fetchAPI(`/categories?populate=*&locale=${locale}`);
  return data || MOCK_CATEGORIES;
}

export async function getCategoryBySlug(slug: string, locale: string = 'th'): Promise<Category | null> {
  const data = await fetchAPI(`/categories?filters[slug][$eq]=${slug}&populate=*&locale=${locale}`);
  if (data && data.length > 0) return data[0];

  const mock = MOCK_CATEGORIES.find(c => c.slug === slug);
  return mock || null;
}

export async function getProducts(categorySlug?: string, locale: string = 'th'): Promise<Product[]> {
  const filter = categorySlug ? `&filters[category][slug][$eq]=${categorySlug}` : '';
  const data = await fetchAPI(`/products?populate=*${filter}&locale=${locale}`);

  if (data) return data;

  return categorySlug
    ? MOCK_PRODUCTS.filter(p => p.category === categorySlug)
    : MOCK_PRODUCTS;
}

export async function getProductBySlug(slug: string, locale: string = 'th'): Promise<Product | null> {
  const data = await fetchAPI(`/products?filters[slug][$eq]=${slug}&populate=*&locale=${locale}`);
  if (data && data.length > 0) return data[0];

  const mock = MOCK_PRODUCTS.find(p => p.slug === slug);
  return mock || null;
}

export interface CollectionPageData {
  id: string | number;
  documentId?: string;
  meta_text?: string;
  title_text?: string;
  description_text?: string;
  hero?: {
    id: number;
    title: string;
    subtitle: string;
    hero_video: any;
    poster_image: any;
  };
}

export async function getCollectionPageData(locale: string = 'th'): Promise<CollectionPageData | null> {
  const data = await fetchAPI(`/collection-page?populate[0]=hero.hero_video&populate[1]=hero.poster_image&locale=${locale}`);
  return data || null;
}

export async function getCollections(locale: string = 'th'): Promise<Collection[]> {
  const data = await fetchAPI(`/collections?populate[0]=products&populate[1]=hero_image&populate[2]=hero.hero_video&populate[3]=hero.poster_image&locale=${locale}`);
  return data || MOCK_COLLECTIONS;
}

export async function getCollectionBySlug(slug: string, locale: string = 'th'): Promise<Collection | null> {
  const data = await fetchAPI(`/collections?filters[slug][$eq]=${slug}&populate[0]=products.gallery&populate[1]=hero_image&populate[2]=hero.hero_video&populate[3]=hero.poster_image&populate[4]=story&locale=${locale}`);
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
  hero?: {
    id: number;
    title: string;
    subtitle: string;
    hero_video: any;
    poster_image: any;
  };
  story?: {
    id: number;
    meta: string;
    title: string;
    description_1: string;
    description_2: string;
  };
  vision?: {
    id: number;
    meta: string;
    title: string;
    statement: string;
  };
  philosophies?: {
    id: number;
    number: string;
    label: string;
    title: string;
    description: string;
  }[];
  timeline?: {
    id: number;
    year: string;
    title: string;
    description: string;
  }[];
  cta?: {
    id: number;
    title: string;
    subtitle: string;
    button_text: string;
    button_link: string;
    button2_text: string;
    button2_link: string;
  };
}

export async function getAbout(locale: string = 'th'): Promise<About | null> {
  const data = await fetchAPI(`/about?populate[hero][populate]=*&populate[story]=*&populate[vision]=*&populate[philosophies]=*&populate[timeline]=*&populate[cta]=*&locale=${locale}`);
  return data || null;
}

export async function getHomepage(locale: string = 'th'): Promise<Homepage> {
  const data = await fetchAPI(`/homepage?populate[0]=hero.hero_video&populate[1]=hero.poster_image&populate[2]=philosophy&populate[3]=featured&populate[4]=cta&populate[5]=featured_products.gallery&locale=${locale}`);
  return data || MOCK_HOMEPAGE;
}

export async function getTrendings(locale: string = 'th'): Promise<Trending[]> {
  const data = await fetchAPI(`/trending-1?populate=*&locale=${locale}`);
  return data || MOCK_TRENDINGS;
}
