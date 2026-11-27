"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { liveFaqs } from "@/data/statusData";
import { useCart } from "@/context/CartContext";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { openConsultation } = useCart();

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="status-section py-12 sm:py-16 lg:py-[76px] bg-[#f5f0ea]">
      <div className="status-container max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        {/* FAQ Section: How can we assist you? */}
        <div className="w-full">
          <div className="flex items-baseline justify-between gap-3 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-[28px] font-medium text-[#332f2c] tracking-tight">
              How can we assist you?
            </h2>
            <button
              onClick={() => openConsultation("General Enquiry")}
              className="text-xs sm:text-sm font-normal text-[#332f2c] border-b border-[#332f2c] pb-0.5 hover:text-[#ff5d55] hover:border-[#ff5d55] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Ask a question
            </button>
          </div>

          <div className="w-full divide-y divide-[#dbd2c7] border-y border-[#dbd2c7]">
            {liveFaqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={index} className="py-5">
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-medium text-[#4a4541] group-hover:text-[#ff5d55] transition-colors pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#76716d] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#ff5d55]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="mt-4 text-sm text-[#76716d] leading-relaxed font-normal animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
