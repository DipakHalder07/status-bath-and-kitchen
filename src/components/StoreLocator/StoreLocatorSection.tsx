"use client";

import React, { useState } from "react";
import { Store, X, MapPin, Phone, Clock, Navigation } from "lucide-react";
import { siteBrand } from "@/data/interioData";

export default function StoreLocatorSection() {
  const [showModal, setShowModal] = useState(false);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${siteBrand.name}, ${siteBrand.address}`
  )}`;

  return (
    <section id="store-locator" className="w-full bg-white py-6 sm:py-10">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        {/* Aspect ratio only on xl: below that, min-h + aspect-ratio widens the box past the screen */}
        <div className="relative rounded-none sm:rounded-sm overflow-hidden min-h-[440px] xl:aspect-[21/9] flex items-center justify-end p-6 sm:p-12 lg:p-16">
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
          <div className="relative z-10 w-full max-w-md rounded-xl bg-black/45 backdrop-blur-md border border-white/15 p-6 sm:p-10 text-white shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Visit our experience studio
            </h2>
            <p className="text-xs sm:text-sm text-white/90 mt-3 sm:mt-4 leading-relaxed font-normal">
              See shutters, countertops, fittings and finishes up close, and talk through your plans with our design team. Come visit us soon!
            </p>

            <div className="mt-6 sm:mt-8">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#ff5247] hover:bg-[#e0453b] text-white font-bold text-xs sm:text-sm shadow-lg transition-all duration-200 cursor-pointer"
              >
                <span>Find our studio &gt;</span>
                <Store className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Studio Details Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <Store className="w-5 h-5 text-[#c0262d]" />
              <h3 className="text-lg font-bold text-gray-900">{siteBrand.name} Studio</h3>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#c0262d] mt-0.5 shrink-0" />
                <span>{siteBrand.address}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#c0262d] mt-0.5 shrink-0" />
                <a href={siteBrand.phoneHref || "#contact"} className="hover:underline">
                  {siteBrand.phone}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#c0262d] mt-0.5 shrink-0" />
                <span>{siteBrand.hours}</span>
              </div>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-[#c0262d] hover:bg-[#a11c22] text-white text-xs sm:text-sm font-bold transition-colors"
            >
              <Navigation className="w-4 h-4" />
              <span>Get directions</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
