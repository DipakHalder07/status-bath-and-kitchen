"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Heart, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { allProductsCatalog } from "@/data/productsData";

export default function CartDrawer() {
  const {
    wishlist,
    toggleWishlist,
    isCartOpen,
    closeCart,
    openConsultation,
  } = useCart();

  if (!isCartOpen) return null;

  const savedProducts = allProductsCatalog.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#ff5d55]" />
            <div>
              <h2 className="text-base font-semibold text-gray-900 leading-tight">
                Saved Designs ({savedProducts.length})
              </h2>
              <span className="text-[11px] text-gray-500 block">
                Showroom Consultation &amp; Enquiry List
              </span>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close Saved Designs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {savedProducts.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Heart className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="text-sm font-semibold text-gray-800">
                No saved designs yet
              </p>
              <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                We do not sell online. Browse our designs and tap the heart icon on any modular kitchen, window, railing, or blind to save it for your studio visit.
              </p>
              <button
                onClick={() => {
                  closeCart();
                  openConsultation("Design Consultation");
                }}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#ff5d55] text-white text-xs font-semibold hover:bg-[#e5473f] transition-colors cursor-pointer"
              >
                Book a consultation
              </button>
            </div>
          ) : (
            savedProducts.map((product) => (
              <div
                key={product.id}
                className="p-3.5 rounded-2xl border border-gray-100 bg-stone-50/40 flex gap-3.5 items-center justify-between"
              >
                <Link
                  href={`/products/${product.id}`}
                  onClick={closeCart}
                  className="relative w-20 h-16 rounded-xl overflow-hidden bg-white shrink-0 border border-gray-100"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${product.id}`}
                    onClick={closeCart}
                    className="text-xs font-semibold text-gray-900 line-clamp-1 hover:text-[#ff5d55]"
                  >
                    {product.name}
                  </Link>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    {product.category}
                  </div>
                  <div className="text-[11px] text-[#ff5d55] mt-1 font-medium">
                    Custom Built • Showroom Consultation
                  </div>
                </div>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer shrink-0"
                  title="Remove saved design"
                  aria-label="Remove saved design"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer / Studio Enquiry */}
        {savedProducts.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-[#faf8f5] space-y-3.5">
            <div className="text-[11px] text-[#76716d] bg-stone-100/80 p-2.5 rounded-lg leading-relaxed text-center">
              We do not sell online. Share your saved designs on WhatsApp or visit our Siliguri Experience Studio to view finishes and discuss your project.
            </div>

            <a
              href={`https://wa.me/919832095793?text=${encodeURIComponent(
                `*Status Bath & Kitchen - Saved Designs Enquiry*\n` +
                `----------------------------------------\n` +
                savedProducts.map((p, idx) => `${idx + 1}. ${p.name} (${p.category})`).join("\n") +
                `\n----------------------------------------\n` +
                `I would like to visit your Experience Studio / enquire about custom design and quotation.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>Send Enquiry on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                closeCart();
                openConsultation("Showroom Visit Enquiry");
              }}
              className="w-full py-2.5 rounded-xl border border-[#4a4541] hover:bg-[#4a4541] hover:text-white text-[#4a4541] text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book Studio Visit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
