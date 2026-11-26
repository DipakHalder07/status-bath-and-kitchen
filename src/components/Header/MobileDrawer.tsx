"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronDown, ChevronRight, Phone, MapPin, Package, Info, BookOpen, Wrench } from "lucide-react";
import { megaMenuItems, siteBrand } from "@/data/statusData";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory?: (name: string) => void;
}

export default function MobileDrawer({
  isOpen,
  onClose,
  onSelectCategory = () => {},
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
      <div className="status-drawer fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-left duration-250">
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
            className="p-1.5 text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Main Nav */}
        <div className="p-4 border-b border-gray-100 space-y-2.5">
          <div className="grid grid-cols-4 gap-1.5 text-[11px] font-semibold">
            <Link
              href="/products"
              onClick={onClose}
              className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg bg-stone-50 hover:bg-red-50 hover:text-[#ff5d55] text-gray-800 transition-colors text-center"
            >
              <Package className="w-4 h-4 text-[#ff5d55]" />
              <span>Products</span>
            </Link>
            <Link
              href="/blog"
              onClick={onClose}
              className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg bg-stone-50 hover:bg-red-50 hover:text-[#ff5d55] text-gray-800 transition-colors text-center"
            >
              <BookOpen className="w-4 h-4 text-[#ff5d55]" />
              <span>Ideas</span>
            </Link>
            <Link
              href="/about"
              onClick={onClose}
              className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg bg-stone-50 hover:bg-red-50 hover:text-[#ff5d55] text-gray-800 transition-colors text-center"
            >
              <Info className="w-4 h-4 text-[#ff5d55]" />
              <span>About</span>
            </Link>
            <Link
              href="/contact"
              onClick={onClose}
              className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg bg-stone-50 hover:bg-red-50 hover:text-[#ff5d55] text-gray-800 transition-colors text-center"
            >
              <Phone className="w-4 h-4 text-[#ff5d55]" />
              <span>Contact</span>
            </Link>
          </div>

          <Link
            href="/contact"
            onClick={onClose}
            className="status-btn-primary w-full py-2.5 px-4 bg-[#ff5d55] hover:bg-[#e5473f] text-white rounded-[20px_2px_2px_2px] text-xs font-semibold shadow-xs flex items-center justify-center gap-2 transition-colors"
          >
            <span>Book Free Design Consultation</span>
          </Link>

          <Link
            href="/services"
            onClick={onClose}
            className="w-full py-2 px-3 border border-stone-200 hover:border-[#ff5d55] text-[#4a4541] hover:text-[#ff5d55] rounded-[16px_2px_2px_2px] text-xs font-semibold flex items-center justify-center gap-2 transition-colors bg-white shadow-xs"
          >
            <Wrench className="w-3.5 h-3.5 text-[#ff5d55]" />
            <span>Care, Repairs &amp; Maintenance Services</span>
          </Link>
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
                  className="w-full flex items-center justify-between py-2.5 px-2 text-sm font-semibold text-gray-800 hover:text-[#ff5d55] rounded-lg transition-colors"
                  aria-expanded={isExpanded}
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
                            <Link
                              key={itIdx}
                              href={`/products?category=${encodeURIComponent(it.name)}`}
                              onClick={() => {
                                onSelectCategory(it.name);
                                onClose();
                              }}
                              className="w-full text-left text-xs text-gray-700 hover:text-[#ff5d55] py-1.5 px-2 rounded-md hover:bg-white transition-colors flex items-center justify-between"
                            >
                              <span>{it.name}</span>
                              <ChevronRight className="w-3 h-3 text-gray-400" />
                            </Link>
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
        <div className="p-4 border-t border-gray-100 bg-gray-50 text-xs text-gray-600 space-y-2.5">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#ff5d55]" />
            <Link href="/contact" onClick={onClose} className="font-semibold text-gray-800 hover:text-[#ff5d55]">
              Contact Us: {siteBrand.phone}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#ff5d55]" />
            <Link href="/contact" onClick={onClose} className="hover:underline">
              Experience Studio &amp; Locations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
