import rawData from "./interioData.json";
import {
  Product,
  HeroSlide,
  CategoryItem,
  CategoryTab,
  CollectionSet,
  BrandPromise,
  CareService,
  BlogArticle,
  FAQItem,
  MegaMenuItem,
  ServiceStrip,
} from "@/types";

export const siteBrand = rawData.brand;
export const heroSlides: HeroSlide[] = rawData.heroSlides;
export const categoriesList: CategoryItem[] = rawData.categories;
export const curatedTabsData: Record<string, { label: string; products: Product[] }> = rawData.curatedTabs;
export const justArrivedProducts: Product[] = rawData.justArrived;
export const mostLovedProducts: Product[] = rawData.mostLoved;
export const collectionSets: CollectionSet[] = rawData.collections;
export const promisesList: BrandPromise[] = rawData.promises;
export const careServicesList: CareService[] = rawData.services;
export const blogArticlesList: BlogArticle[] = rawData.articles;
export const howCanWeHelpTabs: CategoryTab[] = rawData.howCanWeHelpTabs;
export const tickerBanner = rawData.tickerBanner;
export const serviceStrip: ServiceStrip = rawData.serviceStrip;
export const liveFaqs: FAQItem[] = rawData.liveFaqs;
export const faqsList: FAQItem[] = rawData.faqs;
export const megaMenuItems: MegaMenuItem[] = rawData.megaMenu;
