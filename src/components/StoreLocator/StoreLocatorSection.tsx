"use client";

import React, { useState } from "react";
import { Store, ArrowRight, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function StoreLocatorSection() {
  const { showToast } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [searchCity, setSearchCity] = useState("");

  const stores = [
    { city: "Mumbai", address: "Vikhroli (East), Eastern Express Highway, Mumbai 400079" },
    { city: "Delhi", address: "Outer Circle, Connaught Place, New Delhi 110001" },
    { city: "Bengaluru", address: "100 Feet Road, Indiranagar, Bengaluru 560038" },
    { city: "Pune", address: "ICC Trade Tower, Senapati Bapat Road, Pune 411016" },
    { city: "Hyderabad", address: "Road No. 36, Jubilee Hills, Hyderabad 500033" },
    { city: "Kolkata", address: "Block DC, Sector 1, Salt Lake, Kolkata 700064" },
  ];

  return (
    <section id="store-locator" className="w-full bg-white py-6 sm:py-10">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        <div className="relative rounded-none sm:rounded-sm overflow-hidden aspect-[16/10] sm:aspect-[21/9] min-h-[440px] flex items-center justify-end p-6 sm:p-12 lg:p-16">
          {/* Background Image */}
          <picture className="absolute inset-0 w-full h-full">
            <source
              media="(max-width: 640px)"
              srcSet="https://interio.com/media/wysiwyg/Untitled_design_18__1.jpg"
            />
            <source
              media="(min-width: 641px)"
              srcSet="https://interio.com/media/wysiwyg/Untitled_design_17__1.jpg"
            />
            <img
              src="https://interio.com/media/wysiwyg/Untitled_design_17__1.jpg"
              alt="Interio Store Experience Centre"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </picture>

          {/* Overlaid Frosted Card on Right */}
          <div className="relative z-10 w-full max-w-md rounded-xl bg-black/45 backdrop-blur-md border border-white/15 p-6 sm:p-10 text-white shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Find a store near you
            </h2>
            <p className="text-xs sm:text-sm text-white/90 mt-3 sm:mt-4 leading-relaxed font-normal">
              Our stores give you the chance to experience our collection up close, as well as interact with our expert team. Come visit us soon!
            </p>

            <div className="mt-6 sm:mt-8">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#ff5247] hover:bg-[#e0453b] text-white font-bold text-xs sm:text-sm shadow-lg transition-all duration-200 cursor-pointer"
              >
                <span>Find a store near you &gt;</span>
                <Store className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* City Locator Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <Store className="w-5 h-5 text-[#c0262d]" />
              <h3 className="text-lg font-bold text-gray-900">Find Your Nearest Store</h3>
            </div>
            <input
              type="text"
              placeholder="Search your city or PIN code..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm mb-4 focus:border-[#c0262d] focus:outline-hidden"
            />
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {stores
                .filter((s) => s.city.toLowerCase().includes(searchCity.toLowerCase()))
                .map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-gray-100 hover:bg-stone-50 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-sm text-gray-900">{s.city} Store</div>
                      <div className="text-xs text-gray-500">{s.address}</div>
                    </div>
                    <button
                      onClick={() => {
                        showToast(`Directions mapped to ${s.city} store!`);
                        setShowModal(false);
                      }}
                      className="text-xs font-semibold text-[#c0262d] hover:underline cursor-pointer"
                    >
                      Get Directions &rarr;
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
