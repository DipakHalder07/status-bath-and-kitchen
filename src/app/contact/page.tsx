"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  CheckCircle2,
  ChevronDown,
  Building2,
  Truck,
  RotateCcw,
  Wrench,
  Sparkles,
  HelpCircle,
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

const inquiryTypes = [
  { id: "business", label: "Business Enquiry", icon: Building2 },
  { id: "delivery", label: "Delivery Related", icon: Truck },
  { id: "damage", label: "Damage/Return", icon: RotateCcw },
  { id: "service", label: "Installation/Service", icon: Wrench },
  { id: "design", label: "Design Consultation", icon: Sparkles },
];

const categoryChannels = [
  {
    id: "online",
    name: "Online order related",
    email: "onlineorders@statusbathkitchen.com",
    phone: "1800-267-1122",
    whatsapp: "+91 93216 65511",
    escalationEmail: "escalations@statusbathkitchen.com",
  },
  {
    id: "offline",
    name: "Offline order related",
    email: "showroom@statusbathkitchen.com",
    phone: "080-67436743",
    whatsapp: "+91 93216 65511",
    escalationEmail: "studiohelp@statusbathkitchen.com",
  },
  {
    id: "modular",
    name: "Modular kitchens & Interiors related",
    email: "kitchendesign@statusbathkitchen.com",
    phone: "1800-267-1122",
    whatsapp: "+91 93216 65511",
    escalationEmail: "interiordesign@statusbathkitchen.com",
  },
];

const contactFaqs = [
  {
    q: "Can I customize the color and finish of modular kitchen cabinets?",
    a: "Yes, Status Bath and Kitchen offers extensive customization options for cabinet colors, surface materials (acrylic, laminate, PU lacquer, glass, and veneer), and internal configurations tailored to your exact floorplan.",
  },
  {
    q: "Are modular kitchens designed to optimize storage space?",
    a: "Absolutely! Our kitchens are thoughtfully engineered with pull-out tandem drawers, tall pantry larder units, LeMans corner carousels, and overhead lift-up bi-fold cabinets to utilize every cubic inch of kitchen volume.",
  },
  {
    q: "What materials are used for the modular countertops?",
    a: "We supply and precision-fabricate premium non-porous quartz surfaces, composite Calacatta marble, natural granite, and sintered stone that resist stains, thermal shock, and scratch damage from heavy daily cooking.",
  },
  {
    q: "Can I get assistance with designing my layout before purchasing?",
    a: "Yes! Our master designers offer complimentary 3D photorealistic visualization and on-site laser measurements so you can see your layout, colors, and appliances in full detail before manufacturing begins.",
  },
  {
    q: "What warranty coverage is included with Status installations?",
    a: "All our modular kitchen and wardrobe cabinetry includes a 10-Year Comprehensive Warranty against delamination, moisture intrusion, and hardware failure, along with complimentary periodic check-up services.",
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
    pincode: "",
    city: "",
    query: "",
  });

  const activeChannel =
    categoryChannels.find((c) => c.id === activeChannelId) || categoryChannels[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.email || !formData.pincode) {
      showToast("Please fill in all mandatory fields (*)");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast("Thank you! Your inquiry has been registered. Our team will contact you shortly.");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      {/* 1. Header (Solid White Header matching interio.com) */}
      <Navbar forceSolid={true} onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />

      <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <main className="flex-1 w-full pt-28 sm:pt-36 pb-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-gray-500">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="hover:text-gray-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-gray-300">/</span>
              </li>
              <li className="font-semibold text-gray-900">Contact Us</li>
            </ol>
          </nav>

          {/* 2. HERO SHOWROOM BANNER WITH CORAL RED 'Contact Us' BADGE */}
          <div className="relative w-full h-56 sm:h-72 lg:h-96 rounded-xs overflow-hidden mb-12 sm:mb-16">
            <Image
              src="/images/site/studio.jpg"
              alt="Status Bath and Kitchen Experience Studio"
              fill
              priority
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/25"></div>

            {/* Coral Red Badge matching interio.com */}
            <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-12">
              <div className="bg-[#ff5247] text-white font-extrabold text-2xl sm:text-4xl lg:text-5xl px-6 sm:px-10 py-3 sm:py-4 shadow-lg rounded-xs">
                Contact Us
              </div>
            </div>
          </div>

          {/* 3. MAIN TWO-COLUMN CONTACT STRUCTURE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
            {/* LEFT SIDEBAR: CHANNELS & ESCALATION DESK */}
            <div className="lg:col-span-4 space-y-8">
              {/* Channel Selector Tabs */}
              <div className="bg-[#f7f5f2] p-2 rounded-xs divide-y divide-stone-200">
                {categoryChannels.map((channel) => {
                  const isActive = activeChannelId === channel.id;
                  return (
                    <button
                      key={channel.id}
                      onClick={() => setActiveChannelId(channel.id)}
                      className={`w-full text-left px-5 py-4 text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                        isActive
                          ? "bg-white text-[#ff5247] shadow-xs border-l-4 border-[#ff5247]"
                          : "text-gray-700 hover:text-black hover:bg-stone-100/60"
                      }`}
                    >
                      <span>{channel.name}</span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-[#ff5247]"></span>}
                    </button>
                  );
                })}
              </div>

              {/* Direct Help Card */}
              <div className="p-6 bg-stone-50 border border-stone-200 rounded-xs space-y-4 text-xs sm:text-sm">
                <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                  Contact us with one of the channels
                </h4>

                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#ff5247] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] text-gray-500 font-medium">Write to us on:</div>
                      <a
                        href={`mailto:${activeChannel.email}`}
                        className="font-bold text-gray-900 hover:text-[#ff5247] break-all"
                      >
                        {activeChannel.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#ff5247] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] text-gray-500 font-medium">One point customer care:</div>
                      <a
                        href={`tel:${activeChannel.phone}`}
                        className="font-bold text-gray-900 hover:text-[#ff5247]"
                      >
                        {activeChannel.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] text-gray-500 font-medium">WhatsApp support:</div>
                      <a
                        href={`https://wa.me/919321665511`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-emerald-700 hover:underline"
                      >
                        {activeChannel.whatsapp}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-200">
                  <div className="text-[11px] text-gray-500 font-medium mb-1">
                    To escalate service or order matters:
                  </div>
                  <a
                    href={`mailto:${activeChannel.escalationEmail}`}
                    className="font-semibold text-gray-900 hover:text-[#ff5247] underline text-xs"
                  >
                    Raise ticket: {activeChannel.escalationEmail}
                  </a>
                </div>
              </div>

              {/* Showroom Visit Invitation */}
              <div className="p-6 bg-[#3d3734] text-white rounded-xs space-y-3">
                <div className="flex items-center gap-2 text-stone-300 text-xs font-semibold uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-[#ff5247]" />
                  <span>Experience Studios</span>
                </div>
                <h4 className="text-base font-bold text-white leading-snug">
                  Visit our flagship design gallery
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Walk through full-scale modular kitchens, luxury bathroom displays, and interact with actual finishes.
                </p>
                <div className="pt-2 text-xs text-stone-300 space-y-1">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>Monday – Sunday: 10:30 AM – 8:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <span>+91 98200 12345 / 080-67436743</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => openConsultation("Studio Visit Consultation")}
                  className="w-full mt-3 py-2.5 bg-[#ff5247] hover:bg-[#e04339] text-white text-xs font-bold rounded-xs transition-colors cursor-pointer"
                >
                  Schedule Studio Walkthrough
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: INQUIRY SELECTOR & INTERACTIVE FORM */}
            <div className="lg:col-span-8 space-y-8">
              {/* Question 1: What are you looking for? */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
                  What are you looking for?
                </h2>

                <div className="flex flex-wrap gap-2.5">
                  {inquiryTypes.map((inq) => {
                    const isSelected = selectedInquiry === inq.id;
                    const Icon = inq.icon;
                    return (
                      <button
                        key={inq.id}
                        type="button"
                        onClick={() => setSelectedInquiry(inq.id)}
                        className={`px-4 sm:px-5 py-3 rounded-xs border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                          isSelected
                            ? "bg-white border-[#ff5247] text-[#ff5247] shadow-xs ring-1 ring-[#ff5247]"
                            : "bg-[#fbf7f4] border-stone-200 text-gray-700 hover:border-gray-900 hover:text-black"
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{inq.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Container */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-6">
                  We&apos;re happy to contact you!
                </h3>

                {isSubmitted ? (
                  <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xs text-center space-y-3 animate-in fade-in">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h4 className="text-xl font-bold text-gray-900">Inquiry Received</h4>
                    <p className="text-sm text-gray-600 max-w-md mx-auto">
                      Thank you, {formData.name || "Customer"}. Your query regarding{" "}
                      <strong>{inquiryTypes.find((i) => i.id === selectedInquiry)?.label}</strong> has
                      been dispatched to our specialist team.
                    </p>
                    <p className="text-xs text-gray-500">
                      Our customer care will call you at <strong>{formData.mobile}</strong> or email{" "}
                      <strong>{formData.email}</strong> within 2 business hours.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          mobile: "",
                          email: "",
                          pincode: "",
                          city: "",
                          query: "",
                        });
                      }}
                      className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-xs text-xs font-semibold hover:bg-black transition-colors"
                    >
                      Submit Another Query
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full border-b border-gray-300 py-2.5 text-sm text-gray-900 focus:outline-hidden focus:border-[#ff5247] transition-colors"
                      />
                    </div>

                    {/* Mobile & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full border-b border-gray-300 py-2.5 text-sm text-gray-900 focus:outline-hidden focus:border-[#ff5247] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. rahul@example.com"
                          className="w-full border-b border-gray-300 py-2.5 text-sm text-gray-900 focus:outline-hidden focus:border-[#ff5247] transition-colors"
                        />
                      </div>
                    </div>

                    {/* WhatsApp Opt-in */}
                    <div className="flex items-start gap-3 py-1">
                      <input
                        type="checkbox"
                        id="whatsapp-optin"
                        checked={whatsappOptIn}
                        onChange={(e) => setWhatsappOptIn(e.target.checked)}
                        className="w-4 h-4 accent-[#ff5247] rounded-xs mt-0.5 cursor-pointer"
                      />
                      <label htmlFor="whatsapp-optin" className="text-xs text-gray-700 cursor-pointer">
                        <span className="font-bold text-gray-900">Contact me on WhatsApp</span>
                        <span className="block text-gray-500 text-[11px]">
                          Uncheck to opt-out of upcoming design consultations and offer alerts.
                        </span>
                      </label>
                    </div>

                    {/* Pincode & City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          Pincode *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={formData.pincode}
                          onChange={(e) =>
                            setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, "") })
                          }
                          placeholder="e.g. 400079"
                          className="w-full border-b border-gray-300 py-2.5 text-sm text-gray-900 focus:outline-hidden focus:border-[#ff5247] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="e.g. Mumbai, Bengaluru, Delhi"
                          className="w-full border-b border-gray-300 py-2.5 text-sm text-gray-900 focus:outline-hidden focus:border-[#ff5247] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Query Message */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Your Query *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={formData.query}
                        onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                        placeholder="Tell us what you are planning — modular kitchen renovation, new wardrobe layout, bathroom vanity installation, or appliance inquiries..."
                        className="w-full border-b border-gray-300 py-2.5 text-sm text-gray-900 focus:outline-hidden focus:border-[#ff5247] transition-colors resize-none"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-10 py-3.5 bg-[#ff5247] hover:bg-[#e04339] text-white font-bold rounded-xs text-sm tracking-wider uppercase transition-colors shadow-md disabled:opacity-50 cursor-pointer"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Query"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* 4. FAQ ACCORDION SECTION ("How can we assist you?") */}
          <div className="mt-24 pt-16 border-t border-gray-200 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                How can we assist you?
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                Frequently asked questions about modular planning, materials, and support
              </p>
            </div>

            <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {contactFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="py-4">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left font-semibold text-sm sm:text-base text-gray-900 hover:text-[#ff5247] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0 ml-4 ${
                          isOpen ? "rotate-180 text-[#ff5247]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="pt-3 text-xs sm:text-sm text-gray-600 leading-relaxed pr-8">
                        {faq.a}
                      </div>
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
