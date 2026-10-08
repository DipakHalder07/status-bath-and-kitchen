"use client";

import React, { useState, useRef } from "react";
import { promisesList } from "@/data/interioData";

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(30);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const totalScroll = scrollWidth - clientWidth;
      if (totalScroll > 0) {
        const progress = 20 + (scrollLeft / totalScroll) * 80;
        setScrollProgress(progress);
      }
    }
  };

  return (
    <section id="why-status" className="py-16 sm:py-24 bg-[#faf8f5] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        <div className="mb-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1c1c1c] tracking-tight">
            Why homeowners choose Status
          </h2>
        </div>

        {/* Horizontal Promise Cards Slider */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex items-center gap-6 overflow-x-auto no-scrollbar scroll-smooth py-6"
        >
          {promisesList.map((item, idx) => {
            const isHighlighted = idx === activeIdx;

            return (
              <div
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`w-[300px] sm:w-[400px] shrink-0 p-8 sm:p-12 rounded-none sm:rounded-sm transition-all duration-300 flex flex-col items-center justify-between text-center cursor-pointer ${
                  isHighlighted
                    ? "bg-white shadow-lg scale-102 border border-red-100"
                    : "bg-white/70 border border-gray-200/70 opacity-75 hover:opacity-100"
                }`}
              >
                {/* Step Number */}
                <div className="text-5xl sm:text-6xl text-stone-300 font-extrabold leading-none mb-6">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                <h3
                  className={`text-lg sm:text-2xl font-bold leading-snug ${
                    isHighlighted ? "text-[#ff5247]" : "text-gray-800"
                  }`}
                >
                  {item.title}
                </h3>

                <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Red scroll progress bar matching live */}
        <div className="mt-10 max-w-2xl mx-auto h-0.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#c0262d] transition-all duration-200"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </section>
  );
}
