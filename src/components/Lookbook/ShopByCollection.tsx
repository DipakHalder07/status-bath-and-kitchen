"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { LayoutGrid, ShoppingBag, ChevronLeft, ChevronRight, X } from "lucide-react";
import { collectionSets } from "@/data/interioData";
import { Hotspot, CollectionSet } from "@/types";
import { useCart } from "@/context/CartContext";

export default function ShopByCollection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<{ spot: Hotspot; colIdx: number } | null>(null);
  const [activeDrawerCol, setActiveDrawerCol] = useState<CollectionSet | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const { addToCart, showToast, openConsultation } = useCart();

  // Handle scroll progress
  const updateScrollProgress = useCallback(() => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress((scrollLeft / maxScroll) * 100);
      } else {
        setScrollProgress(0);
      }
    }
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Ensure initial scroll position starts cleanly at 0 (respecting left padding)
    slider.scrollLeft = 0;
    updateScrollProgress();

    slider.addEventListener("scroll", updateScrollProgress, { passive: true });

    return () => {
      slider.removeEventListener("scroll", updateScrollProgress);
    };
  }, [updateScrollProgress]);

  // Navigate by slide
  const scrollBySlide = (direction: "prev" | "next") => {
    setActiveHotspot(null);
    if (!sliderRef.current) return;
    const { clientWidth } = sliderRef.current;
    const amount = clientWidth * 0.85;
    sliderRef.current.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  // Scrollbar track click to seek
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const { scrollWidth, clientWidth } = sliderRef.current;
    const targetScroll = (scrollWidth - clientWidth) * clickRatio;
    sliderRef.current.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  // Mouse drag support for smooth swiping on desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeftState(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Items without a listed price are quoted on enquiry
  const handleItemAction = (item: Hotspot) => {
    if (item.price > 0) {
      addToCart({
        id: item.id,
        name: item.name,
        category: "Collection",
        price: item.price,
        mrp: item.mrp,
        discount:
          item.mrp > item.price
            ? `${Math.round(((item.mrp - item.price) / item.mrp) * 100)}% OFF`
            : "",
        image: item.image,
      });
      showToast(`Added ${item.name} to showroom shortlist!`);
    } else {
      setActiveDrawerCol(null);
      openConsultation(item.name);
    }
  };

  return (
    <section id="shop-by-collection" className="py-14 sm:py-20 bg-white scroll-mt-28">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        {/* Title Header with Arrows */}
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-[28px] font-medium text-[#332f2c] tracking-tight">
              Shop by collection
            </h2>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#76716d] font-normal">
              Curated modular spaces crafted with premium fittings, appliances and tailored joinery.
            </p>
          </div>

          {/* Desktop Top Arrow Controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollBySlide("prev")}
              className="w-10 h-10 rounded-full border border-[#dcd7d0] hover:border-[#332f2c] hover:bg-[#f5f0ea] text-[#332f2c] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBySlide("next")}
              className="w-10 h-10 rounded-full border border-[#dcd7d0] hover:border-[#332f2c] hover:bg-[#f5f0ea] text-[#332f2c] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Continuous Horizontal Swiper Slider (Matches interio.com lookbook-main-slider) */}
        <div className="relative group/slider">
          {/* Floating Left Arrow on Slider Image (matches user Image 1) */}
          <button
            type="button"
            onClick={() => scrollBySlide("prev")}
            className="hidden sm:flex absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-[#332f2c] shadow-xl items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer border border-black/5"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-[#332f2c]" />
          </button>

          {/* Floating Right Arrow on Slider Image (matches user Image 1) */}
          <button
            type="button"
            onClick={() => scrollBySlide("next")}
            className="hidden sm:flex absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-[#332f2c] shadow-xl items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer border border-black/5"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-[#332f2c]" />
          </button>

          <div
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className={`flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth -mx-5 px-5 sm:mx-0 sm:px-0 scroll-pl-5 sm:scroll-pl-0 scroll-pr-5 sm:scroll-pr-0 select-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{
              scrollSnapType: "x mandatory",
              scrollPaddingLeft: "1.25rem",
              scrollPaddingRight: "1.25rem",
            }}
          >
            {collectionSets.map((collection, colIdx) => (
              <div
                key={collection.id || colIdx}
                className="relative shrink-0 w-[88vw] sm:w-[86vw] lg:w-[calc(100%-100px)] aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] rounded-md overflow-hidden bg-stone-100 shadow-xs"
                style={{ scrollSnapAlign: "start" }}
              >
                {/* Background Room Image */}
                <img
                  src={collection.roomImage}
                  alt={collection.name}
                  className="w-full h-full object-cover pointer-events-none transition-transform duration-700"
                  loading={colIdx === 0 ? "eager" : "lazy"}
                  draggable={false}
                />

                {/* Subtle dark gradient overlay at bottom for title contrast */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/65 via-black/25 to-transparent pointer-events-none" />

                {/* Hotspots */}
                {collection.hotspots.map((spot) => {
                  const isSpotActive =
                    activeHotspot?.colIdx === colIdx && activeHotspot?.spot.id === spot.id;

                  return (
                    <div
                      key={spot.id}
                      style={{ top: `${spot.x}%`, left: `${spot.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveHotspot(isSpotActive ? null : { spot, colIdx });
                        }}
                        className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 shadow-lg border-2 border-white flex items-center justify-center cursor-pointer group/dot hover:scale-115 transition-transform"
                        aria-label={`View ${spot.name}`}
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-[#4a4541] group-hover/dot:bg-[#ff5d55] transition-colors" />
                        <span className="absolute inset-0 rounded-full border border-white animate-ping opacity-75 pointer-events-none" />
                      </button>

                      {/* Hotspot Hover / Click Popover */}
                      {isSpotActive && (
                        <div
                          className={`absolute left-1/2 -translate-x-1/2 ${
                            spot.x < 50 ? "top-full mt-3" : "bottom-full mb-3"
                          } w-60 sm:w-68 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 z-30 animate-in fade-in zoom-in-95 duration-200 text-left`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="relative w-full h-28 rounded-lg overflow-hidden bg-stone-50 mb-2">
                            <img
                              src={spot.image}
                              alt={spot.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h4 className="text-xs font-medium text-[#4a4541] line-clamp-2">
                            {spot.name}
                          </h4>
                          <div className="mt-1.5 flex items-center justify-between">
                            <span className="text-sm font-semibold text-[#4a4541]">
                              {spot.price > 0
                                ? `₹${spot.price.toLocaleString("en-IN")}`
                                : "Price on request"}
                            </span>
                            {spot.price > 0 ? (
                              <button
                                onClick={() => handleItemAction(spot)}
                                className="p-1.5 bg-[#ff5d55] text-white rounded-md hover:bg-[#e5473f] transition-colors cursor-pointer"
                                title="Add to showroom shortlist"
                              >
                                <ShoppingBag className="w-3.5 h-3.5" />
                              </button>
                            ) : (
                              <button
                                onClick={() => handleItemAction(spot)}
                                className="px-2.5 py-1 bg-[#ff5d55] text-white rounded-md hover:bg-[#e5473f] text-[11px] font-medium transition-colors cursor-pointer"
                              >
                                Enquire
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* In-Image Bottom Bar (Matching live interio.com img-btm-info) */}
                <div className="absolute bottom-3 sm:bottom-6 inset-x-3 sm:inset-x-8 z-10 flex items-center justify-between gap-2 pointer-events-auto">
                  {/* Left: Collection Title */}
                  <h3 className="text-sm sm:text-2xl lg:text-3xl font-medium !text-white drop-shadow-md truncate">
                    {collection.name}
                  </h3>

                  {/* Right: View all items Pill */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDrawerCol(collection);
                    }}
                    className="shrink-0 flex items-center gap-1.5 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-white text-[#4a4541] hover:bg-stone-50 font-medium text-xs sm:text-sm shadow-md transition-transform hover:scale-103 cursor-pointer"
                  >
                    <span>View all items</span>
                    <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#76716d]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Interio Authentic Swiper Scrollbar */}
        <div className="mt-8 max-w-xl mx-auto">
          <div
            className="relative w-full h-1 bg-[#e5e5e5] rounded-full overflow-hidden cursor-pointer"
            onClick={handleTrackClick}
            title="Click or drag to seek"
          >
            {/* Draggable Active Handle */}
            <div
              className="h-full bg-[#ff5d55] rounded-full transition-all duration-150 ease-out"
              style={{
                width: `${100 / collectionSets.length}%`,
                transform: `translateX(${(scrollProgress * (collectionSets.length - 1))}%)`,
              }}
            />
          </div>
        </div>

        {/* Modal / Drawer for "View all products" */}
        {activeDrawerCol && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
            onClick={() => setActiveDrawerCol(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveDrawerCol(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-medium text-[#4a4541] mb-1">
                {activeDrawerCol.name}
              </h3>
              <p className="text-xs text-[#76716d] mb-6">
                Everything featured in this look. Enquire about any item and we will help you plan it for your home.
              </p>

              <div className="space-y-4">
                {activeDrawerCol.hotspots.map((item) => (
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
                        <h4 className="text-sm font-medium text-[#4a4541]">{item.name}</h4>
                        <span className="text-xs font-semibold text-[#4a4541]">
                          {item.price > 0
                            ? `₹${item.price.toLocaleString("en-IN")}`
                            : "Price on request"}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleItemAction(item)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#ff5d55] text-white hover:bg-[#e5473f] text-xs font-medium transition-colors cursor-pointer"
                    >
                      {item.price > 0 ? "Add to Bag" : "Enquire"}
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
