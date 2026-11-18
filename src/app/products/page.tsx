"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Heart,
  SlidersHorizontal,
  ChevronDown,
  Check,
  ShoppingBag,
  ArrowUpDown,
  Search,
  X,
  Sparkles,
  ShieldCheck,
  Truck,
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
  "Bathrooms",
  "Wardrobes",
  "Doors & Windows",
  "Appliances",
  "Kitchen Accessories",
];

const categoryDescriptions: Record<string, string> = {
  "All Products":
    "Explore our complete collection of precision-engineered modular kitchens, luxury bathroom suites, custom wardrobes, architectural doors, windows, and smart kitchen appliances.",
  "Modular Kitchens":
    "Bring effortless organization and culinary passion into your home with our bespoke modular kitchens, custom-built with waterproof marine ply, Blum soft-close fittings, and scratch-resistant quartz worktops.",
  "Bathrooms":
    "Transform everyday bathing into a 5-star spa sanctuary. Discover wall-hung marble vanities, thermostatic rain showers, freestanding statement tubs, and rimless cyclone sanitaryware.",
  "Wardrobes":
    "Designed around the clothes and accessories you treasure. Explore boutique walk-in closets, floor-to-ceiling tinted glass sliding wardrobes, and soft-close modular internal organisers.",
  "Doors & Windows":
    "Make an unforgettable grand entrance with architectural teak pivot doors, ultra-slim 20mm patio sliding glass systems, and high-performance acoustic thermal double-glazed windows.",
  "Appliances":
    "High-efficiency kitchen appliances engineered for modern cooking. Heavy-suction BLDC chimneys, triple-brass wok burner hobs, 3D hot air convection ovens, and energy-smart refrigerators.",
  "Kitchen Accessories":
    "Elevate workflow and hygiene with 80% natural granite quartz sinks, stainless steel high-neck pullout mixer taps, and heavy-duty 120kg multi-tier pantry pullouts.",
};

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All Products";
  const initialQuery = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [selectedSort, setSelectedSort] = useState<string>("featured");
  const [pincode, setPincode] = useState<string>("400079");
  const [pincodeInput, setPincodeInput] = useState<string>("");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);

  const { addToCart, toggleWishlist, isWishlisted, showToast, openConsultation } = useCart();

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProductsCatalog.filter((product) => {
      // Category filter
      if (selectedCategory !== "All Products") {
        const catMatch =
          product.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          selectedCategory.toLowerCase().includes(product.category.toLowerCase());
        if (!catMatch) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = product.name.toLowerCase().includes(q);
        const matchCat = product.category.toLowerCase().includes(q);
        const matchDesc = product.description?.toLowerCase().includes(q);
        const matchMat = product.material?.toLowerCase().includes(q);
        if (!matchTitle && !matchCat && !matchDesc && !matchMat) return false;
      }

      // Price filter
      if (priceFilter === "under-30k" && product.price >= 30000) return false;
      if (priceFilter === "30k-75k" && (product.price < 30000 || product.price > 75000)) return false;
      if (priceFilter === "75k-150k" && (product.price < 75000 || product.price > 150000)) return false;
      if (priceFilter === "above-150k" && product.price <= 150000) return false;

      return true;
    });
  }, [selectedCategory, searchQuery, priceFilter]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (selectedSort === "price-low") {
      return list.sort((a, b) => a.price - b.price);
    }
    if (selectedSort === "price-high") {
      return list.sort((a, b) => b.price - a.price);
    }
    if (selectedSort === "rating") {
      return list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    if (selectedSort === "discount") {
      return list.sort((a, b) => {
        const discA = parseInt(a.discount) || 0;
        const discB = parseInt(b.discount) || 0;
        return discB - discA;
      });
    }
    return list; // featured default
  }, [filteredProducts, selectedSort]);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincodeInput.length === 6) {
      setPincode(pincodeInput);
      setPincodeStatus("Deliverable in 3-5 days");
      showToast(`Delivery available at PIN ${pincodeInput}`);
      setPincodeInput("");
    } else {
      showToast("Please enter a valid 6-digit PIN code");
    }
  };

  const handleCompareToggle = (id: string, name: string) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter((item) => item !== id));
      showToast(`Removed "${name}" from compare`);
    } else {
      if (compareList.length >= 4) {
        showToast("You can compare up to 4 products at a time");
        return;
      }
      setCompareList([...compareList, id]);
      showToast(`Added "${name}" to compare (${compareList.length + 1}/4)`);
    }
  };

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
          {/* 1. BREADCRUMBS (Matching interio.com 16px 80px container padding, 14px 400 text) */}
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

          {/* 2. CATEGORY TITLE & COUNT (Matching interio.com 60px 500 leading 66px) */}
          <div className="text-center max-w-3xl mx-auto my-6 sm:my-8">
            <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-medium text-[#4a4541] tracking-tight leading-[1.1] flex items-baseline justify-center gap-3">
              <span>{selectedCategory}</span>
              <span className="text-xl sm:text-2xl font-normal text-[#8c857e]">
                ({sortedProducts.length})
              </span>
            </h1>
            <p className="mt-3 text-[14px] sm:text-[15px] text-[#76716d] leading-[24px] font-normal max-w-2xl mx-auto">
              {categoryDescriptions[selectedCategory] ||
                categoryDescriptions["All Products"]}
            </p>
          </div>

          {/* 3. QUICK CATEGORY PILLS BAR (Joined Segmented Box matching interio.com) */}
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 mb-8 no-scrollbar">
            <div className="inline-flex border border-[#dcd7d0] bg-white divide-x divide-[#dcd7d0]">
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

          {/* 4. FILTER & SORT TOOLBAR (Matching interio.com 14px 500 font-medium) */}
          <div className="border-y border-[#dcd7d0] py-3.5 mb-8 flex flex-wrap items-center justify-between gap-4 text-[14px]">
            {/* Left: Quick filters */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* Price Filter dropdown */}
              <div className="relative">
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="appearance-none bg-transparent pr-6 pl-1 py-1 font-medium text-[#4a4541] border-b border-[#4a4541] focus:outline-hidden cursor-pointer"
                >
                  <option value="all">Price Range: All</option>
                  <option value="under-30k">Under ₹30,000</option>
                  <option value="30k-75k">₹30,000 - ₹75,000</option>
                  <option value="75k-150k">₹75,000 - ₹1,50,000</option>
                  <option value="above-150k">Above ₹1,50,000</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#76716d] absolute right-0.5 top-2 pointer-events-none" />
              </div>

              {/* All Filters Toggle */}
              <button
                onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
                className="flex items-center space-x-1.5 font-medium text-[#4a4541] hover:text-[#ff5d55] transition-colors cursor-pointer"
              >
                <span>All filters</span>
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right: Pincode Check, Compare & Sorter */}
            <div className="flex items-center space-x-4 sm:space-x-6 flex-wrap gap-y-2">
              {/* Delivery Pincode Input */}
              <form onSubmit={handlePincodeCheck} className="flex items-center text-[13px]">
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ""))}
                  placeholder={`pincode`}
                  className="w-20 sm:w-24 border-b border-[#a4a2a0] py-0.5 text-[13px] focus:outline-hidden focus:border-[#4a4541] text-[#4a4541]"
                />
                <button
                  type="submit"
                  className="ml-2 font-medium text-[#4a4541] hover:text-[#ff5d55] text-[13px] underline cursor-pointer"
                >
                  Check
                </button>
              </form>

              {/* Compare Button */}
              {compareList.length > 0 && (
                <div className="flex items-center gap-1.5 bg-[#f5f0ea] px-3 py-1 rounded-xs text-[12px] font-medium text-[#4a4541]">
                  <span>Compare ({compareList.length})</span>
                  <button
                    onClick={() => setCompareList([])}
                    className="p-0.5 hover:text-[#ff5d55] cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Sort By Dropdown */}
              <div className="flex items-center space-x-1.5">
                <span className="text-[#76716d] text-[13px]">Sort by:</span>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="bg-transparent font-medium text-[#4a4541] border-b border-[#4a4541] py-0.5 text-[13px] focus:outline-hidden cursor-pointer"
                >
                  <option value="featured">Best Match</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="discount">Biggest Discount</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-[#76716d] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* ACTIVE FILTER BADGES */}
          {(priceFilter !== "all" || searchQuery || selectedCategory !== "All Products") && (
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
              {priceFilter !== "all" && (
                <span className="inline-flex items-center gap-1 bg-[#f5f0ea] text-[#4a4541] px-2.5 py-1 rounded-xs">
                  Price: {priceFilter}
                  <button onClick={() => setPriceFilter("all")} className="hover:text-[#ff5d55]">
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
                  setPriceFilter("all");
                  setSearchQuery("");
                }}
                className="text-[#ff5d55] font-medium underline ml-2 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}

          {/* 5. PRODUCT GRID (3-columns on desktop, card typography matching interio.com 16px 500 title) */}
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
                  setPriceFilter("all");
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
                const isCompared = compareList.includes(product.id);

                return (
                  <div key={product.id} className="group flex flex-col">
                    {/* Image Container with Soft Neutral Background (#f6f4f0) */}
                    <div className="relative aspect-4/3 bg-[#f6f4f0] overflow-hidden mb-3.5">
                      <Link href={`/products/${product.id}`} className="block w-full h-full">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>

                      {/* Top Left Badge (Online Exclusive / Bestseller) */}
                      {product.badge && (
                        <div className="absolute top-3 left-3 bg-[#ede7de] text-[#4a4541] text-[11px] uppercase tracking-wider font-medium px-2.5 py-0.5">
                          {product.badge}
                        </div>
                      )}

                      {/* Bottom Left Rating Badge */}
                      {product.rating && (
                        <div className="absolute bottom-3 left-3 bg-[#ede7de] text-[#4a4541] text-[12px] font-bold px-2 py-0.5 flex items-center gap-1 shadow-xs">
                          <span className="text-[#ff5d55]">★</span>
                          <span>{product.rating.toFixed(1)}</span>
                        </div>
                      )}

                      {/* Bottom Right Wishlist Icon Button */}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/95 border border-[#dcd7d0] flex items-center justify-center transition-colors shadow-xs ${
                          inWishlist
                            ? "text-[#ff5d55] fill-[#ff5d55]"
                            : "text-[#76716d] hover:text-[#4a4541] hover:border-[#4a4541]"
                        }`}
                        aria-label="Save to Wishlist"
                      >
                        <Heart
                          className={`w-4 h-4 ${inWishlist ? "fill-current text-[#ff5d55]" : ""}`}
                        />
                      </button>
                    </div>

                    {/* Product Metadata & Price Block */}
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

                      {/* Right: Price & Discount Block */}
                      <div className="text-right shrink-0">
                        <div className="text-[17px] font-bold text-[#4a4541]">
                          ₹{product.price.toLocaleString("en-IN")}
                        </div>
                        {product.mrp > product.price && (
                          <div className="text-[12px] text-[#8e8984] line-through mt-0.5">
                            ₹{product.mrp.toLocaleString("en-IN")}
                          </div>
                        )}
                        {product.discount && (
                          <div className="text-[12px] font-medium text-[#ff5d55]">
                            {product.discount}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Variant / Compare / Add to Cart Row */}
                    <div className="mt-3.5 pt-3 border-t border-[#f0ece6] flex items-center justify-between text-xs text-[#76716d]">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] uppercase tracking-wider font-medium text-[#8c857e]">
                          {product.category === "Modular Kitchens" ? "Layout" : "Variants"}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-4 border border-[#ff5d55] rounded-xs flex items-center justify-center text-[9px] font-bold text-[#ff5d55]">
                            1
                          </span>
                          <span className="w-5 h-4 border border-[#dcd7d0] rounded-xs flex items-center justify-center text-[9px] font-bold text-[#8c857e]">
                            2
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleCompareToggle(product.id, product.name)}
                          className={`flex items-center gap-1 cursor-pointer transition-colors text-[12px] ${
                            isCompared ? "text-[#ff5d55] font-semibold" : "text-[#76716d] hover:text-[#4a4541]"
                          }`}
                        >
                          <div
                            className={`w-3.5 h-3.5 border rounded-xs flex items-center justify-center ${
                              isCompared ? "bg-[#ff5d55] border-[#ff5d55] text-white" : "border-[#a4a2a0]"
                            }`}
                          >
                            {isCompared && <Check className="w-2.5 h-2.5" />}
                          </div>
                          <span>Compare</span>
                        </button>

                        <button
                          onClick={() => {
                            addToCart(product);
                            showToast(`Added ${product.name} to cart`);
                          }}
                          className="bg-[#ff5d55] hover:bg-[#e5473f] text-white px-3 py-1.5 rounded-[16px_2px_2px_2px] text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 6. TRUST & BRAND ASSURANCE STRIP */}
          <div className="mt-20 pt-12 border-t border-[#dcd7d0] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-3.5">
              <ShieldCheck className="w-6 h-6 text-[#ff5d55] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm text-[#4a4541]">Up to 10-Year Warranty</h4>
                <p className="text-xs text-[#76716d] mt-0.5">
                  Comprehensive coverage across all modular kitchen cabinets and precision hardware.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <Truck className="w-6 h-6 text-[#ff5d55] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm text-[#4a4541]">Free Professional Delivery</h4>
                <p className="text-xs text-[#76716d] mt-0.5">
                  Safe handling and white-glove doorstep delivery directly to your home.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <Sparkles className="w-6 h-6 text-[#ff5d55] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm text-[#4a4541]">Free Expert Installation</h4>
                <p className="text-xs text-[#76716d] mt-0.5">
                  Factory-trained technicians ensure seamless laser leveling and calibration.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <RotateCcw className="w-6 h-6 text-[#ff5d55] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm text-[#4a4541]">Custom Design Support</h4>
                <p className="text-xs text-[#76716d] mt-0.5">
                  3D CAD layouts and personalized material consultation with our master designers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

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
