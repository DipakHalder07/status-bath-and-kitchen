"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { howCanWeHelpTabs } from "@/data/statusData";
import { useCart } from "@/context/CartContext";

interface CategoryGridProps {
  onSelectCategory?: (categoryName: string) => void;
  // Set from the header menu / search; `key` changes on every request so repeat clicks still apply
  selection?: { name: string; key: number } | null;
}

const displayTabs = howCanWeHelpTabs;

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

  const scrollByCards = (dir: "prev" | "next") => {
    if (!scrollRef.current) return;
    const step = Math.max(280, Math.round(scrollRef.current.clientWidth * 0.7));
    scrollRef.current.scrollBy({
      left: dir === "next" ? step : -step,
      behavior: "smooth",
    });
  };

  return (
    <section id="categories" className="status-section py-14 sm:py-20 bg-[#f5f0ea] scroll-mt-24 sm:scroll-mt-32">
      <div className="status-container max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        {/* Section Heading + Subtle Carousel Arrows */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-[28px] font-medium text-[#332f2c] tracking-tight">
            How can we help you?
          </h2>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollByCards("prev")}
              aria-label="Previous category items"
              className="w-9 h-9 rounded-full border border-[#dcd7d0] bg-white text-[#4a4541] hover:border-[#4a4541] hover:text-[#332f2c] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards("next")}
              aria-label="Next category items"
              className="w-9 h-9 rounded-full border border-[#dcd7d0] bg-white text-[#4a4541] hover:border-[#4a4541] hover:text-[#332f2c] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Segmented Horizontal 7 Tabs (Full-width on desktop, smoothly scrollable on mobile/tablet) */}
        <div className="mb-8 w-full overflow-x-auto no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0">
          <div className="inline-flex lg:grid lg:grid-cols-7 border border-[#dcd7d0] divide-x divide-[#dcd7d0] bg-white min-w-max lg:min-w-0 w-auto lg:w-full">
            {displayTabs.map((tab, idx) => {
              const isActive = activeTabIdx === idx;

              return (
                <button
                  key={tab.tabName}
                  onClick={() => {
                    setActiveTabIdx(idx);
                    setScrollProgress(20);
                  }}
                  className={`relative flex items-center justify-center py-3 px-4 lg:px-2 text-center text-xs sm:text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap lg:whitespace-normal leading-snug ${
                    isActive
                      ? "bg-white text-[#332f2c]"
                      : "bg-[#f5f0ea] text-[#6b6560] hover:bg-[#ede5dc] hover:text-[#332f2c]"
                  }`}
                >
                  <span className="block">{tab.tabName}</span>
                  {/* Red bottom active underline indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-3 right-3 sm:left-4 sm:right-4 h-[2px] bg-[#ff5d55]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Cards Horizontal Slider (Clean unboxed editorial layout) */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 -mx-5 px-5 sm:mx-0 sm:px-0"
        >
          {currentTab.items.map((item, i) => (
            <button
              key={`${currentTab.tabName}-${i}`}
              type="button"
              onClick={() => openConsultation(`${currentTab.tabName} — ${item.name}`)}
              className="shrink-0 w-64 sm:w-72 group cursor-pointer block text-left"
            >
              {/* Rounded rectangular photo */}
              <span className="relative block w-full aspect-[16/10] rounded-md overflow-hidden bg-white shadow-2xs group-hover:shadow-md transition-all duration-300">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </span>

              {/* Minimalist title, red accent line, optional subtitle & studio CTA */}
              <span className="block mt-3.5">
                <span className="block text-base font-medium text-[#4a4541] group-hover:text-[#ff5d55] transition-colors">
                  {item.name}
                </span>
                <span className="block w-6 h-0.5 bg-[#ff5d55] mt-1 group-hover:w-12 transition-all duration-300" />
                {item.subtitle && (
                  <span className="block text-xs text-[#76716d] mt-2 line-clamp-2 leading-relaxed">
                    {item.subtitle}
                  </span>
                )}
                <span className="mt-2 inline-flex items-center gap-1 text-xs text-[#76716d] group-hover:text-[#ff5d55] transition-colors">
                  <span>Discuss in studio</span>
                  <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Red scroll progress bar at bottom */}
        <div className="mt-6 max-w-2xl mx-auto h-1 bg-[#e5dfd7] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#ff5d55] rounded-full transition-all duration-200"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </section>
  );
}
