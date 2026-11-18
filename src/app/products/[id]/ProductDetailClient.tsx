"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Share2,
  Check,
  ShieldCheck,
  Truck,
  Wrench,
  RotateCcw,
  ShoppingBag,
  Tag,
  Sparkles,
  MapPin,
  Clock,
  Layers,
  FileText,
  ThumbsUp,
  X,
} from "lucide-react";
import Navbar from "@/components/Header/Navbar";
import MobileDrawer from "@/components/Header/MobileDrawer";
import Footer from "@/components/Footer/Footer";
import CartDrawer from "@/components/Cart/CartDrawer";
import ConsultationModal from "@/components/Modals/ConsultationModal";
import Toast from "@/components/UI/Toast";
import { useCart } from "@/context/CartContext";
import { getRelatedProducts } from "@/data/productsData";
import { Product } from "@/types";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart, toggleWishlist, isWishlisted, showToast, openConsultation } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [pincode, setPincode] = useState("400079");
  const [pincodeInput, setPincodeInput] = useState("");
  const [pincodeChecked, setPincodeChecked] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "features" | "reviews">("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const inWishlist = isWishlisted(product.id);
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const relatedProducts = getRelatedProducts(product.id, 4);

  // Variant options
  const variants = [
    { label: product.finish || "Standard Matte", desc: "Anti-Fingerprint Finish" },
    { label: "Natural Textured Oak", desc: "Tactile Woodgrain" },
    { label: "High Gloss Acrylic", desc: "Mirror Glass Luster" },
  ];

  // Scroll listener for sticky bottom buy bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincodeInput.length === 6) {
      setPincode(pincodeInput);
      setPincodeChecked(true);
      showToast(`Pincode ${pincodeInput} is verified for Free White-Glove Assembly!`);
      setPincodeInput("");
    } else {
      showToast("Please enter a valid 6-digit PIN code.");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on Status Bath & Kitchen`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Product link copied to clipboard!");
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    showToast(`Added ${quantity} x ${product.name} to your cart!`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#4a4541] font-sans">
      {/* 1. Header (Solid White Navbar) */}
      <Navbar forceSolid={true} onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />

      <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <main className="flex-1 w-full pt-28 sm:pt-36 pb-28 sm:pb-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
          {/* Breadcrumb (Matching interio.com 14px 400 py-4) */}
          <nav aria-label="Breadcrumb" className="py-4 text-[14px] text-[#76716d]">
            <ol className="flex items-center space-x-2 flex-wrap">
              <li>
                <Link href="/" className="hover:text-[#4a4541] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-[#dcd7d0]">/</span>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#4a4541] transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <span className="text-[#dcd7d0]">/</span>
              </li>
              <li>
                <Link
                  href={`/products?category=${encodeURIComponent(product.category)}`}
                  className="hover:text-[#4a4541] transition-colors"
                >
                  {product.category}
                </Link>
              </li>
              <li>
                <span className="text-[#dcd7d0]">/</span>
              </li>
              <li className="font-medium text-[#4a4541] truncate max-w-[200px] sm:max-w-md">
                {product.name}
              </li>
            </ol>
          </nav>

          {/* MAIN PRODUCT DETAIL GRID (Left: Gallery, Right: Purchase Panel) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 pt-2">
            {/* LEFT COLUMN: MULTI-VIEW GALLERY */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Main Featured Image Container */}
              <div className="relative aspect-4/3 sm:aspect-5/4 bg-[#f6f4f0] overflow-hidden">
                <Image
                  src={gallery[activeImageIndex]}
                  alt={`${product.name} - View ${activeImageIndex + 1}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center transition-all duration-300"
                />

                {/* Top-Left Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-[#ede7de] text-[#4a4541] text-[11px] uppercase tracking-wider font-medium px-3 py-1">
                    {product.badge}
                  </div>
                )}

                {/* In Stock Pill */}
                <div className="absolute top-4 right-4 bg-white/95 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  <span>In Stock</span>
                </div>
              </div>

              {/* Thumbnails Row */}
              {gallery.length > 1 && (
                <div className="flex sm:grid sm:grid-cols-5 gap-3 pt-1 overflow-x-auto no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0">
                  {gallery.map((imgUrl: string, idx: number) => {
                    const isSelected = activeImageIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-20 sm:w-auto shrink-0 sm:shrink aspect-square bg-[#f6f4f0] overflow-hidden border-2 transition-all cursor-pointer ${
                          isSelected
                            ? "border-[#ff5d55]"
                            : "border-transparent hover:border-[#dcd7d0] opacity-80 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={imgUrl}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          sizes="120px"
                          className="object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: STICKY PRODUCT CONFIGURATION & PURCHASE PANEL */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              {/* Top Row: Title, Wishlist & Share (Matching interio.com 24px 500 leading 28.8px) */}
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-[24px] sm:text-[26px] font-medium text-[#4a4541] tracking-normal leading-[1.2]">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-2 shrink-0 pt-0.5">
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                        inWishlist
                          ? "border-red-200 bg-red-50 text-[#ff5d55]"
                          : "border-[#dcd7d0] text-[#76716d] hover:text-[#4a4541] hover:border-[#4a4541]"
                      }`}
                      aria-label="Wishlist"
                      title="Add to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="w-9 h-9 rounded-full border border-[#dcd7d0] text-[#76716d] hover:text-[#4a4541] hover:border-[#4a4541] flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Share"
                      title="Share product"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Subtitle / Key Spec Tag */}
                <p className="text-[13px] text-[#76716d] mt-1 font-normal">
                  {product.warranty || "10-Year Warranty"}, {product.finish || product.material || product.category}
                </p>

                {/* Ratings Strip */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 text-[#ff5d55] text-xs font-semibold">
                    <span>★</span>
                    <span className="text-[#4a4541] font-bold">{(product.rating || 4.8).toFixed(1)}</span>
                  </div>
                  <span className="text-[#dcd7d0]">|</span>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className="text-[13px] text-[#76716d] hover:text-[#4a4541] underline cursor-pointer"
                  >
                    {product.reviews || 42} Ratings
                  </button>
                </div>
              </div>

              {/* Price Block (Matching interio.com 24px-28px font-medium, padding 24px 0 0) */}
              <div className="pt-4 border-t border-[#dcd7d0]">
                <div className="flex items-baseline gap-3">
                  <span className="text-[26px] sm:text-[28px] font-medium text-[#4a4541]">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  {product.mrp > product.price && (
                    <span className="text-sm text-[#8e8984] line-through">
                      MRP ₹{product.mrp.toLocaleString("en-IN")}
                    </span>
                  )}
                  {product.discount && (
                    <span className="text-sm font-semibold text-[#ff5d55]">
                      {product.discount}
                    </span>
                  )}
                </div>
                <p className="text-[13px] text-[#76716d] mt-1">
                  Inclusive of all taxes. Free shipping &amp; free installation included.
                </p>
              </div>

              {/* Product Promotional Offers Box */}
              <div className="bg-[#fbf7f4] border border-[#f0e4d8] p-4 text-[13px] space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#ff5d55] font-bold uppercase tracking-wider text-[11px]">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Product Offers</span>
                </div>
                <p className="text-[#4a4541] font-normal leading-relaxed">
                  Use coupon code <span className="font-bold text-[#222] bg-white px-1.5 py-0.5 border border-[#dcd7d0] rounded-xs">FESTIVEDEALS</span> at checkout for up to ₹2,000 off!
                </p>
                <div className="pt-1 flex items-center justify-between text-[#76716d] text-[12px]">
                  <span>No-Cost EMI available</span>
                  <button
                    onClick={() => showToast("Offer applied at checkout!")}
                    className="text-[#4a4541] font-medium hover:text-[#ff5d55] underline cursor-pointer"
                  >
                    Explore More Offers &gt;
                  </button>
                </div>
              </div>

              {/* Variant Selector (Matching Joined segmented buttons on live site) */}
              <div className="space-y-2 pt-2 border-t border-[#dcd7d0]">
                <div className="text-[13px] font-medium text-[#4a4541]">
                  Option / Finish:
                </div>
                <div className="overflow-x-auto no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0">
                  <div className="inline-flex border border-[#dcd7d0] divide-x divide-[#dcd7d0]">
                    {variants.map((variant, idx) => {
                      const isSelected = selectedVariant === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedVariant(idx)}
                          className={`relative px-5 py-2.5 text-[13px] font-medium transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-white text-[#4a4541] font-semibold"
                              : "bg-[#faf8f5] text-[#76716d] hover:bg-white"
                          }`}
                        >
                          <span>{variant.label}</span>
                          {isSelected && (
                            <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#ff5d55]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Check Delivery & Assembly (Matching live site) */}
              <div className="pt-3 border-t border-[#dcd7d0] space-y-2">
                <div className="text-[13px] font-medium text-[#4a4541]">
                  Check delivery &amp; assembly
                </div>
                <form onSubmit={handlePincodeSubmit} className="flex items-center justify-between border-b border-[#a4a2a0] py-1.5">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincodeInput}
                    onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ""))}
                    placeholder={`Enter pincode (e.g. ${pincode})`}
                    className="w-full text-[13px] text-[#4a4541] placeholder:text-[#a4a2a0] focus:outline-hidden bg-transparent"
                  />
                  <button
                    type="submit"
                    className="font-medium text-[13px] text-[#4a4541] hover:text-[#ff5d55] cursor-pointer shrink-0 pl-3"
                  >
                    Check
                  </button>
                </form>

                {pincodeChecked && (
                  <div className="text-[12px] text-emerald-800 flex items-center gap-1.5 mt-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Free delivery &amp; free installation to <strong>{pincode}</strong> within 3-5 days.</span>
                  </div>
                )}
              </div>

              {/* Purchase Action Buttons */}
              <div className="pt-4 border-t border-[#dcd7d0] flex flex-col sm:flex-row items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-[#dcd7d0] w-full sm:w-auto shrink-0 justify-between">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2.5 text-[#76716d] hover:text-[#4a4541] font-semibold text-sm cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-2.5 text-xs font-bold text-[#4a4541] text-center w-8">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2.5 text-[#76716d] hover:text-[#4a4541] font-semibold text-sm cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart Button (Matching live site 20px 2px 2px radius and #ff5d55) */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 w-full py-3 bg-[#ff5d55] hover:bg-[#e5473f] text-white font-medium text-sm tracking-wide shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer rounded-[20px_2px_2px_2px]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* Secondary Action: Consultation */}
              <button
                type="button"
                onClick={() => openConsultation(`Bespoke Customization for ${product.name}`)}
                className="w-full py-2.5 bg-[#f5f0ea] hover:bg-[#ede7de] text-[#4a4541] font-medium text-[13px] rounded-[20px_2px_2px_2px] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#ff5d55]" />
                <span>Book Free Design Consultation for this Product</span>
              </button>

              {/* Value Propositions Strip */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#f0ece6] text-center">
                <div className="p-2.5 bg-[#faf8f5] rounded-xs">
                  <ShieldCheck className="w-4 h-4 mx-auto text-[#ff5d55] mb-1" />
                  <div className="text-[12px] font-medium text-[#4a4541]">10-Year Warranty</div>
                  <div className="text-[10px] text-[#76716d]">Comprehensive</div>
                </div>
                <div className="p-2.5 bg-[#faf8f5] rounded-xs">
                  <Truck className="w-4 h-4 mx-auto text-[#ff5d55] mb-1" />
                  <div className="text-[12px] font-medium text-[#4a4541]">Free Delivery</div>
                  <div className="text-[10px] text-[#76716d]">White-glove handling</div>
                </div>
                <div className="p-2.5 bg-[#faf8f5] rounded-xs">
                  <Wrench className="w-4 h-4 mx-auto text-[#ff5d55] mb-1" />
                  <div className="text-[12px] font-medium text-[#4a4541]">Free Installation</div>
                  <div className="text-[10px] text-[#76716d]">By certified team</div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. TABS SECTION: OVERVIEW, SPECS, FEATURES, REVIEWS */}
          <div className="mt-20 pt-10 border-t border-[#dcd7d0]">
            {/* Tabs Header */}
            <div className="flex items-center space-x-8 border-b border-[#dcd7d0] overflow-x-auto no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 text-[15px] font-medium mb-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-3.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === "overview"
                    ? "border-[#ff5d55] text-[#4a4541] font-semibold"
                    : "border-transparent text-[#76716d] hover:text-[#4a4541]"
                }`}
              >
                Overview &amp; Design
              </button>
              <button
                onClick={() => setActiveTab("specs")}
                className={`pb-3.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === "specs"
                    ? "border-[#ff5d55] text-[#4a4541] font-semibold"
                    : "border-transparent text-[#76716d] hover:text-[#4a4541]"
                }`}
              >
                Specifications &amp; Dimensions
              </button>
              <button
                onClick={() => setActiveTab("features")}
                className={`pb-3.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === "features"
                    ? "border-[#ff5d55] text-[#4a4541] font-semibold"
                    : "border-transparent text-[#76716d] hover:text-[#4a4541]"
                }`}
              >
                Features &amp; Highlights
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-3.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === "reviews"
                    ? "border-[#ff5d55] text-[#4a4541] font-semibold"
                    : "border-transparent text-[#76716d] hover:text-[#4a4541]"
                }`}
              >
                Customer Reviews ({product.reviews || 42})
              </button>
            </div>

            {/* TAB CONTENT: 1. OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="max-w-3xl space-y-4">
                  <h3 className="text-xl font-medium text-[#4a4541]">
                    About the {product.name}
                  </h3>
                  <p className="text-[15px] text-[#4a4541] leading-relaxed">
                    {product.description ||
                      "Engineered with meticulous attention to detail, this piece seamlessly integrates ergonomic functional elegance with durable materials designed for Indian lifestyles."}
                  </p>
                  <p className="text-[14px] text-[#76716d] leading-relaxed">
                    Every joint, surface, and edge is calibrated to perfection. Featuring waterproof marine-grade core materials, anti-scratch finishes, and heavy-duty fittings built to endure decades of daily living.
                  </p>
                </div>

                {/* Key Spec Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                  <div className="p-4 bg-[#fbf7f4] border border-[#f0ece6]">
                    <span className="text-[11px] text-[#76716d] uppercase tracking-wider block">Category</span>
                    <span className="text-[14px] font-medium text-[#4a4541] mt-1 block">{product.category}</span>
                  </div>
                  <div className="p-4 bg-[#fbf7f4] border border-[#f0ece6]">
                    <span className="text-[11px] text-[#76716d] uppercase tracking-wider block">Warranty</span>
                    <span className="text-[14px] font-medium text-[#4a4541] mt-1 block">{product.warranty || "10-Year Coverage"}</span>
                  </div>
                  <div className="p-4 bg-[#fbf7f4] border border-[#f0ece6]">
                    <span className="text-[11px] text-[#76716d] uppercase tracking-wider block">Core Material</span>
                    <span className="text-[14px] font-medium text-[#4a4541] mt-1 block">{product.material || "IS:710 Marine Grade"}</span>
                  </div>
                  <div className="p-4 bg-[#fbf7f4] border border-[#f0ece6]">
                    <span className="text-[11px] text-[#76716d] uppercase tracking-wider block">Finish</span>
                    <span className="text-[14px] font-medium text-[#4a4541] mt-1 block">{product.finish || "Anti-Fingerprint Matte"}</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: 2. SPECIFICATIONS */}
            {activeTab === "specs" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <h3 className="text-xl font-medium text-[#4a4541]">Technical Specifications</h3>
                <div className="border border-[#dcd7d0] divide-y divide-[#dcd7d0] max-w-4xl text-[14px]">
                  <div className="grid grid-cols-3 p-3.5 bg-[#fbf7f4]">
                    <span className="font-medium text-[#4a4541]">Product Name</span>
                    <span className="col-span-2 text-[#4a4541]">{product.name}</span>
                  </div>
                  <div className="grid grid-cols-3 p-3.5 bg-white">
                    <span className="font-medium text-[#4a4541]">SKU Code</span>
                    <span className="col-span-2 text-[#4a4541]">{product.id.toUpperCase()}-STK-2026</span>
                  </div>
                  <div className="grid grid-cols-3 p-3.5 bg-[#fbf7f4]">
                    <span className="font-medium text-[#4a4541]">Category</span>
                    <span className="col-span-2 text-[#4a4541]">{product.category} ({product.subCategory})</span>
                  </div>
                  <div className="grid grid-cols-3 p-3.5 bg-white">
                    <span className="font-medium text-[#4a4541]">Primary Material</span>
                    <span className="col-span-2 text-[#4a4541]">{product.material || "BWP Calibrated Marine Plywood"}</span>
                  </div>
                  <div className="grid grid-cols-3 p-3.5 bg-[#fbf7f4]">
                    <span className="font-medium text-[#4a4541]">Hardware / Fittings</span>
                    <span className="col-span-2 text-[#4a4541]">{product.specifications?.hardware || "Blum / Hettich Soft-Close Mechanisms (100,000 Cycles)"}</span>
                  </div>
                  <div className="grid grid-cols-3 p-3.5 bg-white">
                    <span className="font-medium text-[#4a4541]">Dimensions</span>
                    <span className="col-span-2 text-[#4a4541]">{product.dimensions || "Customized on site to exact floorplan"}</span>
                  </div>
                  <div className="grid grid-cols-3 p-3.5 bg-[#fbf7f4]">
                    <span className="font-medium text-[#4a4541]">Warranty Duration</span>
                    <span className="col-span-2 text-[#4a4541]">{product.warranty || "10-Year Comprehensive Replacement"}</span>
                  </div>
                  <div className="grid grid-cols-3 p-3.5 bg-white">
                    <span className="font-medium text-[#4a4541]">Country of Origin</span>
                    <span className="col-span-2 text-[#4a4541]">India (Engineered with Austrian Technology)</span>
                  </div>
                  {product.specifications &&
                    Object.entries(product.specifications).map(([key, val], idx) => (
                      <div
                        key={key}
                        className={`grid grid-cols-3 p-3.5 ${idx % 2 === 0 ? "bg-[#fbf7f4]" : "bg-white"}`}
                      >
                        <span className="font-medium text-[#4a4541] capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                        <span className="col-span-2 text-[#4a4541]">{String(val)}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: 3. FEATURES */}
            {activeTab === "features" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <h3 className="text-xl font-medium text-[#4a4541]">Signature Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                  {(product.features && product.features.length > 0
                    ? product.features
                    : [
                        "Anti-Fingerprint Thermal Laminate: Repels oil stains, moisture, and fingerprints.",
                        "Laser-Bonded Seamless Edgeband: Eliminates visible glue lines and resists water penetration.",
                        "Heavy-Duty Load Capacity: Each shelf and drawer tested for up to 60kg load.",
                        "Bespoke Internal Modular Organizers: Cutlery inserts, spice pullouts, and waste separators.",
                      ]
                  ).map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-[#faf8f5] border border-[#f0ece6]">
                      <Check className="w-5 h-5 text-[#ff5d55] shrink-0 mt-0.5" />
                      <p className="text-[14px] text-[#4a4541] leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: 4. REVIEWS */}
            {activeTab === "reviews" && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#dcd7d0]">
                  <div>
                    <h3 className="text-xl font-medium text-[#4a4541]">Verified Buyer Reviews</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex text-[#ff5d55] text-sm">★★★★★</div>
                      <span className="text-[14px] font-bold text-[#4a4541]">{(product.rating || 4.8).toFixed(1)} out of 5</span>
                      <span className="text-[#76716d] text-xs">({product.reviews || 42} verified ratings)</span>
                    </div>
                  </div>
                  <button
                    onClick={() => showToast("Review form opened")}
                    className="px-5 py-2.5 border border-[#4a4541] text-[#4a4541] hover:bg-[#4a4541] hover:text-white rounded-[20px_2px_2px_2px] text-xs font-medium transition-colors"
                  >
                    Write a Review
                  </button>
                </div>

                <div className="space-y-6 max-w-3xl">
                  {[
                    {
                      name: "Rajesh S., Bangalore",
                      rating: 5,
                      date: "Reviewed on 12 Oct 2026",
                      verified: true,
                      comment:
                        "Exceptional quality! The fit and finish are top-notch. Installation team arrived on time and completed the entire assembly in 4 hours with laser leveling.",
                    },
                    {
                      name: "Ananya M., Mumbai",
                      rating: 5,
                      date: "Reviewed on 28 Sep 2026",
                      verified: true,
                      comment:
                        "We got this for our master kitchen remodel. The soft-close Blum hinges feel so premium and the waterproof core gives complete peace of mind.",
                    },
                    {
                      name: "Vikram K., Hyderabad",
                      rating: 4,
                      date: "Reviewed on 14 Aug 2026",
                      verified: true,
                      comment:
                        "Very good product. Delivery took 4 days. The material feels heavy, solid and truly durable. Highly recommended.",
                    },
                  ].map((rev, idx) => (
                    <div key={idx} className="p-4 bg-[#fbf7f4] border border-[#f0ece6] space-y-2 text-[14px]">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#4a4541]">{rev.name}</span>
                        <span className="text-xs text-[#76716d]">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-[#ff5d55] text-xs">{"★".repeat(rev.rating)}</div>
                        {rev.verified && (
                          <span className="text-[11px] text-emerald-800 flex items-center gap-1 font-medium">
                            <Check className="w-3 h-3" /> Verified Buyer
                          </span>
                        )}
                      </div>
                      <p className="text-[#4a4541] leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. RELATED / CURATED PRODUCTS CAROUSEL */}
          {relatedProducts.length > 0 && (
            <div className="mt-20 pt-12 border-t border-[#dcd7d0]">
              <div className="flex items-baseline justify-between mb-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-medium text-[#4a4541]">
                    You May Also Like
                  </h2>
                  <p className="text-xs text-[#76716d] mt-1">
                    Carefully curated selections to complement your space
                  </p>
                </div>
                <Link
                  href={`/products?category=${encodeURIComponent(product.category)}`}
                  className="text-xs font-semibold text-[#ff5d55] hover:underline"
                >
                  View All in {product.category} &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((rel) => (
                  <div key={rel.id} className="group flex flex-col">
                    <Link
                      href={`/products/${rel.id}`}
                      className="relative aspect-square bg-[#f6f4f0] overflow-hidden mb-3"
                    >
                      <Image
                        src={rel.image}
                        alt={rel.name}
                        fill
                        sizes="280px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {rel.badge && (
                        <div className="absolute top-2.5 left-2.5 bg-[#ede7de] text-[#4a4541] text-[10px] uppercase font-medium px-2 py-0.5">
                          {rel.badge}
                        </div>
                      )}
                    </Link>
                    <Link
                      href={`/products/${rel.id}`}
                      className="font-medium text-xs sm:text-sm text-[#4a4541] hover:underline line-clamp-1"
                    >
                      {rel.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-xs sm:text-sm text-[#4a4541]">
                        ₹{rel.price.toLocaleString("en-IN")}
                      </span>
                      {rel.mrp > rel.price && (
                        <span className="text-[11px] text-[#8e8984] line-through">
                          ₹{rel.mrp.toLocaleString("en-IN")}
                        </span>
                      )}
                      {rel.discount && (
                        <span className="text-[11px] font-medium text-[#ff5d55]">
                          {rel.discount}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 4. STICKY BOTTOM FLOATING BUY BAR (Matching interio.com #f5f0ea, height 76px) */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-[#f5f0ea] border-t border-[#dcd7d0] z-40 transition-transform duration-300 shadow-lg ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] flex items-center justify-between gap-4">
          {/* Left: Product title and thumbnail on larger screens */}
          <div className="hidden sm:flex items-center gap-3 min-w-0">
            <div className="relative w-12 h-12 bg-white rounded-xs overflow-hidden shrink-0">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
            <div className="min-w-0">
              <h4 className="font-medium text-sm text-[#4a4541] truncate max-w-xs">{product.name}</h4>
              <p className="text-xs text-[#76716d] truncate">{product.warranty || "10-Year Warranty"}</p>
            </div>
          </div>

          {/* Right: Price + Quantity Stepper + Add to Cart */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-left sm:text-right">
              <div className="text-base sm:text-lg font-bold text-[#4a4541] leading-none">
                ₹{product.price.toLocaleString("en-IN")}
              </div>
              <div className="text-[11px] text-[#8e8984] line-through mt-0.5">
                MRP ₹{product.mrp.toLocaleString("en-IN")}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center border border-[#dcd7d0] bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1.5 text-xs text-[#76716d] hover:text-[#4a4541] font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="px-2 py-1.5 text-xs font-bold text-[#4a4541]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1.5 text-xs text-[#76716d] hover:text-[#4a4541] font-bold cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="px-8 py-2.5 sm:py-3 bg-[#ff5d55] hover:bg-[#e5473f] text-white font-medium text-xs sm:text-sm tracking-wide shadow-xs transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap rounded-[20px_2px_2px_2px]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <ConsultationModal />
      <Toast />

      {/* Footer */}
      <Footer />
    </div>
  );
}
