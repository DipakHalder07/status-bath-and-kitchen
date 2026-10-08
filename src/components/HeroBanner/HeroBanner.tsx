"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface HeroBannerProps {
  onCtaClick?: (slideId: string) => void;
}

const slides = [
  {
    id: "kitchens",
    desktopImg: "/images/hero-kitchen.jpg",
    mobileImg: "/images/hero-kitchen.jpg",
    alt: "Modular Kitchen",
    ctaText: "Explore Modular Kitchens",
    link: "#curated-products",
  },
];

export default function HeroBanner({ onCtaClick }: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[1080px] bg-stone-900 overflow-hidden">
      {/* Background Hero Picture */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, idx) => (
          <div
            key={slide.id + idx}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <picture className="w-full h-full block">
              <source media="(max-width: 768px)" srcSet={slide.mobileImg} />
              <source media="(min-width: 769px)" srcSet={slide.desktopImg} />
              <img
                src={slide.desktopImg}
                alt={slide.alt}
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover object-center"
              />
            </picture>
          </div>
        ))}
      </div>

      {/* Hero CTA button (bottom-left) */}
      <div className="absolute bottom-10 sm:bottom-16 md:bottom-20 left-5 sm:left-10 lg:left-20 z-20">
        <button
          type="button"
          onClick={() => {
            if (onCtaClick) onCtaClick(slides[currentSlide].id);
            const el = document.querySelector("#curated-products");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-7 sm:px-10 py-3 sm:py-3.5 bg-[#ff5247] hover:bg-[#e0453b] text-white font-bold text-xs sm:text-sm md:text-base rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          {slides[currentSlide].ctaText}
        </button>
      </div>

      {slides.length > 1 && (
      <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        <button
          type="button"
          onClick={nextSlide}
          className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-black/20 hover:bg-black/50 text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={prevSlide}
          className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-black/20 hover:bg-black/50 text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
      )}

      {/* Slide Indicators at bottom center (1 red dash + 3 white dots) */}
      {slides.length > 1 && <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`transition-all duration-300 rounded-full ${
              i === currentSlide
                ? "w-8 h-1.5 bg-[#ff5247]"
                : "w-2 h-2 bg-white/70 hover:bg-white"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>}
    </section>
  );
}
