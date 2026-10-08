"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, Sparkles } from "lucide-react";

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div className="bg-stone-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl border border-stone-800 flex items-center gap-2.5">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
