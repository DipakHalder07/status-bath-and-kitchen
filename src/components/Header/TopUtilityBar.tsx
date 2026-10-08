"use client";

import React, { useState } from "react";
import { MapPin, Phone, Building2, Home, HelpCircle } from "lucide-react";

export default function TopUtilityBar() {
  const [activeSegment, setActiveSegment] = useState<"homes" | "business">("homes");

  return (
    <div className="w-full bg-[#f9f8f5] border-b border-gray-200 text-xs text-gray-700">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
        {/* Left Segment Switcher */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setActiveSegment("homes")}
            className={`flex items-center space-x-1 px-3 py-1 font-medium transition-all ${
              activeSegment === "homes"
                ? "text-[#c0262d] font-semibold border-b-2 border-[#c0262d]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>For Homes</span>
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => setActiveSegment("business")}
            className={`flex items-center space-x-1 px-3 py-1 font-medium transition-all ${
              activeSegment === "business"
                ? "text-[#c0262d] font-semibold border-b-2 border-[#c0262d]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>For Businesses</span>
          </button>
        </div>

        {/* Right Links */}
        <div className="hidden md:flex items-center space-x-6 text-gray-600">
          <a
            href="#store-locator"
            className="flex items-center space-x-1 hover:text-[#c0262d] transition-colors"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Store Locator</span>
          </a>
          <a
            href="#dealer"
            className="hover:text-[#c0262d] transition-colors"
          >
            Become a Dealer
          </a>
          <a
            href="#care-services"
            className="hover:text-[#c0262d] transition-colors"
          >
            Services & Repairs
          </a>
          <a
            href="#contact"
            className="flex items-center space-x-1 hover:text-[#c0262d] transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>1800-267-1122 (Toll Free)</span>
          </a>
          <a
            href="#faqs"
            className="flex items-center space-x-1 hover:text-[#c0262d] transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Need Help?</span>
          </a>
        </div>
      </div>
    </div>
  );
}
