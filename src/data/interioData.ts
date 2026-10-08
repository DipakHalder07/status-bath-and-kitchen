import rawData from "./interioData.json";
import {
  Product,
  HeroSlide,
  CategoryItem,
  CollectionSet,
  Testimonial,
  CareService,
  BlogArticle,
  FAQItem,
  MegaMenuItem,
} from "@/types";

export const siteBrand = rawData.brand;
export const heroSlides: HeroSlide[] = rawData.heroSlides;
export const categoriesList: CategoryItem[] = rawData.categories;
export const curatedTabsData: Record<string, { label: string; products: Product[] }> = rawData.curatedTabs;
export const justArrivedProducts: Product[] = rawData.justArrived;
export const mostLovedProducts: Product[] = rawData.mostLoved;
export const collectionSets: CollectionSet[] = rawData.collections;
export const testimonialsList: Testimonial[] = rawData.testimonials;
export const careServicesList: CareService[] = rawData.services;
export const blogArticlesList: BlogArticle[] = rawData.articles;
export const howCanWeHelpTabs = rawData.howCanWeHelpTabs;
export const tickerBanner = rawData.tickerBanner;
export const liveFaqs: FAQItem[] = rawData.liveFaqs;
export const faqsList: FAQItem[] = rawData.faqs;
export const megaMenuItems: MegaMenuItem[] = rawData.megaMenu;

