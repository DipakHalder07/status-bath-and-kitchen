"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { liveFaqs } from "@/data/interioData";
import { useCart } from "@/context/CartContext";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { openConsultation } = useCart();

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-16 sm:py-24 bg-white border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 space-y-16">
        {/* FAQ Section: How can we assist you? */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1c1c1c] tracking-tight">
              How can we assist you?
            </h2>
            <button
              onClick={() => openConsultation("General Enquiry")}
              className="text-sm font-semibold text-gray-900 border-b-2 border-gray-900 pb-0.5 hover:text-[#c0262d] hover:border-[#c0262d] transition-colors cursor-pointer"
            >
              Ask a question
            </button>
          </div>

          <div className="w-full divide-y divide-gray-200 border-y border-gray-200">
            {liveFaqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={index} className="py-5">
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#c0262d] transition-colors pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-600 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#c0262d]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="mt-4 text-sm text-gray-600 leading-relaxed font-normal animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SEO Rich Content Section */}
        <div className="w-full pt-10 border-t border-gray-200 text-gray-700 space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c1c1c] tracking-tight mb-6">
              Modular Kitchens, Bathrooms, Wardrobes, Doors &amp; Windows by Status Bath and Kitchen
            </h2>
            <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-gray-600 font-normal">
              <div>
                <h3 className="font-bold text-gray-900 mb-1.5 text-sm sm:text-base">
                  Modular kitchens planned around you
                </h3>
                <p>
                  A good kitchen starts with how you cook, store and clean. We plan L-shaped, U-shaped, parallel, island and straight kitchens to suit your room, then help you choose shutters, countertops, hardware and lighting. Appliances such as chimneys, hobs, built-in ovens, microwaves and dishwashers can be planned into the design from the start, so everything fits and works together.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-1.5 text-sm sm:text-base">
                  Bathrooms that are easy to live with
                </h3>
                <p>
                  From vanity units and shower enclosures to bathtubs, taps, showers and sanitaryware, we help you plan a bathroom that looks calm and stays easy to clean. Wall-hung units, recessed niches and mirror cabinets keep counters clear and make smaller bathrooms feel bigger.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-1.5 text-sm sm:text-base">
                  Wardrobes, doors and windows
                </h3>
                <p>
                  Fitted, hinged and walk-in wardrobes are planned around what you actually store, with interiors for hanging, folding, shoes and accessories. We also supply and install entrance doors, interior doors, sliding glass doors and windows, so the finishes across your home match.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-1.5 text-sm sm:text-base">
                  Kitchen accessories that make a difference
                </h3>
                <p>
                  Sinks, faucets, tall pantry units, wall rail systems and spice and bottle organisers are small choices that change how a kitchen feels every day. We will suggest the ones that suit your layout and your cooking.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-1.5 text-sm sm:text-base">
                  How to plan your project
                </h3>
                <p>
                  Measure your space: note wall lengths, ceiling height and the positions of windows, doors, plumbing and electrical points.
                </p>
                <p className="mt-2">
                  Think about how you use it: who cooks, what you store, and what annoys you about the current space.
                </p>
                <p className="mt-2">
                  Set a budget early: it helps us suggest materials and appliances that give you the most value.
                </p>
                <p className="mt-2">
                  See finishes in person: colours and textures look different under your own lighting, so compare samples before you decide.
                </p>
              </div>

              {/* SEO Category Links */}
              <div className="pt-6 border-t border-gray-200 space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 text-sm">
                    Explore Modular Kitchens
                  </h4>
                  <p className="text-gray-500 text-xs">
                    L-Shaped Kitchens | U-Shaped Kitchens | Island Kitchens | Parallel Kitchens | Straight Kitchens | Handleless Kitchens | Classic Shaker Kitchens | Two-Tone Kitchens
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-1 text-sm">
                    Explore Bathrooms
                  </h4>
                  <p className="text-gray-500 text-xs">
                    Vanity Units | Shower Enclosures | Bathtubs | Taps &amp; Showers | Sanitaryware | Bathroom Storage
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-1 text-sm">
                    Explore Wardrobes, Doors &amp; Windows
                  </h4>
                  <p className="text-gray-500 text-xs">
                    Fitted Wardrobes | Hinged Wardrobes | Walk-in Wardrobes | Wardrobe Interiors | Entrance Doors | Interior Doors | Sliding Glass Doors | Sliding Windows | Casement Windows | Smart Locks &amp; Hardware
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-1 text-sm">
                    Explore Appliances &amp; Kitchen Accessories
                  </h4>
                  <p className="text-gray-500 text-xs">
                    Chimneys | Hobs &amp; Cooking Ranges | Built-in Ovens | Microwaves | Dishwashers | Refrigerators | Washing Machines | Sinks | Faucets | Tall Pantry Units | Wall Rail Systems | Spice &amp; Bottle Organisers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
