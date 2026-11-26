"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Heart,
  SlidersHorizontal,
  ArrowUpDown,
  Search,
  X,
  Sparkles,
  ShieldCheck,
  Store,
  RotateCcw,
} from "lucide-react";
import Navbar from "@/components/Header/Navbar";
import MobileDrawer from "@/components/Header/MobileDrawer";
import Footer from "@/components/Footer/Footer";
import CartDrawer from "@/components/Cart/CartDrawer";
import ConsultationModal from "@/components/Modals/ConsultationModal";
import Toast from "@/components/UI/Toast";
import { useCart } from "@/context/CartContext";
import { allProductsCatalog } from "@/data/productsData";
import { Product } from "@/types";

const categoryTabs = [
  "All Products",
  "Modular Kitchens",
  "WAW Aluminium Windows",
  "Ambiiance uPVC Windows",
  "Wardrobes",
  "Glass Railings",
  "Appliances",
  "Insect Blinds",
  "Doors & Windows",
  "Kitchen Accessories",
];

const categoryDescriptions: Record<string, string> = {
  "All Products":
    "Explore our complete collection of precision-engineered modular kitchens, WAW aluminium windows, Ambiiance uPVC systems, custom wardrobes, glass railings, appliances, and Meshworkz insect blinds.",
  "Modular Kitchens":
    "Bring effortless organization and culinary passion into your home with our bespoke modular kitchens, custom-built with waterproof marine ply, Blum soft-close fittings, and scratch-resistant quartz worktops.",
  "WAW Aluminium Windows":
    "High-performance 6063-T6 WAW architectural aluminium windows and doors by Bhavya Window — spanning SL-25/SL-29/SL-55 sliding series, Thermal Break profiles, CW-40/CW-50 casements, slide & fold patios, louvers, DGU integrated blinds, and safety grills.",
  "Ambiiance uPVC Windows":
    "Lead-free, steel-reinforced multi-chamber uPVC windows and balcony doors engineered for tropical weather resistance, acoustic street-noise insulation, and zero-maintenance thermal efficiency.",
  "Wardrobes":
    "Designed around the clothes and accessories you treasure. Explore boutique walk-in closets, floor-to-ceiling tinted glass sliding wardrobes, and soft-close modular internal organisers.",
  "Glass Railings":
    "Frameless toughened and laminated safety glass railing systems including marine-grade SS316 spigots, recessed aluminium U-channels, staircase balustrades, and balcony post-and-clamp assemblies.",
  "Appliances":
    "High-efficiency kitchen appliances engineered for modern cooking. Heavy-suction BLDC chimneys, triple-brass wok burner hobs, 3D hot air convection ovens, and energy-smart refrigerators.",
  "Insect Blinds":
    "Meshworkz pleated collapsible insect screens, pet-friendly Zipline retractable screens, whisper-quiet motorized screens, 100% black-out & diffused honeycomb blinds, and high-tensile MeshTec security doors.",
  "Doors & Windows":
    "Make an unforgettable grand entrance with architectural teak pivot doors, ultra-slim 20mm patio sliding glass systems, and high-performance acoustic thermal double-glazed windows.",
  "Kitchen Accessories":
    "Elevate workflow and hygiene with 80% natural granite quartz sinks, stainless steel high-neck pullout mixer taps, and heavy-duty 120kg multi-tier pantry pullouts.",
};

const categoryMatchAliases: Record<string, string[]> = {
  "fitted wardrobes": ["sliding wardrobes", "wardrobes"],
  "walk-in wardrobes": ["walk-in closets"],
  "wardrobe organizers": ["wardrobes"],
  "sliding glass doors": ["sliding doors"],
  "sliding windows": ["upvc sliding windows", "sliding systems"],
  "casement windows": ["casement systems", "upvc casement windows", "arched & bay"],
  "bay & picture windows": ["bay & combination windows", "arched"],
  "arched windows": ["arched"],
  "smart locks & hardware": ["entrance doors", "doors"],
  "hobs & cooking ranges": ["hobs & cooktops"],
  "built-in ovens": ["built-in ovens"],
  "microwaves": ["built-in ovens"],
  "washing machines": ["dishwashers", "appliances"],
  "faucets": ["faucets & taps"],
  "tall pantry units": ["organizers"],
  "wall rail systems": ["organizers"],
  "spice & bottle organisers": ["organizers"],
};

function matchesSelectedCategory(product: Product, selected: string): boolean {
  if (selected === "All Products") return true;
  const query = selected.toLowerCase().trim();
  const cat = product.category.toLowerCase();
  const sub = (product.subCategory || "").toLowerCase();
  const name = product.name.toLowerCase();

  if (
    cat.includes(query) ||
    query.includes(cat) ||
    sub.includes(query) ||
    (sub.length > 0 && query.includes(sub)) ||
    name.includes(query)
  ) {
    return true;
  }

  const aliases = categoryMatchAliases[query];
  if (aliases) {
    return aliases.some(
      (alias) => cat.includes(alias) || sub.includes(alias) || name.includes(alias)
    );
  }
  return false;
}

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category") || "All Products";
  const initialQuery = searchParams.get("q") || "";

  const [prevUrlCategory, setPrevUrlCategory] = useState<string>(urlCategory);
  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [selectedSort, setSelectedSort] = useState<string>("featured");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (urlCategory !== prevUrlCategory) {
    setPrevUrlCategory(urlCategory);
    setSelectedCategory(urlCategory);
  }

  const { toggleWishlist, isWishlisted, openConsultation } = useCart();

  // Filter designs
  const filteredProducts = useMemo(() => {
    return allProductsCatalog.filter((product) => {
      if (!matchesSelectedCategory(product, selectedCategory)) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = product.name.toLowerCase().includes(q);
        const matchCat = product.category.toLowerCase().includes(q);
        const matchDesc = product.description?.toLowerCase().includes(q);
        const matchMat = product.material?.toLowerCase().includes(q);
        if (!matchTitle && !matchCat && !matchDesc && !matchMat) return false;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Sort designs
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (selectedSort === "name-asc") {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [filteredProducts, selectedSort]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#4a4541] font-sans">
      {/* Top Fixed Solid Header */}
      <Navbar
        forceSolid={true}
        onMobileMenuToggle={() => setIsMobileMenuOpen(true)}
        onSearchSubmit={(q) => setSearchQuery(q)}
        onCategorySelect={(cat) => setSelectedCategory(cat)}
      />

      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      <main className="flex-1 w-full pt-28 sm:pt-36 pb-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
          {/* 1. BREADCRUMBS */}
          <nav aria-label="Breadcrumb" className="py-4 text-[14px] text-[#76716d]">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="hover:text-[#4a4541] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-[#dcd7d0]">/</span>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory("All Products");
                    setSearchQuery("");
                  }}
                  className="hover:text-[#4a4541] transition-colors cursor-pointer"
                >
                  All Products
                </button>
              </li>
              {selectedCategory !== "All Products" && (
                <>
                  <li>
                    <span className="text-[#dcd7d0]">/</span>
                  </li>
                  <li className="font-medium text-[#4a4541]">{selectedCategory}</li>
                </>
              )}
            </ol>
          </nav>

          {/* 2. CATEGORY TITLE & COUNT */}
          <div className="text-center max-w-3xl mx-auto my-6 sm:my-8">
            <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-medium text-[#4a4541] tracking-tight leading-[1.1] flex items-baseline justify-center gap-3">
              <span>{selectedCategory}</span>
              <span className="text-xl sm:text-2xl font-normal text-[#8c857e]">
                ({sortedProducts.length})
              </span>
            </h1>
            <p className="mt-3 text-[14px] sm:text-[15px] text-[#76716d] leading-[24px] font-normal max-w-2xl mx-auto">
              {categoryDescriptions[selectedCategory] ||
                (sortedProducts[0] && categoryDescriptions[sortedProducts[0].category]) ||
                categoryDescriptions["All Products"]}
            </p>
          </div>

          {/* 3. QUICK CATEGORY PILLS BAR */}
          <div className="flex items-center justify-start overflow-x-auto pb-2 mb-8 no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0">
            <div className="inline-flex mx-auto border border-[#dcd7d0] bg-white divide-x divide-[#dcd7d0]">
              {categoryTabs.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSearchQuery("");
                    }}
                    className={`relative px-5 sm:px-7 py-3 text-[13px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      isActive
                        ? "bg-[#f5f0ea] text-[#4a4541] font-semibold"
                        : "bg-white text-[#76716d] hover:bg-[#faf8f5] hover:text-[#4a4541]"
                    }`}
                  >
                    <span>{cat}</span>
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff5d55]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. FILTER & SORT TOOLBAR */}
          <div className="border-y border-[#dcd7d0] py-3.5 mb-8 flex flex-wrap items-center justify-between gap-4 text-[14px]">
            {/* Left: Quick filters */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* All Filters Toggle */}
              <button
                onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
                className="flex items-center space-x-1.5 font-medium text-[#4a4541] hover:text-[#ff5d55] transition-colors cursor-pointer"
              >
                <span>Filter categories</span>
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right: Sorter */}
            <div className="flex items-center space-x-4 sm:space-x-6 flex-wrap gap-y-2">
              {/* Sort By Dropdown */}
              <div className="flex items-center space-x-1.5">
                <span className="text-[#76716d] text-[13px]">Sort by:</span>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="bg-transparent font-medium text-[#4a4541] border-b border-[#4a4541] py-0.5 text-[13px] focus:outline-hidden cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="name-asc">Name (A–Z)</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-[#76716d] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* ACTIVE FILTER BADGES */}
          {(searchQuery || selectedCategory !== "All Products") && (
            <div className="flex flex-wrap items-center gap-2 mb-6 text-[13px]">
              <span className="text-[#76716d] font-normal">Active filters:</span>
              {selectedCategory !== "All Products" && (
                <span className="inline-flex items-center gap-1 bg-[#f5f0ea] text-[#4a4541] px-2.5 py-1 rounded-xs">
                  Category: {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("All Products")}
                    className="hover:text-[#ff5d55]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-[#f5f0ea] text-[#4a4541] px-2.5 py-1 rounded-xs">
                  Keyword: {searchQuery}
                  <button onClick={() => setSearchQuery("")} className="hover:text-[#ff5d55]">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSelectedCategory("All Products");
                  setSearchQuery("");
                }}
                className="text-[#ff5d55] font-medium underline ml-2 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}

          {/* 5. PRODUCT GRID */}
          {sortedProducts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg font-medium text-[#4a4541] mb-2">
                No products found matching your criteria.
              </p>
              <p className="text-sm text-[#76716d] mb-6">
                Try clearing some filters or searching with a different keyword.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All Products");
                  setSearchQuery("");
                }}
                className="px-6 py-2.5 bg-[#ff5d55] hover:bg-[#e5473f] text-white rounded-[20px_2px_2px_2px] text-xs font-medium transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {sortedProducts.map((product) => {
                const inWishlist = isWishlisted(product.id);

                return (
                  <div key={product.id} className="group flex flex-col">
                    {/* Image Container with Soft Neutral Background (#f6f4f0) */}
                    <div className="relative aspect-4/3 bg-[#f6f4f0] overflow-hidden mb-3.5">
                      <Link href={`/products/${product.id}`} className="relative block w-full h-full">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>

                      {/* Top Left Studio Category/Style Badge */}
                      {product.badge && (
                        <div className="absolute top-3 left-3 bg-[#ede7de] text-[#4a4541] text-[11px] uppercase tracking-wider font-medium px-2.5 py-0.5">
                          {product.badge}
                        </div>
                      )}

                      {/* Bottom Right Save Design Button */}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/95 border border-[#dcd7d0] flex items-center justify-center transition-colors shadow-xs cursor-pointer ${
                          inWishlist
                            ? "text-[#ff5d55] fill-[#ff5d55]"
                            : "text-[#76716d] hover:text-[#4a4541] hover:border-[#4a4541]"
                        }`}
                        aria-label="Save Design"
                      >
                        <Heart
                          className={`w-4 h-4 ${inWishlist ? "fill-current text-[#ff5d55]" : ""}`}
                        />
                      </button>
                    </div>

                    {/* Product Metadata & Studio Indicator */}
                    <div className="flex items-start justify-between gap-3 mt-1">
                      {/* Left: Title & Subtitle/Specs */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${product.id}`}
                          className="block font-medium text-[16px] text-[#4a4541] leading-[22px] hover:underline line-clamp-2"
                        >
                          {product.name}
                        </Link>
                        <p className="text-[13px] text-[#76716d] mt-1 line-clamp-1">
                          {product.warranty ? `${product.warranty}, ` : ""}
                          {product.finish || product.color || product.subCategory}
                        </p>
                      </div>

                      {/* Right: Custom Studio Tag */}
                      <div className="text-right shrink-0">
                        <div className="text-xs sm:text-[13px] font-medium text-[#4a4541]">
                          Custom Built
                        </div>
                        <div className="text-[11px] text-[#76716d] mt-0.5">
                          Studio Display
                        </div>
                      </div>
                    </div>

                    {/* Bottom View Details & Book Consultation Row */}
                    <div className="mt-3.5 pt-3 border-t border-[#f0ece6] flex items-center justify-between text-xs text-[#76716d]">
                      <Link
                        href={`/products/${product.id}`}
                        className="font-medium text-[#4a4541] hover:text-[#ff5d55] transition-colors flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <span aria-hidden="true">&rarr;</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => openConsultation(`Studio Consultation for ${product.name}`)}
                        className="bg-[#ff5d55] hover:bg-[#e5473f] text-white px-3.5 py-1.5 rounded-[16px_2px_2px_2px] text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Book Visit</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 6. STUDIO EXPERIENCE & ASSURANCE STRIP */}
          <div className="mt-20 pt-12 border-t border-[#dcd7d0] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-3.5">
              <ShieldCheck className="w-6 h-6 text-[#ff5d55] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm text-[#4a4541]">Up to 10-Year Warranty</h4>
                <p className="text-xs text-[#76716d] mt-0.5">
                  Comprehensive coverage across modular kitchens, wardrobes, and certified hardware.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <Store className="w-6 h-6 text-[#ff5d55] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm text-[#4a4541]">Siliguri Experience Studio</h4>
                <p className="text-xs text-[#76716d] mt-0.5">
                  Explore materials, glass profiles, shutters, and finishes in person at our showroom.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <Sparkles className="w-6 h-6 text-[#ff5d55] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm text-[#4a4541]">On-Site Measurement &amp; Fitment</h4>
                <p className="text-xs text-[#76716d] mt-0.5">
                  Factory-trained technicians ensure precise laser leveling and installation at your home.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <RotateCcw className="w-6 h-6 text-[#ff5d55] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm text-[#4a4541]">Bespoke 3D Design Support</h4>
                <p className="text-xs text-[#76716d] mt-0.5">
                  Personalized 3D layouts and material consultation with our in-studio design team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Filter Drawer / Mobile Bottom Sheet */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsFilterDrawerOpen(false)}
          />

          {/* Drawer / Sheet */}
          <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-[#dcd7d0] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#ff5d55]" />
                <h3 className="text-base sm:text-lg font-medium text-[#4a4541]">
                  Filter Products
                </h3>
              </div>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-1.5 text-[#76716d] hover:text-[#4a4541] rounded-full hover:bg-stone-100 transition-colors"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Options Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Category Filter */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#76716d] mb-3">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categoryTabs.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#ff5d55] text-white shadow-xs"
                            : "bg-[#f5f0ea] text-[#4a4541] hover:bg-[#ede5dc]"
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sort Order */}
              <div className="pt-4 border-t border-[#dcd7d0]">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#76716d] mb-3">
                  Sort By
                </label>
                <div className="space-y-2">
                  {[
                    { value: "featured", label: "Featured" },
                    { value: "name-asc", label: "Name (A–Z)" },
                  ].map((s) => (
                    <label
                      key={s.value}
                      className="flex items-center gap-2.5 text-sm text-[#4a4541] cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="mobileSort"
                        value={s.value}
                        checked={selectedSort === s.value}
                        onChange={() => setSelectedSort(s.value)}
                        className="text-[#ff5d55] focus:ring-[#ff5d55]"
                      />
                      <span>{s.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 sm:p-5 border-t border-[#dcd7d0] bg-[#fbf7f4] flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedCategory("All Products");
                  setSelectedSort("featured");
                  setSearchQuery("");
                }}
                className="w-1/2 py-2.5 px-4 border border-[#4a4541] text-[#4a4541] hover:bg-[#4a4541] hover:text-white rounded-[20px_2px_2px_2px] text-xs font-medium transition-colors cursor-pointer text-center"
              >
                Reset All
              </button>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="w-1/2 py-2.5 px-4 bg-[#ff5d55] hover:bg-[#e5473f] text-white rounded-[20px_2px_2px_2px] text-xs font-medium transition-colors shadow-xs cursor-pointer text-center"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <ConsultationModal />
      <Toast />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white text-[#76716d]">
          Loading catalog...
        </div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}
