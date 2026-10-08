"use client";

import React, { useState } from "react";
import Image from "next/image";
import { megaMenuItems } from "@/data/interioData";
import { ChevronRight, Sparkles, Tag, ArrowRight } from "lucide-react";

interface MegaMenuProps {
  onCategorySelect?: (categoryName: string) => void;
}

export default function MegaMenu({ onCategorySelect }: MegaMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const currentCategoryData = megaMenuItems.find(
    (item) => item.id === activeCategory
  );

  return (
    <div
      className="hidden lg:block w-full bg-white border-b border-gray-200 relative z-30"
      onMouseLeave={() => setActiveCategory(null)}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <ul className="flex items-center gap-1 xl:gap-3 text-sm font-medium text-gray-800">
            {megaMenuItems.map((cat) => {
              const isActive = activeCategory === cat.id;
              const isHighlight =
                cat.id === "offers" || cat.id === "kitchens";

              return (
                <li key={cat.id} className="relative">
                  <button
                    onMouseEnter={() => setActiveCategory(cat.id)}
                    onClick={() => {
                      if (onCategorySelect) onCategorySelect(cat.title);
                    }}
                    className={`flex items-center gap-1.5 py-3 px-3 transition-colors duration-150 rounded-t-md text-[13px] font-semibold tracking-normal ${
                      isActive
                        ? "text-[#c0262d] border-b-2 border-[#c0262d] bg-gray-50/70"
                        : "hover:text-[#c0262d] text-gray-700"
                    }`}
                  >
                    {cat.id === "offers" && (
                      <Tag className="w-3.5 h-3.5 text-amber-500" />
                    )}
                    {cat.id === "nook" && (
                      <Sparkles className="w-3.5 h-3.5 text-[#c0262d]" />
                    )}
                    <span>{cat.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Quick Consultation Trigger on Right */}
          <div className="flex items-center gap-3 text-xs">
            <a
              href="#modular-kitchen"
              className="flex items-center gap-1 text-[#c0262d] font-semibold hover:underline"
            >
              <span>Design Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </nav>
      </div>

      {/* Flyout Mega Dropdown Panel */}
      {activeCategory && currentCategoryData && currentCategoryData.subsections.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-2xl py-6 px-4 z-50 animate-in fade-in slide-in-from-top-1 duration-200"
          onMouseEnter={() => setActiveCategory(activeCategory)}
          onMouseLeave={() => setActiveCategory(null)}
        >
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-4 gap-8">
              {currentCategoryData.subsections.map((sub, idx) => (
                <div key={idx} className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-900 tracking-wider uppercase border-b border-gray-100 pb-2">
                    {sub.name}
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {sub.items.map((item, itemIdx) => (
                      <a
                        key={itemIdx}
                        href={`#${encodeURIComponent(item.name)}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveCategory(null);
                          if (onCategorySelect) onCategorySelect(item.name);
                        }}
                        className="group flex items-center gap-3 p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="48px"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-800 group-hover:text-[#c0262d] transition-colors truncate">
                            {item.name}
                          </p>
                          <span className="text-[11px] text-gray-400 group-hover:text-gray-600 flex items-center gap-0.5">
                            Explore <ChevronRight className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}

              {/* Promo Banner inside Dropdown */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl p-5 border border-amber-100/60 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2.5 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full mb-2">
                    Godrej Assured
                  </span>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">
                    Free Expert Delivery & Assembly
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    Trained technicians deliver and install right inside your home.
                  </p>
                </div>
                <a
                  href="#care-services"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c0262d] hover:underline"
                >
                  Explore Services & Warranty &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
