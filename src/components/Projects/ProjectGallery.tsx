"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Expand, X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ProjectItem {
  id: string;
  image: string;
  title: string;
  category: string;
  location: string;
  alt: string;
}

const projects: ProjectItem[] = [
  {
    id: "curtain-wall-siliguri",
    image: "/images/projects/project-05-curtain-wall.webp",
    title: "Double-Height Structural Glazing & Sliding Doors",
    category: "Curtain Wall & Glazing",
    location: "Siliguri",
    alt: "Custom white residence featuring a double-height glass facade and sliding balcony windows installed in Siliguri",
  },
  {
    id: "villa-railings-siliguri",
    image: "/images/projects/project-01-residence-railings.webp",
    title: "Contemporary Villa Glazing & Glass Balustrades",
    category: "Windows & Railings",
    location: "Siliguri",
    alt: "Modern multi-storey residence fitted with architectural windows and frameless glass balcony railings",
  },
  {
    id: "pleated-screen-siliguri",
    image: "/images/projects/project-03-pleated-screen.webp",
    title: "Pleated Balcony Insect Screen Installation",
    category: "Insect Blinds",
    location: "Siliguri",
    alt: "Smooth-gliding collapsible pleated insect screen fitted across a wide residential balcony opening",
  },
  {
    id: "terrace-pavilion-siliguri",
    image: "/images/projects/project-02-terrace-glazing.webp",
    title: "Rooftop Glass Pavilion & Frameless Terrace Railing",
    category: "Glass Railings & Glazing",
    location: "Siliguri",
    alt: "Contemporary residence rooftop glass lounge enclosure and laminated glass balcony railings",
  },
  {
    id: "heritage-casement-nb",
    image: "/images/projects/project-04-heritage-windows.webp",
    title: "Classical Arched & Casement Window Package",
    category: "uPVC & Aluminium Windows",
    location: "North Bengal",
    alt: "Multi-level classic residence elevation fitted with custom arched fixed and casement window frames",
  },
  {
    id: "estate-fenestration-nb",
    image: "/images/projects/project-06-estate-elevation.webp",
    title: "Full-Elevation Architectural Window System",
    category: "Full-Home Fenestration",
    location: "North Bengal",
    alt: "Panoramic exterior view showing complete architectural window installations across three residential floors",
  },
];

export default function ProjectGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { openConsultation } = useCart();

  const activeProject = activeIndex !== null ? projects[activeIndex] : null;

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + projects.length) % projects.length);
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % projects.length);
  };

  return (
    <section
      id="project-gallery"
      className="status-section py-14 sm:py-20 bg-[#fcfaf7] border-y border-stone-200/40 scroll-mt-24"
    >
      <div className="status-container max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-medium text-[#ff5d55] uppercase tracking-wider block">
              Project gallery
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-[28px] font-medium text-[#332f2c] tracking-tight leading-snug">
              Recent installations in Siliguri &amp; North Bengal
            </h2>
            <p className="text-xs sm:text-sm text-[#76716d] leading-relaxed font-normal">
              A glimpse into completed residences fitted by our own installation team — across
              aluminium &amp; uPVC windows, frameless glass railings, and pleated insect screens.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openConsultation("Site Visit & Project Consultation")}
            className="self-start sm:self-auto text-xs sm:text-sm font-normal text-[#332f2c] border-b border-[#332f2c] pb-0.5 hover:text-[#ff5d55] hover:border-[#ff5d55] transition-colors cursor-pointer shrink-0"
          >
            Book a site visit
          </button>
        </div>

        {/* 6-Tile Responsive Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, idx) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className="group relative text-left rounded-md overflow-hidden aspect-[4/5] bg-stone-200 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <Image
                src={project.image}
                alt={project.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Top-right Zoom badge */}
              <span className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs text-white flex items-center justify-center opacity-85 group-hover:opacity-100 group-hover:bg-[#ff5d55] transition-all">
                <Expand className="w-3.5 h-3.5" />
              </span>

              {/* Bottom Metadata */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white space-y-1.5">
                <div className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-wider text-white/85 font-medium">
                  <span>{project.category}</span>
                  <span className="inline-flex items-center gap-1 text-white/80">
                    <MapPin className="w-3 h-3 text-[#ff5d55]" />
                    {project.location}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-medium !text-white leading-snug">
                  {project.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-xl overflow-hidden shadow-2xl grid grid-cols-1 sm:grid-cols-12"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Close project preview"
              className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Enlarged Image */}
            <div className="sm:col-span-7 relative aspect-[4/5] bg-stone-900">
              <Image
                src={activeProject.image}
                alt={activeProject.alt}
                fill
                sizes="(max-width: 640px) 100vw, 480px"
                className="object-cover"
              />
              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous project"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Next project"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Project Summary & Enquiry CTA */}
            <div className="sm:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
              <div className="space-y-3 pt-4 sm:pt-0">
                <span className="inline-block text-[11px] font-medium uppercase tracking-wider text-[#ff5d55]">
                  {activeProject.category}
                </span>
                <h3 className="text-xl font-medium text-[#332f2c] leading-snug">
                  {activeProject.title}
                </h3>
                <div className="inline-flex items-center gap-1.5 text-xs text-[#76716d]">
                  <MapPin className="w-3.5 h-3.5 text-[#ff5d55]" />
                  <span>{activeProject.location}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#76716d] leading-relaxed pt-2">
                  Custom measured on-site and fitted by Status Bath &amp; Kitchen&apos;s installation
                  specialists. Visit our Sevoke Road Experience Studio to review hardware and finish
                  samples in person.
                </p>
              </div>

              <div className="pt-6 space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    const projectTitle = activeProject.title;
                    setActiveIndex(null);
                    openConsultation(`Similar Project: ${projectTitle}`);
                  }}
                  className="w-full py-3 px-4 rounded-md bg-[#ff5d55] hover:bg-[#e5473f] text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Plan a similar installation</span>
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

