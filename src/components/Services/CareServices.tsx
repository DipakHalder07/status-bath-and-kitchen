"use client";

import React from "react";
import { PencilRuler, Ruler, Wrench, LifeBuoy, type LucideIcon } from "lucide-react";
import { careServicesList } from "@/data/interioData";
import { useCart } from "@/context/CartContext";

const icons: Record<string, LucideIcon> = {
  consultation: PencilRuler,
  measurement: Ruler,
  installation: Wrench,
  support: LifeBuoy,
};

export default function CareServices() {
  const { openConsultation } = useCart();

  return (
    <section id="care-services" className="py-14 sm:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1c1c1c] tracking-tight">
            Our services
          </h2>
          <button
            onClick={() => openConsultation("Design Consultation")}
            className="text-sm font-semibold text-gray-900 border-b border-gray-900 pb-0.5 hover:text-[#c0262d] hover:border-[#c0262d] transition-colors cursor-pointer"
          >
            Talk to us
          </button>
        </div>

        {/* Bordered Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {careServicesList.map((service) => {
            const Icon = icons[service.icon] ?? Wrench;
            return (
              <div
                key={service.id}
                className="bg-white rounded-none sm:rounded-sm p-8 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all flex flex-col justify-between text-center group cursor-pointer"
                onClick={() => openConsultation(service.title)}
              >
                <div>
                  {/* Service Icon */}
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#f5f0ea] text-[#ff5247]">
                    <Icon className="w-7 h-7" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-xl font-bold text-[#ff5247] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 pt-4">
                  <span className="text-sm font-semibold text-gray-900 border-b border-gray-900 pb-0.5 group-hover:text-[#c0262d] group-hover:border-[#c0262d] transition-colors">
                    Enquire now
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
