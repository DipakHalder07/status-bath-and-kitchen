"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Phone } from "lucide-react";
import { siteBrand } from "@/data/statusData";

const slides = [
  {
    id: "kitchens",
    desktopImg: "/images/hero-kitchen-couple.webp",
    mobileImg: "/images/hero-kitchen-couple-mobile.webp",
    alt: "Couple in a custom olive-green modular kitchen by Status Bath and Kitchen",
    eyebrow: "Status Bath & Kitchen · Siliguri",
    headline: "Kitchens designed around the way you cook.",
    subtext: "Custom modular kitchens, wardrobes & fitted spaces crafted by one in-house team.",
    objectPosition: "object-center",
  },
  {
    id: "windows",
    desktopImg: "/images/hero-windows-family.webp",
    mobileImg: "/images/hero-windows-family-mobile.webp",
    alt: "Family relaxing by sleek black sliding windows from Status Bath and Kitchen",
    eyebrow: "WAW Aluminium & Ambiiance uPVC",
    headline: "Built for brighter, quieter homes.",
    subtext: "Weatherproof sliding windows, glass railings & insect screens fitted across North Bengal.",
    objectPosition: "object-[26%_center] md:object-center",
  },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const activeSlide = slides[currentSlide];

  return (
    <section className="relative w-full h-[75svh] sm:h-screen min-h-[520px] max-h-[1080px] bg-stone-900 overflow-hidden">
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
              <source media="(max-width: 768px)" type="image/webp" srcSet={slide.mobileImg} />
              <source media="(min-width: 769px)" type="image/webp" srcSet={slide.desktopImg} />
              <img
                src={slide.desktopImg}
                alt={slide.alt}
                fetchPriority={idx === 0 ? "high" : "auto"}
                decoding="async"
                className={`w-full h-full object-cover ${slide.objectPosition}`}
              />
            </picture>
          </div>
        ))}
      </div>

      {/* Bottom Scrim for Legible Text & CTA Contrast */}
      <div className="absolute inset-x-0 bottom-0 h-72 sm:h-80 bg-gradient-to-t from-black/75 via-black/35 to-transparent z-15 pointer-events-none" />

      {/* Bottom Bar: Editorial Text (Left) + Primary CTA (Right) */}
      <div className="absolute inset-x-0 bottom-12 sm:bottom-14 md:bottom-16 z-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div className="max-w-md lg:max-w-lg space-y-1.5 text-white">
            <span className="text-[11px] sm:text-xs font-medium uppercase tracking-wider !text-white/85 block">
              {activeSlide.eyebrow}
            </span>
            <h1 className="text-xl sm:text-3xl lg:text-[36px] font-medium !text-white leading-tight tracking-tight drop-shadow-sm">
              {activeSlide.headline}
            </h1>
            <p className="text-xs sm:text-sm !text-white/90 leading-relaxed font-normal max-w-md">
              {activeSlide.subtext}
            </p>
          </div>

          <a
            href={siteBrand.phoneHref || "tel:+919832095793"}
            className="self-start md:self-auto inline-flex items-center gap-2.5 px-7 sm:px-10 py-3 sm:py-3.5 bg-[#ff5247] hover:bg-[#e0453b] text-white font-medium text-xs sm:text-sm rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 shrink-0"
          >
            <Phone className="w-4 h-4" />
            <span>Call {siteBrand.phone}</span>
          </a>
        </div>
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
