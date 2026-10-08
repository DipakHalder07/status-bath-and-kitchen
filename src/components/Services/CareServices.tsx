"use client";

import React from "react";
import { useCart } from "@/context/CartContext";

export default function CareServices() {
  const { showToast } = useCart();

  const services = [
    {
      id: "reupholstery",
      title: "Reupholstery",
      image: "https://interio.com/media/.renditions/wysiwyg/B2C-Homepage/Reupholstery_Sofa.png",
      description: "Give your furniture a refined new look to uplift its style and make it last longer.",
    },
    {
      id: "cleaning",
      title: "Cleaning",
      image: "https://interio.com/media/.renditions/wysiwyg/B2C-Homepage/Cleaning_Sofa.png",
      description: "Treat yourself to luxuriously clean sofas, chairs, and carpets.",
    },
    {
      id: "repainting",
      title: "Repainting",
      image: "https://interio.com/media/.renditions/wysiwyg/B2C-Homepage/Repainting_Almirah.png",
      description: "Give your wardrobes and almirahs a fresh coat of paint and keep them looking brand new.",
    },
  ];

  return (
    <section id="care-services" className="py-14 sm:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1c1c1c] tracking-tight">
            Furniture care services
          </h2>
          <button
            onClick={() => showToast("Opening Furniture Care Services catalog...")}
            className="text-sm font-semibold text-gray-900 border-b border-gray-900 pb-0.5 hover:text-[#c0262d] hover:border-[#c0262d] transition-colors cursor-pointer"
          >
            View all
          </button>
        </div>

        {/* 3 Bordered Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-none sm:rounded-sm p-8 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all flex flex-col justify-between text-center group cursor-pointer"
              onClick={() => showToast(`Inquiring about ${service.title} service...`)}
            >
              <div>
                {/* Service Icon / Image */}
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="max-w-full max-h-full object-contain"
                  />
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
                  Read More
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
