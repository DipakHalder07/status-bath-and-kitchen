"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { siteBrand } from "@/data/interioData";
import { useCart } from "@/context/CartContext";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface InspirationPost {
  id: string;
  img: string;
  title: string;
  room: string;
}

const inspirationPosts: InspirationPost[] = [
  {
    id: "idea-1",
    img: "/images/site/gal-1.jpg",
    title: "White kitchen with a breakfast island, black pendants and stainless appliances",
    room: "Kitchen",
  },
  {
    id: "idea-2",
    img: "/images/site/gal-2.jpg",
    title: "Floating wood vanity with open shelves for rolled towels",
    room: "Bathroom",
  },
  {
    id: "idea-3",
    img: "/images/site/gal-3.jpg",
    title: "Open shelving on white subway tiles keeps everyday pieces in reach",
    room: "Kitchen",
  },
  {
    id: "idea-4",
    img: "/images/site/gal-4.jpg",
    title: "Oak double vanity with tall storage and twin vessel basins",
    room: "Bathroom",
  },
  {
    id: "idea-5",
    img: "/images/site/gal-5.jpg",
    title: "Freestanding tub, wall-hung basin and a stone feature wall",
    room: "Bathroom",
  },
];

export default function EverydayLiving() {
  const [activePost, setActivePost] = useState<InspirationPost | null>(null);
  const { openConsultation } = useCart();

  return (
    <section id="inspiration" className="py-14 sm:py-20 bg-white border-t border-stone-100">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1c1c1c] tracking-tight">
              Ideas for your kitchen &amp; bath
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-500 font-normal">
              A few looks to get you started. Tap one and we will help you plan something similar.
            </p>
          </div>
          {siteBrand.social.instagram && (
            <a
              href={siteBrand.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#ff5247] hover:underline"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Follow on Instagram</span>
            </a>
          )}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
          {inspirationPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setActivePost(post)}
              className="group relative aspect-square rounded-none sm:rounded-sm overflow-hidden bg-stone-100 cursor-pointer shadow-xs hover:shadow-lg transition-all duration-300"
            >
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#ff7d70] block">
                  {post.room}
                </span>
                <p className="text-xs font-semibold line-clamp-2 mt-0.5 leading-snug">
                  {post.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Idea Detail Modal */}
      {activePost && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActivePost(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square sm:aspect-[4/3] bg-stone-100">
              <img
                src={activePost.img}
                alt={activePost.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActivePost(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-gray-700">
                {activePost.room}
              </span>
              <p className="text-sm text-gray-700 mt-3 font-normal leading-relaxed">
                {activePost.title}
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const room = activePost.room;
                    setActivePost(null);
                    openConsultation(room);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-[#ff5247] hover:bg-[#e0453b] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  <span>Plan a {activePost.room.toLowerCase()} like this</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
