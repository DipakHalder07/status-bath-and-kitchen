"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Check, ExternalLink } from "lucide-react";
import Navbar from "@/components/Header/Navbar";
import MobileDrawer from "@/components/Header/MobileDrawer";
import Footer from "@/components/Footer/Footer";
import CartDrawer from "@/components/Cart/CartDrawer";
import ConsultationModal from "@/components/Modals/ConsultationModal";
import Toast from "@/components/UI/Toast";
import BrandsSection from "@/components/Brands/BrandsSection";
import CareServices from "@/components/Services/CareServices";
import { useCart } from "@/context/CartContext";
import { siteBrand } from "@/data/statusData";

const highlights = [
  { value: "10+", label: "Years in Siliguri" },
  { value: "500+", label: "Homes completed" },
  { value: "One team", label: "From design to installation" },
  { value: "Aluminium & uPVC", label: "Window specialists" },
];

const solutionAreas = [
  { name: "Modular Kitchens", href: "/products?category=Modular%20Kitchens" },
  { name: "WAW Aluminium Windows", href: "/products?category=WAW%20Aluminium%20Windows" },
  { name: "Ambiiance uPVC Windows", href: "/products?category=Ambiiance%20uPVC%20Windows" },
  { name: "Wardrobes", href: "/products?category=Wardrobes" },
  { name: "Glass Railings", href: "/products?category=Glass%20Railings" },
  { name: "Appliances", href: "/products?category=Appliances" },
  { name: "Insect Blinds", href: "/products?category=Insect%20Blinds" },
];

const pillars = [
  {
    title: "One team, start to finish",
    description:
      "Site measurement, 3D layout planning, material selection, and final installation are handled by our own trained team — giving you a single point of accountability.",
  },
  {
    title: "German & Austrian hardware",
    description:
      "We build with moisture-resistant boards, certified soft-close fittings from Hafele, precision thermal & acoustic window profiles, and appliances from Bosch, Siemens, and KAFF.",
  },
  {
    title: "Built for Siliguri & North Bengal",
    description:
      "Every cabinet, facade profile, toughened glass railing, and pleated insect screen is selected to handle monsoon humidity, dust, and everyday family use.",
  },
];

export default function AboutPage() {
  const { openConsultation } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mapsUrl =
    siteBrand.googleMapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${siteBrand.name}, ${siteBrand.address}`
    )}`;

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#4a4541] font-sans">
      {/* Top Header */}
      <Navbar forceSolid={true} onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />

      <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <main className="flex-1 w-full pt-28 sm:pt-36">
        {/* 1. BREADCRUMBS */}
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
          <nav aria-label="Breadcrumb" className="py-4 text-[14px] text-[#76716d]">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="hover:text-[#4a4541] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-[#dcd7d0]">/</span>
              </li>
              <li className="font-medium text-[#4a4541]">About Us</li>
            </ol>
          </nav>
        </div>

        {/* 2. HERO BANNER */}
        <div className="w-full relative h-[280px] sm:h-[400px] lg:h-[460px] overflow-hidden mb-12 sm:mb-16">
          <Image
            src="/images/hero-kitchen-couple.webp"
            alt="Custom olive modular kitchen designed by Status Bath & Kitchen in Siliguri"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/15" />

          <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 h-full relative flex items-end pb-8 sm:pb-14">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-medium text-[#ff5d55] uppercase tracking-wider block">
                About Status
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-[44px] font-medium leading-[1.15] !text-white tracking-tight">
                Siliguri&apos;s trusted name in modern homes for over 10 years
              </h1>
            </div>
          </div>
        </div>

        {/* 3. OUR STORY + HIGHLIGHTS STATS */}
        <section className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 pb-14 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-medium text-[#ff5d55] uppercase tracking-wider block">
                Who we are
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium text-[#332f2c] tracking-tight leading-snug">
                Crafted for your home, fitted by our own team
              </h2>
              <p className="text-sm sm:text-[15px] text-[#76716d] leading-relaxed">
                Status Bath &amp; Kitchen has been designing and fitting homes in Siliguri for more
                than a decade. One team handles your modular kitchen, wardrobes, and aluminium and
                uPVC windows.
              </p>
              <p className="text-sm sm:text-[15px] text-[#76716d] leading-relaxed">
                We measure your site, design to your space and lifestyle, and install everything
                ourselves with premium German and Austrian hardware. Hundreds of families across
                North Bengal trust us for spaces that look beautiful and last for years.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => openConsultation("Studio Consultation")}
                  className="status-btn-primary px-6 py-2.5 text-xs sm:text-sm"
                >
                  Book a consultation
                </button>
                <Link
                  href="/products"
                  className="status-btn-outline px-6 py-2.5 text-xs sm:text-sm gap-2"
                >
                  <span>Explore collections</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[16/10] rounded-md overflow-hidden bg-stone-100 shadow-xs">
              <Image
                src="/images/site/look-living.jpg"
                alt="Architectural living space with slim-frame aluminium windows and sliding glass doors"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* 4-Item Highlights Strip */}
          <div className="mt-12 pt-8 border-t border-[#dcd7d0] grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {highlights.map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="text-2xl sm:text-3xl font-medium text-[#ff5d55] tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm text-[#4a4541] font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. WHAT WE SPECIALIZE IN */}
        <section className="py-14 sm:py-16 bg-[#fcfaf7] border-y border-stone-200/50">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="p-6 bg-white border border-[#e6e0d8] rounded-md space-y-2"
                >
                  <h3 className="text-lg font-medium text-[#332f2c]">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-[#76716d] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            {/* 7 Complete Home Categories */}
            <div className="pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h3 className="text-lg sm:text-xl font-medium text-[#332f2c]">
                  Complete solutions under one roof
                </h3>
                <span className="text-xs text-[#76716d]">
                  Custom measured &amp; planned in-studio — not sold online
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {solutionAreas.map((area) => (
                  <Link
                    key={area.name}
                    href={area.href}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#dcd7d0] hover:border-[#ff5d55] text-xs sm:text-sm text-[#4a4541] hover:text-[#ff5d55] transition-colors"
                  >
                    <Check className="w-3.5 h-3.5 text-[#ff5d55]" />
                    <span>{area.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. HOW IT WORKS (4-STEP PROCESS) */}
        <CareServices />

        {/* 6. AUTHORIZED PARTNER BRANDS */}
        <BrandsSection />

        {/* 7. SILIGURI EXPERIENCE STUDIO */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 rounded-xl overflow-hidden border border-[#dcd7d0] bg-[#fbf7f4]">
              <div className="lg:col-span-6 relative min-h-[280px] sm:min-h-[340px]">
                <Image
                  src="/images/site/studio.jpg"
                  alt="Status Bath and Kitchen Experience Studio in Siliguri"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-5">
                <div className="space-y-2">
                  <span className="text-xs font-medium text-[#ff5d55] uppercase tracking-wider block">
                    Siliguri Showroom
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-medium text-[#332f2c] tracking-tight">
                    Visit our Experience Studio
                  </h2>
                  <p className="text-xs sm:text-sm text-[#76716d] leading-relaxed">
                    See our modular kitchens, wardrobes, and aluminium and uPVC windows in person.
                    Touch the finishes, try the fittings, and plan your home with our design team.
                  </p>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm text-[#4a4541] pt-2 border-t border-[#dcd7d0]">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#ff5d55] shrink-0 mt-0.5" />
                    <span>{siteBrand.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#ff5d55] shrink-0" />
                    <span>{siteBrand.hours}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="status-btn-dark px-6 py-2.5 text-xs sm:text-sm gap-2"
                  >
                    <span>Get directions</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <Link
                    href="/contact"
                    className="status-btn-outline px-6 py-2.5 text-xs sm:text-sm bg-white"
                  >
                    Contact us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <ConsultationModal />
      <Toast />

      {/* Footer */}
      <Footer />
    </div>
  );
}
