"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { tickerBanner } from "@/data/interioData";
import { useCart } from "@/context/CartContext";

export default function TickerBanner() {
  const { openConsultation } = useCart();

  return (
    <div className="w-full bg-[#fdfbf8] py-4">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        <div className="w-full border border-gray-200 bg-[#1c1c1c] text-white px-5 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm sm:text-base font-medium">{tickerBanner.text}</p>
          <button
            type="button"
            onClick={() => openConsultation("Kitchen & Bathroom")}
            className="shrink-0 inline-flex items-center gap-2 self-start sm:self-auto px-5 py-2.5 rounded-full bg-[#ff5247] hover:bg-[#e0453b] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            <span>{tickerBanner.ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
