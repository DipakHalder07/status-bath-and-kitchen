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
  { id: "business", label: "Business Enquiry" },
  { id: "delivery", label: "Delivery Related" },
  { id: "damage", label: "Damage/Return" },
  { id: "service", label: "Installation/Service" },
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
    name: "Modular kitchens related",
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
    <div className="min-h-screen flex flex-col bg-white text-[#4a4541] font-sans">
      {/* 1. Header (Solid White Header matching interio.com) */}
      <Navbar forceSolid={true} onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />

      <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <main className="flex-1 w-full pt-28 sm:pt-36 pb-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
          {/* Breadcrumb (Matching interio.com 14px 400 py-4) */}
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

          {/* 2. HERO SHOWROOM BANNER WITH CORAL RED 'Contact Us' BADGE */}
          <div className="relative w-full h-56 sm:h-72 lg:h-96 overflow-hidden mb-10">
            <Image
              src="/images/site/studio.jpg"
              alt="Status Bath and Kitchen Experience Studio"
              fill
              priority
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Coral Red Badge matching interio.com (fs=42px, fw=500, lh=46.2px, p=12px 32px) */}
            <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-12">
              <div className="bg-[#ff5d55] text-white font-medium text-2xl sm:text-3xl lg:text-[42px] leading-[46.2px] px-6 sm:px-8 py-3 sm:py-3.5 shadow-md">
                Contact Us
              </div>
            </div>
          </div>

          {/* 3. CATEGORY CHANNEL TABS (Matching interio.com 16px 500) */}
          <div className="flex items-center border-b border-[#dcd7d0] mb-10 overflow-x-auto no-scrollbar gap-6 sm:gap-10">
            {categoryChannels.map((channel) => {
              const isActive = activeChannelId === channel.id;
              return (
                <button
                  key={channel.id}
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
              );
            })}
          </div>

          {/* 4. MAIN TWO-COLUMN CONTACT STRUCTURE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
            {/* LEFT COLUMN: INQUIRY SELECTOR & INTERACTIVE FORM */}
            <div className="lg:col-span-8 space-y-10">
              {/* Question 1: What are you looking for? (Matching interio.com 42px 500) */}
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-medium text-[#4a4541] leading-[46.2px] tracking-tight mb-5">
                  What are you looking for?
                </h2>

                {/* Joined Segmented Toolbar matching live site (fs=20px 500 lh=24px, p=16px) */}
                <div className="overflow-x-auto no-scrollbar pb-1">
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
              </div>

              {/* Form Container */}
              <div className="pt-2">
                <div className="text-[14px] font-normal text-[#4a4541] mb-6">
                  We&apos;re happy to contact you!
                </div>

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
                      className="mt-4 px-6 py-2 bg-[#ff5d55] hover:bg-[#e5473f] text-white text-xs font-medium rounded-[20px_2px_2px_2px] transition-colors"
                    >
                      Submit Another Query
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Row 1: Name & Mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="block text-xs font-medium text-[#76716d]">
                          Full Name <span className="text-[#ff5d55]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Vikram Sharma"
                          className="w-full border-b border-[#dcd7d0] py-2.5 text-[15px] text-[#4a4541] placeholder:text-[#a4a2a0] focus:border-[#ff5d55] focus:outline-hidden bg-transparent"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-medium text-[#76716d]">
                          Mobile Number <span className="text-[#ff5d55]">*</span>
                        </label>
                        <div className="flex items-center border-b border-[#dcd7d0] py-2.5 focus-within:border-[#ff5d55]">
                          <span className="text-sm font-medium text-[#4a4541] pr-2">+91</span>
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
                            placeholder="98200 12345"
                            className="w-full text-[15px] text-[#4a4541] placeholder:text-[#a4a2a0] focus:outline-hidden bg-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Email & Pincode */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="block text-xs font-medium text-[#76716d]">
                          Email Address <span className="text-[#ff5d55]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="vikram@example.com"
                          className="w-full border-b border-[#dcd7d0] py-2.5 text-[15px] text-[#4a4541] placeholder:text-[#a4a2a0] focus:border-[#ff5d55] focus:outline-hidden bg-transparent"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-medium text-[#76716d]">
                          Pin Code <span className="text-[#ff5d55]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={formData.pincode}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              pincode: e.target.value.replace(/\D/g, ""),
                            })
                          }
                          placeholder="e.g. 400079"
                          className="w-full border-b border-[#dcd7d0] py-2.5 text-[15px] text-[#4a4541] placeholder:text-[#a4a2a0] focus:border-[#ff5d55] focus:outline-hidden bg-transparent"
                        />
                      </div>
                    </div>

                    {/* Row 3: City */}
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-[#76716d]">
                        City / Location
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Mumbai, Bengaluru, Delhi NCR"
                        className="w-full border-b border-[#dcd7d0] py-2.5 text-[15px] text-[#4a4541] placeholder:text-[#a4a2a0] focus:border-[#ff5d55] focus:outline-hidden bg-transparent"
                      />
                    </div>

                    {/* Row 4: Message */}
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-[#76716d]">
                        Your Message / Project Details
                      </label>
                      <textarea
                        rows={3}
                        value={formData.query}
                        onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                        placeholder="Please describe your requirements (room dimensions, preferred finish, budget, etc.)..."
                        className="w-full border-b border-[#dcd7d0] py-2.5 text-[15px] text-[#4a4541] placeholder:text-[#a4a2a0] focus:border-[#ff5d55] focus:outline-hidden bg-transparent resize-none"
                      />
                    </div>

                    {/* WhatsApp Checkbox */}
                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="whatsapp-opt"
                        checked={whatsappOptIn}
                        onChange={(e) => setWhatsappOptIn(e.target.checked)}
                        className="w-4 h-4 rounded-xs border-[#dcd7d0] text-[#ff5d55] focus:ring-[#ff5d55] cursor-pointer"
                      />
                      <label htmlFor="whatsapp-opt" className="text-xs text-[#76716d] cursor-pointer">
                        Get order updates &amp; design quotes on WhatsApp
                      </label>
                    </div>

                    {/* Submit CTA (Matching interio.com 20px 2px 2px button) */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-brand-primary px-10 py-3.5 text-sm font-medium tracking-wide shadow-xs cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Submitting...</span>
                        ) : (
                          <span>Submit Query</span>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* RIGHT SIDEBAR: DIRECT CHANNELS & STUDIO INFO */}
            <div className="lg:col-span-4 space-y-6">
              {/* Direct Help Card */}
              <div className="p-6 bg-[#fbf7f4] border border-[#dcd7d0] space-y-4 text-[13px]">
                <h4 className="font-medium text-[#4a4541] text-base">
                  Direct Contact Channels
                </h4>

                <div className="space-y-3.5 text-[#4a4541]">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#ff5d55] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] text-[#76716d] font-medium">Write to us on:</div>
                      <a
                        href={`mailto:${activeChannel.email}`}
                        className="font-medium text-[#4a4541] hover:text-[#ff5d55] break-all"
                      >
                        {activeChannel.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#ff5d55] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] text-[#76716d] font-medium">Toll-free customer care:</div>
                      <a
                        href={`tel:${activeChannel.phone}`}
                        className="font-medium text-[#4a4541] hover:text-[#ff5d55]"
                      >
                        {activeChannel.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] text-[#76716d] font-medium">WhatsApp support:</div>
                      <a
                        href={`https://wa.me/919321665511`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-emerald-700 hover:underline"
                      >
                        {activeChannel.whatsapp}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#dcd7d0]">
                  <div className="text-[11px] text-[#76716d] font-medium mb-1">
                    To escalate service or order matters:
                  </div>
                  <a
                    href={`mailto:${activeChannel.escalationEmail}`}
                    className="font-medium text-[#4a4541] hover:text-[#ff5d55] underline text-xs"
                  >
                    Raise ticket: {activeChannel.escalationEmail}
                  </a>
                </div>
              </div>

              {/* Showroom Visit Card */}
              <div className="p-6 bg-[#3d3734] text-white space-y-3">
                <div className="flex items-center gap-2 text-stone-300 text-xs font-medium uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-[#ff5d55]" />
                  <span>Experience Studios</span>
                </div>
                <h4 className="text-base font-medium text-white leading-snug">
                  Visit our flagship design gallery
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed font-light">
                  Walk through full-scale modular kitchens, luxury bathroom displays, and touch physical material samples.
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
                  className="w-full mt-3 py-2.5 bg-[#ff5d55] hover:bg-[#e5473f] text-white text-xs font-medium rounded-[20px_2px_2px_2px] transition-colors cursor-pointer"
                >
                  Schedule Studio Walkthrough
                </button>
              </div>
            </div>
          </div>

          {/* 5. FREQUENTLY ASKED QUESTIONS ACCORDION */}
          <div className="mt-20 pt-12 border-t border-[#dcd7d0]">
            <div className="max-w-3xl mb-8">
              <h2 className="text-2xl sm:text-3xl font-medium text-[#4a4541] tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-[#76716d] mt-1">
                Quick answers regarding our design process, site measurement, delivery, and warranty.
              </p>
            </div>

            <div className="max-w-3xl border-t border-[#dcd7d0] divide-y divide-[#dcd7d0]">
              {contactFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="py-4">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left text-[15px] font-medium text-[#4a4541] hover:text-[#ff5d55] transition-colors cursor-pointer"
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
