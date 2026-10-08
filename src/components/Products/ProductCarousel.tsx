"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  tag?: string;
  products: Product[];
  id?: string;
  viewAllLink?: string;
}

export default function ProductCarousel({
  title,
  subtitle,
  tag,
  products,
  id,
  viewAllLink = "#curated-products",
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(25);
  const { addToCart, toggleWishlist, isWishlisted, showToast } = useCart();

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const totalScroll = scrollWidth - clientWidth;
      if (totalScroll > 0) {
        const progress = 25 + (scrollLeft / totalScroll) * 75;
        setScrollProgress(progress);
      }
    }
  };

  return (
    <section id={id} className="py-14 sm:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        {/* Header with Title and "View all products" */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1c1c1c] tracking-tight">
            {title}
          </h2>

          <a
            href={viewAllLink}
            onClick={() => showToast(`Browsing all products in ${title}`)}
            className="text-sm font-semibold text-gray-900 border-b border-gray-900 pb-0.5 hover:text-[#c0262d] hover:border-[#c0262d] transition-colors"
          >
            View all products
          </a>
        </div>

        {/* Horizontal Scrolling Products Row */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4"
        >
          {products.map((product) => {
            const wishlisted = isWishlisted(product.id);

            return (
              <div
                key={product.id}
                className="w-72 sm:w-80 shrink-0 flex flex-col group cursor-pointer"
                onClick={() => {
                  addToCart(product);
                }}
              >
                {/* Clean Off-white Image Container */}
                <div className="relative w-full aspect-square bg-[#f5f0ea] rounded-xs p-6 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:bg-[#efe9e1]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Subtle Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 px-2.5 py-1 bg-[#eae6dd] text-gray-800 text-[11px] font-medium rounded-none tracking-normal">
                      {product.badge}
                    </div>
                  )}

                  {/* Wishlist Heart Icon at Bottom-Right of Image Box */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                      wishlisted
                        ? "text-[#c0262d] bg-white shadow-xs"
                        : "text-gray-400 hover:text-gray-900 bg-white shadow-2xs hover:bg-white"
                    }`}
                    aria-label="Add to Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`}
                    />
                  </button>
                </div>

                {/* Details Section (2 Columns matching live site) */}
                <div className="mt-4 flex items-start justify-between gap-3">
                  {/* Left Column: Title & Specs */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-[#c0262d] transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      {product.dimensions || "1-Year Warranty, Solid Wood"}
                    </p>
                  </div>

                  {/* Right Column: Prices & Discount */}
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-gray-900">
                      ₹{product.price.toLocaleString("en-IN")}
                    </div>
                    {product.mrp && product.mrp > product.price && (
                      <div className="text-xs text-gray-400 line-through">
                        ₹{product.mrp.toLocaleString("en-IN")}
                      </div>
                    )}
                    {product.discount && (
                      <div className="text-xs font-semibold text-[#c0262d]">
                        {product.discount}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Red scroll progress bar matching live */}
        <div className="mt-8 max-w-2xl mx-auto h-0.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#c0262d] transition-all duration-200"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </section>
  );
}
