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
          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#1a1a1a] tracking-tight">
            Why homeowners choose Status
          </h2>
        </div>

        {/* Horizontal Promise Cards Slider */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex items-center gap-6 overflow-x-auto no-scrollbar scroll-smooth py-6 -mx-5 px-5 sm:mx-0 sm:px-0"
        >
          {promisesList.map((item, idx) => {
            const isHighlighted = idx === activeIdx;

            return (
              <div
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`w-[280px] sm:w-[400px] shrink-0 p-6 sm:p-12 rounded-md sm:rounded-sm transition-all duration-300 flex flex-col items-center justify-between text-center cursor-pointer ${
                  isHighlighted
                    ? "bg-white shadow-lg scale-102 border border-[#ff5d55]/30"
                    : "bg-white/70 border border-gray-200/70 opacity-75 hover:opacity-100"
                }`}
              >
                {/* Step Number */}
                <div className="text-5xl sm:text-6xl text-[#dcd7d0] font-light leading-none mb-6">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                <h3
                  className={`text-lg sm:text-2xl font-medium leading-snug ${
                    isHighlighted ? "text-[#ff5d55]" : "text-[#4a4541]"
                  }`}
                >
                  {item.title}
                </h3>

                <p className="mt-4 text-sm sm:text-base text-[#76716d] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Red scroll progress bar matching live */}
        <div className="mt-10 max-w-2xl mx-auto h-1 bg-[#e5e5e5] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#ff5d55] rounded-full transition-all duration-200"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </section>
  );
}
