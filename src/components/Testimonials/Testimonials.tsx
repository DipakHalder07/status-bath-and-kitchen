"use client";

import React, { useState, useRef } from "react";
import { testimonialsList } from "@/data/interioData";

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(1);
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
    <section className="py-16 sm:py-24 bg-[#faf8f5] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        {/* Horizontal Testimonials Slider */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex items-center gap-6 overflow-x-auto no-scrollbar scroll-smooth py-6"
        >
          {testimonialsList.map((item, idx) => {
            const isHighlighted = idx === activeIdx;

            return (
              <div
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`w-[360px] sm:w-[480px] shrink-0 p-8 sm:p-12 rounded-none sm:rounded-sm transition-all duration-300 flex flex-col items-center justify-between text-center cursor-pointer ${
                  isHighlighted
                    ? "bg-white shadow-lg scale-102 border border-red-100"
                    : "bg-white/70 border border-gray-200/70 opacity-75 hover:opacity-100"
                }`}
              >
                {/* Large Quotation Mark */}
                <div className="text-5xl sm:text-6xl text-stone-300 font-serif leading-none mb-6">
                  &ldquo;&ldquo;
                </div>

                {/* Quote Text */}
                <p
                  className={`text-base sm:text-xl font-medium leading-relaxed ${
                    isHighlighted ? "text-[#ff5247] font-semibold" : "text-gray-700"
                  }`}
                >
                  &ldquo;{item.quote.replace(/^"|"$/g, "")}&rdquo;
                </p>

                {/* Author Name */}
                <div className="mt-8">
                  <div className="text-sm font-bold text-gray-900">{item.author}</div>
                  {item.location && (
                    <div className="text-xs text-gray-400 mt-0.5">{item.location}</div>
                  )}
                </div>
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
