"use client";

import React from "react";
import Image from "next/image";
import { siteBrand } from "@/data/interioData";
import { useCart } from "@/context/CartContext";

export default function Footer() {
  const { showToast } = useCart();

  const cities = [
    "Ahmedabad",
    "Bengaluru",
    "Bhopal",
    "Bhubaneswar",
    "Chandigarh",
    "Chennai",
    "Coimbatore",
    "Cuttack",
    "Delhi",
    "Gaya",
    "Guwahati",
    "Howrah",
    "Hyderabad",
    "Indore",
    "Jaipur",
    "Kolkata",
    "Lucknow",
    "Mumbai",
    "Nagpur",
    "Patna",
    "Pune",
    "Raipur",
    "Ranchi",
    "Shimla",
    "Thane",
    "Varanasi",
    "Visakhapatnam",
  ];

  return (
    <footer className="w-full bg-[#3d3734] text-stone-300 pt-16 pb-12 border-t border-stone-700/50">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 space-y-12">
        {/* Top Header Row: Logo & Group Attribution */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8">
          <div className="relative w-48 sm:w-56 h-12 sm:h-14">
            <Image
              src={siteBrand.whiteLogo}
              alt={siteBrand.name}
              fill
              className="object-contain object-left"
            />
          </div>
          <div className="text-xs sm:text-sm text-stone-300 font-medium">
            STATUS Doors & Windows 2026
          </div>
        </div>

        {/* Main Links & Social Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Follow Us On */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-base font-bold text-white tracking-wide">
              Follow us on
            </h4>
            <div className="flex items-center gap-2.5">
              {/* Facebook */}
              <a
                href="https://facebook.com/godrejinterio"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-sm border border-stone-500/80 flex items-center justify-center text-stone-300 hover:text-white hover:border-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/godrejinterioio"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-sm border border-stone-500/80 flex items-center justify-center text-stone-300 hover:text-white hover:border-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href="https://pinterest.com/godrejinterio"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="w-9 h-9 rounded-sm border border-stone-500/80 flex items-center justify-center text-stone-300 hover:text-white hover:border-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.99-.1-2.5.02-3.58l.74-3.13s-.18-.38-.18-.94c0-.88.51-1.54 1.15-1.54.54 0 .8.41.8.9 0 .55-.35 1.36-.53 2.12-.15.63.32 1.15.94 1.15 1.13 0 2-1.19 2-2.91 0-1.52-1.09-2.58-2.66-2.58-1.81 0-2.88 1.36-2.88 2.76 0 .55.21 1.13.48 1.45.05.06.06.12.04.18l-.18.73c-.03.11-.1.14-.23.08-1.01-.47-1.64-1.95-1.64-3.13 0-2.55 1.85-4.89 5.34-4.89 2.81 0 4.98 2 4.98 4.67 0 2.79-1.76 5.03-4.2 5.03-.82 0-1.6-.43-1.86-.93l-.51 1.94c-.18.71-.68 1.6-1.01 2.14A12 12 0 1 0 12 0z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/godrejinterio"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-sm border border-stone-500/80 flex items-center justify-center text-stone-300 hover:text-white hover:border-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/godrej-interio"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-sm border border-stone-500/80 flex items-center justify-center text-stone-300 hover:text-white hover:border-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Columns: About, Services, Help, Contact */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs sm:text-sm">
            {/* About */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm sm:text-base">
                About
              </h4>
              <ul className="space-y-2 text-stone-300">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#philosophy" className="hover:text-white transition-colors">
                    Design philosophy
                  </a>
                </li>
                <li>
                  <a href="#process" className="hover:text-white transition-colors">
                    Design process
                  </a>
                </li>
                <li>
                  <a href="#sustainability" className="hover:text-white transition-colors">
                    Sustainability
                  </a>
                </li>
                <li>
                  <a href="#careers" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#press" className="hover:text-white transition-colors">
                    Interio in media
                  </a>
                </li>
                <li>
                  <a href="#media-assets" className="hover:text-white transition-colors">
                    Media Assets
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm sm:text-base">
                Services
              </h4>
              <ul className="space-y-2 text-stone-300">
                <li>
                  <a href="#modular-kitchen" className="hover:text-white transition-colors">
                    Modular kitchens
                  </a>
                </li>
                <li>
                  <a href="#blogs" className="hover:text-white transition-colors">
                    Blogs
                  </a>
                </li>
                <li>
                  <a href="#care-services" className="hover:text-white transition-colors">
                    After purchase services
                  </a>
                </li>
              </ul>
            </div>

            {/* Help */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm sm:text-base">
                Help
              </h4>
              <ul className="space-y-2 text-stone-300">
                <li>
                  <a href="#faqs" className="hover:text-white transition-colors">
                    FAQ&apos;s
                  </a>
                </li>
                <li>
                  <a href="#delivery" className="hover:text-white transition-colors">
                    Delivery &amp; shipment
                  </a>
                </li>
                <li>
                  <a href="#warranty" className="hover:text-white transition-colors">
                    Warranty information
                  </a>
                </li>
                <li>
                  <a href="#returns" className="hover:text-white transition-colors">
                    Return &amp; replacement
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-white transition-colors">
                    Terms &amp; conditions
                  </a>
                </li>
                <li>
                  <a href="#shipping" className="hover:text-white transition-colors">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#payment" className="hover:text-white transition-colors">
                    Payment
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm sm:text-base">
                Contact
              </h4>
              <ul className="space-y-2 text-stone-300">
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    Contact us
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => showToast("Requesting callback from Godrej Interio...")}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Request a call back
                  </button>
                </li>
                <li>
                  <a href="#store-locator" className="hover:text-white transition-colors">
                    Store locator
                  </a>
                </li>
                <li>
                  <a href="#dealer" className="hover:text-white transition-colors">
                    Become a dealer
                  </a>
                </li>
                <li>
                  <a href="#care-services" className="hover:text-white transition-colors">
                    Services
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-stone-600/50" />

        {/* 2 Bottom Columns: Categories You Love & Nearest Stores */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 text-xs sm:text-[13px] leading-relaxed text-stone-300">
          {/* Categories You Love */}
          <div className="lg:col-span-6 space-y-3">
            <h4 className="text-sm sm:text-base font-bold text-white mb-2">
              Categories you love
            </h4>
            <p>
              <span className="font-semibold text-white">Living room:</span>{" "}
              Sofa &amp; loungers | Sofa Sets | Sofas | Sofa Bed | L Shaped Sofa | Recliners | 3 Seater Sofa | Tables | Coffee Tables | Bean bags &amp; pouffes | Cabinets | TV Units | Shoe Racks | Soft furnishing
            </p>
            <p>
              <span className="font-semibold text-white">Bedroom:</span>{" "}
              Almirahs &amp; Wardrobes | Steel Almirah | Beds | King Size Bed | Queen Size Bed | Double Bed | Single Bed | Wooden Bed | Mattresses | Queen Size Mattress | Double Bed Mattress | Single Bed Mattress | Ortho Mattress | Tables | Study Tables | Dressing Tables | Bedside Tables | Home lockers | Study Chair
            </p>
            <p>
              <span className="font-semibold text-white">Dining room:</span>{" "}
              Dining sets | Dining tables | Dining chairs | Dining benches
            </p>
            <p>
              <span className="font-semibold text-white">Office and study:</span>{" "}
              Chairs | Office Chairs | Tables | Gaming Chairs
            </p>
            <p>
              <span className="font-semibold text-white">Modular Kitchen:</span>{" "}
              Steel chef 2.0 | Willow Wok | Flavors | ARK
            </p>
          </div>

          {/* Visit Your Nearest Stores in Your City */}
          <div className="lg:col-span-6 space-y-3">
            <h4 className="text-sm sm:text-base font-bold text-white mb-2">
              Visit your nearest stores in your city
            </h4>
            <p className="leading-loose">
              {cities.join(" | ")}
            </p>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-stone-600/50" />

        {/* Copyright & Legal Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-300 gap-4">
          <p>
            © Interio by Godrej, A Godrej Enterprises Group 2026
          </p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy policy
            </a>
            <a href="#cookies" className="hover:text-white transition-colors">
              Cookie policy
            </a>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
