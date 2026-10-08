"use client";

import React from "react";
import Image from "next/image";

interface DealsBannerProps {
  onDealClick?: (dealName: string) => void;
}

export default function DealsBanner({ onDealClick }: DealsBannerProps) {
  return (
    <section className="w-full bg-[#fcfaf7] py-8 sm:py-12 border-b border-stone-200/40">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* DEAL OF THE WEEK */}
          <div
            className="group cursor-pointer rounded-none sm:rounded-sm overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
            onClick={() => {
              if (onDealClick) onDealClick("Deal of the Week");
              const el = document.querySelector("#curated-products");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <picture className="block w-full">
              <source
                media="(max-width: 768px)"
                srcSet="https://interio.com/media/wysiwyg/Group_1686553405.png"
              />
              <source
                media="(min-width: 769px)"
                srcSet="https://interio.com/media/wysiwyg/Week_3.png"
              />
              <img
                src="https://interio.com/media/wysiwyg/Week_3.png"
                alt="Deal of the Week - Suez Leatherette Sofa"
                className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
                loading="lazy"
              />
            </picture>
          </div>

          {/* DEAL OF THE MONTH */}
          <div
            className="group cursor-pointer rounded-none sm:rounded-sm overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
            onClick={() => {
              if (onDealClick) onDealClick("Deal of the Month");
              const el = document.querySelector("#curated-products");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <picture className="block w-full">
              <source
                media="(max-width: 768px)"
                srcSet="https://interio.com/media/wysiwyg/Group_1686553406.png"
              />
              <source
                media="(min-width: 769px)"
                srcSet="https://interio.com/media/wysiwyg/Month_3.png"
              />
              <img
                src="https://interio.com/media/wysiwyg/Month_3.png"
                alt="Deal of the Month - Trio Wooden Bed"
                className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500"
                loading="lazy"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
