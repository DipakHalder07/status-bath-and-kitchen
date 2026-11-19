"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Check,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import Navbar from "@/components/Header/Navbar";
import MobileDrawer from "@/components/Header/MobileDrawer";
import Footer from "@/components/Footer/Footer";
import CartDrawer from "@/components/Cart/CartDrawer";
import ConsultationModal from "@/components/Modals/ConsultationModal";
import Toast from "@/components/UI/Toast";
import { useCart } from "@/context/CartContext";

const subNavItems = [
  { id: "design-philosophy", label: "Design philosophy" },
  { id: "craftmanship", label: "Craftmanship" },
  { id: "design-process", label: "Design process" },
  { id: "sustainability", label: "Sustainability" },
  { id: "career", label: "Opportunities" },
  { id: "media", label: "Media" },
];

const indianFocusTabs = ["Homes", "Kitchens", "Business", "Projects"];

export default function AboutPage() {
  const { openConsultation } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("design-philosophy");
  const [activeFocusTab, setActiveFocusTab] = useState("Homes");
  const [sustainabilityTab, setSustainabilityTab] = useState<
    "approach" | "processes" | "materials" | "lifecycles" | "certifications"
  >("approach");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#4a4541] font-sans">
      {/* Top Header */}
      <Navbar forceSolid={true} onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />

      <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <main className="flex-1 w-full pt-28 sm:pt-36 pb-20">
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

        {/* 2. HERO: "Designed for life" with Authentic Banner */}
        <div className="w-full relative h-[280px] sm:h-[480px] lg:h-[540px] overflow-hidden mb-8">
          <Image
            src="/images/status/about_hero_poster.jpg"
            alt="Designed for life"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/35" />

          <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 h-full relative flex items-end pb-8 sm:pb-16">
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-medium leading-[1.1] !text-white tracking-tight">
              Designed for life
            </h1>
          </div>
        </div>

        {/* 3. STICKY SUB-NAV BAR */}
        <div className="sticky top-[72px] sm:top-[88px] lg:top-[96px] z-30 bg-white border-b border-[#dcd7d0] py-3 sm:py-3.5 mb-12 sm:mb-16 overflow-x-auto no-scrollbar shadow-xs -mx-5 px-5 sm:mx-0 sm:px-0">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
            <ul className="flex items-center space-x-8 text-[14px] font-medium whitespace-nowrap">
              {subNavItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`transition-colors pb-1 border-b-2 cursor-pointer ${
                        isActive
                          ? "border-[#ff5d55] text-[#4a4541] font-semibold"
                          : "border-transparent text-[#76716d] hover:text-[#4a4541]"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 space-y-24">
          {/* 4. STYLE. FUNCTIONALITY. DURABILITY. */}
          <section className="max-w-4xl space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-medium text-[#4a4541] leading-[48.4px] tracking-tight">
              Style. Functionality. Durability.
            </h2>
            <p className="text-[16px] text-[#4a4541] leading-relaxed">
              We understand what your space needs to suit a modern lifestyle. This is why we create products that elevate everyday living and working. Our smart design solutions enhance comfort and convenience, letting us take care of you, while you get the most out of your space.
            </p>
          </section>

          {/* 5. DUAL SPLIT CARDS: FOR HOME & FOR BUSINESS */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For Home */}
            <div className="relative h-[420px] overflow-hidden group">
              <Image
                src="/images/site/look-kitchen.jpg"
                alt="For home"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white space-y-3">
                <h3 className="text-3xl lg:text-[42px] font-medium leading-[46.2px] !text-white">
                  For home
                </h3>
                <div className="text-xs sm:text-sm text-stone-200 flex flex-wrap gap-x-4 gap-y-1">
                  <span>Living Room</span>
                  <span>•</span>
                  <span>Bedroom</span>
                  <span>•</span>
                  <span>Dining Room</span>
                  <span>•</span>
                  <span>Modular kitchen</span>
                </div>
                <div className="pt-2">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white hover:text-[#ff5d55] transition-colors"
                  >
                    <span>Explore Home Solutions</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* For Business */}
            <div className="relative h-[420px] overflow-hidden group">
              <Image
                src="/images/site/b2b.jpg"
                alt="For business"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white space-y-3">
                <h3 className="text-3xl lg:text-[42px] font-medium leading-[46.2px] !text-white">
                  For business
                </h3>
                <div className="text-xs sm:text-sm text-stone-200 flex flex-wrap gap-x-4 gap-y-1">
                  <span>Office Furniture</span>
                  <span>•</span>
                  <span>Projects</span>
                  <span>•</span>
                  <span>AV Solutions</span>
                  <span>•</span>
                  <span>Wellness@work</span>
                </div>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white hover:text-[#ff5d55] transition-colors"
                  >
                    <span>Explore Business Solutions</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* 6. DESIGN PHILOSOPHY & BIG RED STATEMENT */}
          <section id="design-philosophy" className="space-y-6 pt-4">
            <span className="text-[13px] text-[#76716d] uppercase tracking-wider font-medium block">
              Our design philosophy
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-[42px] font-medium !text-[#ff5d55] leading-[46.2px] tracking-tight max-w-4xl">
              We believe that exceptionally crafted furniture is more than just a functional piece, it&apos;s about creating a comfortable space for everyday living and working.
            </h3>
            <p className="text-[15px] text-[#76716d] leading-relaxed max-w-3xl">
              We’ve been honing our craft for decades. We start every design by understanding how you use your space. Right from the drawing board, we focus on aesthetics and functionality and work with precision tools and high-grade materials.
            </p>
          </section>

          {/* 7. BEYOND PROMISES, REAL RESULTS (Stat Counters matching live site) */}
          <section id="craftmanship" className="pt-8 border-t border-[#dcd7d0]">
            <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-medium text-[#4a4541] leading-[46.2px] tracking-tight mb-12">
              Beyond promises, real results
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              <div className="space-y-2">
                <div className="text-5xl lg:text-[60px] font-medium text-[#ff5d55] leading-[66px] tracking-tight">
                  30+
                </div>
                <div className="text-[16px] font-medium text-[#4a4541]">
                  Innovative products launched every year
                </div>
                <p className="text-[13px] text-[#76716d]">
                  Constant R&amp;D and ergonomic validation for modern Indian families.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-5xl lg:text-[60px] font-medium text-[#ff5d55] leading-[66px] tracking-tight">
                  75+
                </div>
                <div className="text-[16px] font-medium text-[#4a4541]">
                  Design awards and recognitions won
                </div>
                <p className="text-[13px] text-[#76716d]">
                  Recognized internationally for sustainability, precision, and craftsmanship.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-5xl lg:text-[60px] font-medium text-[#ff5d55] leading-[66px] tracking-tight">
                  900+
                </div>
                <div className="text-[16px] font-medium text-[#4a4541]">
                  Outlets across India
                </div>
                <p className="text-[13px] text-[#76716d]">
                  A nationwide network of studios and dedicated after-sales technicians.
                </p>
              </div>
            </div>
          </section>

          {/* 8. DESIGN IN FOCUS FOR INDIAN (Tabs: Homes | Kitchens | Business | Projects) */}
          <section id="design-process" className="pt-8 border-t border-[#dcd7d0]">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-medium text-[#4a4541] leading-[46.2px] tracking-tight">
                Design in focus for Indian
              </h2>

              {/* Segmented Tabs */}
              <div className="overflow-x-auto no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 pb-1">
                <div className="inline-flex border border-[#dcd7d0] bg-white divide-x divide-[#dcd7d0]">
                {indianFocusTabs.map((tab) => {
                  const isActive = activeFocusTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveFocusTab(tab)}
                      className={`relative px-5 py-2.5 text-[14px] font-medium transition-colors cursor-pointer ${
                        isActive
                          ? "bg-[#f5f0ea] text-[#4a4541] font-semibold"
                          : "bg-white text-[#76716d] hover:bg-[#faf8f5] hover:text-[#4a4541]"
                      }`}
                    >
                      <span>{tab}</span>
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff5d55]" />
                      )}
                    </button>
                  );
                })}
                </div>
              </div>
            </div>

            {/* 5 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-white border border-[#dcd7d0] space-y-2">
                <h3 className="text-[20px] font-medium text-[#4a4541] leading-snug">
                  Our ideas start with you
                </h3>
                <p className="text-[14px] text-[#76716d] leading-relaxed">
                  We observe Indian cooking habits, heavy spice storage, tall grocery containers, and wet washing areas to design cabinetry that genuinely functions for our culture.
                </p>
              </div>

              <div className="p-6 bg-white border border-[#dcd7d0] space-y-2">
                <h3 className="text-[20px] font-medium text-[#4a4541] leading-snug">
                  Personalised to your needs
                </h3>
                <p className="text-[14px] text-[#76716d] leading-relaxed">
                  No two spaces are identical. From custom drawer dividers to counter heights calibrated to your comfort, every module is precision-tailored.
                </p>
              </div>

              <div className="p-6 bg-white border border-[#dcd7d0] space-y-2">
                <h3 className="text-[20px] font-medium text-[#4a4541] leading-snug">
                  A team dedicated to design innovation
                </h3>
                <p className="text-[14px] text-[#76716d] leading-relaxed">
                  Our in-house studio of architects and residential space planners continuously tests new composite materials, zero-fingerprint coatings, and motorized pantry lifts.
                </p>
              </div>

              <div className="p-6 bg-white border border-[#dcd7d0] space-y-2">
                <h3 className="text-[20px] font-medium text-[#4a4541] leading-snug">
                  Products engineered with precision
                </h3>
                <p className="text-[14px] text-[#76716d] leading-relaxed">
                  Every cabinet panel is cut on computerized European beam saws to a tolerance of &plusmn;0.1mm, ensuring doors align with flawless micro-gaps.
                </p>
              </div>

              <div className="p-6 bg-white border border-[#dcd7d0] space-y-2">
                <h3 className="text-[20px] font-medium text-[#4a4541] leading-snug">
                  A global network of designers
                </h3>
                <p className="text-[14px] text-[#76716d] leading-relaxed">
                  We bridge international design trends from Milan and Salzburg with Indian artisan sensibilities, crafting homes of world-class sophistication.
                </p>
              </div>

              <div className="p-6 bg-[#fbf7f4] border border-[#dcd7d0] space-y-2 flex flex-col justify-between">
                <div>
                  <h3 className="text-[20px] font-medium text-[#4a4541] leading-snug">
                    Experience It In Person
                  </h3>
                  <p className="text-[13px] text-[#76716d] leading-relaxed mt-2">
                    Step into one of our flagship experience studios and feel the luxury textures, soft-close motions, and intelligent storage firsthand.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ff5d55] hover:underline pt-2"
                >
                  <span>Book Studio Walkthrough &rarr;</span>
                </Link>
              </div>
            </div>
          </section>

          {/* 9. WHAT DRIVES US: BRAND APPROACH & BRAND PRINCIPLES */}
          <section className="pt-8 border-t border-[#dcd7d0] space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-medium text-[#4a4541] leading-[46.2px] tracking-tight">
              What drives us
            </h2>
            <p className="text-[15px] text-[#76716d] leading-relaxed max-w-3xl">
              We are dedicated to leading the industry with a commitment to sustainability, innovative solutions, and exceptional business performance, all while delivering outstanding design and quality.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="p-8 bg-[#fbf7f4] border border-[#dcd7d0] space-y-3">
                <h3 className="text-2xl font-medium text-[#4a4541]">Brand approach</h3>
                <p className="text-[14px] text-[#76716d] leading-relaxed">
                  We focus on creating unforgettable experiences that engage our customers and build lasting loyalty through our superior furniture offerings.
                </p>
              </div>

              <div className="p-8 bg-[#fbf7f4] border border-[#dcd7d0] space-y-3">
                <h3 className="text-2xl font-medium text-[#4a4541]">Brand principles</h3>
                <p className="text-[14px] text-[#76716d] leading-relaxed">
                  Grounded in ethical manufacturing, environmental stewardship, honest pricing, and an unwavering obsession with structural durability.
                </p>
              </div>
            </div>
          </section>

          {/* 10. HEAR FROM OUR LEADERS */}
          <section className="pt-8 border-t border-[#dcd7d0] space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-medium text-[#4a4541] leading-[46.2px] tracking-tight">
              Hear from our leaders
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white border border-[#dcd7d0] space-y-4">
                <p className="text-[15px] text-[#4a4541] italic leading-relaxed">
                  &ldquo;Professional, creative, and highly responsive. The redesign of our living and kitchen spaces has not only enhanced aesthetics but also improved daily family comfort, boosting overall well-being.&rdquo;
                </p>
                <div className="pt-2 border-t border-[#f0ece6]">
                  <strong className="text-[14px] text-[#4a4541] block">Swapneel Nagarkar</strong>
                  <span className="text-[12px] text-[#76716d] block">Executive Director, Mumbai</span>
                </div>
              </div>

              <div className="p-8 bg-white border border-[#dcd7d0] space-y-4">
                <p className="text-[15px] text-[#4a4541] italic leading-relaxed">
                  &ldquo;Sustainability isn&apos;t an afterthought for us—it&apos;s engineered into the DNA of every cabinet, hinge, and countertop we fabricate. We are building homes that will stand proud for generations.&rdquo;
                </p>
                <div className="pt-2 border-t border-[#f0ece6]">
                  <strong className="text-[14px] text-[#4a4541] block">Pooja Sharma</strong>
                  <span className="text-[12px] text-[#76716d] block">Head of Sustainable Design, Bengaluru</span>
                </div>
              </div>
            </div>
          </section>

          {/* 11. SUSTAINABLY DESIGNED SPACES (Matching live tabs & stats: 240+, 80%, 43%) */}
          <section id="sustainability" className="pt-8 border-t border-[#dcd7d0] space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-medium text-[#4a4541] leading-[46.2px] tracking-tight mb-2">
                Sustainably designed spaces
              </h2>
              <p className="text-[15px] text-[#76716d]">
                Assuring the highest standards of sustainable choices from responsibly sourced materials to green lifecycles.
              </p>
            </div>

            {/* Sustainability Sub-tabs */}
            <div className="overflow-x-auto no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 pb-1">
              <div className="inline-flex border border-[#dcd7d0] bg-white divide-x divide-[#dcd7d0]">
                {[
                  { id: "approach", label: "Our Approach" },
                  { id: "processes", label: "Processes" },
                  { id: "materials", label: "Materials" },
                  { id: "lifecycles", label: "Green Lifecycles" },
                  { id: "certifications", label: "Certifications" },
                ].map((tab) => {
                  const isSelected = sustainabilityTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSustainabilityTab(tab.id as any)}
                      className={`relative px-6 sm:px-8 py-3.5 text-sm sm:text-base lg:text-[18px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-white text-[#4a4541] font-semibold"
                          : "bg-[#faf8f5] text-[#76716d] hover:bg-white hover:text-[#4a4541]"
                      }`}
                    >
                      <span>{tab.label}</span>
                      {isSelected && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff5d55]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sustainability at a glance numbers */}
            <div className="bg-[#fbf7f4] border border-[#dcd7d0] p-8 sm:p-12">
              <h3 className="text-xl sm:text-2xl font-medium text-[#4a4541] mb-8">
                Sustainability at a glance
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="space-y-1">
                  <div className="text-4xl sm:text-5xl font-medium text-[#ff5d55]">240+</div>
                  <div className="text-[14px] font-medium text-[#4a4541]">
                    Products with Green certification
                  </div>
                  <p className="text-[12px] text-[#76716d]">FSC-certified timber and E0 emission boards</p>
                </div>
                <div className="space-y-1">
                  <div className="text-4xl sm:text-5xl font-medium text-[#ff5d55]">80%</div>
                  <div className="text-[14px] font-medium text-[#4a4541]">
                    Recyclable materials used
                  </div>
                  <p className="text-[12px] text-[#76716d]">Aluminum, steel hardware, and quartz aggregates</p>
                </div>
                <div className="space-y-1">
                  <div className="text-4xl sm:text-5xl font-medium text-[#ff5d55]">43%</div>
                  <div className="text-[14px] font-medium text-[#4a4541]">
                    Carbon footprint reduction
                  </div>
                  <p className="text-[12px] text-[#76716d]">Rooftop solar generation &amp; closed-loop water treatment</p>
                </div>
              </div>

              {/* Wecycle program callout */}
              <div className="mt-8 pt-8 border-t border-[#dcd7d0]">
                <h4 className="text-lg font-medium text-[#4a4541] mb-1">
                  Turning your retired furniture into new creations
                </h4>
                <p className="text-[14px] text-[#76716d] leading-relaxed">
                  The Wecycle program is our way of making sure that your furniture gets a responsible, eco-friendly second life. This helps us close the loop and complete our greener journey - one piece at a time.
                </p>
              </div>
            </div>
          </section>

          {/* 12. SHAPE THE FUTURE / CAREERS BANNER */}
          <section id="career" className="relative h-80 sm:h-96 overflow-hidden">
            <Image
              src="/images/status/about_career.jpg"
              alt="Careers"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex flex-col justify-center items-start px-8 sm:px-16 max-w-2xl text-white space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight !text-white">
                Shape the future of modern Indian living with us
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-light">
                We&apos;re on a mission to redefine contemporary Indian spaces, and we&apos;re looking for driven professionals to grow with us. If you&apos;re passionate about making an impact, this is your moment.
              </p>
              <button
                type="button"
                onClick={() => openConsultation("Career Inquiry")}
                className="btn-brand-primary px-8 py-3 text-xs sm:text-sm font-medium tracking-wide shadow-md cursor-pointer"
              >
                Join Our Team
              </button>
            </div>
          </section>

          {/* 13. STATUS IN MEDIA */}
          <section id="media" className="pt-8 border-t border-[#dcd7d0] space-y-8">
            <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-medium text-[#4a4541] leading-[46.2px] tracking-tight">
              Status in Media
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-[#dcd7d0] bg-white overflow-hidden group">
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src="/images/status/media_1.png"
                    alt="Media Article 1"
                    fill
                    sizes="500px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <div className="text-xs text-[#76716d]">3rd April, 2026</div>
                  <h3 className="text-lg font-medium text-[#4a4541] leading-snug group-hover:text-[#ff5d55] transition-colors">
                    Status Bath &amp; Kitchen&apos;s state-of-the-art facility reshaping modular spaces.
                  </h3>
                  <p className="text-xs text-[#76716d] leading-relaxed">
                    How automated German precision manufacturing is revolutionizing custom kitchen fitouts in India.
                  </p>
                </div>
              </div>

              <div className="border border-[#dcd7d0] bg-white overflow-hidden group">
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src="/images/status/media_2.jpg"
                    alt="Media Article 2"
                    fill
                    sizes="500px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <div className="text-xs text-[#76716d]">14th March, 2026</div>
                  <h3 className="text-lg font-medium text-[#4a4541] leading-snug group-hover:text-[#ff5d55] transition-colors">
                    Workplace &amp; home business on a high as demand for custom ergonomics rises.
                  </h3>
                  <p className="text-xs text-[#76716d] leading-relaxed">
                    Modern homeowners invest in health-first ergonomic kitchens, motorized cabinets, and smart bathroom vanities.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 14. FIND A STORE NEAR YOU BANNER (Matching live site Store_image-min_2.jpg) */}
          <section className="relative h-80 sm:h-96 overflow-hidden">
            <Image
              src="/images/status/about_store.jpg"
              alt="Find a store near you"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 flex flex-col justify-center items-start px-8 sm:px-16 max-w-xl text-white space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight !text-white">
                Find a store near you
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-light">
                Our stores give you the chance to experience our collection up close, as well as interact with our expert team. Come visit us soon!
              </p>
              <Link
                href="/contact"
                className="btn-brand-primary px-8 py-3 text-xs sm:text-sm font-medium tracking-wide shadow-md inline-block"
              >
                Find a Store Near You
              </Link>
            </div>
          </section>
        </div>
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
