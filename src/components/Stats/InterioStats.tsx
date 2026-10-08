"use client";

import React from "react";

export default function InterioStats() {
  return (
    <section className="py-16 sm:py-24 bg-[#ff5247] text-white">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Interio for India
        </h2>
        <p className="text-sm sm:text-base text-white/95 mt-2 sm:mt-3 font-normal max-w-xl mx-auto">
          Providing comfort and style for modern living
        </p>

        {/* 3 Metric Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 mt-12 sm:mt-16 max-w-4xl mx-auto">
          {/* Stat 1 */}
          <div className="flex flex-col items-center">
            <div className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
              30<span className="text-3xl sm:text-4xl font-normal ml-0.5">+</span>
            </div>
            <p className="text-sm sm:text-base text-white/95 mt-3 font-normal">
              Innovative products launched every year
            </p>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center">
            <div className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
              17,000<span className="text-3xl sm:text-4xl font-normal ml-0.5">+</span>
            </div>
            <p className="text-sm sm:text-base text-white/95 mt-3 font-normal">
              Pin codes serviced
            </p>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center">
            <div className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
              1000<span className="text-3xl sm:text-4xl font-normal ml-0.5">+</span>
            </div>
            <p className="text-sm sm:text-base text-white/95 mt-3 font-normal">
              Stores across the country
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
