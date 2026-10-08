"use client";

import React, { useState } from "react";
import Navbar from "@/components/Header/Navbar";
import MobileDrawer from "@/components/Header/MobileDrawer";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import TickerBanner from "@/components/Promo/TickerBanner";
import CategoryGrid from "@/components/Categories/CategoryGrid";
import ProductCarousel from "@/components/Products/ProductCarousel";
import DealsBanner from "@/components/Promo/DealsBanner";
import UpmodsBanner from "@/components/Promo/UpmodsBanner";
import CuratedSection from "@/components/Products/CuratedSection";
import ShopByCollection from "@/components/Lookbook/ShopByCollection";
import PromoBanners from "@/components/Promo/PromoBanners";
import InterioStats from "@/components/Stats/InterioStats";
import StoreLocatorSection from "@/components/StoreLocator/StoreLocatorSection";
import CareServices from "@/components/Services/CareServices";
import Testimonials from "@/components/Testimonials/Testimonials";
import PhilosophySection from "@/components/BrandPhilosophy/PhilosophySection";
import EverydayLiving from "@/components/Social/EverydayLiving";
import FaqAccordion from "@/components/FAQ/FaqAccordion";
import Footer from "@/components/Footer/Footer";
import CartDrawer from "@/components/Cart/CartDrawer";
import ConsultationModal from "@/components/Modals/ConsultationModal";
import Toast from "@/components/UI/Toast";
import { justArrivedProducts, mostLovedProducts } from "@/data/interioData";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { showToast } = useCart();

  const handleCategorySelect = (categoryName: string) => {
    showToast(`Viewing collection: ${categoryName}`);
    const elem = document.querySelector("#curated-products");
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearchSubmit = (query: string) => {
    showToast(`Showing results for "${query}"`);
    const elem = document.querySelector("#curated-products");
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      {/* 1. Header Navigation (Floating transparent over hero & sticky on scroll) */}
      <Navbar
        onMobileMenuToggle={() => setIsMobileMenuOpen(true)}
        onSearchSubmit={handleSearchSubmit}
        onCategorySelect={handleCategorySelect}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onSelectCategory={handleCategorySelect}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* 1. Hero Banner (100vh full-bleed photography with CTA & live controls) */}
        <HeroBanner
          onCtaClick={(slideId) => {
            showToast(`Exploring ${slideId.toUpperCase()}`);
          }}
        />

        {/* 2. Promotional Bank Offer Ticker Banner */}
        <TickerBanner />

        {/* 3. How can we help you? (Warm #f5f0ea, 6 segmented tabs with red indicator, cards with red underlines, progress bar) */}
        <CategoryGrid onSelectCategory={handleCategorySelect} />

        {/* 4. Just arrived Carousel (Clean off-white cards, bottom-right heart, 2-col pricing) */}
        <ProductCarousel
          id="just-arrived"
          title="Just arrived"
          products={justArrivedProducts}
        />

        {/* 5. Deals Banner (Deal of the Week & Deal of the Month side-by-side) */}
        <DealsBanner
          onDealClick={(deal) => {
            showToast(`Exploring ${deal}`);
          }}
        />

        {/* 6. Upmods. Your Sofa, Your Way! (Clean video facade with red play button) */}
        <UpmodsBanner />

        {/* 7. Curated for you (Warm #f5f0ea, segmented tabs, red underlines, progress bar) */}
        <CuratedSection />

        {/* 8. Shop by collection (Full-width lookbook slider with hotspots & in-image CTA) */}
        <ShopByCollection />

        {/* 9. Promotional Split Blocks (Kitchens & Home Interiors with frosted glass center cards, Exchange Banner) */}
        <PromoBanners />

        {/* 10. Interio for India (Vibrant #ff5c47 coral background, 30+, 17,000+, 1000+) */}
        <InterioStats />

        {/* 11. Find a store near you (Untitled_design_17__1.jpg with frosted dark card on right) */}
        <StoreLocatorSection />

        {/* 12. Furniture care services (3 bordered white cards with #ff5247 titles) */}
        <CareServices />

        {/* 13. Customer Reviews / Testimonials (Large quote marks, highlighted card, progress bar) */}
        <Testimonials />

        {/* 14. Brand Philosophy & Commercial B2B Solutions */}
        <PhilosophySection />

        {/* 15. Interio in Everyday Living (Instagram user gallery matching live site) */}
        <EverydayLiving />

        {/* 16. How can we assist you? (FAQs & SEO Rich Content) */}
        <FaqAccordion />
      </main>

      {/* 19. Footer */}
      <Footer />

      {/* 20. Modals & Drawers */}
      <CartDrawer />
      <ConsultationModal />
      <Toast />
    </div>
  );
}
