"use client";

import React, { useState } from "react";
import Navbar from "@/components/Header/Navbar";
import MobileDrawer from "@/components/Header/MobileDrawer";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import AboutSection from "@/components/About/AboutSection";
import CategoryGrid from "@/components/Categories/CategoryGrid";
import DealsBanner from "@/components/Promo/DealsBanner";
import StoreLocatorSection from "@/components/StoreLocator/StoreLocatorSection";
import ProjectGallery from "@/components/Projects/ProjectGallery";
import CareServices from "@/components/Services/CareServices";
import BrandsSection from "@/components/Brands/BrandsSection";
import FaqAccordion from "@/components/FAQ/FaqAccordion";
import Footer from "@/components/Footer/Footer";
import CartDrawer from "@/components/Cart/CartDrawer";
import ConsultationModal from "@/components/Modals/ConsultationModal";
import Toast from "@/components/UI/Toast";
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
        {/* 1. Hero Banner (full-bleed compressed photography with call CTA & slide controls) */}
        <HeroBanner />

        {/* 2. About Status Bath and Kitchen */}
        <AboutSection />

        {/* 4. How can we help you? (7 category tabs: kitchens, WAW aluminium windows, Ambiiance uPVC windows, wardrobes, glass railings, appliances, insect blinds) */}
        <CategoryGrid
          onSelectCategory={handleCategorySelect}
          selection={categorySelection}
        />

        {/* 5. Kitchen & windows feature banners */}
        <DealsBanner
          onDealClick={(deal) => {
            handleCategorySelect(deal);
          }}
        />

        {/* 6. Visit our experience studio */}
        <StoreLocatorSection />

        {/* 7. Project gallery / Recent installations in Siliguri & North Bengal */}
        <ProjectGallery />

        {/* 8. Our services */}
        <CareServices />

        {/* 9. Brands we work with */}
        <BrandsSection />

        {/* 10. FAQs */}
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
