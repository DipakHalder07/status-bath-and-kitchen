"use client";

import React from "react";
import { Store, Phone, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function TickerBanner() {
  const { openConsultation } = useCart();

  return (
    <div className="status-ticker w-full bg-[#fbf7f4] border-y border-[#e7e1d9] py-3.5 sm:py-4">
      <div className="status-container max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#c0262d]/10 text-[#c0262d] flex items-center justify-center shrink-0">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-[#4a4541] leading-tight">
                <span className="font-semibold text-gray-900">Experience Studio:</span> Visit our showroom to explore modular kitchens, WAW &amp; Ambiiance windows, wardrobes, glass railings, appliances &amp; insect blinds.
              </p>
              <p className="text-[11px] text-[#76716d] mt-0.5">
                Bespoke layouts • Premium finishes • German &amp; Austrian hardware
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/919832095793?text=Hi%20Status%20Bath%20%26%20Kitchen%2C%20I%20would%20like%20to%20plan%20a%20showroom%20visit."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#25D366] hover:text-[#20ba59] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp: +91 98320 95793</span>
            </a>
            <span className="text-stone-300 hidden sm:inline">|</span>
            <button
              onClick={() => openConsultation("Showroom Visit")}
              className="status-btn-dark inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#4a4541] hover:bg-[#332f2c] text-white text-xs font-medium transition-colors cursor-pointer"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
