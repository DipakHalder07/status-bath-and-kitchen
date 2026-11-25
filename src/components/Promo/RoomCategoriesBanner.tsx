"use client";

import React from "react";
import Image from "next/image";

interface RoomCategoriesBannerProps {
  onSelectCategory?: (category: string) => void;
}

const roomCategories = [
  {
    id: "kitchens",
    title: "Modular Kitchens",
    img: "/images/site/cat-mk-handleless.jpg",
    link: "/products?category=Modular+Kitchens",
  },
  {
    id: "windows",
    title: "WAW & uPVC Windows",
    img: "/images/site/cat-waw-casement.jpg",
    link: "/products?category=WAW+Aluminium+Windows",
  },
  {
    id: "wardrobes",
    title: "Bespoke Wardrobes",
    img: "/images/site/cat-wardrobe-walkin.jpg",
    link: "/products?category=Wardrobes",
  },
  {
    id: "doors-windows",
    title: "Doors & Windows",
    img: "/images/site/cat-door-main.jpg",
    link: "/products?category=Doors+%26+Windows",
  },
];

export default function RoomCategoriesBanner({
  onSelectCategory,
}: RoomCategoriesBannerProps) {
  return (
    <section className="w-full bg-[#fcfaf7] py-8 sm:py-12 border-b border-stone-200/40">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {roomCategories.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center group cursor-pointer"
              onClick={() => {
                if (onSelectCategory) onSelectCategory(item.title);
                const elem = document.querySelector("#categories");
                if (elem) elem.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {/* Image Container with subtle rounded corner & hover scale */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white shadow-xs group-hover:shadow-md transition-all duration-300">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Outlined Pill Button below */}
              <div className="mt-3 sm:mt-4 w-full">
                <button
                  type="button"
                  className="w-full py-2.5 px-3 rounded-full border border-[#dcd7d0] bg-white hover:bg-stone-50 hover:border-[#4a4541] text-xs sm:text-sm font-medium text-[#4a4541] transition-colors shadow-2xs text-center truncate"
                >
                  {item.title}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
