"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { howCanWeHelpTabs } from "@/data/interioData";
import { useCart } from "@/context/CartContext";

interface CategoryGridProps {
  onSelectCategory?: (categoryName: string) => void;
  // Set from the header menu / search; `key` changes on every request so repeat clicks still apply
  selection?: { name: string; key: number } | null;
}

const displayTabs = howCanWeHelpTabs.slice(0, 6);

function findTabIndex(name: string) {
  const query = name.trim().toLowerCase();
  return displayTabs.findIndex(
    (tab) =>
      tab.tabName.toLowerCase() === query ||
      tab.aliases?.some((alias) => alias.toLowerCase() === query) ||
      tab.items.some((item) => item.name.toLowerCase() === query)
  );
}

export default function CategoryGrid({ selection }: CategoryGridProps) {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [appliedSelectionKey, setAppliedSelectionKey] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(20);
  const { openConsultation } = useCart();

  // Switch to the tab requested from the header menu / search
  if (selection && selection.key !== appliedSelectionKey) {
    setAppliedSelectionKey(selection.key);
    const idx = findTabIndex(selection.name);
    if (idx >= 0) {
      setActiveTabIdx(idx);
      setScrollProgress(20);
    }
  }

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  }, [activeTabIdx]);

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

  const handleCardClick = (item: { name: string }) => {
    openConsultation(item.name);
  };

  return (
    <section id="categories" className="py-14 sm:py-20 bg-[#f5f0ea]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        {/* Section Heading */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-medium text-[#4a4541] tracking-tight">
            How can we help you?
          </h2>
        </div>

        {/* Segmented Horizontal 6 Tabs (Full-width on desktop, smoothly scrollable on mobile) */}
        <div className="mb-10 w-full overflow-x-auto no-scrollbar border border-[#dcd7d0] rounded-none bg-white -mx-5 px-5 sm:mx-0 sm:px-0">
          <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 divide-x divide-[#dcd7d0] min-w-max sm:min-w-0">
            {displayTabs.map((tab: { tabName: string }, idx: number) => {
              const isActive = activeTabIdx === idx;

              return (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveTabIdx(idx);
                    setScrollProgress(20);
                  }}
                  className={`relative py-3.5 px-5 sm:px-2 text-center text-sm font-medium transition-colors cursor-pointer whitespace-nowrap sm:whitespace-normal ${
                    isActive
                      ? "bg-white text-[#4a4541] font-semibold"
                      : "bg-[#f5f0ea] text-[#76716d] hover:bg-[#ede5dc] hover:text-[#4a4541]"
                  }`}
                >
                  <span className="block truncate">{tab.tabName}</span>
                  {/* Red bottom active underline indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-4 right-4 sm:left-6 sm:right-6 h-0.5 bg-[#ff5d55]" />
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
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 -mx-5 px-5 sm:mx-0 sm:px-0"
        >
          {currentTab.items.map(
            (item: { name: string; image: string; link: string }, i: number) => (
              <Link
                key={i}
                href={`/products?category=${encodeURIComponent(item.name)}`}
                className="shrink-0 w-64 sm:w-72 group cursor-pointer block"
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
                  <h3 className="text-base font-medium text-[#4a4541] group-hover:text-[#ff5d55] transition-colors">
                    {item.name}
                  </h3>
                  <div className="w-6 h-0.5 bg-[#ff5d55] mt-1 group-hover:w-12 transition-all duration-300" />
                  <p className="text-xs text-[#76716d] mt-2">Explore range &rarr;</p>
                </div>
              </Link>
            )
          )}
        </div>

        {/* Red scroll progress bar at bottom matching live */}
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
