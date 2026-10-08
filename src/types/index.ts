export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  price: number;
  mrp: number;
  discount: string;
  image: string;
  warranty?: string;
  material?: string;
  color?: string;
  dimensions?: string;
  rating?: number;
  reviews?: number;
  tag?: string;
  badge?: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  desktopImg: string;
  mobileImg: string;
  link: string;
  ctaText: string;
  tag: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  image: string;
  count: string;
  featured: string[];
}

export interface Hotspot {
  id: string;
  name: string;
  price: number;
  mrp: number;
  x: number;
  y: number;
  image: string;
}

export interface CollectionSet {
  id: string;
  name: string;
  subtitle: string;
  roomImage: string;
  hotspots: Hotspot[];
}

export interface Testimonial {
  quote: string;
  author: string;
  location: string;
  product: string;
}

export interface CareService {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

export interface BlogArticle {
  title: string;
  category: string;
  readTime: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface MegaMenuItem {
  id: string;
  title: string;
  subsections: {
    name: string;
    items: {
      name: string;
      image: string;
    }[];
  }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
