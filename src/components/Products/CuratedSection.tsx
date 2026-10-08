"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { curatedTabsData } from "@/data/interioData";
import { useCart } from "@/context/CartContext";

export default function CuratedSection() {
  const [activeTab, setActiveTab] = useState<string>("sofas");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(25);
  const { showToast } = useCart();

  const currentTabData = curatedTabsData[activeTab] || curatedTabsData["sofas"];
  const products = currentTabData.products;
  const tabKeys = Object.keys(curatedTabsData);

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
    <section id="curated-products" className="py-14 sm:py-20 bg-[#f5f0ea]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        {/* Section Heading */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1c1c1c] tracking-tight">
            Curated for you
          </h2>
        </div>

        {/* Segmented Horizontal Tabs (Inline-flex left-aligned border box matching live site) */}
        <div className="overflow-x-auto no-scrollbar mb-10">
          <div className="inline-flex border border-gray-300 rounded-none divide-x divide-gray-300 bg-[#f5f0ea]">
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
                  className={`relative px-6 sm:px-9 py-3 sm:py-3.5 text-sm sm:text-base font-semibold whitespace-nowrap transition-colors cursor-pointer text-center ${
                    isActive
                      ? "bg-white text-gray-900"
                      : "bg-[#f5f0ea] text-gray-700 hover:bg-[#ede5dc]"
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#c0262d]" />
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
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4"
        >
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => showToast(`Selected: ${product.name}`)}
              className="w-72 sm:w-80 shrink-0 group cursor-pointer"
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
                <h3 className="text-base font-bold text-gray-900 group-hover:text-[#c0262d] transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <div className="w-8 h-0.5 bg-[#c0262d] mt-1.5 group-hover:w-16 transition-all duration-300" />
                <p className="text-xs text-gray-500 mt-2">
                  {product.dimensions || "1-Year Warranty, Solid Wood"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Red scroll progress bar matching live */}
        <div className="mt-8 max-w-2xl mx-auto h-0.5 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#c0262d] transition-all duration-200"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </section>
  );
}
