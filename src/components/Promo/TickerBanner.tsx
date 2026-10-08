"use client";

import React from "react";

export default function TickerBanner() {
  return (
    <div className="w-full bg-[#fdfbf8] py-4">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        <a
          href="#curated-products"
          className="block w-full border border-gray-200 overflow-hidden hover:opacity-95 transition-opacity"
        >
          <picture className="block w-full">
            <source
              media="(max-width: 768px)"
              srcSet="https://interio.com/media/wysiwyg/Big-Billion-Day_Ticker_Mobile-Size.jpg"
            />
            <source
              media="(min-width: 769px)"
              srcSet="https://interio.com/media/wysiwyg/Big-Billion-Day_Ticker_Desktop-Size.jpg"
            />
            <img
              src="https://interio.com/media/wysiwyg/Big-Billion-Day_Ticker_Desktop-Size.jpg"
              alt="Bank and Festive Offers"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </picture>
        </a>
      </div>
    </div>
  );
}
