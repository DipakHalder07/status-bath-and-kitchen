"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Sparkles, ShieldCheck, Store, RotateCcw, ArrowRight } from "lucide-react";
import Navbar from "@/components/Header/Navbar";
import MobileDrawer from "@/components/Header/MobileDrawer";
import Footer from "@/components/Footer/Footer";
import CartDrawer from "@/components/Cart/CartDrawer";
import ConsultationModal from "@/components/Modals/ConsultationModal";
import Toast from "@/components/UI/Toast";
import { useCart } from "@/context/CartContext";

interface ShowcaseCard {
  id: string;
  title: string;
  description?: string;
  image: string;
}

interface SolutionSection {
  tab: string;
  title: string;
  subtitle: string;
  cards: ShowcaseCard[];
}

const ALL_TAB = "All Solutions";

const solutionSections: SolutionSection[] = [
  {
    tab: "Modular Kitchens",
    title: "Modular Kitchens",
    subtitle: "Kitchens designed around the way you cook.",
    cards: [
      {
        id: "k-l-shaped",
        title: "L-Shaped",
        description: "Uses two walls and a corner; works well in most Indian homes.",
        image: "/images/site/kitchen-l-shaped.webp",
      },
      {
        id: "k-u-shaped",
        title: "U-Shaped",
        description: "Counter on three sides, with the most storage and workspace.",
        image: "/images/site/kitchen-u-shaped.webp",
      },
      {
        id: "k-parallel",
        title: "Parallel",
        description: "Two facing counters; efficient for long, narrow kitchens.",
        image: "/images/site/kitchen-parallel.webp",
      },
      {
        id: "k-straight",
        title: "Straight / Single-wall",
        description: "Everything along one wall, ideal for compact flats.",
        image: "/images/site/kitchen-straight.webp",
      },
      {
        id: "k-island",
        title: "Island",
        description: "A free-standing counter for open-plan homes and family time.",
        image: "/images/site/kitchen-island.webp",
      },
      {
        id: "k-peninsula",
        title: "G-Shaped / Peninsula",
        description: "A U-shape with an extra counter arm for breakfast or serving.",
        image: "/images/site/cur-k-diner.jpg",
      },
    ],
  },
  {
    tab: "Wardrobes",
    title: "Wardrobes",
    subtitle: "Custom bedroom storage planned around your space and daily routine.",
    cards: [
      {
        id: "w-sliding",
        title: "Sliding wardrobes",
        description: "Save space in compact bedrooms.",
        image: "/images/site/cat-wardrobe-fitted.jpg",
      },
      {
        id: "w-hinged",
        title: "Hinged wardrobes",
        description: "Classic, with full access to the inside.",
        image: "/images/site/cat-wardrobe-hinged.jpg",
      },
      {
        id: "w-walkin",
        title: "Walk-in wardrobes",
        description: "Open storage for larger master bedrooms.",
        image: "/images/site/cat-wardrobe-walkin.jpg",
      },
      {
        id: "w-loft",
        title: "Loft & overhead units",
        description: "Extra storage up to the ceiling.",
        image: "/images/site/cat-wardrobe-interiors.jpg",
      },
    ],
  },
  {
    tab: "Doors",
    title: "Doors",
    subtitle: "Engineered doors for entrances, rooms, balconies, and bathrooms.",
    cards: [
      {
        id: "d-entrance",
        title: "Main entrance doors",
        description: "Solid architectural entrances built for security and welcome.",
        image: "/images/site/cat-door-entrance.jpg",
      },
      {
        id: "d-bedroom",
        title: "Room / bedroom doors",
        description: "Flush and panelled bedroom doors with acoustic seals.",
        image: "/images/site/cat-door-interior.jpg",
      },
      {
        id: "d-sliding",
        title: "Sliding & pocket doors",
        description: "Space-saving glazed and partitioned doorway systems.",
        image: "/images/site/cat-door-sliding.jpg",
      },
      {
        id: "d-bathroom",
        title: "Bathroom doors",
        description: "Moisture-resistant WPC and glass-insert doors for wet areas.",
        image: "/images/site/cur-b-bright.jpg",
      },
    ],
  },
  {
    tab: "Aluminium Windows (WAW)",
    title: "Aluminium Windows (WAW)",
    subtitle: "Slim-frame architectural aluminium windows and terrace doors by WAW.",
    cards: [
      {
        id: "waw-sliding",
        title: "Sliding windows",
        description: "Space-saving and easy to use, the most popular choice in apartments.",
        image: "/images/site/cat-window-sliding.jpg",
      },
      {
        id: "waw-casement",
        title: "Casement windows",
        description: "Open outward for full ventilation and a tight seal.",
        image: "/images/site/cat-waw-casement.jpg",
      },
      {
        id: "waw-fixed",
        title: "Fixed windows",
        description: "For light and views where you don't need ventilation.",
        image: "/images/site/cur-d-facade.jpg",
      },
      {
        id: "waw-slide-fold",
        title: "Slide & fold / sliding doors",
        description: "For balconies and terraces.",
        image: "/images/site/cur-d-garden.jpg",
      },
      {
        id: "waw-top-hung",
        title: "Top-hung / ventilators",
        description: "Small windows for bathrooms and kitchens.",
        image: "/images/site/cat-waw-louvers.jpg",
      },
    ],
  },
  {
    tab: "uPVC Windows (Ambiiance)",
    title: "uPVC Windows (Ambiiance)",
    subtitle: "Multi-chamber acoustic and weather-resistant uPVC windows by Ambiiance.",
    cards: [
      {
        id: "upvc-sliding",
        title: "Sliding windows",
        description: "Smooth multi-track sliding glazed frames for everyday breeze.",
        image: "/images/site/cur-d-glass.jpg",
      },
      {
        id: "upvc-casement",
        title: "Casement windows",
        description: "Fusion-welded outward opening frames with tight weather seals.",
        image: "/images/site/cat-window-casement.jpg",
      },
      {
        id: "upvc-tilt-turn",
        title: "Tilt & turn windows",
        description: "Dual-action inward ventilation and effortless glass cleaning.",
        image: "/images/site/cat-upvc-tilt-turn.jpg",
      },
      {
        id: "upvc-fixed-combo",
        title: "Fixed & combination windows",
        description: "Panoramic bay and floor-to-ceiling glazing combinations.",
        image: "/images/site/cat-upvc-bay.jpg",
      },
      {
        id: "upvc-balcony",
        title: "Balcony sliding doors",
        description: "Wide clear-span uPVC sliding doors connecting living areas outdoors.",
        image: "/images/site/cat-upvc-door.jpg",
      },
    ],
  },
  {
    tab: "Glass Railings",
    title: "Glass Railings",
    subtitle: "Railings: balcony, staircase, terrace.",
    cards: [
      {
        id: "gr-balcony",
        title: "Balcony railings",
        description: "Toughened glass with clean SS316 spigot or channel mounting.",
        image: "/images/site/cat-railing-spigot.jpg",
      },
      {
        id: "gr-staircase",
        title: "Staircase railings",
        description: "Frameless staircase balustrades with sleek handrails.",
        image: "/images/site/cat-railing-staircase.jpg",
      },
      {
        id: "gr-terrace",
        title: "Terrace railings",
        description: "Uninterrupted views built for exterior terrace safety.",
        image: "/images/site/cat-railing-channel.jpg",
      },
    ],
  },
  {
    tab: "Insect Blinds",
    title: "Insect Blinds",
    subtitle: "Insect blinds: pleated, sliding, roll-up, fixed mesh.",
    cards: [
      {
        id: "ib-pleated",
        title: "Pleated screens",
        description: "Collapsible low-track pleated mesh for balconies and doors.",
        image: "/images/site/cat-insect-pleated.jpg",
      },
      {
        id: "ib-sliding",
        title: "Sliding & zipline mesh",
        description: "Pet-friendly side-track screens for wide patio openings.",
        image: "/images/site/cat-insect-zipline.jpg",
      },
      {
        id: "ib-rollup",
        title: "Roll-up & motorized screens",
        description: "Compact overhead cassette and remote-controlled insect blinds.",
        image: "/images/site/cat-insect-motorized.jpg",
      },
      {
        id: "ib-fixed",
        title: "Fixed & security mesh",
        description: "High-tensile fixed mesh panels for clear airflow and safety.",
        image: "/images/site/cat-insect-security.jpg",
      },
    ],
  },
  {
    tab: "Appliances & Accessories",
    title: "Appliances & Accessories",
    subtitle:
      "Appliances & accessories: chimneys, hobs, built-in ovens, tandem drawers, corner units, tall pull-outs.",
    cards: [
      {
        id: "aa-chimneys",
        title: "Chimneys",
        description: "High-suction kitchen hoods integrated into your overhead cabinetry.",
        image: "/images/site/cat-app-chimney.jpg",
      },
      {
        id: "aa-hobs",
        title: "Hobs",
        description: "Built-in brass-burner glass hobs with flame-failure safety.",
        image: "/images/site/cat-app-hob.jpg",
      },
      {
        id: "aa-ovens",
        title: "Built-in ovens",
        description: "Flush-fitted convection ovens and microwaves in tall units.",
        image: "/images/site/cat-app-oven.jpg",
      },
      {
        id: "aa-tandem",
        title: "Tandem drawers & organizers",
        description: "Soft-close cutlery trays, under-sink units, and organizer drawers.",
        image: "/images/site/cat-acc-spice.jpg",
      },
      {
        id: "aa-corners-pullouts",
        title: "Corner units & tall pull-outs",
        description: "Heavy-duty larder pull-outs and full-swing blind corner baskets.",
        image: "/images/site/cat-acc-pantry.jpg",
      },
    ],
  },
];

const categoryTabs = [ALL_TAB, ...solutionSections.map((s) => s.tab)];

function resolveCategoryTab(rawParam: string): string {
  const q = rawParam.trim().toLowerCase();
  if (!q || q === "all products" || q === "all" || q === "all solutions") {
    return ALL_TAB;
  }

  const exact = categoryTabs.find((tab) => tab.toLowerCase() === q);
  if (exact) return exact;

  if (q.includes("kitchen") && !q.includes("accessor")) return "Modular Kitchens";
  if (q.includes("wardrobe")) return "Wardrobes";
  if (q.includes("upvc") || q.includes("ambiiance") || q.includes("ambiance")) {
    return "uPVC Windows (Ambiiance)";
  }
  if (q.includes("waw") || q.includes("aluminium") || q === "windows" || q.includes("window")) {
    return "Aluminium Windows (WAW)";
  }
  if (q.includes("door") || q.includes("lock")) return "Doors";
  if (q.includes("railing")) return "Glass Railings";
  if (q.includes("insect") || q.includes("blind") || q.includes("mesh")) return "Insect Blinds";
  if (
    q.includes("appliance") ||
    q.includes("accessor") ||
    q.includes("hob") ||
    q.includes("oven") ||
    q.includes("microwave") ||
    q.includes("washing") ||
    q.includes("faucet") ||
    q.includes("pantry") ||
    q.includes("organis") ||
    q.includes("organizer") ||
    q.includes("wall rail")
  ) {
    return "Appliances & Accessories";
  }

  return ALL_TAB;
}

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category") || ALL_TAB;
  const initialQuery = searchParams.get("q") || "";
  const resolvedFromUrl = resolveCategoryTab(urlCategory);

  const [prevUrlCategory, setPrevUrlCategory] = useState<string>(urlCategory);
  const [selectedTab, setSelectedTab] = useState<string>(resolvedFromUrl);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (urlCategory !== prevUrlCategory) {
    setPrevUrlCategory(urlCategory);
    setSelectedTab(resolveCategoryTab(urlCategory));
  }

  const { openConsultation } = useCart();

  const visibleSections = solutionSections
    .filter((sec) => selectedTab === ALL_TAB || sec.tab === selectedTab)
    .map((sec) => {
      if (!searchQuery.trim()) return sec;
      const q = searchQuery.toLowerCase().trim();
      const filteredCards = sec.cards.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          (c.description || "").toLowerCase().includes(q) ||
          sec.title.toLowerCase().includes(q)
      );
      return { ...sec, cards: filteredCards };
    })
    .filter((sec) => sec.cards.length > 0);

  const activeSectionMeta = solutionSections.find((s) => s.tab === selectedTab);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#4a4541] font-sans">
      <Navbar
        forceSolid={true}
        onMobileMenuToggle={() => setIsMobileMenuOpen(true)}
        onSearchSubmit={(q) => setSearchQuery(q)}
        onCategorySelect={(cat) => {
          setSelectedTab(resolveCategoryTab(cat));
          setSearchQuery("");
        }}
      />

      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onSelectCategory={(cat) => {
          setSelectedTab(resolveCategoryTab(cat));
          setSearchQuery("");
        }}
      />

      <main className="flex-1 w-full pt-28 sm:pt-36 pb-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
          {/* 1. BREADCRUMBS */}
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
              <li>
                <button
                  onClick={() => {
                    setSelectedTab(ALL_TAB);
                    setSearchQuery("");
                  }}
                  className="hover:text-[#4a4541] transition-colors cursor-pointer"
                >
                  {ALL_TAB}
                </button>
              </li>
              {selectedTab !== ALL_TAB && (
                <>
                  <li>
                    <span className="text-[#dcd7d0]">/</span>
                  </li>
                  <li className="font-medium text-[#4a4541]">{selectedTab}</li>
                </>
              )}
            </ol>
          </nav>

          {/* 2. HEADER TITLE & SUBTITLE */}
          <div className="text-center max-w-3xl mx-auto my-6 sm:my-8">
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-medium text-[#4a4541] tracking-tight leading-[1.1]">
              {activeSectionMeta ? activeSectionMeta.title : "Everything for Your Home"}
            </h1>
            <p className="mt-3 text-[14px] sm:text-[16px] text-[#76716d] leading-[24px] font-normal max-w-2xl mx-auto">
              {activeSectionMeta
                ? activeSectionMeta.subtitle
                : "Modular kitchens, wardrobes, doors, WAW aluminium & Ambiiance uPVC windows, glass railings, insect blinds, and built-in appliances — planned and fitted in Siliguri."}
            </p>
          </div>

          {/* 3. CATEGORY TABS */}
          <div className="flex items-center justify-start overflow-x-auto pb-2 mb-10 no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0">
            <div className="inline-flex mx-auto border border-[#dcd7d0] bg-white divide-x divide-[#dcd7d0]">
              {categoryTabs.map((tab) => {
                const isActive = selectedTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => {
                      setSelectedTab(tab);
                      setSearchQuery("");
                    }}
                    className={`relative px-4 sm:px-6 py-3 text-[13px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
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

          {/* Search Clear Notice (when keyword searched) */}
          {searchQuery && (
            <div className="mb-8 flex items-center justify-between bg-[#fbf7f4] border border-[#e6e0d8] px-4 py-2.5 rounded-xs text-xs sm:text-sm">
              <span className="text-[#4a4541]">
                Showing matching options for <strong>&ldquo;{searchQuery}&rdquo;</strong>
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-[#ff5d55] font-medium hover:underline cursor-pointer"
              >
                Clear search
              </button>
            </div>
          )}

          {/* 4. VISUAL PHOTO-CARD GRID (Classic Editorial Layout, No Retail Clutter) */}
          {visibleSections.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-base font-medium text-[#4a4541] mb-3">
                No matching designs found.
              </p>
              <button
                onClick={() => {
                  setSelectedTab(ALL_TAB);
                  setSearchQuery("");
                }}
                className="px-6 py-2.5 bg-[#ff5d55] hover:bg-[#e5473f] text-white rounded-[20px_2px_2px_2px] text-xs font-medium transition-colors cursor-pointer"
              >
                Show all solutions
              </button>
            </div>
          ) : (
            <div className="space-y-16">
              {visibleSections.map((section) => (
                <section key={section.tab} className="space-y-6">
                  {selectedTab === ALL_TAB && (
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-[#ece7e1]">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-medium text-[#332f2c]">
                          {section.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-[#76716d] mt-0.5">
                          {section.subtitle}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedTab(section.tab)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#ff5d55] hover:underline self-start sm:self-auto cursor-pointer shrink-0"
                      >
                        <span>View only {section.title}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                    {section.cards.map((card) => (
                      <div key={card.id} className="group flex flex-col">
                        {/* Clean Full-Bleed Image */}
                        <div className="relative aspect-4/3 bg-[#f6f4f0] overflow-hidden mb-3.5 rounded-xs">
                          <Image
                            src={card.image}
                            alt={`${card.title} — ${section.title}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Clean Title & One-Line Description */}
                        <div className="flex-1 space-y-1">
                          <h3 className="font-medium text-[17px] text-[#332f2c] leading-snug">
                            {card.title}
                          </h3>
                          {card.description && (
                            <p className="text-[13px] text-[#76716d] leading-relaxed">
                              {card.description}
                            </p>
                          )}
                        </div>

                        {/* Simple Studio Action */}
                        <div className="mt-3.5 pt-3 border-t border-[#f0ece6] flex items-center justify-between text-xs">
                          <button
                            type="button"
                            onClick={() => openConsultation(`${section.title} — ${card.title}`)}
                            className="font-medium text-[#4a4541] hover:text-[#ff5d55] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>Discuss in studio</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          <Link
                            href="/contact"
                            className="text-[#76716d] hover:text-[#4a4541] transition-colors"
                          >
                            Visit showroom
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          {/* 5. STUDIO EXPERIENCE STRIP */}
          <div className="mt-20 pt-12 border-t border-[#dcd7d0] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-3.5">
              <ShieldCheck className="w-6 h-6 text-[#ff5d55] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm text-[#4a4541]">Backed by Brand Warranties</h4>
                <p className="text-xs text-[#76716d] mt-0.5">
                  Genuine systems from WAW, Ambiiance, Meshworkz, Hafele, Bosch, Siemens &amp; KAFF.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <Store className="w-6 h-6 text-[#ff5d55] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm text-[#4a4541]">Siliguri Experience Studio</h4>
                <p className="text-xs text-[#76716d] mt-0.5">
                  Touch materials, shutters, profiles, and finishes in person on Sevoke Road.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <Sparkles className="w-6 h-6 text-[#ff5d55] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm text-[#4a4541]">Measured &amp; Fitted On Site</h4>
                <p className="text-xs text-[#76716d] mt-0.5">
                  Handled end-to-end by our own trained installation specialists across North Bengal.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <RotateCcw className="w-6 h-6 text-[#ff5d55] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm text-[#4a4541]">After-Sales Care</h4>
                <p className="text-xs text-[#76716d] mt-0.5">
                  Adjustments, servicing, and part support a call or WhatsApp away after handover.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <CartDrawer />
      <ConsultationModal />
      <Toast />
      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white text-[#76716d]">
          Loading solutions...
        </div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}
