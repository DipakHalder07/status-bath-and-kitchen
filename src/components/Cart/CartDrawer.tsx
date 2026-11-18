"use client";

import React from "react";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    openConsultation,
  } = useCart();

  if (!isCartOpen) return null;

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
            <ShoppingBag className="w-5 h-5 text-[#c0262d]" />
            <div>
              <h2 className="text-base font-extrabold text-gray-900 leading-tight">
                Showroom Shortlist ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
              <span className="text-[10px] text-gray-500 block">In-Store Purchase &amp; Consultation</span>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="text-sm font-bold text-gray-800">
                Your cart is currently empty
              </p>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Planning a kitchen, bathroom, wardrobe, doors or windows? Book a consultation and we will put together a quotation for you.
              </p>
              <button
                onClick={() => {
                  closeCart();
                  openConsultation("Design Consultation");
                }}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#c0262d] text-white text-xs font-bold hover:bg-[#a11c22] transition-colors"
              >
                Book a consultation
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="p-3.5 rounded-2xl border border-gray-100 bg-stone-50/40 flex gap-3.5 items-start justify-between"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white shrink-0 border border-gray-100">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 line-clamp-1">
                    {item.product.name}
                  </h4>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    {item.product.warranty || "Brand Warranty Included"}
                  </div>

                  <div className="mt-2">
                    <span className="text-xs font-semibold text-[#8c827a] tracking-wide uppercase">
                      Price on Request
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-gray-200 bg-white rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-l-lg"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-r-lg"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / In-Store Enquiry */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-[#faf8f5] space-y-3.5">
            {/* Shortlist Summary */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-700 font-medium">
                <span>Shortlisted Items</span>
                <span className="font-bold text-gray-900">
                  {cart.reduce((s, i) => s + i.quantity, 0)} Products
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Pricing</span>
                <span className="font-semibold text-gray-800">Custom Showroom Quote</span>
              </div>
            </div>

            {/* Notice: We sell in our store */}
            <div className="text-[11px] text-[#76716d] bg-stone-100/80 p-2.5 rounded-lg leading-relaxed text-center">
              We sell exclusively at our store. Send your shortlist to WhatsApp or book a visit to view finishes and finalize your order.
            </div>

            {/* Direct WhatsApp Shortlist Button */}
            <a
              href={`https://wa.me/919832095793?text=${encodeURIComponent(
                `*Status Bath & Kitchen - Showroom Shortlist Enquiry*\n` +
                `----------------------------------------\n` +
                cart.map((i, idx) => `${idx + 1}. ${i.product.name} (Qty: ${i.quantity})`).join("\n") +
                `\n----------------------------------------\n` +
                `Total Items: ${cart.reduce((s, i) => s + i.quantity, 0)}\n` +
                `I would like to visit your showroom / enquire about bespoke pricing and in-store availability.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>Send Shortlist to WhatsApp (+91 98320 95793)</span>
            </a>

            {/* Book In-Store Consultation */}
            <button
              onClick={() => {
                closeCart();
                openConsultation("Showroom Visit Shortlist Enquiry");
              }}
              className="w-full py-2.5 rounded-xl border border-[#4a4541] hover:bg-[#4a4541] hover:text-white text-[#4a4541] text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book Showroom Visit &amp; Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
