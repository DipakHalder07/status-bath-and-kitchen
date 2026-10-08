"use client";

import React, { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { siteBrand } from "@/data/interioData";

export default function ConsultationModal() {
  const { isConsultationOpen, closeConsultation, consultationType, showToast } =
    useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [mode, setMode] = useState("Home visit");
  const [submitted, setSubmitted] = useState(false);

  if (!isConsultationOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || phone.length < 10) {
      showToast("Please enter a valid name and 10-digit mobile number.");
      return;
    }
    setSubmitted(true);
    showToast(`Thank you! Our design team will call you on ${phone}.`);
    setTimeout(() => {
      setSubmitted(false);
      closeConsultation();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeConsultation}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl z-50 animate-in zoom-in-95 duration-200">
        <button
          onClick={closeConsultation}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Request Received!
            </h3>
            <p className="text-xs text-gray-600 max-w-sm mx-auto">
              Thank you, {name}. Our design team will get in touch about your{" "}
              <span className="font-semibold text-gray-800">
                {consultationType}
              </span>{" "}
              enquiry.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-[#c0262d] uppercase tracking-wider">
                Design Consultation
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-0.5">
                Book a consultation for {consultationType}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Tell us a little about your project and our design team will call you back to plan the next steps.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 focus:border-[#c0262d] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, ""))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 focus:border-[#c0262d] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    City / Area
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Your city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 focus:border-[#c0262d] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Preferred Consultation Mode
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Home visit", "Studio visit", "Video call"].map(
                    (m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMode(m)}
                        className={`py-2 px-2 text-[11px] font-semibold rounded-xl border transition-all text-center ${
                          mode === m
                            ? "bg-red-50 text-[#c0262d] border-[#c0262d]"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {m}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#c0262d] hover:bg-[#a11c22] text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-red-600/20"
                >
                  Request a Call Back
                </button>
              </div>

              <p className="text-[10px] text-gray-400 text-center">
                By submitting, you agree to be contacted by {siteBrand.name} about your enquiry.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
