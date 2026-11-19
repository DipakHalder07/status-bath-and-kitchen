"use client";

import React from "react";
import {
  ChefHat,
  Bath,
  DoorClosed,
  DoorOpen,
  AppWindow,
  Microwave,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { serviceStrip } from "@/data/statusData";

const icons: Record<string, LucideIcon> = {
  kitchens: ChefHat,
  bathrooms: Bath,
  wardrobes: DoorClosed,
  doors: DoorOpen,
  windows: AppWindow,
  appliances: Microwave,
  accessories: UtensilsCrossed,
};

export default function StatusStats() {
  return (
    <section className="status-section py-16 sm:py-24 bg-[#ff5d55] text-white">
      <div className="status-container max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 text-center">
        {/* Heading */}
        <h2 className="text-xl sm:text-2xl lg:text-[30px] font-medium tracking-tight !text-white">
          {serviceStrip.title}
        </h2>
        <p className="text-xs sm:text-sm text-white/95 mt-1.5 sm:mt-2 font-normal max-w-2xl mx-auto">
          {serviceStrip.subtitle}
        </p>

        {/* Service Columns: horizontal swipe on mobile, clean 7-column grid on desktop */}
        <div className="flex sm:grid sm:grid-cols-4 lg:grid-cols-7 gap-5 sm:gap-8 lg:gap-10 mt-8 sm:mt-16 max-w-6xl mx-auto overflow-x-auto no-scrollbar pb-2 sm:pb-0 -mx-5 px-5 sm:mx-auto sm:px-0 justify-start sm:justify-center">
          {serviceStrip.items.map((item) => {
            const Icon = icons[item.id] ?? ChefHat;
            return (
              <div key={item.id} className="flex flex-col items-center shrink-0 w-24 sm:w-auto text-center">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border-2 border-white/80 flex items-center justify-center">
                  <Icon className="w-6 h-6 sm:w-9 sm:h-9" strokeWidth={1.75} />
                </div>
                <p className="text-xs sm:text-base text-white mt-2.5 sm:mt-3 font-medium text-center leading-snug">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

