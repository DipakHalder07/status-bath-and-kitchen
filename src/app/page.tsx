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
import { justArrivedProducts } from "@/data/interioData";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categorySelection, setCategorySelection] = useState<{ name: string; key: number } | null>(null);
  const { showToast } = useCart();

  // Opens the matching tab in "How can we help you?" and scrolls to it
  const handleCategorySelect = (categoryName: string) => {
    setCategorySelection({ name: categoryName, key: Date.now() });
    const elem = document.querySelector("#categories");
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearchSubmit = (query: string) => {
    showToast(`Showing results for "${query}"`);
    handleCategorySelect(query);
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

        {/* 2. Consultation strip */}
        <TickerBanner />

        {/* 3. How can we help you? (6 category tabs: kitchens, bathrooms, wardrobes, doors & windows, appliances, accessories) */}
        <CategoryGrid
          onSelectCategory={handleCategorySelect}
          selection={categorySelection}
        />

        {/* 4. Appliances & fittings carousel */}
        <ProductCarousel
          id="appliances"
          title="Appliances & fittings"
          products={justArrivedProducts}
          viewAllLink="#categories"
        />

        {/* 5. Kitchen & bathroom feature banners */}
        <DealsBanner
          onDealClick={(deal) => {
            showToast(`Exploring ${deal}`);
          }}
        />

        {/* 6. Your kitchen, your way banner */}
        <UpmodsBanner />

        {/* 7. Design ideas (kitchen, bathroom, doors & windows styles) */}
        <CuratedSection />

        {/* 8. Shop by collection (room lookbook with hotspots) */}
        <ShopByCollection />

        {/* 9. Consultation banners (kitchens, bathrooms, renovation) */}
        <PromoBanners />

        {/* 10. Everything we do (coral services strip) */}
        <InterioStats />

        {/* 11. Visit our experience studio */}
        <StoreLocatorSection />

        {/* 12. Our services */}
        <CareServices />

        {/* 13. Why choose Status */}
        <Testimonials />

        {/* 14. Builders, architects & designers */}
        <PhilosophySection />

        {/* 15. Inspiration gallery */}
        <EverydayLiving />

        {/* 16. FAQs & SEO content */}
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
