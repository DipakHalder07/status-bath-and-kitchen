"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Mic,
  Camera,
  X,
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
  CalendarCheck,
  Wrench,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { siteBrand, megaMenuItems } from "@/data/statusData";

interface NavbarProps {
  onMobileMenuToggle: () => void;
  onSearchSubmit?: (query: string) => void;
  onCategorySelect?: (categoryName: string) => void;
  forceSolid?: boolean;
}

export default function Navbar({
  onMobileMenuToggle,
  onSearchSubmit,
  onCategorySelect,
  forceSolid = false,
}: NavbarProps) {
  const { cartCount, openCart, wishlist, showToast, openConsultation } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const isHeaderSolid = forceSolid || isScrolled;
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [activeSegment, setActiveSegment] = useState<"homes" | "business">("homes");

  const searchRef = useRef<HTMLDivElement>(null);

  const popularSearches = [
    "modular kitchens",
    "bathrooms",
    "wardrobes",
    "doors",
    "windows",
    "chimneys",
    "vanity units",
    "sinks",
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

  // Close search dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
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
      setSearchQuery("Modular Kitchens");
      if (onSearchSubmit) onSearchSubmit("Modular Kitchens");
      showToast('Recognized: "Modular Kitchens"');
    }, 1800);
  };

  const handleCameraSearch = () => {
    showToast("Visual search is coming soon. Share a photo with us during your consultation instead!");
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

  return (
    <header
      className={`status-navbar fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isHeaderSolid
          ? "bg-white text-gray-900 shadow-md border-b border-gray-100"
          : "bg-gradient-to-b from-black/70 via-black/30 to-transparent text-white"
      }`}
    >
      {/* 1. TOP UTILITY BAR (Hidden on mobile) */}
      <div
        className={`hidden sm:block w-full text-xs transition-colors border-b ${
          isHeaderSolid
            ? "border-gray-100/80 bg-gray-50/80 text-gray-700"
            : "border-white/10 text-white/90"
        }`}
      >
        <div className="status-container max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 h-8 sm:h-9 flex items-center justify-between">
          {/* Left: For Homes / For Businesses */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveSegment("homes")}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                activeSegment === "homes"
                  ? "bg-[#ff5d55] text-white shadow-xs"
                  : isHeaderSolid
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
                  ? "text-[#ff5d55] font-semibold"
                  : isHeaderSolid
                  ? "text-gray-600 hover:text-gray-900"
                  : "text-white/80 hover:text-white"
              }`}
            >
              For Businesses
            </button>
          </div>

          {/* Right Utility Links */}
          <div className="flex items-center space-x-4 sm:space-x-6 text-[11px] sm:text-xs">
            <button
              type="button"
              onClick={() => openConsultation("Design Consultation")}
              className={`hidden sm:flex items-center space-x-1.5 transition-colors cursor-pointer ${
                isHeaderSolid ? "text-gray-600 hover:text-[#ff5d55]" : "text-white/85 hover:text-white"
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book a consultation</span>
            </button>
            <Link
              href="/contact"
              className={`flex items-center space-x-1.5 transition-colors ${
                isHeaderSolid ? "text-gray-600 hover:text-[#ff5d55]" : "text-white/85 hover:text-white"
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Visit our studio</span>
            </Link>
            <Link
              href="/contact"
              className={`hidden md:flex items-center space-x-1.5 transition-colors ${
                isHeaderSolid ? "text-gray-600 hover:text-[#ff5d55]" : "text-white/85 hover:text-white"
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact us</span>
            </Link>
            <Link
              href="/services"
              className={`hidden md:flex items-center space-x-1.5 transition-colors ${
                isHeaderSolid ? "text-gray-600 hover:text-[#ff5d55]" : "text-white/85 hover:text-white"
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Services</span>
            </Link>
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
                isHeaderSolid ? "text-gray-800 hover:text-[#ff5d55]" : "text-white"
              }`}
              aria-label="Toggle Navigation"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* BRAND LOGO (Centered) */}
          <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 flex items-center justify-center">
            <Link href="/" className="block">
              <div className="relative w-28 sm:w-52 h-10 sm:h-12">
                <Image
                  src={
                    isHeaderSolid
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
            </Link>
          </div>

          {/* RIGHT ACTION ICONS */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Icon Trigger */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 rounded-full transition-colors ${
                  isHeaderSolid
                    ? "text-gray-700 hover:text-[#ff5d55] hover:bg-gray-100"
                    : "text-white hover:text-white hover:bg-white/15"
                }`}
                aria-label="Open Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Expandable Search Overlay / Modal */}
              {isSearchOpen && (
                <div className="fixed inset-x-3 top-20 sm:inset-auto sm:right-0 sm:top-full sm:mt-2 w-auto sm:w-[480px] bg-white text-gray-900 rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <form onSubmit={handleSearchFormSubmit} className="relative w-full">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="What are you looking for? (e.g. Kitchens, Wardrobes, Windows...)"
                        autoFocus
                        className="w-full bg-gray-50 text-gray-900 text-sm pl-10 pr-20 py-2.5 rounded-full border border-gray-200 focus:border-[#ff5d55] focus:bg-white focus:outline-hidden"
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
                              ? "text-white bg-[#ff5d55] animate-pulse"
                              : "text-gray-500 hover:text-[#ff5d55]"
                          }`}
                        >
                          <Mic className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={handleCameraSearch}
                          title="Visual Image Search"
                          className="p-1.5 text-gray-500 hover:text-[#ff5d55] rounded-full"
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
                          className="px-3 py-1 bg-gray-100 hover:bg-red-50 hover:text-[#ff5d55] hover:border-red-200 text-xs text-gray-700 rounded-full border border-transparent transition-colors capitalize"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
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
                isHeaderSolid
                  ? "text-gray-700 hover:text-[#ff5d55] hover:bg-gray-100"
                  : "text-white hover:text-white hover:bg-white/15"
              }`}
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#ff5d55] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Showroom Shortlist */}
            <button
              onClick={openCart}
              className={`relative p-2 rounded-full transition-colors cursor-pointer ${
                isHeaderSolid
                  ? "text-gray-700 hover:text-[#ff5d55] hover:bg-gray-100"
                  : "text-white hover:text-white hover:bg-white/15"
              }`}
              aria-label="Showroom Shortlist"
              title="Showroom Shortlist"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#ff5d55] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
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
          isHeaderSolid ? "border-gray-100" : "border-white/15"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
          <ul className="flex items-center justify-center space-x-6 xl:space-x-8 text-[13px] font-medium py-2.5">
            <li className="relative">
              <Link
                href="/products"
                className={`transition-colors py-1 hover:underline cursor-pointer font-semibold ${
                  isHeaderSolid
                    ? "text-[#ff5d55]"
                    : "text-white"
                }`}
              >
                All Products
              </Link>
            </li>
            {megaMenuItems.map((cat) => (
              <li key={cat.id} className="relative">
                <Link
                  href={`/products?category=${encodeURIComponent(cat.title)}`}
                  onClick={(e) => {
                    if (onCategorySelect) {
                      onCategorySelect(cat.title);
                    }
                  }}
                  className={`transition-colors py-1 hover:underline cursor-pointer ${
                    isHeaderSolid
                      ? "text-gray-800 hover:text-[#ff5d55]"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
