"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

export default function UpmodsBanner() {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  return (
    <section id="upmods" className="py-8 sm:py-12 lg:py-14 bg-white scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-20">
        {/* Title matching live interio.com */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#1c1c1c] tracking-tight">
            Upmods. Your Sofa, Your Way!
          </h2>
        </div>

        {/* Video Facade Container - 16:9 uncropped matching live interio.com */}
        <div className="w-full">
          {!isPlayingVideo ? (
            <div
              className="relative w-full aspect-[16/9] bg-[#f5f0ea] cursor-pointer group select-none overflow-hidden"
              onClick={() => setIsPlayingVideo(true)}
              role="button"
              tabIndex={0}
              aria-label="Play Upmods video"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setIsPlayingVideo(true);
                }
              }}
            >
              {/* Uncropped 16:9 high resolution thumbnail from local cache with CDN fallback */}
              <img
                src="/images/promo/upmods_banner.jpg"
                alt="Upmods. Your Sofa, Your Way!"
                className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-[1.01]"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://img.youtube.com/vi/Ea4vkCunSHU/maxresdefault.jpg";
                }}
                width={1280}
                height={720}
              />

              {/* Exact YouTube Play Button SVG from live interio.com */}
              <button
                type="button"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-none bg-transparent p-0 cursor-pointer transition-transform duration-200 group-hover:scale-110 focus:outline-none"
                aria-label="Play video"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlayingVideo(true);
                }}
              >
                <svg
                  width="68"
                  height="48"
                  viewBox="0 0 68 48"
                  className="w-14 h-10 sm:w-[68px] sm:h-[48px] drop-shadow-md"
                >
                  <path
                    d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
                    fill="red"
                  />
                  <path d="M45 24L27 14v20" fill="white" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="relative w-full aspect-[16/9] bg-black">
              <iframe
                src="https://www.youtube.com/embed/gSTwCO1d98o?autoplay=1&enablejsapi=1&mute=0&controls=1&modestbranding=1&rel=0"
                title="Upmods. Your Sofa, Your Way!"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0 block"
              />
              <button
                type="button"
                onClick={() => setIsPlayingVideo(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 bg-black/75 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
