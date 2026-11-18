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
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
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
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-gray-500">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="hover:text-gray-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-gray-300">/</span>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory("All Products");
                    setSearchQuery("");
                  }}
                  className="hover:text-gray-900 transition-colors cursor-pointer"
                >
                  All Products
                </button>
              </li>
              {selectedCategory !== "All Products" && (
                <>
                  <li>
                    <span className="text-gray-300">/</span>
                  </li>
                  <li className="font-semibold text-gray-900">{selectedCategory}</li>
                </>
              )}
            </ol>
          </nav>

          {/* 2. CATEGORY TITLE & COUNT */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight flex items-baseline justify-center gap-3">
              <span>{selectedCategory}</span>
              <span className="text-lg sm:text-xl font-normal text-gray-400">
                {sortedProducts.length} Products
              </span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed font-light">
              {categoryDescriptions[selectedCategory] ||
                categoryDescriptions["All Products"]}
            </p>
          </div>

          {/* 3. QUICK CATEGORY PILLS BAR */}
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 pb-3 mb-8 no-scrollbar">
            {categoryTabs.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSearchQuery("");
                  }}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap transition-all rounded-sm border cursor-pointer ${
                    isActive
                      ? "bg-gray-900 text-white border-gray-900 shadow-xs"
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-900 hover:text-black"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* 4. FILTER & SORT TOOLBAR */}
          <div className="border-t border-b border-gray-200 py-3.5 mb-8 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
            {/* Left: Quick filters */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Price Filter dropdown */}
              <div className="relative">
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="appearance-none bg-transparent pr-7 pl-1 py-1 font-medium text-gray-800 border-b border-gray-400 focus:outline-hidden cursor-pointer"
                >
                  <option value="all">Price Range: All</option>
                  <option value="under-30k">Under ₹30,000</option>
                  <option value="30k-75k">₹30,000 - ₹75,000</option>
                  <option value="75k-150k">₹75,000 - ₹1,50,000</option>
                  <option value="above-150k">Above ₹1,50,000</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-1 top-2 pointer-events-none" />
              </div>

              {/* All Filters Toggle */}
              <button
                onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
                className="flex items-center space-x-1.5 font-medium text-gray-800 hover:text-[#c0262d] transition-colors cursor-pointer"
              >
                <span>All filters</span>
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right: Pincode Check, Compare & Sorter */}
            <div className="flex items-center space-x-4 sm:space-x-6 flex-wrap gap-y-2">
              {/* Delivery Pincode Input */}
              <form onSubmit={handlePincodeCheck} className="flex items-center">
                <input
                  type="text"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ""))}
                  placeholder={`PIN: ${pincode}`}
                  className="w-24 sm:w-28 border-b border-gray-300 py-1 text-xs focus:outline-hidden focus:border-gray-900 text-gray-800"
                />
                <button
                  type="submit"
                  className="ml-2 font-semibold text-gray-900 hover:text-[#c0262d] text-xs underline cursor-pointer"
                >
                  Check
                </button>
              </form>

              {/* Compare Button */}
              {compareList.length > 0 && (
                <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-800">
                  <span>Compare ({compareList.length})</span>
                  <button
                    onClick={() => setCompareList([])}
                    className="p-0.5 hover:text-red-500 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Sort By Dropdown */}
              <div className="flex items-center space-x-1.5">
                <span className="text-gray-500 text-xs">Sort by:</span>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="bg-transparent font-semibold text-gray-900 border-b border-gray-400 py-1 text-xs sm:text-sm focus:outline-hidden cursor-pointer"
                >
                  <option value="featured">Best Match</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="discount">Biggest Discount</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* ACTIVE FILTER BADGES */}
          {(priceFilter !== "all" || searchQuery || selectedCategory !== "All Products") && (
            <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
              <span className="text-gray-400 font-medium">Active filters:</span>
              {selectedCategory !== "All Products" && (
                <span className="inline-flex items-center gap-1 bg-stone-100 text-gray-800 px-2.5 py-1 rounded-sm">
                  Category: {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("All Products")}
                    className="hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {priceFilter !== "all" && (
                <span className="inline-flex items-center gap-1 bg-stone-100 text-gray-800 px-2.5 py-1 rounded-sm">
                  Price: {priceFilter}
                  <button onClick={() => setPriceFilter("all")} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-stone-100 text-gray-800 px-2.5 py-1 rounded-sm">
                  Keyword: {searchQuery}
                  <button onClick={() => setSearchQuery("")} className="hover:text-red-500">
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
                className="text-[#c0262d] font-medium underline ml-2 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}

          {/* 5. PRODUCT GRID */}
          {sortedProducts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg font-semibold text-gray-800 mb-2">
                No products found matching your criteria.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Try clearing some filters or searching with a different keyword.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All Products");
                  setPriceFilter("all");
                  setSearchQuery("");
                }}
                className="px-6 py-2.5 bg-[#c0262d] text-white rounded-md text-xs font-semibold hover:bg-[#a11c22] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {sortedProducts.map((product) => {
                const inWishlist = isWishlisted(product.id);
                const isCompared = compareList.includes(product.id);

                return (
                  <div key={product.id} className="group flex flex-col">
                    {/* Image Container with Soft Neutral Background */}
                    <div className="relative aspect-4/3 sm:aspect-square bg-[#f6f4f0] overflow-hidden mb-3.5">
                      <Link href={`/products/${product.id}`} className="block w-full h-full">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>

                      {/* Top Left Badge (e.g. Online Exclusive / Bestseller) */}
                      {product.badge && (
                        <div className="absolute top-3 left-3 bg-[#ede7de] text-gray-800 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-xs">
                          {product.badge}
                        </div>
                      )}

                      {/* Bottom Left Rating Badge */}
                      {product.rating && (
                        <div className="absolute bottom-3 left-3 bg-[#ede7de] text-gray-900 text-[11px] font-bold px-2 py-0.5 rounded-xs flex items-center gap-1 shadow-xs">
                          <span>★</span>
                          <span>{product.rating.toFixed(1)}</span>
                        </div>
                      )}

                      {/* Bottom Right Wishlist Icon Button */}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/95 border border-gray-200 flex items-center justify-center transition-colors shadow-xs ${
                          inWishlist
                            ? "text-red-500 fill-red-500"
                            : "text-gray-600 hover:text-black hover:border-black"
                        }`}
                        aria-label="Save to Wishlist"
                      >
                        <Heart
                          className={`w-4 h-4 ${inWishlist ? "fill-current text-red-500" : ""}`}
                        />
                      </button>
                    </div>

                    {/* Product Metadata & Price Block */}
                    <div className="flex items-start justify-between gap-3">
                      {/* Left: Title & Subtitle/Specs */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${product.id}`}
                          className="block font-medium text-[15px] sm:text-base text-gray-900 leading-snug hover:underline line-clamp-2"
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                          {product.warranty ? `${product.warranty}, ` : ""}
                          {product.finish || product.color || product.subCategory}
                        </p>
                      </div>

                      {/* Right: Price & Discount Block */}
                      <div className="text-right shrink-0">
                        <div className="text-[15px] sm:text-base font-bold text-gray-900">
                          ₹{product.price.toLocaleString("en-IN")}
                        </div>
                        {product.mrp > product.price && (
                          <div className="text-xs text-gray-400 line-through">
                            ₹{product.mrp.toLocaleString("en-IN")}
                          </div>
                        )}
                        {product.discount && (
                          <div className="text-xs font-semibold text-[#ff5247]">
                            {product.discount}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Row: Add to Cart button and Compare checkbox */}
                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      <button
                        onClick={() => handleCompareToggle(product.id, product.name)}
                        className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
                          isCompared ? "text-[#c0262d] font-semibold" : "text-gray-500 hover:text-gray-900"
                        }`}
                      >
                        <div
                          className={`w-3.5 h-3.5 border rounded-xs flex items-center justify-center ${
                            isCompared ? "bg-[#c0262d] border-[#c0262d] text-white" : "border-gray-300"
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
                        className="px-3.5 py-1.5 bg-gray-900 hover:bg-[#c0262d] text-white font-medium rounded-xs text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 6. TRUST & BRAND ASSURANCE STRIP */}
          <div className="mt-20 pt-12 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-3.5">
              <ShieldCheck className="w-6 h-6 text-[#c0262d] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-gray-900">Up to 10-Year Warranty</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Comprehensive coverage across all modular kitchen cabinets and precision hardware.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <Truck className="w-6 h-6 text-[#c0262d] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-gray-900">Free Professional Delivery</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Safe handling and white-glove doorstep delivery directly to your home.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <Sparkles className="w-6 h-6 text-[#c0262d] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-gray-900">Free Expert Installation</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Factory-trained technicians ensure seamless laser leveling and calibration.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <RotateCcw className="w-6 h-6 text-[#c0262d] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-gray-900">Custom Design Support</h4>
                <p className="text-xs text-gray-500 mt-0.5">
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
        <div className="min-h-screen flex items-center justify-center bg-white text-gray-500">
          Loading catalog...
        </div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}
