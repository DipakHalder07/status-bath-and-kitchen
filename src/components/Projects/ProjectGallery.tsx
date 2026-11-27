"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projectImages = [
  {
    id: "curtain-wall",
    image: "/images/projects/project-05-curtain-wall.webp",
    alt: "Double-height glass facade and sliding balcony doors installed in Siliguri",
  },
  {
    id: "villa-railings",
    image: "/images/projects/project-01-residence-railings.webp",
    alt: "Contemporary residence fitted with windows and glass balcony railings in Siliguri",
  },
  {
    id: "pleated-screen",
    image: "/images/projects/project-03-pleated-screen.webp",
    alt: "Pleated collapsible balcony insect screen installed in Siliguri",
  },
  {
    id: "terrace-glazing",
    image: "/images/projects/project-02-terrace-glazing.webp",
    alt: "Terrace glass pavilion enclosure and frameless glass balcony railing installation",
  },
  {
    id: "heritage-windows",
    image: "/images/projects/project-04-heritage-windows.webp",
    alt: "Custom arched and casement window elevation installed in North Bengal",
  },
  {
    id: "estate-elevation",
    image: "/images/projects/project-06-estate-elevation.webp",
    alt: "Full residential exterior window installation across multiple floors in North Bengal",
  },
];

export default function ProjectGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(20);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const totalScroll = scrollWidth - clientWidth;
    if (totalScroll > 0) {
      setScrollProgress(20 + (scrollLeft / totalScroll) * 80);
    }
  };

  const scrollByAmount = (dir: "prev" | "next") => {
    if (!scrollRef.current) return;
    const step = Math.max(280, Math.round(scrollRef.current.clientWidth * 0.7));
    scrollRef.current.scrollBy({
      left: dir === "next" ? step : -step,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="project-gallery"
      className="status-section py-12 sm:py-16 lg:py-[76px] bg-white scroll-mt-24"
    >
      <div className="status-container max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        {/* Clean Minimal Header + Slider Controls */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-[28px] font-medium text-[#332f2c] tracking-tight">
            Recent installations in Siliguri &amp; North Bengal
          </h2>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollByAmount("prev")}
              aria-label="Previous installation photos"
              className="w-9 h-9 rounded-full border border-[#dcd7d0] bg-white text-[#4a4541] hover:border-[#4a4541] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount("next")}
              aria-label="Next installation photos"
              className="w-9 h-9 rounded-full border border-[#dcd7d0] bg-white text-[#4a4541] hover:border-[#4a4541] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Image Slider */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-2"
        >
          {projectImages.map((item) => (
            <div
              key={item.id}
              className="relative shrink-0 w-[72vw] sm:w-[280px] lg:w-[330px] aspect-[4/5] rounded-md overflow-hidden bg-stone-200 snap-start"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 72vw, 330px"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Subtle Progress Track */}
        <div className="mt-5 w-full max-w-[320px] h-0.5 bg-[#dcd7d0] rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-[#ff5d55] transition-all duration-150 rounded-full"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </section>
  );
}
