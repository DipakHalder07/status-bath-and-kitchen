"use client";

import React from "react";
import { ArrowRight, Phone } from "lucide-react";
import { siteBrand } from "@/data/interioData";
import { useCart } from "@/context/CartContext";

export default function PhilosophySection() {
  const { openConsultation } = useCart();

  return (
    <section id="philosophy" className="py-16 sm:py-20 bg-white">
      <div id="about" className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        {/* Projects for builders, architects & designers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left: Text & Actions */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <div className="text-xs sm:text-sm font-bold text-[#ff5247] uppercase tracking-wide">
              For builders, architects &amp; designers
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1c1c1c] tracking-tight leading-tight">
              Project solutions for homes and developments
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl font-normal">
              From a single apartment to a full project, we supply and install modular kitchens, wardrobes, doors and windows to your drawings and timelines.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => openConsultation("Project Enquiry")}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-[#ff5247] hover:bg-[#e0453b] text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer hover:shadow-md"
              >
                <span>Enquire now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={siteBrand.phoneHref || "#contact"}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md border border-gray-900 bg-white hover:bg-stone-50 text-gray-900 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <span>Call us</span>
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: Project Planning Image */}
          <div className="lg:col-span-6 rounded-none sm:rounded-sm overflow-hidden shadow-xs">
            <img
              src="/images/site/b2b.jpg"
              alt="Designer drawing a floor plan with a scale ruler"
              className="w-full h-auto object-cover hover:scale-101 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
