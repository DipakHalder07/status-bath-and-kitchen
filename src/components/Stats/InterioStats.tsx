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
import { serviceStrip } from "@/data/interioData";

const icons: Record<string, LucideIcon> = {
  kitchens: ChefHat,
  bathrooms: Bath,
  wardrobes: DoorClosed,
  doors: DoorOpen,
  windows: AppWindow,
  appliances: Microwave,
  accessories: UtensilsCrossed,
};

export default function InterioStats() {
  return (
    <section className="py-16 sm:py-24 bg-[#ff5247] text-white">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          {serviceStrip.title}
        </h2>
        <p className="text-sm sm:text-base text-white/95 mt-2 sm:mt-3 font-normal max-w-2xl mx-auto">
          {serviceStrip.subtitle}
        </p>

        {/* Service Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-8 sm:gap-10 mt-12 sm:mt-16 max-w-6xl mx-auto">
          {serviceStrip.items.map((item) => {
            const Icon = icons[item.id] ?? ChefHat;
            return (
              <div key={item.id} className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/80 flex items-center justify-center">
                  <Icon className="w-7 h-7 sm:w-9 sm:h-9" strokeWidth={1.75} />
                </div>
                <p className="text-sm sm:text-base text-white mt-3 font-semibold">
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
