"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronDown, ChevronRight, Phone, MapPin, Building2, Home } from "lucide-react";
import { megaMenuItems, siteBrand } from "@/data/interioData";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (name: string) => void;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  onSelectCategory,
}: MobileDrawerProps) {
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-left duration-250">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="relative w-28 h-8">
            <Image
              src={siteBrand.colorLogo}
              alt={siteBrand.name}
              fill
              className="object-contain object-left"
            />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
            Categories
          </div>
          {megaMenuItems.map((cat) => {
            const isExpanded = expandedCat === cat.id;

            return (
              <div key={cat.id} className="border-b border-gray-50 pb-1">
                <button
                  onClick={() =>
                    setExpandedCat(isExpanded ? null : cat.id)
                  }
                  className="w-full flex items-center justify-between py-2.5 px-2 text-sm font-semibold text-gray-800 hover:text-[#c0262d] rounded-lg transition-colors"
                >
                  <span>{cat.title}</span>
                  {cat.subsections.length > 0 ? (
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </button>

                {/* Subsections */}
                {isExpanded && cat.subsections.length > 0 && (
                  <div className="pl-3 pr-1 py-2 space-y-3 bg-gray-50/70 rounded-xl mt-1">
                    {cat.subsections.map((sub, sIdx) => (
                      <div key={sIdx}>
                        <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                          {sub.name}
                        </div>
                        <div className="space-y-1">
                          {sub.items.map((it, itIdx) => (
                            <button
                              key={itIdx}
                              onClick={() => {
                                onSelectCategory(it.name);
                                onClose();
                              }}
                              className="w-full text-left text-xs text-gray-700 hover:text-[#c0262d] py-1.5 px-2 rounded-md hover:bg-white transition-colors flex items-center justify-between"
                            >
                              <span>{it.name}</span>
                              <ChevronRight className="w-3 h-3 text-gray-400" />
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Support Info */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 text-xs text-gray-600 space-y-2">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#c0262d]" />
            <span>1800-267-1122 (Toll Free)</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#c0262d]" />
            <a href="#store-locator" onClick={onClose} className="hover:underline">
              Find Stores Across India
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
