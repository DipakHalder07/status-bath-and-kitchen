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
    cartTotal,
    cartSavings,
    openConsultation,
  } = useCart();

  if (!isCartOpen) return null;

  const finalTotal = cartTotal;

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
            <h2 className="text-base font-extrabold text-gray-900">
              Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h2>
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

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-extrabold text-gray-900">
                      ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                    {item.product.mrp > item.product.price && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{(item.product.mrp * item.quantity).toLocaleString("en-IN")}
                      </span>
                    )}
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

        {/* Footer / Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-[#faf8f5] space-y-4">
            {/* Bill Summary */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>
              {cartSavings > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Product Savings</span>
                  <span>-₹{cartSavings.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-extrabold text-gray-900">
                <span>Estimated Total</span>
                <span className="text-[#c0262d]">
                  ₹{finalTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Quote Request Button (online checkout is not set up) */}
            <button
              onClick={() => {
                closeCart();
                openConsultation("Order Enquiry");
              }}
              className="w-full py-3.5 rounded-2xl bg-[#c0262d] hover:bg-[#a11c22] text-white text-xs font-bold transition-all shadow-md shadow-red-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Reassurance */}
            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Our team will confirm prices, availability and delivery with you before you pay.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
