"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  Mic,
  Camera,
  X,
  User,
  Heart,
  ShoppingBag,
  MapPin,
  ChevronDown,
  Menu,
  Phone,
  HelpCircle,
  Sparkles,
  Tag,
  Building2,
  Home as HomeIcon,
  Store,
  Wrench,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { siteBrand, megaMenuItems } from "@/data/interioData";

interface NavbarProps {
  onMobileMenuToggle: () => void;
  onSearchSubmit?: (query: string) => void;
  onCategorySelect?: (categoryName: string) => void;
}

export default function Navbar({
  onMobileMenuToggle,
  onSearchSubmit,
  onCategorySelect,
}: NavbarProps) {
  const { cartCount, cartTotal, openCart, wishlist, showToast } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [pincode, setPincode] = useState("400079");
  const [showPincodeModal, setShowPincodeModal] = useState(false);
  const [newPincode, setNewPincode] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [activeSegment, setActiveSegment] = useState<"homes" | "business">("homes");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const searchRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  const popularSearches = [
    "sofa",
    "almirah",
    "bed",
    "wardrobe",
    "dining table",
    "office chair",
    "recliner",
    "coffee table",
  ];

  // Scroll detection for sticky header & transparent hero overlay
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleVoiceSearch = () => {
    setIsListening(true);
    showToast("Voice search activated. Listening...");
    setTimeout(() => {
      setIsListening(false);
      setSearchQuery("Recliner Sofa");
      if (onSearchSubmit) onSearchSubmit("Recliner Sofa");
      showToast('Recognized: "Recliner Sofa"');
    }, 1800);
  };

  const handleCameraSearch = () => {
    showToast("Visual Image Search ready. Select any room photo to find matching furniture!");
  };

  const handleSearchFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearchSubmit) {
      onSearchSubmit(searchQuery.trim());
      setIsSearchOpen(false);
    }
  };

  const handleSelectPopular = (term: string) => {
    setSearchQuery(term);
    setIsSearchOpen(false);
    if (onSearchSubmit) {
      onSearchSubmit(term);
    }
  };

  const updatePincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPincode.length === 6) {
      setPincode(newPincode);
      setShowPincodeModal(false);
      showToast(`Delivery location updated to ${newPincode}!`);
      setNewPincode("");
    } else {
      showToast("Please enter a valid 6-digit PIN code.");
    }
  };

  const activeCategoryData = megaMenuItems.find((item) => item.id === hoveredCategory);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white text-gray-900 shadow-md border-b border-gray-100"
          : "bg-gradient-to-b from-black/70 via-black/30 to-transparent text-white"
      }`}
    >
      {/* 1. TOP UTILITY BAR */}
      <div
        className={`w-full text-xs transition-colors border-b ${
          isScrolled
            ? "border-gray-100/80 bg-gray-50/80 text-gray-700"
            : "border-white/10 text-white/90"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 h-8 sm:h-9 flex items-center justify-between">
          {/* Left: For Homes / For Businesses */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveSegment("homes")}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                activeSegment === "homes"
                  ? "bg-[#ff5247] text-white shadow-xs"
                  : isScrolled
                  ? "text-gray-700 hover:text-black"
                  : "text-white/80 hover:text-white"
              }`}
            >
              For Homes
            </button>
            <button
              onClick={() => setActiveSegment("business")}
              className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                activeSegment === "business"
                  ? "text-[#c0262d] font-semibold"
                  : isScrolled
                  ? "text-gray-600 hover:text-gray-900"
                  : "text-white/80 hover:text-white"
              }`}
            >
              For Businesses
            </button>
          </div>

          {/* Right Utility Links */}
          <div className="flex items-center space-x-4 sm:space-x-6 text-[11px] sm:text-xs">
            <a
              href="#dealer"
              className={`hidden sm:flex items-center space-x-1.5 transition-colors ${
                isScrolled ? "text-gray-600 hover:text-[#c0262d]" : "text-white/85 hover:text-white"
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Become a dealer</span>
            </a>
            <a
              href="#store-locator"
              className={`flex items-center space-x-1.5 transition-colors ${
                isScrolled ? "text-gray-600 hover:text-[#c0262d]" : "text-white/85 hover:text-white"
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Store locator</span>
            </a>
            <a
              href="#contact"
              className={`hidden md:flex items-center space-x-1.5 transition-colors ${
                isScrolled ? "text-gray-600 hover:text-[#c0262d]" : "text-white/85 hover:text-white"
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact us</span>
            </a>
            <a
              href="#care-services"
              className={`hidden md:flex items-center space-x-1.5 transition-colors ${
                isScrolled ? "text-gray-600 hover:text-[#c0262d]" : "text-white/85 hover:text-white"
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Services</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN LOGO & ACTIONS BAR */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 pt-4 sm:pt-5 pb-2.5 sm:pb-3">
        <div className="flex items-center justify-between relative">
          {/* Mobile Menu Icon (Mobile Only) */}
          <div className="flex items-center">
            <button
              onClick={onMobileMenuToggle}
              className={`lg:hidden p-1.5 rounded-md transition-colors ${
                isScrolled ? "text-gray-800 hover:text-[#c0262d]" : "text-white"
              }`}
              aria-label="Toggle Navigation"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* BRAND LOGO (Centered) */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
            <a href="/" className="block">
              <div className="relative w-40 sm:w-52 h-10 sm:h-12">
                <Image
                  src={
                    isScrolled
                      ? siteBrand.colorLogo
                      : siteBrand.whiteLogo
                  }
                  alt={siteBrand.name}
                  fill
                  sizes="(max-width: 640px) 160px, 208px"
                  className="object-contain"
                  priority
                />
              </div>
            </a>
          </div>

          {/* RIGHT ACTION ICONS */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Icon Trigger */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 rounded-full transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:text-[#c0262d] hover:bg-gray-100"
                    : "text-white hover:text-white hover:bg-white/15"
                }`}
                aria-label="Open Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Expandable Search Overlay / Modal */}
              {isSearchOpen && (
                <div className="absolute right-0 top-full mt-2 w-[340px] sm:w-[480px] bg-white text-gray-900 rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <form onSubmit={handleSearchFormSubmit} className="relative w-full">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="What are you looking for? (e.g. Sofa, Bed, Almirah...)"
                        autoFocus
                        className="w-full bg-gray-50 text-gray-900 text-sm pl-10 pr-20 py-2.5 rounded-full border border-gray-200 focus:border-[#c0262d] focus:bg-white focus:outline-hidden"
                      />
                      <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />

                      <div className="absolute right-2 flex items-center gap-1">
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={handleVoiceSearch}
                          title="Voice Search"
                          className={`p-1.5 rounded-full ${
                            isListening
                              ? "text-white bg-[#c0262d] animate-pulse"
                              : "text-gray-500 hover:text-[#c0262d]"
                          }`}
                        >
                          <Mic className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={handleCameraSearch}
                          title="Visual Image Search"
                          className="p-1.5 text-gray-500 hover:text-[#c0262d] rounded-full"
                        >
                          <Camera className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* Popular search chips */}
                  <div className="mt-4">
                    <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Popular Searches
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {popularSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => handleSelectPopular(term)}
                          className="px-3 py-1 bg-gray-100 hover:bg-red-50 hover:text-[#c0262d] hover:border-red-200 text-xs text-gray-700 rounded-full border border-transparent transition-colors capitalize"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Account Icon */}
            <div className="relative" ref={accountRef}>
              <button
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className={`p-2 rounded-full transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:text-[#c0262d] hover:bg-gray-100"
                    : "text-white hover:text-white hover:bg-white/15"
                }`}
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </button>

              {isAccountOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white text-gray-900 rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in duration-150">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-xs text-gray-500">Welcome to Interio</p>
                    <p className="text-sm font-semibold text-gray-900">Sign in to your account</p>
                  </div>
                  <div className="p-3">
                    <button
                      onClick={() => {
                        showToast("Login modal opened");
                        setIsAccountOpen(false);
                      }}
                      className="w-full py-2 bg-[#c0262d] hover:bg-[#a11c22] text-white rounded-lg text-xs font-semibold shadow-xs"
                    >
                      Login / Register
                    </button>
                  </div>
                  <div className="border-t border-gray-100 py-1 text-xs">
                    <a
                      href="#track"
                      onClick={() => setIsAccountOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                    >
                      Track Your Order
                    </a>
                    <a
                      href="#care-services"
                      onClick={() => setIsAccountOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                    >
                      Warranty & Support
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <button
              onClick={() => {
                showToast(`Wishlist contains ${wishlist.length} item(s)`);
                const el = document.querySelector("#curated-products");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className={`relative p-2 rounded-full transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-[#c0262d] hover:bg-gray-100"
                  : "text-white hover:text-white hover:bg-white/15"
              }`}
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#c0262d] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag / Cart */}
            <button
              onClick={openCart}
              className={`relative p-2 rounded-full transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-[#c0262d] hover:bg-gray-100"
                  : "text-white hover:text-white hover:bg-white/15"
              }`}
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#c0262d] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. CATEGORIES NAVIGATION BAR (Submenu) */}
      <div
        className={`hidden lg:block w-full border-t transition-colors ${
          isScrolled ? "border-gray-100" : "border-white/15"
        }`}
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
          <ul className="flex items-center justify-center space-x-6 xl:space-x-8 text-[13px] font-medium py-2.5">
            {megaMenuItems.map((cat) => {
              const isActive = hoveredCategory === cat.id;
              return (
                <li key={cat.id} className="relative">
                  <button
                                        onClick={() => {
                      if (onCategorySelect) onCategorySelect(cat.title);
                      const el = document.querySelector("#curated-products");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`transition-colors py-1 hover:underline ${
                      isScrolled
                        ? isActive
                          ? "text-[#c0262d] font-semibold"
                          : "text-gray-800 hover:text-[#c0262d]"
                        : isActive
                        ? "text-white font-bold underline"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    {cat.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Pincode Change Modal */}
      {showPincodeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 text-gray-900">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowPincodeModal(false)}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-[#c0262d]" />
              <h3 className="font-bold text-base text-gray-900">Delivery Location</h3>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Enter your PIN code to check delivery time and product availability in your area.
            </p>
            <form onSubmit={updatePincode} className="space-y-4">
              <input
                type="text"
                maxLength={6}
                value={newPincode}
                onChange={(e) => setNewPincode(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter 6-digit PIN code"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold tracking-wider text-center focus:border-[#c0262d] focus:outline-hidden"
                autoFocus
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-[#c0262d] hover:bg-[#a11c22] text-white font-semibold rounded-lg text-xs transition-colors shadow-xs"
              >
                Apply Location
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
