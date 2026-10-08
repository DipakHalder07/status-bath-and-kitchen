"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function DesignIdeasSection() {
  const { showToast } = useCart();

  const articles = [
    {
      title: "10 Small Living Room Ideas to Maximize Space and Style",
      readTime: "5 min read",
      category: "Living Room",
      image: "https://interio.com/media/.renditions/wysiwyg/B2C-Homepage/Get_inspired_522x300px.jpg",
    },
    {
      title: "How to Choose the Right Mattress for Spinal Comfort",
      readTime: "6 min read",
      category: "Sleep Science",
      image: "https://interio.com/media/wysiwyg/Mega-Menu/King_Mattresses.jpg",
    },
    {
      title: "Modular Kitchen Layouts: The Golden Triangle Explained",
      readTime: "4 min read",
      category: "Kitchen Guide",
      image: "https://interio.com/media/wysiwyg/Modular_Kitchen_MK.jpg",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#faf8f5] border-t border-stone-200/60">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Card with Exact Live Background Image */}
        <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-white p-8 sm:p-14 mb-12 shadow-xl">
          <picture className="absolute inset-0 w-full h-full">
            <img
              src="https://interio.com/media/.renditions/wysiwyg/B2C-Homepage/Get_inspired_522x300px.jpg"
              alt="Design ideas to inspire you"
              className="w-full h-full object-cover opacity-45"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />

          <div className="relative z-10 max-w-xl space-y-4">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Interior Lookbooks & Tips
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              Design ideas to inspire you
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              Blogs, articles, moodboards and more &ndash; expert advice from our design team so you stay up to date on all the latest trends.
            </p>
            <div className="pt-2">
              <button
                onClick={() => showToast("Opening Godrej Interio Design Magazine (Nook)...")}
                className="px-6 py-3 rounded-full bg-white hover:bg-stone-100 text-gray-900 text-xs font-bold transition-all shadow-md flex items-center gap-2"
              >
                <span>View all articles</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Articles Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art, idx) => (
            <div
              key={idx}
              onClick={() => showToast(`Opening article: ${art.title}`)}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/70 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full aspect-16/10 overflow-hidden bg-stone-100">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    sizes="400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold">
                    {art.category}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{art.readTime}</span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#c0262d] transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h4>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2">
                <span className="text-xs font-bold text-[#c0262d] flex items-center gap-1 group-hover:underline">
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
