"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { howCanWeHelpTabs } from "@/data/interioData";
import { useCart } from "@/context/CartContext";

interface CategoryGridProps {
  onSelectCategory?: (categoryName: string) => void;
}

export default function CategoryGrid({ onSelectCategory }: CategoryGridProps) {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(20);
  const { showToast } = useCart();

  const displayTabs = howCanWeHelpTabs.slice(0, 6);
  const currentTab = displayTabs[activeTabIdx] || displayTabs[0];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const totalScroll = scrollWidth - clientWidth;
      if (totalScroll > 0) {
        const progress = 20 + (scrollLeft / totalScroll) * 80;
        setScrollProgress(progress);
      }
    }
  };

  const handleCardClick = (item: { name: string; link: string }) => {
    showToast(`Viewing collection: ${item.name}`);
    if (onSelectCategory) {
      onSelectCategory(item.name);
    }
    const elem = document.querySelector("#curated-products");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="categories" className="py-14 sm:py-20 bg-[#f5f0ea]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        {/* Section Heading */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1c1c1c] tracking-tight">
            How can we help you?
          </h2>
        </div>

        {/* Segmented Horizontal 6 Tabs (Full-width 6 columns matching live site) */}
        <div className="mb-10 w-full overflow-hidden border border-gray-300 rounded-none bg-white">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y sm:divide-y-0 divide-gray-300">
            {displayTabs.map((tab: { tabName: string }, idx: number) => {
              const isActive = activeTabIdx === idx;

              return (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveTabIdx(idx);
                    setScrollProgress(20);
                    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
                  }}
                  className={`relative py-3.5 px-2 text-center text-sm font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? "bg-white text-gray-900 font-bold"
                      : "bg-[#f5f0ea] text-gray-700 hover:bg-[#ede5dc]"
                  }`}
                >
                  <span className="block truncate">{tab.tabName}</span>
                  {/* Red bottom active underline indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-[#c0262d]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Cards Horizontal Slider */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4"
        >
          {currentTab.items.map(
            (item: { name: string; image: string; link: string }, i: number) => (
              <div
                key={i}
                onClick={() => handleCardClick(item)}
                className="shrink-0 w-64 sm:w-72 group cursor-pointer"
              >
                {/* Rounded rectangular photo */}
                <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden bg-white shadow-2xs group-hover:shadow-md transition-all duration-300">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Title with subtle red underline */}
                <div className="mt-3.5">
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-[#c0262d] transition-colors">
                    {item.name}
                  </h3>
                  <div className="w-6 h-0.5 bg-[#c0262d] mt-1 group-hover:w-12 transition-all duration-300" />
                </div>
              </div>
            )
          )}
        </div>

        {/* Red scroll progress bar at bottom matching live */}
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
