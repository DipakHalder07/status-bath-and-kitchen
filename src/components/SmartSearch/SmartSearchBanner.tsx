"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, Search, SlidersHorizontal, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface SmartSearchBannerProps {
  onFilterApply?: (room: string, budget: string) => void;
}

export default function SmartSearchBanner({ onFilterApply }: SmartSearchBannerProps) {
  const [selectedRoom, setSelectedRoom] = useState("Living Room");
  const [selectedBudget, setSelectedBudget] = useState("Any Budget");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useCart();

  const rooms = ["Living Room", "Bedroom", "Dining Room", "Office & Study"];
  const budgets = ["Under ₹25,000", "₹25,000 - ₹60,000", "Above ₹60,000", "Any Budget"];

  const handleApply = () => {
    if (onFilterApply) {
      onFilterApply(selectedRoom, selectedBudget);
    }
    showToast(`Showing recommendations for ${selectedRoom} (${selectedBudget})`);
    setIsModalOpen(false);
    const elem = document.querySelector("#curated-products");
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-10 bg-[#fbf9f6] border-y border-stone-200/60">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-stone-900 via-zinc-900 to-stone-800 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c0262d]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Furniture Recommendation Assistant</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Find the right furniture for you
              </h2>
              <p className="text-sm text-stone-300 leading-relaxed">
                Tell us what you&apos;re looking for and we&apos;ll help you choose
                from our range of 2000+ ergonomically crafted products.
              </p>
            </div>

            {/* Quick Interactive Selector */}
            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center gap-3">
              <div className="w-full sm:w-auto">
                <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                  Space / Room
                </label>
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="w-full sm:w-44 bg-white text-gray-900 text-xs font-semibold px-3 py-2.5 rounded-xl border-none focus:ring-2 focus:ring-[#c0262d]"
                >
                  {rooms.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full sm:w-auto">
                <label className="block text-[11px] font-semibold text-stone-300 uppercase mb-1">
                  Budget
                </label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full sm:w-44 bg-white text-gray-900 text-xs font-semibold px-3 py-2.5 rounded-xl border-none focus:ring-2 focus:ring-[#c0262d]"
                >
                  {budgets.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full sm:w-auto pt-0 sm:pt-4">
                <button
                  onClick={handleApply}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#c0262d] hover:bg-[#a11c22] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group whitespace-nowrap"
                >
                  <span>Filter Products</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
