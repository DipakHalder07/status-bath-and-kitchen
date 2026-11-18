"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  Hammer,
  Leaf,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Home as HomeIcon,
  CheckCircle2,
  CalendarCheck,
  MapPin,
  Check,
} from "lucide-react";
import Navbar from "@/components/Header/Navbar";
import MobileDrawer from "@/components/Header/MobileDrawer";
import Footer from "@/components/Footer/Footer";
import CartDrawer from "@/components/Cart/CartDrawer";
import ConsultationModal from "@/components/Modals/ConsultationModal";
import Toast from "@/components/UI/Toast";
import { useCart } from "@/context/CartContext";
import { siteBrand } from "@/data/interioData";

const subNavItems = [
  { id: "philosophy", label: "Design Philosophy" },
  { id: "solutions", label: "Home & Business" },
  { id: "craftsmanship", label: "Craftsmanship" },
  { id: "results", label: "Real Results" },
  { id: "pillars", label: "Design Pillars" },
  { id: "sustainability", label: "Sustainability" },
];

export default function AboutPage() {
  const { openConsultation } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("philosophy");
  const [sustainabilityTab, setSustainabilityTab] = useState<"approach" | "processes" | "materials">("approach");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#4a4541] font-sans">
      {/* 1. Header (Solid White Navbar) */}
      <Navbar forceSolid={true} onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />

      <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <main className="flex-1 w-full pt-28 sm:pt-36 pb-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
          {/* Breadcrumb (Matching interio.com 14px 400 py-4) */}
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

          {/* 2. HERO: "Designed for life" (Matching interio.com 42px 500) */}
          <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[540px] overflow-hidden mb-10">
            <Image
              src="/images/site/banner-kitchen.jpg"
              alt="Designed for life - Status Bath and Kitchen"
              fill
              priority
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20"></div>

            <div className="absolute bottom-10 sm:bottom-16 left-6 sm:left-14 max-w-2xl text-white space-y-3">
              <span className="text-xs uppercase tracking-widest font-medium text-stone-300">
                Our Story &amp; Vision
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-medium leading-[46px] tracking-tight text-white">
                Designed for life.
              </h1>
              <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-light">
                Creating spaces where Indian families gather, celebrate, and build lifelong memories.
              </p>
            </div>
          </div>

          {/* 3. SUB-NAV STICKY BAR matching interio.com */}
          <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-[#dcd7d0] py-3 mb-16 overflow-x-auto no-scrollbar">
            <ul className="flex items-center space-x-6 sm:space-x-8 text-[14px] font-medium whitespace-nowrap">
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

          {/* 4. BRAND ETHOS: Style. Functionality. Durability. (Matching interio.com 44px 500 leading 48.4px) */}
          <section id="philosophy" className="max-w-4xl mx-auto text-center space-y-6 mb-20 sm:mb-28">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-medium text-[#4a4541] leading-[48.4px] tracking-tight">
              Style. Functionality. Durability.
            </h2>
            <p className="text-base sm:text-lg text-[#4a4541] leading-relaxed font-normal">
              We understand what your space needs to suit a modern lifestyle. This is why we create
              modular products that elevate everyday living and working. Our smart design solutions
              enhance comfort and convenience, letting us take care of you, while you get the most out
              of your home.
            </p>
            <p className="text-sm sm:text-base text-[#76716d] leading-relaxed font-normal">
              With well-designed, high-quality pieces in a range of finishes and configurations, our
              modular kitchens, luxury vanities, and wardrobes are personalised to suit your exact needs.
              Our relentless focus on sustainability from concept to end-of-life creates better spaces
              for you and for our planet.
            </p>
          </section>

          {/* 5. DUAL SPLIT CARDS: "For Home" vs "For Business" (Matching interio.com 42px 500) */}
          <section id="solutions" className="mb-20 sm:mb-28">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* For Home Card */}
              <div className="relative h-[400px] sm:h-[460px] overflow-hidden group">
                <Image
                  src="/images/site/look-kitchen.jpg"
                  alt="For Home - Status Bath and Kitchen"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white space-y-3">
                  <div className="flex items-center gap-2 text-stone-300 text-xs font-medium uppercase tracking-widest">
                    <HomeIcon className="w-4 h-4 text-[#ff5d55]" />
                    <span>Residential Sanctuaries</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-[42px] font-medium leading-[46.2px] text-white">For Home</h3>
                  <div className="flex flex-wrap gap-2 pt-1 text-xs text-stone-200">
                    <span className="bg-white/20 backdrop-blur-xs px-2.5 py-1">Modular Kitchens</span>
                    <span className="bg-white/20 backdrop-blur-xs px-2.5 py-1">Luxury Bathrooms</span>
                    <span className="bg-white/20 backdrop-blur-xs px-2.5 py-1">Walk-in Wardrobes</span>
                    <span className="bg-white/20 backdrop-blur-xs px-2.5 py-1">Doors &amp; Windows</span>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/products"
                      className="inline-flex items-center gap-2 text-xs font-medium text-white hover:text-[#ff5d55] transition-colors"
                    >
                      <span>Explore Home Solutions</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* For Business Card */}
              <div className="relative h-[400px] sm:h-[460px] overflow-hidden group">
                <Image
                  src="/images/site/b2b.jpg"
                  alt="For Business - Commercial & Architecture"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white space-y-3">
                  <div className="flex items-center gap-2 text-stone-300 text-xs font-medium uppercase tracking-widest">
                    <Building2 className="w-4 h-4 text-[#ff5d55]" />
                    <span>Commercial &amp; Real Estate</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-[42px] font-medium leading-[46.2px] text-white">For Business</h3>
                  <div className="flex flex-wrap gap-2 pt-1 text-xs text-stone-200">
                    <span className="bg-white/20 backdrop-blur-xs px-2.5 py-1">Builder Bulk Orders</span>
                    <span className="bg-white/20 backdrop-blur-xs px-2.5 py-1">Architectural Fitouts</span>
                    <span className="bg-white/20 backdrop-blur-xs px-2.5 py-1">Commercial Restrooms</span>
                    <span className="bg-white/20 backdrop-blur-xs px-2.5 py-1">Turnkey Contracts</span>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-xs font-medium text-white hover:text-[#ff5d55] transition-colors"
                    >
                      <span>Connect with B2B Projects Team</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 6. BIG BRAND QUOTE (Matching interio.com 42px 500 red #ff5d55, margin 90px 0 30px) */}
          <section className="my-20 sm:my-28 text-center max-w-4xl mx-auto px-4">
            <h3 className="text-2xl sm:text-3xl lg:text-[42px] font-medium text-[#ff5d55] leading-[46.2px] tracking-tight">
              &ldquo;We believe that exceptionally crafted furniture is more than just a functional piece, it&apos;s about creating a comfortable space for everyday living and working.&rdquo;
            </h3>
          </section>

          {/* 7. CRAFTSMANSHIP & DESIGN PROCESS */}
          <section id="craftsmanship" className="mb-20 sm:mb-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="text-xs font-medium uppercase tracking-widest text-[#ff5d55]">
                  Precision Engineering
                </div>
                <h2 className="text-3xl sm:text-4xl font-medium text-[#4a4541] tracking-tight leading-tight">
                  With contemporary aesthetics, customisable designs, and a focus on ergonomics, we create products that help you get more out of every day.
                </h2>
                <p className="text-[14px] text-[#76716d] leading-relaxed">
                  Our manufacturing combines German CNC automated precision cutting with master joiners who calibrate every drawer and seam down to the millimeter. Using IS:710 Marine Grade Boiling Water Proof ply and laser-fused acrylic edgebanding, we ensure zero moisture absorption and seamless aesthetic flow.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-[#fbf7f4] border border-[#dcd7d0]">
                    <h4 className="font-medium text-[#4a4541] text-sm">Austrian Hardware</h4>
                    <p className="text-xs text-[#76716d] mt-1">Blum &amp; Hettich soft-close systems tested to 100,000 cycles.</p>
                  </div>
                  <div className="p-4 bg-[#fbf7f4] border border-[#dcd7d0]">
                    <h4 className="font-medium text-[#4a4541] text-sm">IS:710 Marine Core</h4>
                    <p className="text-xs text-[#76716d] mt-1">Boiling Water Proof calibrated plywood resistant to moisture.</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                <div className="relative aspect-4/5 overflow-hidden">
                  <Image
                    src="/images/site/cat-kitchen-island.jpg"
                    alt="Precision island manufacturing"
                    fill
                    sizes="350px"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-4/5 overflow-hidden mt-6">
                  <Image
                    src="/images/site/cat-acc-pantry.jpg"
                    alt="Pantry internal engineering"
                    fill
                    sizes="350px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 8. REAL RESULTS (STAT COUNTERS) matching interio.com (fs=60px, fw=500, lh=66px, color=#ff5d55) */}
          <section id="results" className="bg-[#f7f5f2] p-10 sm:p-16 mb-20 sm:mb-28 text-center">
            <span className="text-xs font-medium uppercase tracking-widest text-[#ff5d55]">
              Proven Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-medium text-[#4a4541] leading-[46.2px] tracking-tight mt-2 mb-12">
              Beyond promises, real results.
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl lg:text-[60px] font-medium text-[#ff5d55] leading-[66px] tracking-tight">
                  30+
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#4a4541]">Years of Craftsmanship</div>
                <p className="text-[11px] text-[#76716d]">Uncompromising architectural quality</p>
              </div>

              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl lg:text-[60px] font-medium text-[#ff5d55] leading-[66px] tracking-tight">
                  75+
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#4a4541]">Cities Served</div>
                <p className="text-[11px] text-[#76716d]">Pan-India delivery and support</p>
              </div>

              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl lg:text-[60px] font-medium text-[#ff5d55] leading-[66px] tracking-tight">
                  900+
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#4a4541]">Modular Installations</div>
                <p className="text-[11px] text-[#76716d]">Bespoke kitchens &amp; vanity suites</p>
              </div>

              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl lg:text-[60px] font-medium text-[#ff5d55] leading-[66px] tracking-tight">
                  50,000+
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#4a4541]">Happy Homes</div>
                <p className="text-[11px] text-[#76716d]">Transforming daily living</p>
              </div>
            </div>
          </section>

          {/* 9. 5 CORE PILLARS: Design in focus for Indian homes (Matching interio.com 32px 500) */}
          <section id="pillars" className="mb-20 sm:mb-28">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-medium uppercase tracking-widest text-[#ff5d55]">
                Brand Principles
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-medium text-[#4a4541] leading-[46.2px] tracking-tight mt-1">
                Design in focus for Indian homes
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-white border border-[#dcd7d0] space-y-3">
                <h3 className="text-xl sm:text-[24px] font-medium text-[#4a4541] leading-snug">
                  Our ideas start with you
                </h3>
                <p className="text-[13px] text-[#76716d] leading-relaxed">
                  We observe Indian cooking habits, heavy spice storage, tall grocery containers, and wet washing areas to design cabinetry that genuinely functions for our culture.
                </p>
              </div>

              <div className="p-6 bg-white border border-[#dcd7d0] space-y-3">
                <h3 className="text-xl sm:text-[24px] font-medium text-[#4a4541] leading-snug">
                  Personalised to your needs
                </h3>
                <p className="text-[13px] text-[#76716d] leading-relaxed">
                  No two homes are identical. From custom drawer dividers to ergonomic counter heights calibrated to your stature, every module is precision-tailored.
                </p>
              </div>

              <div className="p-6 bg-white border border-[#dcd7d0] space-y-3">
                <h3 className="text-xl sm:text-[24px] font-medium text-[#4a4541] leading-snug">
                  A team dedicated to design innovation
                </h3>
                <p className="text-[13px] text-[#76716d] leading-relaxed">
                  Our in-house studio of architects and interior space planners continuously tests new composite materials, zero-fingerprint coatings, and motorized pantry lifts.
                </p>
              </div>

              <div className="p-6 bg-white border border-[#dcd7d0] space-y-3">
                <h3 className="text-xl sm:text-[24px] font-medium text-[#4a4541] leading-snug">
                  Products engineered with precision
                </h3>
                <p className="text-[13px] text-[#76716d] leading-relaxed">
                  Every cabinet panel is cut on computerized European beam saws to a tolerance of &plusmn;0.1mm, ensuring doors align with flawless micro-gaps.
                </p>
              </div>

              <div className="p-6 bg-white border border-[#dcd7d0] space-y-3">
                <h3 className="text-xl sm:text-[24px] font-medium text-[#4a4541] leading-snug">
                  A global network of designers
                </h3>
                <p className="text-[13px] text-[#76716d] leading-relaxed">
                  We bridge international design trends from Milan and Salzburg with Indian artisan sensibilities, crafting homes of world-class sophistication.
                </p>
              </div>

              <div className="p-6 bg-[#fbf7f4] border border-[#dcd7d0] space-y-3 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-[24px] font-medium text-[#4a4541] leading-snug">
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

          {/* 10. SUSTAINABLY DESIGNED SPACES (Matching interio.com 42px 500, joined tabs 20px 500) */}
          <section id="sustainability" className="mb-20 sm:mb-28">
            <div className="border border-[#dcd7d0] p-8 sm:p-12 bg-white">
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-medium text-[#4a4541] leading-[46.2px] tracking-tight mb-6">
                Sustainably designed spaces
              </h2>

              {/* Joined Tabs: [ Our Approach ][ Processes ][ Materials ] (fs=20px 500) */}
              <div className="overflow-x-auto no-scrollbar mb-8">
                <div className="inline-flex border border-[#dcd7d0] bg-white divide-x divide-[#dcd7d0]">
                  {[
                    { id: "approach", label: "Our Approach" },
                    { id: "processes", label: "Processes" },
                    { id: "materials", label: "Materials" },
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

              {/* Tab Content */}
              {sustainabilityTab === "approach" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
                  <div className="space-y-2">
                    <h4 className="font-medium text-[#4a4541] text-base">Carbon-Neutral Design</h4>
                    <p className="text-[13px] text-[#76716d] leading-relaxed">
                      We optimize panel layouts to minimize timber offcuts, achieving over 92% sheet yield and recycling 100% of sawdust into heating pellets.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-[#4a4541] text-base">Zero-VOC Finishes</h4>
                    <p className="text-[13px] text-[#76716d] leading-relaxed">
                      All surface coatings use water-based polyurethane lacquers free from benzene, formaldehyde, and toxic off-gassing for clean indoor air.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-[#4a4541] text-base">Extended Lifecycle</h4>
                    <p className="text-[13px] text-[#76716d] leading-relaxed">
                      Engineered for modular disassembly, allowing homeowners to replace door fronts or add internal shelves without discarding the cabinet carcass.
                    </p>
                  </div>
                </div>
              )}

              {sustainabilityTab === "processes" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
                  <div className="space-y-2">
                    <h4 className="font-medium text-[#4a4541] text-base">Solar-Powered Facility</h4>
                    <p className="text-[13px] text-[#76716d] leading-relaxed">
                      Over 65% of our factory electricity is generated by a rooftop solar installation, cutting 800 metric tons of carbon annually.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-[#4a4541] text-base">Closed-Loop Water Treatment</h4>
                    <p className="text-[13px] text-[#76716d] leading-relaxed">
                      Quartz and stone fabrication water is filtered through centrifugal decanters and reused 100%, producing zero untreated effluent.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-[#4a4541] text-base">Eco-Packaging</h4>
                    <p className="text-[13px] text-[#76716d] leading-relaxed">
                      Thermocol is replaced with 100% biodegradable corrugated honeycomb padding and recycled corner edge guards.
                    </p>
                  </div>
                </div>
              )}

              {sustainabilityTab === "materials" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
                  <div className="space-y-2">
                    <h4 className="font-medium text-[#4a4541] text-base">FSC-Certified Timber</h4>
                    <p className="text-[13px] text-[#76716d] leading-relaxed">
                      100% of our natural veneers and solid wood accents are sourced from legally certified managed forestry plantations.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-[#4a4541] text-base">E0 / E1 Emission Rated Boards</h4>
                    <p className="text-[13px] text-[#76716d] leading-relaxed">
                      Every panel complies with strict European formaldehyde emission standards, safeguarding children and pets.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-[#4a4541] text-base">Recyclable Metals</h4>
                    <p className="text-[13px] text-[#76716d] leading-relaxed">
                      All aluminum profiles, brass handles, and steel tandem runners are 100% infinitely recyclable at end of life.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 11. EXPERIENCE STUDIO CTA BANNER */}
          <section className="bg-[#3d3734] text-white p-10 sm:p-14 text-center space-y-4">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white tracking-tight">
              Experience the Craftsmanship Firsthand
            </h3>
            <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto font-light leading-relaxed">
              Touch our anti-fingerprint surfaces, test the smooth glide of soft-close drawers, and sit down with our master kitchen designers.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => openConsultation("Studio Visit")}
                className="btn-brand-primary px-8 py-3.5 text-xs sm:text-sm font-medium tracking-wide shadow-md cursor-pointer"
              >
                Book Free In-Studio Consultation
              </button>
              <Link
                href="/products"
                className="px-8 py-3.5 border border-white/40 text-white hover:bg-white hover:text-[#4a4541] rounded-[20px_2px_2px_2px] text-xs sm:text-sm font-medium transition-colors"
              >
                Browse All Products
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
