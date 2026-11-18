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
  { id: "sustainability", label: "Sustainability" },
  { id: "experience", label: "Experience Studios" },
];

export default function AboutPage() {
  const { openConsultation } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("philosophy");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      {/* 1. Header (Solid White Navbar) */}
      <Navbar forceSolid={true} onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />

      <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <main className="flex-1 w-full pt-28 sm:pt-36 pb-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-gray-500">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="hover:text-gray-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-gray-300">/</span>
              </li>
              <li className="font-semibold text-gray-900">About Us</li>
            </ol>
          </nav>

          {/* 2. HERO: "Designed for life" */}
          <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[540px] rounded-xs overflow-hidden mb-12 sm:mb-16">
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
              <span className="text-xs uppercase tracking-widest font-semibold text-stone-300">
                Our Story &amp; Vision
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                Designed for life.
              </h1>
              <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-light">
                Creating spaces where Indian families gather, celebrate, and build lifelong memories.
              </p>
            </div>
          </div>

          {/* 3. SUB-NAV STICKY BAR matching interio.com */}
          <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 py-3 mb-16 overflow-x-auto no-scrollbar">
            <ul className="flex items-center space-x-6 sm:space-x-8 text-xs sm:text-sm font-semibold whitespace-nowrap">
              {subNavItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`transition-colors pb-1 border-b-2 cursor-pointer ${
                        isActive
                          ? "border-[#ff5247] text-gray-900"
                          : "border-transparent text-gray-500 hover:text-black"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 4. BRAND ETHOS: Style. Functionality. Durability. */}
          <section id="philosophy" className="max-w-4xl mx-auto text-center space-y-6 mb-20 sm:mb-28">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              Style. Functionality. Durability.
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">
              We understand what your space needs to suit a modern lifestyle. This is why we create
              modular products that elevate everyday living and working. Our smart design solutions
              enhance comfort and convenience, letting us take care of you, while you get the most out
              of your home.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              With well-designed, high-quality pieces in a range of finishes and configurations, our
              modular kitchens, luxury vanities, and wardrobes are personalised to suit your exact needs.
              Our relentless focus on sustainability from concept to end-of-life creates better spaces
              for you and for our planet.
            </p>
          </section>

          {/* 5. DUAL SPLIT CARDS: "For Home" vs "For Business" */}
          <section id="solutions" className="mb-20 sm:mb-28">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* For Home Card */}
              <div className="relative h-[400px] sm:h-[460px] rounded-xs overflow-hidden group">
                <Image
                  src="/images/site/look-kitchen.jpg"
                  alt="For Home - Status Bath and Kitchen"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white space-y-3">
                  <div className="flex items-center gap-2 text-stone-300 text-xs font-bold uppercase tracking-widest">
                    <HomeIcon className="w-4 h-4 text-[#ff5247]" />
                    <span>Residential Sanctuaries</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold">For Home</h3>
                  <div className="flex flex-wrap gap-2 pt-1 text-xs text-stone-200">
                    <span className="bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-xs">Modular Kitchens</span>
                    <span className="bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-xs">Luxury Bathrooms</span>
                    <span className="bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-xs">Walk-in Wardrobes</span>
                    <span className="bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-xs">Doors &amp; Windows</span>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/products"
                      className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-[#ff5247] transition-colors"
                    >
                      <span>Explore Home Solutions</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* For Business Card */}
              <div className="relative h-[400px] sm:h-[460px] rounded-xs overflow-hidden group">
                <Image
                  src="/images/site/b2b.jpg"
                  alt="For Business - Commercial & Architecture"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white space-y-3">
                  <div className="flex items-center gap-2 text-stone-300 text-xs font-bold uppercase tracking-widest">
                    <Building2 className="w-4 h-4 text-[#ff5247]" />
                    <span>Commercial &amp; Real Estate</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold">For Business</h3>
                  <div className="flex flex-wrap gap-2 pt-1 text-xs text-stone-200">
                    <span className="bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-xs">Builder Bulk Orders</span>
                    <span className="bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-xs">Architectural Fitouts</span>
                    <span className="bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-xs">Commercial Restrooms</span>
                    <span className="bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-xs">Turnkey Contracts</span>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-[#ff5247] transition-colors"
                    >
                      <span>Connect with B2B Projects Team</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 6. CRAFTSMANSHIP & DESIGN PROCESS */}
          <section id="craftsmanship" className="mb-20 sm:mb-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="text-xs font-bold uppercase tracking-widest text-[#ff5247]">
                  Precision Engineering
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  With contemporary aesthetics, customisable designs, and a focus on ergonomics, we create products that help you get more out of every day.
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We believe that exceptionally crafted furniture is more than just a functional piece,
                  it&apos;s about creating a comfortable space for everyday living and working. Our factory
                  combines German CNC precision cutting with master woodworkers who calibrate every drawer
                  and joint down to the millimeter.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-stone-50 rounded-xs border border-stone-200">
                    <h4 className="font-bold text-gray-900 text-sm">Austrian Hardware</h4>
                    <p className="text-xs text-gray-500 mt-1">Blum &amp; Hettich soft-close systems tested to 100,000 cycles.</p>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-xs border border-stone-200">
                    <h4 className="font-bold text-gray-900 text-sm">IS:710 Marine Core</h4>
                    <p className="text-xs text-gray-500 mt-1">Boiling Water Proof calibrated plywood resistant to moisture.</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                <div className="relative aspect-4/5 rounded-xs overflow-hidden">
                  <Image
                    src="/images/site/cat-kitchen-island.jpg"
                    alt="Precision island manufacturing"
                    fill
                    sizes="350px"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-4/5 rounded-xs overflow-hidden mt-6">
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

          {/* 7. REAL RESULTS (STAT COUNTERS) matching interio.com */}
          <section id="results" className="bg-[#f7f5f2] rounded-xs p-10 sm:p-16 mb-20 sm:mb-28 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff5247]">
              Proven Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-1 mb-12">
              Beyond promises, real results.
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                  30+
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-700">Years of Craftsmanship</div>
                <p className="text-[11px] text-gray-500">Uncompromising architectural quality</p>
              </div>

              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                  75+
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-700">Cities Served</div>
                <p className="text-[11px] text-gray-500">Pan-India delivery and support</p>
              </div>

              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                  900+
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-700">Modular Installations</div>
                <p className="text-[11px] text-gray-500">Bespoke kitchens &amp; vanity suites</p>
              </div>

              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                  50,000+
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-700">Happy Homes</div>
                <p className="text-[11px] text-gray-500">Transforming daily living</p>
              </div>
            </div>
          </section>

          {/* 8. WHAT DRIVES US: 4 PILLARS */}
          <section className="mb-20 sm:mb-28">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#ff5247]">
                Brand Principles
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-1">
                What drives us forward
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-white border border-gray-200 rounded-xs space-y-3">
                <div className="w-10 h-10 rounded-full bg-red-50 text-[#ff5247] flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-gray-900">Our ideas start with you</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  We observe real cooking habits, wardrobe storage challenges, and bathroom routines to design solutions that genuinely work.
                </p>
              </div>

              <div className="p-6 bg-white border border-gray-200 rounded-xs space-y-3">
                <div className="w-10 h-10 rounded-full bg-red-50 text-[#ff5247] flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-gray-900">Personalised to your needs</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  No two homes are alike. From customizable drawer dividers to adjustable counter heights, every element is made to measure.
                </p>
              </div>

              <div className="p-6 bg-white border border-gray-200 rounded-xs space-y-3">
                <div className="w-10 h-10 rounded-full bg-red-50 text-[#ff5247] flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-gray-900">Design innovation team</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Our internal studio of architects and industrial designers collaborates with European hardware innovators to stay ahead.
                </p>
              </div>

              <div className="p-6 bg-white border border-gray-200 rounded-xs space-y-3">
                <div className="w-10 h-10 rounded-full bg-red-50 text-[#ff5247] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-gray-900">Precision with 10-Yr Guarantee</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Laser edge banding, anti-termite treatment, and rigorous load testing back our comprehensive 10-year warranty.
                </p>
              </div>
            </div>
          </section>

          {/* 9. SUSTAINABLY DESIGNED SPACES matching interio.com */}
          <section id="sustainability" className="mb-20 sm:mb-28 bg-emerald-950 text-white rounded-xs p-10 sm:p-16">
            <div className="max-w-3xl space-y-4 mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Eco-Conscious Living
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Sustainably designed spaces.
              </h2>
              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-light">
                Our commitment to our planet is woven into every board we cut and every finish we apply.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-6 bg-white/10 backdrop-blur-xs rounded-xs space-y-2 border border-white/15">
                <Leaf className="w-6 h-6 text-emerald-400 mb-2" />
                <h4 className="font-bold text-base text-white">Designing to reduce impact</h4>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  Long-lasting modular components mean fewer replacements and reduced landfill waste over the life of your home.
                </p>
              </div>

              <div className="p-6 bg-white/10 backdrop-blur-xs rounded-xs space-y-2 border border-white/15">
                <Award className="w-6 h-6 text-emerald-400 mb-2" />
                <h4 className="font-bold text-base text-white">Smart material planning</h4>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  Computerized nesting algorithms achieve 94% board utilization, radically cutting timber offcut waste in manufacturing.
                </p>
              </div>

              <div className="p-6 bg-white/10 backdrop-blur-xs rounded-xs space-y-2 border border-white/15">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 mb-2" />
                <h4 className="font-bold text-base text-white">Non-toxic &amp; recyclable</h4>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  E0 &amp; E1 certified low-emission adhesives protect indoor air quality, and all aluminum profiles are 100% recyclable.
                </p>
              </div>
            </div>
          </section>

          {/* 10. EXPERIENCE STUDIO CTA BANNER */}
          <section id="experience" className="p-10 sm:p-14 bg-gradient-to-r from-stone-900 to-[#3d3734] text-white rounded-xs flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#ff5247]">
                Experience Centres
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Ready to bring your dream space to life?
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                Meet our design architects for a complimentary consultation and 3D visualization at your nearest studio.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={() => openConsultation("About Page Studio Consultation")}
                className="w-full sm:w-auto px-6 py-3 bg-[#ff5247] hover:bg-[#e04339] text-white font-bold rounded-xs text-xs tracking-wider uppercase transition-colors shadow-md cursor-pointer text-center"
              >
                Book Free Consultation
              </button>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xs text-xs transition-colors border border-white/20 text-center"
              >
                Find Nearest Studio
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
