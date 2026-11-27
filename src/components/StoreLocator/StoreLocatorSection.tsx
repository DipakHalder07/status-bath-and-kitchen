"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { siteBrand } from "@/data/statusData";

export default function StoreLocatorSection() {
  const mapsUrl =
    siteBrand.googleMapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${siteBrand.name}, ${siteBrand.address}`
    )}`;

  return (
    <section id="store-locator" className="status-section status-store-locator w-full bg-[#f5f0ea] py-16 sm:py-20 lg:py-24">
      <div className="status-container max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        {/* Aspect ratio only on xl: below that, min-h + aspect-ratio widens the box past the screen */}
        <div className="relative rounded-md sm:rounded-lg overflow-hidden shadow-sm min-h-[440px] xl:aspect-[21/9] flex items-center justify-end p-6 sm:p-12 lg:p-16">
          {/* Background Image */}
          <picture className="absolute inset-0 w-full h-full">
            <source media="(max-width: 640px)" srcSet="/images/site/studio-mobile.jpg" />
            <source media="(min-width: 641px)" srcSet="/images/site/studio.jpg" />
            <img
              src="/images/site/studio.jpg"
              alt="Open-plan living room and kitchen with large glass doors"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </picture>

          {/* Overlaid Frosted Card on Right */}
          <div className="status-glass-dark status-card relative z-10 w-full max-w-md rounded-xl bg-black/45 backdrop-blur-md border border-white/15 p-6 sm:p-10 text-white shadow-2xl">
            <h2 className="text-xl sm:text-2xl lg:text-[28px] font-medium !text-white tracking-tight">
              Visit our Experience Studio
            </h2>
            <p className="text-xs sm:text-sm text-white/90 mt-3 sm:mt-4 leading-relaxed font-normal">
              See our modular kitchens, wardrobes, and aluminium and uPVC windows in person. You can touch the finishes, try the fittings and plan your home with our design team.
            </p>

            <div className="mt-6 sm:mt-8">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="status-btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#ff5247] hover:bg-[#e0453b] text-white font-bold text-xs sm:text-sm shadow-lg transition-all duration-200 cursor-pointer"
              >
                <span>Visit our store</span>
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
