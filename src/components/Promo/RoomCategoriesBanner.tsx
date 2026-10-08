"use client";

import React from "react";
import Image from "next/image";

interface RoomCategoriesBannerProps {
  onSelectCategory?: (category: string) => void;
}

const roomCategories = [
  {
    id: "living-room",
    title: "Living Room Furniture",
    img: "https://interio.com/media/wysiwyg/1_12.jpg",
    link: "#curated-products",
  },
  {
    id: "bedroom",
    title: "Bedroom Furniture",
    img: "https://interio.com/media/wysiwyg/2_8.jpg",
    link: "#curated-products",
  },
  {
    id: "dining-room",
    title: "Dining Room Furniture",
    img: "https://interio.com/media/wysiwyg/3_4.jpg",
    link: "#curated-products",
  },
  {
    id: "office-study",
    title: "Office & Study Furniture",
    img: "https://interio.com/media/wysiwyg/4.jpg",
    link: "#curated-products",
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
                const elem = document.querySelector("#curated-products");
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
                  className="w-full py-2.5 px-3 rounded-full border border-gray-300 bg-white hover:bg-stone-50 hover:border-gray-400 text-xs sm:text-sm font-semibold text-gray-800 transition-colors shadow-2xs text-center truncate"
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
