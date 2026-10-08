"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface DealsBannerProps {
  onDealClick?: (dealName: string) => void;
}

const features = [
  {
    id: "kitchens",
    eyebrow: "Modular Kitchens",
    title: "Designed around the way you cook",
    cta: "Explore kitchen ideas",
    image: "/images/site/deal-kitchen.jpg",
    alt: "White kitchen with a wooden island and globe pendant lights",
  },
  {
    id: "bathrooms",
    eyebrow: "Bathrooms",
    title: "Calm, clutter-free bathrooms",
    cta: "Explore bathroom ideas",
    image: "/images/site/deal-bath.jpg",
    alt: "Grey bathroom with a round mirror, black basin and freestanding tub",
  },
];

export default function DealsBanner({ onDealClick }: DealsBannerProps) {
  return (
    <section className="w-full bg-[#fcfaf7] py-8 sm:py-12 border-b border-stone-200/40">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative cursor-pointer rounded-none sm:rounded-sm overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 aspect-[16/10] bg-stone-900"
              onClick={() => {
                if (onDealClick) onDealClick(feature.eyebrow);
                const el = document.querySelector("#curated-products");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <img
                src={feature.image}
                alt={feature.alt}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                <span className="text-xs uppercase tracking-wider text-white/80 block mb-1">
                  {feature.eyebrow}
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
                  {feature.title}
                </h3>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold border-b border-white pb-0.5 group-hover:text-[#ff5247] group-hover:border-[#ff5247] transition-colors">
                  {feature.cta}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
