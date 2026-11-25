"use client";

import React from "react";
import { MapPin, Phone, Home, HelpCircle } from "lucide-react";

export default function TopUtilityBar() {
  return (
    <div className="w-full bg-[#f9f8f5] border-b border-gray-200 text-xs text-gray-700">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
        {/* Left Segment Badge */}
        <div className="flex items-center space-x-1">
          <span className="flex items-center space-x-1 px-3 py-1 font-semibold text-[#c0262d] border-b-2 border-[#c0262d]">
            <Home className="w-3.5 h-3.5" />
            <span>For Homes</span>
          </span>
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
            href="tel:+919832095793"
            className="flex items-center space-x-1 hover:text-[#c0262d] transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>+91 98320 95793</span>
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
