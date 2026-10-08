"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LayoutGrid, ShoppingBag, ChevronLeft, ChevronRight, X } from "lucide-react";
import { collectionSets } from "@/data/interioData";
import { Hotspot } from "@/types";
import { useCart } from "@/context/CartContext";

export default function ShopByCollection() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { addToCart, showToast } = useCart();

  const currentCollection = collectionSets[selectedIdx] || collectionSets[0];

  const handleNext = () => {
    setActiveHotspot(null);
    setSelectedIdx((prev) => (prev + 1) % collectionSets.length);
  };

  const handlePrev = () => {
    setActiveHotspot(null);
    setSelectedIdx((prev) => (prev - 1 + collectionSets.length) % collectionSets.length);
  };

  const handleAddToCart = (item: Hotspot) => {
    addToCart({
      id: item.id,
      name: item.name,
      category: "Collection",
      price: item.price,
      mrp: item.mrp,
      discount: `${Math.round(((item.mrp - item.price) / item.mrp) * 100)}% OFF`,
      image: item.image,
      warranty: "1-Year Warranty",
      rating: 4.9,
    });
    showToast(`Added ${item.name} to bag!`);
  };

  return (
    <section id="shop-by-collection" className="py-14 sm:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        {/* Title */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1c1c1c] tracking-tight">
            Shop by collection
          </h2>
        </div>

        {/* Lookbook Main Slider Frame */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-none sm:rounded-md overflow-hidden bg-stone-100 shadow-xs group">
          <img
            src={currentCollection.roomImage}
            alt={currentCollection.name}
            className="w-full h-full object-cover transition-all duration-700"
          />

          {/* Navigation Arrows on Hover */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-900 shadow-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-30 cursor-pointer"
            aria-label="Previous collection"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-gray-900 shadow-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-30 cursor-pointer"
            aria-label="Next collection"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Hotspots */}
          {currentCollection.hotspots.map((spot) => (
            <div
              key={spot.id}
              style={{ top: `${spot.x}%`, left: `${spot.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                type="button"
                onClick={() => setActiveHotspot(activeHotspot?.id === spot.id ? null : spot)}
                className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 shadow-lg border-2 border-white flex items-center justify-center cursor-pointer group/dot hover:scale-115 transition-transform"
                aria-label={`View ${spot.name}`}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#1c1c1c] group-hover/dot:bg-[#c0262d] transition-colors" />
                <span className="absolute inset-0 rounded-full border border-white animate-ping opacity-75 pointer-events-none" />
              </button>

              {/* Hotspot Hover Popover */}
              {activeHotspot?.id === spot.id && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-56 sm:w-64 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 z-30 animate-in fade-in duration-200 text-left">
                  <div className="relative w-full h-28 rounded-lg overflow-hidden bg-stone-50 mb-2">
                    <img
                      src={spot.image}
                      alt={spot.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 line-clamp-2">
                    {spot.name}
                  </h4>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900">
                      ₹{spot.price.toLocaleString("en-IN")}
                    </span>
                    <button
                      onClick={() => handleAddToCart(spot)}
                      className="p-1.5 bg-[#c0262d] text-white rounded-md hover:bg-[#a11c22] transition-colors cursor-pointer"
                      title="Add to cart"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* In-Image Bottom Left: Title */}
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-20">
            <h3 className="text-xl sm:text-3xl font-extrabold text-white drop-shadow-md">
              {currentCollection.name}
            </h3>
          </div>

          {/* In-Image Bottom Right: View all products Pill */}
          <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-gray-900 hover:bg-stone-50 font-semibold text-xs sm:text-sm shadow-md transition-transform hover:scale-103 cursor-pointer"
            >
              <span>View all products</span>
              <LayoutGrid className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Clean Red Progress Indicator matching live site */}
        <div className="mt-8 max-w-2xl mx-auto h-0.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#c0262d] transition-all duration-300"
            style={{ width: `${((selectedIdx + 1) / collectionSets.length) * 100}%` }}
          />
        </div>

        {/* Modal / Drawer for "View all products" */}
        {isDrawerOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {currentCollection.name}
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                All furniture pieces included in this coordinated room ensemble
              </p>

              <div className="space-y-4">
                {currentCollection.hotspots.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-gray-200 bg-stone-50/50"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg bg-white"
                      />
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">{item.name}</h4>
                        <span className="text-xs font-bold text-gray-700">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#c0262d] text-white hover:bg-[#a11c22] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Add to Bag
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
