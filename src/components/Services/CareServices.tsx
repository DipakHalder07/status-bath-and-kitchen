"use client";

import React from "react";
import { ArrowRight, PencilRuler, Ruler, Wrench, LifeBuoy, type LucideIcon } from "lucide-react";
import { careServicesList } from "@/data/statusData";
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
    <section id="care-services" className="status-section py-14 sm:py-20 bg-white">
      <div className="status-container max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 gap-4">
          <h2 className="text-xl sm:text-2xl lg:text-[28px] font-medium text-[#332f2c] tracking-tight">
            How it works
          </h2>
          <button
            type="button"
            onClick={() => openConsultation("Book a consultation")}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-normal text-[#332f2c] border-b border-[#332f2c] pb-0.5 hover:text-[#ff5d55] hover:border-[#ff5d55] transition-colors cursor-pointer shrink-0"
          >
            <span>Book a consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4-Step Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {careServicesList.map((service) => {
            const Icon = icons[service.icon] ?? Wrench;
            return (
              <div
                key={service.id}
                className="status-card status-card-hover bg-white rounded-md sm:rounded-sm p-5 sm:p-8 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all flex flex-col justify-between text-center group cursor-pointer"
                onClick={() => openConsultation(service.title)}
              >
                <div>
                  {/* Step Icon */}
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#f5f0ea] text-[#ff5d55]">
                    <Icon className="w-7 h-7" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-[#4a4541] mb-2 group-hover:text-[#ff5d55] transition-colors">
                    {service.step ? (
                      <>
                        <span className="text-[#ff5d55]">{service.step} &middot; </span>
                        {service.title}
                      </>
                    ) : (
                      service.title
                    )}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#76716d] leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 pt-4">
                  <span className="text-sm font-medium text-[#4a4541] border-b border-[#4a4541] pb-0.5 group-hover:text-[#ff5d55] group-hover:border-[#ff5d55] transition-colors">
                    {service.cta || "Enquire now"}
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
