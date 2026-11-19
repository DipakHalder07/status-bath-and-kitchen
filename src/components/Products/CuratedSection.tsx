"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { curatedTabsData } from "@/data/statusData";
import { useCart } from "@/context/CartContext";

const tabKeys = Object.keys(curatedTabsData);

export default function CuratedSection() {
  const [activeTab, setActiveTab] = useState<string>(tabKeys[0]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(25);
  const { openConsultation } = useCart();

  const currentTabData = curatedTabsData[activeTab] || curatedTabsData[tabKeys[0]];
  const products = currentTabData.products;

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
    <section id="curated-products" className="status-section py-14 sm:py-20 bg-[#f5f0ea] scroll-mt-28">
      <div className="status-container max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        {/* Section Heading */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-[28px] font-medium text-[#332f2c] tracking-tight">
            Design ideas for you
          </h2>
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#76716d] font-normal">
            Like a look? Tap it and we will help you plan something similar for your home.
          </p>
        </div>

        {/* Segmented Horizontal Tabs (Inline-flex left-aligned border box matching live site) */}
        <div className="overflow-x-auto no-scrollbar mb-8 -mx-5 px-5 sm:mx-0 sm:px-0">
          <div className="inline-flex border border-[#dcd7d0] rounded-none divide-x divide-[#dcd7d0] bg-[#f5f0ea]">
            {tabKeys.map((key) => {
              const tab = curatedTabsData[key];
              const isActive = activeTab === key;

              return (
                <button
                  key={key}
                  onClick={() => {
                    setActiveTab(key);
                    setScrollProgress(25);
                    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
                  }}
                  className={`relative px-5 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-colors cursor-pointer text-center ${
                    isActive
                      ? "bg-white text-[#332f2c]"
                      : "bg-[#f5f0ea] text-[#6b6560] hover:bg-[#ede5dc] hover:text-[#332f2c]"
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-3 right-3 sm:left-4 sm:right-4 h-[2px] bg-[#ff5d55]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Horizontal Slider Cards */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 -mx-5 px-5 sm:mx-0 sm:px-0"
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="w-72 sm:w-80 shrink-0 group cursor-pointer block"
            >
              {/* Product Image */}
              <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden bg-white shadow-2xs group-hover:shadow-md transition-all duration-300">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Title with red underline & subtitle */}
              <div className="mt-3.5">
                <h3 className="text-base font-medium text-[#4a4541] group-hover:text-[#ff5d55] transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <div className="w-8 h-0.5 bg-[#ff5d55] mt-1.5 group-hover:w-16 transition-all duration-300" />
                <p className="text-xs text-[#76716d] mt-2">
                  {product.dimensions || product.category}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Red scroll progress bar matching live */}
        <div className="mt-8 max-w-2xl mx-auto h-1 bg-[#e5e5e5] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#ff5d55] rounded-full transition-all duration-200"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </section>
  );
}
