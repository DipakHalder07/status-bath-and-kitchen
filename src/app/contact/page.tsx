"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  ChevronDown,
  Building2,
  Truck,
  RotateCcw,
  Wrench,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import Navbar from "@/components/Header/Navbar";
import MobileDrawer from "@/components/Header/MobileDrawer";
import Footer from "@/components/Footer/Footer";
import CartDrawer from "@/components/Cart/CartDrawer";
import ConsultationModal from "@/components/Modals/ConsultationModal";
import Toast from "@/components/UI/Toast";
import { useCart } from "@/context/CartContext";
import { siteBrand } from "@/data/interioData";

const categoryChannels = [
  {
    id: "showroom",
    name: "Showroom visit & purchases",
    email: "showroom@statusbathkitchen.com",
    phone: "+91 98320 95793",
    whatsapp: "+91 98320 95793",
    escalationLabel: "To escalate showroom enquiries",
    escalationText: "Connect with our Showroom Manager:",
    escalationAction: "Visit Our Store",
    escalationEmail: "showroom@statusbathkitchen.com",
  },
  {
    id: "offline",
    name: "Offline order related",
    email: "showroom@statusbathkitchen.com",
    phone: "+91 98320 95793",
    whatsapp: "+91 98320 95793",
    escalationLabel: "To escalate store purchase matters",
    escalationText: "Raise a ticket for showroom orders:",
    escalationAction: "Raise New ticket",
    escalationEmail: "studiohelp@statusbathkitchen.com",
  },
  {
    id: "modular",
    name: "Modular kitchens related",
    email: "kithead@statusbathkitchen.com",
    phone: "+91 98320 95793",
    whatsapp: "+91 98320 95793",
    escalationLabel: "To escalate modular service matters",
    escalationText: "Write to our National Service Head:",
    escalationAction: "nsh.interio@statusbathkitchen.com",
    escalationEmail: "nsh.interio@statusbathkitchen.com",
  },
];

const inquiryTypes = [
  { id: "business", label: "Business Enquiry" },
  { id: "delivery", label: "Delivery Related" },
  { id: "damage", label: "Damage/Return" },
  { id: "service", label: "Installation/Service" },
];

const contactFaqs = [
  {
    q: "Can I customize the color of the modular kitchen cabinets?",
    a: "Yes, Status Bath and Kitchen offers an extensive range of customization options for modular kitchen cabinet colors, textures, finishes (anti-fingerprint matte, high gloss acrylic, thermal laminate, and natural veneers), and interior shelf layouts.",
  },
  {
    q: "Are modular kitchens designed to optimize storage space?",
    a: "Yes, our modular kitchens are engineered to utilize every cubic inch with tandem drawer units, blind corner carousels, full-extension tall larders, and overhead bi-fold mechanisms tailored to your floorplan.",
  },
  {
    q: "What materials are used for the modular kitchen countertops?",
    a: "We fabricate and supply high-density quartz countertops, composite marble, sintered stone, and polished granite designed to resist thermal shock, knife scratches, and turmeric or oil staining from daily cooking.",
  },
  {
    q: "Can I get assistance with designing my modular kitchen layout?",
    a: "Yes! Our master design consultants provide free 3D CAD visualizations, laser on-site measurements, and ergonomic guidance to finalize your dream kitchen before manufacturing starts.",
  },
  {
    q: "Is there a warranty for modular kitchen components?",
    a: "Yes, all our modular cabinetry comes with a 10-Year Comprehensive Warranty covering the BWP marine core, edgebanding, and Austrian soft-close hardware against manufacturing defects.",
  },
];

export default function ContactPage() {
  const { showToast, openConsultation } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeChannelId, setActiveChannelId] = useState("online");
  const [selectedInquiry, setSelectedInquiry] = useState("business");
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    query: "",
  });

  const activeChannel =
    categoryChannels.find((c) => c.id === activeChannelId) || categoryChannels[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.email) {
      showToast("Please fill in all mandatory fields (*)");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast("Thank you! Your query has been submitted.");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#4a4541] font-sans">
      {/* Top Header */}
      <Navbar forceSolid={true} onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />

      <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <main className="flex-1 w-full pt-28 sm:pt-36 pb-20">
        {/* 1. BREADCRUMBS */}
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
          <nav aria-label="Breadcrumb" className="py-4 text-[14px] text-[#76716d]">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="hover:text-[#4a4541] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-[#dcd7d0]">/</span>
              </li>
              <li className="font-medium text-[#4a4541]">Contact Us</li>
            </ol>
          </nav>
        </div>

        {/* 2. HERO BANNER WITH AUTHENTIC BACKGROUND & CORAL RED BADGE (Matching live interio.com) */}
        <div className="w-full relative h-48 sm:h-64 lg:h-80 overflow-hidden mb-8">
          <Image
            src="/images/interio/contact_hero.png"
            alt="Contact Us"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/10" />

          {/* Red Badge pinned bottom left matching live site */}
          <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 h-full relative">
            <div className="absolute bottom-6 sm:bottom-10 left-5 sm:left-10 lg:left-20">
              <h2 className="bg-[#ff5d55] !text-white font-medium text-2xl sm:text-3xl lg:text-[42px] leading-[46.2px] px-6 sm:px-8 py-3 sm:py-3.5 shadow-md inline-block">
                Contact Us
              </h2>
            </div>
          </div>
        </div>

        {/* 3. MAIN TOP-LEVEL CATEGORY TABS (Online order related | Offline order related | Modular kitchens related) */}
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
          <div className="border-b border-[#dcd7d0] mb-10 overflow-x-auto no-scrollbar">
            <ul role="tablist" className="flex items-center space-x-8 sm:space-x-12">
              {categoryChannels.map((channel) => {
                const isActive = activeChannelId === channel.id;
                return (
                  <li key={channel.id} role="tab">
                    <button
                      onClick={() => setActiveChannelId(channel.id)}
                      className={`relative py-4 text-[16px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                        isActive
                          ? "text-[#ff5d55]"
                          : "text-[#4a4541] hover:text-[#ff5d55]"
                      }`}
                    >
                      <span>{channel.name}</span>
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff5d55]" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 4. TWO-COLUMN LAYOUT: FORM ON LEFT (70%), CHANNELS ON RIGHT (30%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
            {/* LEFT COLUMN: WHAT ARE YOU LOOKING FOR? + INTERACTIVE FORM */}
            <div className="lg:col-span-8 space-y-6">
              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-medium text-[#4a4541] leading-[46.2px] tracking-tight">
                What are you looking for?
              </h2>

              {/* Joined Segmented Toolbar (Business Enquiry | Delivery Related | Damage/Return | Installation/Service) */}
              <div className="overflow-x-auto no-scrollbar pb-2 -mx-5 px-5 sm:mx-0 sm:px-0">
                <div className="inline-flex border border-[#dcd7d0] bg-white divide-x divide-[#dcd7d0]">
                  {inquiryTypes.map((inq) => {
                    const isSelected = selectedInquiry === inq.id;
                    return (
                      <button
                        key={inq.id}
                        type="button"
                        onClick={() => setSelectedInquiry(inq.id)}
                        className={`relative px-5 sm:px-6 py-4 text-sm sm:text-[16px] lg:text-[18px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-white text-[#4a4541] font-medium"
                            : "bg-[#faf8f5] text-[#76716d] hover:bg-white hover:text-[#4a4541]"
                        }`}
                      >
                        <span>{inq.label}</span>
                        {isSelected && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff5d55]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sub-heading */}
              <div className="pt-2">
                <strong className="text-[15px] font-medium text-[#4a4541] block mb-6">
                  We’re happy to contact you!
                </strong>

                {isSubmitted ? (
                  <div className="p-8 bg-[#fbf7f4] border border-[#dcd7d0] text-center space-y-3 animate-in fade-in">
                    <CheckCircle2 className="w-12 h-12 text-[#ff5d55] mx-auto" />
                    <h4 className="text-xl font-medium text-[#4a4541]">Inquiry Received</h4>
                    <p className="text-[14px] text-[#76716d] max-w-md mx-auto">
                      Thank you, {formData.name || "Customer"}. Your query regarding{" "}
                      <strong>{inquiryTypes.find((i) => i.id === selectedInquiry)?.label}</strong> has
                      been dispatched to our specialist team.
                    </p>
                    <p className="text-xs text-[#76716d]">
                      Our team will reach out at <strong>{formData.mobile}</strong> or email{" "}
                      <strong>{formData.email}</strong> shortly.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          mobile: "",
                          email: "",
                          city: "",
                          query: "",
                        });
                      }}
                      className="mt-4 px-6 py-2 bg-[#ff5d55] hover:bg-[#e5473f] text-white text-xs font-medium rounded-[20px_2px_2px_2px] transition-colors cursor-pointer"
                    >
                      Submit Another Query
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="block text-[13px] font-normal text-[#76716d]">
                        Full name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border-b border-[#dcd7d0] py-2 text-base sm:text-[15px] text-[#4a4541] focus:border-[#ff5d55] focus:outline-hidden bg-transparent"
                      />
                    </div>

                    {/* Mobile Number */}
                    <div className="space-y-1">
                      <label className="block text-[13px] font-normal text-[#76716d]">
                        Mobile number *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={formData.mobile}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            mobile: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        className="w-full border-b border-[#dcd7d0] py-2 text-base sm:text-[15px] text-[#4a4541] focus:border-[#ff5d55] focus:outline-hidden bg-transparent"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="block text-[13px] font-normal text-[#76716d]">
                        Email address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border-b border-[#dcd7d0] py-2 text-base sm:text-[15px] text-[#4a4541] focus:border-[#ff5d55] focus:outline-hidden bg-transparent"
                      />
                    </div>

                    {/* WhatsApp Checkbox */}
                    <div className="pt-1">
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          id="whatsapp-opt"
                          checked={whatsappOptIn}
                          onChange={(e) => setWhatsappOptIn(e.target.checked)}
                          className="w-4 h-4 mt-0.5 rounded-xs border-[#dcd7d0] text-[#ff5d55] focus:ring-[#ff5d55] cursor-pointer"
                        />
                        <label htmlFor="whatsapp-opt" className="text-[13px] text-[#4a4541] cursor-pointer">
                          <span className="font-medium block">Contact me on Whatsapp</span>
                          <span className="text-[11px] text-[#76716d] block">
                            Uncheck to opt-out of upcoming meetings and offer alerts
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* City / Location */}
                    <div className="space-y-1">
                      <label className="block text-[13px] font-normal text-[#76716d]">
                        City / Area
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Siliguri, Jalpaiguri, Kolkata..."
                        className="w-full border-b border-[#dcd7d0] py-2 text-base sm:text-[15px] text-[#4a4541] focus:border-[#ff5d55] focus:outline-hidden bg-transparent"
                      />
                    </div>

                    {/* Your Query */}
                    <div className="space-y-1">
                      <label className="block text-[13px] font-normal text-[#76716d]">
                        Your query *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={formData.query}
                        onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                        className="w-full border-b border-[#dcd7d0] py-2 text-base sm:text-[15px] text-[#4a4541] focus:border-[#ff5d55] focus:outline-hidden bg-transparent resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-brand-primary w-full sm:w-auto px-10 py-3.5 text-sm font-medium tracking-wide shadow-xs cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Query"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: CONTACT US WITH ONE OF THE CHANNEL CARD */}
            <div className="lg:col-span-4">
              <div className="bg-[#fbf7f4] border border-[#dcd7d0] p-6 sm:p-8 space-y-6">
                <h4 className="font-medium text-[#4a4541] text-[18px]">
                  Contact us with one of the channel
                </h4>

                <div className="space-y-5 text-[14px] text-[#4a4541]">
                  <div>
                    <div className="text-[12px] text-[#76716d] mb-0.5">Write to us on:</div>
                    <a
                      href={`mailto:${activeChannel.email}`}
                      className="font-medium text-[#4a4541] hover:text-[#ff5d55] break-all"
                    >
                      {activeChannel.email}
                    </a>
                  </div>

                  <div>
                    <div className="text-[12px] text-[#76716d] mb-0.5">One point customer care:</div>
                    <a
                      href={`tel:${activeChannel.phone}`}
                      className="font-medium text-[#4a4541] hover:text-[#ff5d55]"
                    >
                      {activeChannel.phone}
                    </a>
                  </div>

                  <div>
                    <div className="text-[12px] text-[#76716d] mb-0.5">Whatsapp us on:</div>
                    <a
                      href={`https://wa.me/91${activeChannel.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-emerald-700 hover:underline"
                    >
                      {activeChannel.whatsapp}
                    </a>
                  </div>

                  <div className="pt-4 border-t border-[#dcd7d0]">
                    <div className="text-[12px] text-[#76716d] mb-1 font-normal">
                      {activeChannel.escalationLabel}
                    </div>
                    <div className="text-[13px] text-[#4a4541] mb-2 font-medium">
                      {activeChannel.escalationText}
                    </div>
                    <a
                      href={`mailto:${activeChannel.escalationEmail}`}
                      className="inline-block text-xs font-medium text-[#ff5d55] hover:underline"
                    >
                      {activeChannel.escalationAction} &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. HOW CAN WE ASSIST YOU? (FAQ ACCORDION) */}
          <div className="mt-20 pt-12 border-t border-[#dcd7d0]">
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-medium text-[#4a4541] leading-tight mb-8">
              How can we assist you?
            </h2>

            <div className="border-t border-[#dcd7d0] divide-y divide-[#dcd7d0] max-w-4xl">
              {contactFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="py-4">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left text-[16px] font-medium text-[#4a4541] hover:text-[#ff5d55] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#76716d] transition-transform duration-200 shrink-0 ml-4 ${
                          isOpen ? "rotate-180 text-[#ff5d55]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="mt-3 text-[14px] text-[#76716d] leading-relaxed animate-in fade-in duration-150">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <ConsultationModal />
      <Toast />

      {/* Footer */}
      <Footer />
    </div>
  );
}
