"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Share2,
  Star,
  Check,
  ShieldCheck,
  Truck,
  Wrench,
  RotateCcw,
  ShoppingBag,
  Tag,
  ChevronRight,
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
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      {/* 1. Header (Solid White Navbar) */}
      <Navbar forceSolid={true} onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />

      <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <main className="flex-1 w-full pt-28 sm:pt-36 pb-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-gray-500">
            <ol className="flex items-center space-x-2 flex-wrap">
              <li>
                <Link href="/" className="hover:text-gray-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-gray-300">/</span>
              </li>
              <li>
                <Link href="/products" className="hover:text-gray-900 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <span className="text-gray-300">/</span>
              </li>
              <li>
                <Link
                  href={`/products?category=${encodeURIComponent(product.category)}`}
                  className="hover:text-gray-900 transition-colors"
                >
                  {product.category}
                </Link>
              </li>
              <li>
                <span className="text-gray-300">/</span>
              </li>
              <li className="font-semibold text-gray-900 truncate max-w-[200px] sm:max-w-md">
                {product.name}
              </li>
            </ol>
          </nav>

          {/* MAIN PRODUCT DETAIL GRID (Left: Gallery, Right: Purchase Panel) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
            {/* LEFT COLUMN: MULTI-VIEW GALLERY */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Main Featured Image Container */}
              <div className="relative aspect-4/3 sm:aspect-5/4 bg-[#f6f4f0] overflow-hidden rounded-xs">
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
                  <div className="absolute top-4 left-4 bg-[#ede7de] text-gray-900 text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-xs">
                    {product.badge}
                  </div>
                )}

                {/* In Stock Pill */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  <span>In Stock</span>
                </div>
              </div>

              {/* Thumbnails Row */}
              {gallery.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 pt-2">
                  {gallery.map((imgUrl: string, idx: number) => {
                    const isSelected = activeImageIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative aspect-square bg-[#f6f4f0] overflow-hidden rounded-xs border-2 transition-all cursor-pointer ${
                          isSelected
                            ? "border-[#c0262d] ring-2 ring-red-100"
                            : "border-transparent hover:border-gray-300 opacity-80 hover:opacity-100"
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
              {/* Top Row: Title, Wishlist & Share */}
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-2 shrink-0 pt-1">
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                        inWishlist
                          ? "border-red-200 bg-red-50 text-red-600"
                          : "border-gray-200 text-gray-600 hover:text-black hover:border-black"
                      }`}
                      aria-label="Wishlist"
                      title="Add to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="w-9 h-9 rounded-full border border-gray-200 text-gray-600 hover:text-black hover:border-black flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Share"
                      title="Share product"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Subtitle / Key Spec Tag */}
                <p className="text-xs sm:text-sm text-gray-500 mt-1.5 font-medium">
                  {product.warranty || "10-Year Warranty"} •{" "}
                  {product.finish || product.material || product.category}
                </p>

                {/* Ratings Strip */}
                <div className="flex items-center gap-2 mt-2.5">
                  <div className="flex items-center gap-1 bg-[#ede7de] text-gray-900 text-xs font-bold px-2.5 py-0.5 rounded-xs">
                    <span>★</span>
                    <span>{(product.rating || 4.8).toFixed(1)}</span>
                  </div>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className="text-xs text-gray-500 hover:text-gray-900 underline cursor-pointer"
                  >
                    {product.reviews || 42} Verified Reviews
                  </button>
                </div>
              </div>

              {/* Price Block */}
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  {product.mrp > product.price && (
                    <span className="text-sm sm:text-base text-gray-400 line-through">
                      MRP ₹{product.mrp.toLocaleString("en-IN")}
                    </span>
                  )}
                  {product.discount && (
                    <span className="text-sm sm:text-base font-bold text-[#ff5247]">
                      {product.discount}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  Inclusive of all taxes. Free shipping &amp; free installation included.
                </p>
              </div>

              {/* Product Promotional Offers Box */}
              <div className="bg-[#fbf7f4] border border-[#f0e4d8] rounded-md p-4 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#ff5247] font-bold uppercase tracking-wider text-[11px]">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Product Offers</span>
                </div>
                <p className="text-gray-800 font-medium leading-relaxed">
                  Use coupon code <span className="font-bold text-gray-900 bg-white px-1.5 py-0.5 border border-stone-300 rounded-xs">STATUSFIRST</span> at checkout for an instant ₹2,000 off!
                </p>
                <div className="pt-1 flex items-center justify-between text-gray-500 text-[11px]">
                  <span>No-Cost EMI starting from ₹3,499/month</span>
                  <button
                    onClick={() => showToast("Offer coupon STATUSFIRST applied automatically at checkout!")}
                    className="text-[#ff5247] font-semibold hover:underline cursor-pointer"
                  >
                    Apply Coupon &rarr;
                  </button>
                </div>
              </div>

              {/* Variant Selector */}
              <div className="space-y-2.5 pt-2 border-t border-gray-100">
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Finish / Material Option:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {variants.map((variant, idx) => {
                    const isSelected = selectedVariant === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedVariant(idx)}
                        className={`text-left p-2.5 rounded-sm border transition-all cursor-pointer ${
                          isSelected
                            ? "border-[#c0262d] bg-red-50/40 text-gray-900 shadow-xs ring-1 ring-[#c0262d]"
                            : "border-gray-200 hover:border-gray-400 text-gray-700"
                        }`}
                      >
                        <div className="font-semibold text-xs">{variant.label}</div>
                        <div className="text-[10px] text-gray-500 mt-0.5">{variant.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Delivery & Assembly Checker */}
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <div className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Check Delivery &amp; Assembly
                </div>
                <form onSubmit={handlePincodeSubmit} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      maxLength={6}
                      value={pincodeInput}
                      onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ""))}
                      placeholder={`Enter 6-digit PIN code (Current: ${pincode})`}
                      className="w-full border-b border-gray-300 py-2 text-xs text-gray-900 focus:outline-hidden focus:border-gray-900"
                    />
                  </div>
                  <button
                    type="submit"
                    className="font-bold text-xs uppercase tracking-wider text-gray-900 hover:text-[#c0262d] px-3 py-2 cursor-pointer"
                  >
                    Check
                  </button>
                </form>

                {pincodeChecked && (
                  <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50/70 p-2.5 rounded-xs mt-2 border border-emerald-100">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Standard Delivery &amp; <strong>Free Expert Installation</strong> to{" "}
                      <strong>{pincode}</strong> within 3-5 business days.
                    </span>
                  </div>
                )}
              </div>

              {/* Purchase Action Buttons */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-gray-300 rounded-sm w-full sm:w-auto shrink-0 justify-between">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2.5 text-gray-600 hover:text-black font-bold text-sm cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-2.5 text-xs font-bold text-gray-900 text-center w-8">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2.5 text-gray-600 hover:text-black font-bold text-sm cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 w-full py-3.5 bg-[#ff5247] hover:bg-[#e04339] text-white font-bold rounded-sm text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* Secondary Action: Consultation */}
              <button
                type="button"
                onClick={() => openConsultation(`Bespoke Customization for ${product.name}`)}
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-sm text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#c0262d]" />
                <span>Book Free Design Consultation for this Product</span>
              </button>

              {/* Value Propositions Strip */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 text-center">
                <div className="p-2 bg-stone-50 rounded-xs">
                  <ShieldCheck className="w-4 h-4 mx-auto text-[#c0262d] mb-1" />
                  <div className="text-[11px] font-bold text-gray-800">10-Year Warranty</div>
                  <div className="text-[9px] text-gray-500">Comprehensive</div>
                </div>
                <div className="p-2 bg-stone-50 rounded-xs">
                  <Truck className="w-4 h-4 mx-auto text-[#c0262d] mb-1" />
                  <div className="text-[11px] font-bold text-gray-800">Free Delivery</div>
                  <div className="text-[9px] text-gray-500">White-glove handling</div>
                </div>
                <div className="p-2 bg-stone-50 rounded-xs">
                  <Wrench className="w-4 h-4 mx-auto text-[#c0262d] mb-1" />
                  <div className="text-[11px] font-bold text-gray-800">Free Installation</div>
                  <div className="text-[9px] text-gray-500">By certified team</div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. TABS SECTION: OVERVIEW, SPECS, FEATURES, REVIEWS */}
          <div className="mt-20 pt-10 border-t border-gray-200">
            {/* Tabs Header */}
            <div className="flex items-center space-x-8 border-b border-gray-200 overflow-x-auto text-sm font-semibold mb-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-3.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === "overview"
                    ? "border-[#ff5247] text-gray-900"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                Overview &amp; Design
              </button>
              <button
                onClick={() => setActiveTab("specs")}
                className={`pb-3.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === "specs"
                    ? "border-[#ff5247] text-gray-900"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                Specifications &amp; Dimensions
              </button>
              <button
                onClick={() => setActiveTab("features")}
                className={`pb-3.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === "features"
                    ? "border-[#ff5247] text-gray-900"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                Key Features &amp; Materials
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`pb-3.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === "reviews"
                    ? "border-[#ff5247] text-gray-900"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                }`}
              >
                Verified Reviews ({product.reviews || 42})
              </button>
            </div>

            {/* TAB CONTENT */}
            {activeTab === "overview" && (
              <div className="max-w-4xl space-y-6 text-sm text-gray-700 leading-relaxed">
                <h3 className="text-xl font-bold text-gray-900">
                  Engineered with Passion. Designed for Living.
                </h3>
                <p>
                  {product.description ||
                    "Crafted using premium European hardware, boiling water-proof plywood substrates, and multi-layer protective surfaces engineered to endure the rigorous demands of modern living."}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div className="p-5 bg-stone-50 rounded-sm space-y-2 border border-stone-200">
                    <h4 className="font-bold text-gray-900 text-sm">Design Ergonomics</h4>
                    <p className="text-xs text-gray-600 leading-normal">
                      Every dimension is planned to human proportions, eliminating unnecessary bending, awkward reaching, and maximizing usable internal storage.
                    </p>
                  </div>
                  <div className="p-5 bg-stone-50 rounded-sm space-y-2 border border-stone-200">
                    <h4 className="font-bold text-gray-900 text-sm">Long-Lasting Durability</h4>
                    <p className="text-xs text-gray-600 leading-normal">
                      Backed by our comprehensive 10-year warranty, anti-termite treatment, and zero-joint edge banding technology that prevents moisture infiltration.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="max-w-3xl">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Technical Specifications</h3>
                <div className="divide-y divide-gray-100 border-t border-b border-gray-200 text-xs sm:text-sm">
                  <div className="py-3 grid grid-cols-3">
                    <span className="font-semibold text-gray-500">Dimensions</span>
                    <span className="col-span-2 text-gray-900 font-medium">{product.dimensions || "Custom Modular Sizing"}</span>
                  </div>
                  <div className="py-3 grid grid-cols-3">
                    <span className="font-semibold text-gray-500">Base Material</span>
                    <span className="col-span-2 text-gray-900 font-medium">{product.material || "IS:710 Grade BWP Plywood"}</span>
                  </div>
                  <div className="py-3 grid grid-cols-3">
                    <span className="font-semibold text-gray-500">Surface Finish</span>
                    <span className="col-span-2 text-gray-900 font-medium">{product.finish || "Super Matte Anti-Fingerprint Acrylic"}</span>
                  </div>
                  <div className="py-3 grid grid-cols-3">
                    <span className="font-semibold text-gray-500">Hardware &amp; Runners</span>
                    <span className="col-span-2 text-gray-900 font-medium">Blum / Hettich Soft-Close Tested to 100,000 Cycles</span>
                  </div>
                  <div className="py-3 grid grid-cols-3">
                    <span className="font-semibold text-gray-500">Warranty Coverage</span>
                    <span className="col-span-2 text-gray-900 font-medium">{product.warranty || "10-Year Comprehensive Warranty"}</span>
                  </div>
                  <div className="py-3 grid grid-cols-3">
                    <span className="font-semibold text-gray-500">Assembly &amp; Installation</span>
                    <span className="col-span-2 text-gray-900 font-medium">Free Laser-Calibrated Installation by Status Engineers</span>
                  </div>
                  {product.specifications &&
                    Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="py-3 grid grid-cols-3">
                        <span className="font-semibold text-gray-500">{key}</span>
                        <span className="col-span-2 text-gray-900 font-medium">{String(val)}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {activeTab === "features" && (
              <div className="max-w-3xl space-y-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Highlights &amp; Key Features</h3>
                <ul className="space-y-3">
                  {(product.features || [
                    "Boiling Water Proof core material resistant against humidity and leaks",
                    "Integrated soft-closing mechanism on all drawers, pull-outs, and hinges",
                    "Custom modular sizing easily adapted to your unique floorplan",
                    "Non-toxic, zero-VOC eco-certified adhesives safe for indoor living",
                    "Free design consultation and 3D architectural rendering included",
                  ]).map((feat: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                      <div className="w-5 h-5 rounded-full bg-red-50 text-[#c0262d] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="max-w-4xl space-y-8">
                {/* Rating Summary Block */}
                <div className="flex flex-col sm:flex-row items-center gap-8 p-6 bg-stone-50 rounded-sm border border-stone-200">
                  <div className="text-center sm:text-left">
                    <div className="text-4xl font-extrabold text-gray-900">
                      {(product.rating || 4.8).toFixed(1)}
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 my-1 justify-center sm:justify-start">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <div className="text-xs text-gray-500">Based on {product.reviews || 42} reviews</div>
                  </div>

                  <div className="flex-1 w-full space-y-1.5 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="w-12">5 Star</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-[#ff5247] w-[82%]"></div>
                      </div>
                      <span className="w-8 text-right font-semibold">82%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-12">4 Star</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-[#ff5247] w-[14%]"></div>
                      </div>
                      <span className="w-8 text-right font-semibold">14%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-12">3 Star</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 w-[3%]"></div>
                      </div>
                      <span className="w-8 text-right font-semibold">3%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-12">2 Star</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-300 w-[1%]"></div>
                      </div>
                      <span className="w-8 text-right font-semibold">1%</span>
                    </div>
                  </div>
                </div>

                {/* Individual Review Cards */}
                <div className="space-y-4">
                  {[
                    {
                      name: "Vikram Malhotra",
                      date: "2 weeks ago",
                      verified: true,
                      stars: 5,
                      comment:
                        "The craftsmanship exceeded all expectations. Installation was completed in less than 6 hours and the finish matches our architecture seamlessly.",
                    },
                    {
                      name: "Ananya Deshmukh",
                      date: "1 month ago",
                      verified: true,
                      stars: 5,
                      comment:
                        "Outstanding quality! Soft-close works like butter and the quartz stone feels premium. Worth every single rupee.",
                    },
                    {
                      name: "Karan Johar S.",
                      date: "2 months ago",
                      verified: true,
                      stars: 4,
                      comment:
                        "Great product and punctual delivery. The design team was patient with our layout tweaks.",
                    },
                  ].map((rev, idx) => (
                    <div key={idx} className="p-4 border border-gray-100 rounded-sm space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-gray-900">{rev.name}</div>
                        <span className="text-gray-400 text-[11px]">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(rev.stars)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                        {rev.verified && (
                          <span className="text-[11px] text-emerald-700 font-semibold ml-2 flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> Verified Buyer
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 leading-normal">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. RELATED / CURATED PRODUCTS CAROUSEL */}
          {relatedProducts.length > 0 && (
            <div className="mt-20 pt-12 border-t border-gray-200">
              <div className="flex items-baseline justify-between mb-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    You May Also Like
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Carefully curated selections to complement your space
                  </p>
                </div>
                <Link
                  href={`/products?category=${encodeURIComponent(product.category)}`}
                  className="text-xs font-semibold text-[#ff5247] hover:underline"
                >
                  View All in {product.category} &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((rel) => (
                  <div key={rel.id} className="group flex flex-col">
                    <Link
                      href={`/products/${rel.id}`}
                      className="relative aspect-square bg-[#f6f4f0] overflow-hidden mb-3 rounded-xs"
                    >
                      <Image
                        src={rel.image}
                        alt={rel.name}
                        fill
                        sizes="280px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {rel.badge && (
                        <div className="absolute top-2.5 left-2.5 bg-[#ede7de] text-gray-800 text-[10px] uppercase font-semibold px-2 py-0.5 rounded-xs">
                          {rel.badge}
                        </div>
                      )}
                    </Link>
                    <Link
                      href={`/products/${rel.id}`}
                      className="font-medium text-xs sm:text-sm text-gray-900 hover:underline line-clamp-1"
                    >
                      {rel.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-xs sm:text-sm text-gray-900">
                        ₹{rel.price.toLocaleString("en-IN")}
                      </span>
                      {rel.mrp > rel.price && (
                        <span className="text-[11px] text-gray-400 line-through">
                          ₹{rel.mrp.toLocaleString("en-IN")}
                        </span>
                      )}
                      {rel.discount && (
                        <span className="text-[11px] font-bold text-[#ff5247]">
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

      {/* 4. STICKY BOTTOM FLOATING BUY BAR (Matches interio.com) */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 z-40 transition-transform duration-300 shadow-xl ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 py-3 flex items-center justify-between gap-4">
          {/* Left: Product title and thumbnail on larger screens */}
          <div className="hidden sm:flex items-center gap-3 min-w-0">
            <div className="relative w-12 h-12 bg-stone-100 rounded-xs overflow-hidden shrink-0">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-sm text-gray-900 truncate max-w-xs">{product.name}</h4>
              <p className="text-xs text-gray-500 truncate">{product.warranty || "10-Year Warranty"}</p>
            </div>
          </div>

          {/* Right: Price + Quantity Stepper + Add to Cart */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-left sm:text-right">
              <div className="text-base sm:text-lg font-extrabold text-gray-900 leading-none">
                ₹{product.price.toLocaleString("en-IN")}
              </div>
              <div className="text-[11px] text-gray-400 line-through">
                MRP ₹{product.mrp.toLocaleString("en-IN")}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center border border-gray-300 rounded-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1.5 text-xs text-gray-600 hover:text-black font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="px-2 py-1.5 text-xs font-bold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1.5 text-xs text-gray-600 hover:text-black font-bold cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="px-6 py-2.5 sm:py-3 bg-[#ff5247] hover:bg-[#e04339] text-white font-bold rounded-sm text-xs sm:text-sm tracking-wide shadow-md transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
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
