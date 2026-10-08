"use client";

import React, { useState } from "react";
import { ExternalLink } from "lucide-react";

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

interface SocialPost {
  id: string;
  img: string;
  title: string;
  room: string;
  handle: string;
  url: string;
}

const socialPosts: SocialPost[] = [
  {
    id: "post-1",
    img: "https://interio.com/media/socialmedia/tmp/18212984938337436.jpg",
    title: "Minimalist Living Room setup with Godrej Fabric Sofa",
    room: "Living Room",
    handle: "@stylingwithanita",
    url: "https://www.instagram.com/p/DaVJ-0gGFZJ/",
  },
  {
    id: "post-2",
    img: "https://interio.com/media/socialmedia/tmp/17936415279003635.jpg",
    title: "Warm bedroom aesthetic featuring motorized storage bed",
    room: "Master Bedroom",
    handle: "@homedesign.diaries",
    url: "https://www.instagram.com/godrejinterioio/",
  },
  {
    id: "post-3",
    img: "https://interio.com/media/socialmedia/tmp/18171816193352360.jpg",
    title: "Cozy reading corner with ergonomic lounge recliner",
    room: "Reading Nook",
    handle: "@urbanliving.in",
    url: "https://www.instagram.com/godrejinterioio/",
  },
  {
    id: "post-4",
    img: "https://interio.com/media/socialmedia/tmp/18061521476205093.jpg",
    title: "Elegant solid wood dining space for family gatherings",
    room: "Dining Room",
    handle: "@interiorsbymaya",
    url: "https://www.instagram.com/godrejinterioio/",
  },
  {
    id: "post-5",
    img: "https://interio.com/media/socialmedia/tmp/18115148392444762.jpg",
    title: "Organized workspace with ergonomic chair and study table",
    room: "Home Office",
    handle: "@deskspaces",
    url: "https://www.instagram.com/godrejinterioio/",
  },
];

export default function EverydayLiving() {
  const [activePost, setActivePost] = useState<SocialPost | null>(null);

  return (
    <section className="py-14 sm:py-20 bg-white border-t border-stone-100">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1c1c1c] tracking-tight">
              Interio in Everyday Living
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-500 font-normal">
              Real homes styled with Godrej Interio furniture. Tag <span className="font-semibold text-[#ff5247]">#InterioInEverydayLiving</span> to be featured.
            </p>
          </div>
          <a
            href="https://www.instagram.com/godrejinterioio/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#ff5247] hover:underline"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Follow on Instagram</span>
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
          {socialPosts.map((post) => (
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
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://interio.com/media/wysiwyg/1_12.jpg";
                }}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <div className="flex justify-end">
                  <span className="p-2 bg-white/20 backdrop-blur-md rounded-full">
                    <InstagramIcon className="w-4 h-4 text-white" />
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#ff7d70] block">
                    {post.room}
                  </span>
                  <p className="text-xs font-semibold line-clamp-2 mt-0.5 leading-snug">
                    {post.title}
                  </p>
                  <p className="text-[11px] text-gray-300 mt-1 font-medium">
                    {post.handle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Post Modal Detail */}
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
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <InstagramIcon className="w-5 h-5 text-[#ff5247]" />
                  <span className="text-sm font-bold text-gray-900">
                    {activePost.handle}
                  </span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-gray-700">
                  {activePost.room}
                </span>
              </div>
              <p className="text-sm text-gray-700 mt-3 font-normal leading-relaxed">
                {activePost.title}
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href={activePost.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-[#ff5247] hover:bg-[#e0453b] text-white font-bold text-xs sm:text-sm transition-colors"
                >
                  <span>View on Instagram</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
