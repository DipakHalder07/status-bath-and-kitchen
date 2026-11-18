"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Wrench,
  Calendar,
  Clock,
  CheckCircle2,
  Phone,
  MessageCircle,
  FileText,
  Search,
  ArrowRight,
  ShieldCheck,
  Download,
  ChevronDown,
  Sparkles,
  MapPin,
  Check,
  User,
  Truck,
  RotateCcw,
  SlidersHorizontal,
  ChevronRight,
  Quote,
} from "lucide-react";
import Navbar from "@/components/Header/Navbar";
import MobileDrawer from "@/components/Header/MobileDrawer";
import Footer from "@/components/Footer/Footer";
import CartDrawer from "@/components/Cart/CartDrawer";
import ConsultationModal from "@/components/Modals/ConsultationModal";
import Toast from "@/components/UI/Toast";
import { useCart } from "@/context/CartContext";
import {
  servicesList,
  careBooklets,
  servicesFAQs,
  ServiceItem,
} from "@/data/servicesData";

const sidebarNavItems = [
  { id: "service-offered", label: "Service offered" },
  { id: "request-service", label: "Request a service" },
  { id: "track-service", label: "Track your service" },
  { id: "contact-us", label: "Contact us", isLink: true, href: "/contact" },
  { id: "care-booklets", label: "Care Booklets" },
  { id: "faqs", label: "FAQs" },
];

const customerTestimonials = [
  {
    quote:
      "Exceptional design and quality! Our office space feels both functional and inspiring—couldn’t be happier with the transformation.",
    author: "Swapneel Nagarkar",
    city: "Mumbai",
  },
  {
    quote:
      "Their team’s attention to detail and expertise in building solutions truly elevated our workspace. Highly recommend their services!",
    author: "Swapneel Nagarkar",
    city: "Mumbai",
  },
  {
    quote:
      "Seamless process from concept to completion. Our workspace now perfectly reflects our brand and fosters productivity. Fantastic experience!",
    author: "Swapneel Nagarkar",
    city: "Mumbai",
  },
];

export default function ServicesClient() {
  const { openConsultation, showToast } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSidebarTab, setActiveSidebarTab] = useState<string>("service-offered");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);

  // Form State
  const [selectedServiceId, setSelectedServiceId] = useState<string>("repainting");
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formTimeSlot, setFormTimeSlot] = useState("Morning (9 AM - 12 PM)");
  const [formNotes, setFormNotes] = useState("");
  const [sendViaWhatsapp, setSendViaWhatsapp] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedTicketId, setGeneratedTicketId] = useState("");
  const [whatsappShareUrl, setWhatsappShareUrl] = useState("");

  // Tracking State
  const [trackQuery, setTrackQuery] = useState("");
  const [trackedOrder, setTrackedOrder] = useState<{
    ticketId: string;
    serviceName: string;
    customerName: string;
    status: "received" | "assigned" | "en-route" | "in-progress" | "completed";
    technicianName: string;
    technicianPhone: string;
    scheduledSlot: string;
    location: string;
    lastUpdated: string;
  } | null>(null);
  const [trackError, setTrackError] = useState("");

  const handleNavClick = (id: string) => {
    setActiveSidebarTab(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleBookServiceClick = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setActiveSidebarTab("request-service");
    handleNavClick("request-service");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) {
      showToast("Please fill in your name and mobile number.");
      return;
    }

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newTicketId = `SR-${randomNum}`;
    setGeneratedTicketId(newTicketId);
    setIsSubmitted(true);

    const srv = servicesList.find((s) => s.id === selectedServiceId);
    const serviceTitle = srv ? srv.title : "Service Request";

    // Prepare WhatsApp message for +91 98320 95793
    const messageLines = [
      `*New Service Request - Status Bath & Kitchen*`,
      `----------------------------------------`,
      `*Ticket ID:* ${newTicketId}`,
      `*Service:* ${serviceTitle}`,
      `*Customer Name:* ${formName}`,
      `*Customer Mobile:* ${formPhone}`,
      formLocation ? `*Location:* ${formLocation}` : "",
      formAddress ? `*Address:* ${formAddress}` : "",
      `*Preferred Slot:* ${formDate || "Tomorrow"}, ${formTimeSlot}`,
      formNotes ? `*Notes:* ${formNotes}` : "",
      `----------------------------------------`,
      `Please confirm technician dispatch.`,
    ].filter(Boolean).join("\n");

    const waUrl = `https://wa.me/919832095793?text=${encodeURIComponent(messageLines)}`;
    setWhatsappShareUrl(waUrl);

    setTrackedOrder({
      ticketId: newTicketId,
      serviceName: serviceTitle,
      customerName: formName,
      status: "assigned",
      technicianName: "Deepak Rawat (Senior Specialist)",
      technicianPhone: "+91 98320 95793",
      scheduledSlot: `${formDate || "Tomorrow"}, ${formTimeSlot}`,
      location: formLocation || "Siliguri",
      lastUpdated: "Just now",
    });

    showToast(`Service request logged! Ticket ID: ${newTicketId}`);

    if (sendViaWhatsapp && typeof window !== "undefined") {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackError("");

    if (!trackQuery.trim()) {
      setTrackError("Please enter a valid Service Ticket ID (e.g. SR-40912) or 10-digit mobile number.");
      return;
    }

    const clean = trackQuery.trim().toUpperCase();

    setTrackedOrder({
      ticketId: clean.startsWith("SR-") ? clean : `SR-${clean}`,
      serviceName: "Modular Kitchen & Hinge Precision Servicing",
      customerName: "Verified Customer",
      status: "en-route",
      technicianName: "Vikram Jadhav (Certified Technician)",
      technicianPhone: "+91 98320 95793",
      scheduledSlot: "Today, 2:30 PM - 5:00 PM",
      location: "Siliguri",
      lastUpdated: "8 mins ago",
    });
    showToast("Ticket found! Displaying live technician dispatch status.");
  };

  const handleDownloadBooklet = (title: string, size: string) => {
    showToast(`Downloading "${title}" (${size})...`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#4a4541] font-sans">
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
              <li className="font-medium text-[#4a4541]">Services</li>
            </ol>
          </nav>
        </div>

        {/* 2. AUTHENTIC HERO: "Our Services" Matching live Service_Landing_page-Desktop.jpg */}
        <div className="w-full relative h-[240px] sm:h-[340px] lg:h-[380px] overflow-hidden mb-12">
          <Image
            src="/images/services/hero.jpg"
            alt="Our Services"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 h-full relative flex items-end pb-8 sm:pb-12">
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-medium leading-[1.1] !text-white tracking-tight">
              Our Services
            </h1>
          </div>
        </div>

        {/* 3. MASTER 2-COLUMN SECTION (Matching live interio.com .service-list-wrap) */}
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            {/* LEFT SIDEBAR NAVIGATION (25% Width on Desktop) */}
            <aside className="w-full lg:w-1/4 lg:sticky lg:top-36 bg-white border border-[#dcd7d0] p-2 divide-y divide-[#f0ece6]">
              {sidebarNavItems.map((item) => {
                const isActive = activeSidebarTab === item.id;

                if (item.isLink && item.href) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="block px-5 py-3.5 text-[15px] font-medium text-[#4a4541] hover:text-[#ff5d55] hover:bg-[#faf8f5] transition-colors"
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-5 py-3.5 text-[15px] transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? "text-[#ff5d55] font-semibold bg-[#fbf7f4] border-l-4 border-l-[#ff5d55]"
                        : "text-[#4a4541] hover:text-[#ff5d55] hover:bg-[#faf8f5] font-medium"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isActive ? "text-[#ff5d55] translate-x-1" : "text-[#dcd7d0]"
                      }`}
                    />
                  </button>
                );
              })}
            </aside>

            {/* RIGHT CONTENT SECTION (75% Width on Desktop) */}
            <div className="w-full lg:w-3/4 space-y-20">
              {/* SECTION: SERVICE DETAILS (6 Core Cards matching live site) */}
              <section id="service-offered" className="scroll-mt-36 space-y-6">
                <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-medium text-[#4a4541] leading-tight tracking-tight">
                  Service details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {servicesList.slice(0, 6).map((service) => (
                    <div
                      key={service.id}
                      className="border border-[#dcd7d0] bg-white p-6 flex flex-col justify-between group hover:border-[#ff5d55] transition-all duration-300 shadow-xs"
                    >
                      <div className="space-y-4">
                        <h4 className="text-xl font-medium text-[#4a4541] group-hover:text-[#ff5d55] transition-colors">
                          {service.title}
                        </h4>

                        <div className="relative h-44 w-full overflow-hidden bg-stone-50 flex items-center justify-center">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 25vw"
                            className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <p className="text-[14px] text-[#76716d] leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      <div className="pt-6 mt-4 border-t border-[#f0ece6] flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setSelectedServiceModal(service)}
                          className="text-xs font-semibold text-[#ff5d55] hover:underline cursor-pointer"
                        >
                          Read More
                        </button>
                        <button
                          type="button"
                          onClick={() => handleBookServiceClick(service.id)}
                          className="btn-brand-primary px-4 py-2 text-xs font-medium cursor-pointer shadow-xs"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION: REQUEST A SERVICE */}
              <section
                id="request-service"
                className="scroll-mt-36 pt-10 border-t border-[#dcd7d0] space-y-6"
              >
                <div>
                  <span className="text-[12px] font-semibold text-[#ff5d55] uppercase tracking-wider block mb-1">
                    Doorstep Assistance
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-medium text-[#4a4541]">
                    Request a service
                  </h2>
                  <p className="text-sm text-[#76716d] mt-1">
                    Select your service, choose a convenient date, and our authorized service team will handle the rest.
                  </p>
                </div>

                <div className="bg-[#fbf7f4] border border-[#dcd7d0] p-6 sm:p-8">
                  {isSubmitted ? (
                    <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                      <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <h3 className="text-2xl font-medium text-[#4a4541]">
                        Service Request Confirmed!
                      </h3>
                      <p className="text-sm text-[#76716d] max-w-md mx-auto">
                        Thank you, <strong className="text-[#4a4541]">{formName}</strong>. Your ticket has been logged into our dispatch system.
                      </p>
                      <div className="inline-block bg-white border border-[#dcd7d0] px-6 py-2.5 rounded-sm text-sm font-semibold text-[#ff5d55] tracking-wide">
                        Ticket ID: {generatedTicketId}
                      </div>

                      {/* WhatsApp / Call Dispatch Action */}
                      <div className="pt-2 max-w-md mx-auto space-y-3">
                        <a
                          href={whatsappShareUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-6 rounded-sm text-xs sm:text-sm font-semibold flex items-center justify-center gap-2.5 shadow-sm transition-colors cursor-pointer"
                        >
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                          </svg>
                          <span>Send Details to WhatsApp (+91 98320 95793)</span>
                        </a>

                        <div className="flex flex-col sm:flex-row justify-center gap-3">
                          <a
                            href="tel:+919832095793"
                            className="btn-brand-outline py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-1.5"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call 98320 95793</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => handleNavClick("track-service")}
                            className="btn-brand-primary px-5 py-2.5 text-xs font-semibold"
                          >
                            Track This Request &rarr;
                          </button>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsSubmitted(false);
                            setFormName("");
                            setFormPhone("");
                            setFormLocation("");
                            setFormAddress("");
                            setFormNotes("");
                          }}
                          className="text-xs text-[#76716d] hover:text-[#4a4541] underline cursor-pointer"
                        >
                          Book Another Service
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-5">
                      <div>
                        <label className="block text-xs font-semibold text-[#4a4541] uppercase tracking-wide mb-2">
                          1. Select Required Service *
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {servicesList.slice(0, 6).map((srv) => {
                            const isChosen = selectedServiceId === srv.id;
                            return (
                              <button
                                key={srv.id}
                                type="button"
                                onClick={() => setSelectedServiceId(srv.id)}
                                className={`p-2.5 text-left border text-xs font-medium transition-all cursor-pointer ${
                                  isChosen
                                    ? "border-[#ff5d55] bg-white text-[#ff5d55] font-semibold shadow-xs"
                                    : "border-[#dcd7d0] bg-white text-[#4a4541] hover:border-stone-400"
                                }`}
                              >
                                <div className="truncate">{srv.title}</div>
                                <div className="text-[10px] text-[#76716d] mt-0.5 truncate">
                                  {srv.pricingStarting}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#4a4541] mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="Your full name"
                            className="w-full bg-white border border-[#dcd7d0] px-3 py-2 text-sm focus:border-[#ff5d55] focus:outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#4a4541] mb-1">
                            Mobile Number *
                          </label>
                          <input
                            type="tel"
                            required
                            maxLength={10}
                            value={formPhone}
                            onChange={(e) => setFormPhone(e.target.value.replace(/\D/g, ""))}
                            placeholder="10-digit mobile"
                            className="w-full bg-white border border-[#dcd7d0] px-3 py-2 text-sm focus:border-[#ff5d55] focus:outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#4a4541] mb-1">
                            Area / Landmark
                          </label>
                          <input
                            type="text"
                            value={formLocation}
                            onChange={(e) => setFormLocation(e.target.value)}
                            placeholder="e.g. Siliguri, Jalpaiguri"
                            className="w-full bg-white border border-[#dcd7d0] px-3 py-2 text-sm focus:border-[#ff5d55] focus:outline-hidden"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#4a4541] mb-1">
                          Full Address &amp; Landmark
                        </label>
                        <input
                          type="text"
                          value={formAddress}
                          onChange={(e) => setFormAddress(e.target.value)}
                          placeholder="Building, Flat No., Street, Area"
                          className="w-full bg-white border border-[#dcd7d0] px-3 py-2 text-sm focus:border-[#ff5d55] focus:outline-hidden"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#4a4541] mb-1">
                            Preferred Date
                          </label>
                          <input
                            type="date"
                            value={formDate}
                            onChange={(e) => setFormDate(e.target.value)}
                            className="w-full bg-white border border-[#dcd7d0] px-3 py-2 text-sm focus:border-[#ff5d55] focus:outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#4a4541] mb-1">
                            Preferred Time Slot
                          </label>
                          <select
                            value={formTimeSlot}
                            onChange={(e) => setFormTimeSlot(e.target.value)}
                            className="w-full bg-white border border-[#dcd7d0] px-3 py-2 text-sm focus:border-[#ff5d55] focus:outline-hidden"
                          >
                            <option>Morning (9:00 AM - 12:00 PM)</option>
                            <option>Afternoon (12:00 PM - 4:00 PM)</option>
                            <option>Evening (4:00 PM - 7:00 PM)</option>
                          </select>
                        </div>
                      </div>

                      {/* WhatsApp Sending Option */}
                      <div className="bg-emerald-50/80 border border-emerald-200/80 p-3.5 rounded-sm flex items-start gap-3 text-xs text-emerald-950">
                        <input
                          type="checkbox"
                          id="sendWhatsapp"
                          checked={sendViaWhatsapp}
                          onChange={(e) => setSendViaWhatsapp(e.target.checked)}
                          className="mt-0.5 w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer shrink-0"
                        />
                        <label htmlFor="sendWhatsapp" className="cursor-pointer select-none">
                          <span className="font-semibold text-emerald-900 flex items-center gap-1.5">
                            Send service request directly to WhatsApp (+91 98320 95793)
                          </span>
                          <span className="text-[11px] text-emerald-800 block mt-0.5 leading-relaxed">
                            When submitting, automatically opens WhatsApp with ticket details to dispatch our technician team immediately.
                          </span>
                        </label>
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-xs text-[#76716d] flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Certified technicians with photo ID &amp; sanitation kit.</span>
                        </div>

                        <button
                          type="submit"
                          className="w-full sm:w-auto btn-brand-primary px-8 py-3 text-xs sm:text-sm font-medium tracking-wide shadow-md cursor-pointer flex items-center justify-center gap-2"
                        >
                          <span>Confirm &amp; Send Request &rarr;</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </section>

              {/* SECTION: TRACK YOUR SERVICE */}
              <section
                id="track-service"
                className="scroll-mt-36 pt-10 border-t border-[#dcd7d0] space-y-6"
              >
                <div>
                  <span className="text-[12px] font-semibold text-[#ff5d55] uppercase tracking-wider block mb-1">
                    Live Dispatch
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-medium text-[#4a4541]">
                    Track your service
                  </h2>
                  <p className="text-sm text-[#76716d] mt-1">
                    Enter your Service Ticket ID (e.g. <code>SR-40912</code>) or registered mobile number to check visit status.
                  </p>
                </div>

                <div className="bg-white border border-[#dcd7d0] p-6 space-y-5">
                  <form onSubmit={handleTrackSubmit} className="space-y-3">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={trackQuery}
                        onChange={(e) => setTrackQuery(e.target.value)}
                        placeholder="Enter Ticket ID (e.g. SR-40912) or Mobile Number"
                        className="w-full bg-stone-50 border border-[#dcd7d0] px-4 py-2.5 text-sm focus:bg-white focus:border-[#ff5d55] focus:outline-hidden"
                      />
                      <button
                        type="submit"
                        className="absolute right-1 px-5 py-2 bg-[#ff5d55] hover:bg-[#e5473f] text-white text-xs font-semibold transition-colors"
                      >
                        Track
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#76716d]">
                      <span>Quick Demo:</span>
                      <button
                        type="button"
                        onClick={() => {
                          setTrackQuery("SR-40912");
                          setTrackedOrder({
                            ticketId: "SR-40912",
                            serviceName: "Annual Modular Kitchen AMC & Hardware Calibration",
                            customerName: "Swapneel Nagarkar",
                            status: "en-route",
                            technicianName: "Vikram Jadhav (Certified Technician)",
                            technicianPhone: "+91 98320 95793",
                            scheduledSlot: "Today, 2:30 PM - 5:00 PM",
                            location: "Siliguri",
                            lastUpdated: "8 mins ago",
                          });
                        }}
                        className="text-[#ff5d55] font-semibold hover:underline"
                      >
                        Load Sample Ticket (SR-40912)
                      </button>
                    </div>

                    {trackError && (
                      <p className="text-xs text-red-600 font-medium">{trackError}</p>
                    )}
                  </form>

                  {trackedOrder && (
                    <div className="pt-5 border-t border-[#dcd7d0] space-y-5 animate-in fade-in duration-200">
                      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#fbf7f4] p-4 border border-[#dcd7d0]">
                        <div>
                          <span className="text-[11px] text-[#76716d] uppercase font-semibold">
                            Ticket ID
                          </span>
                          <div className="text-base font-bold text-[#4a4541]">
                            {trackedOrder.ticketId}
                          </div>
                          <div className="text-xs text-[#ff5d55] font-medium">
                            {trackedOrder.serviceName}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] text-[#76716d] uppercase font-semibold">
                            Scheduled
                          </span>
                          <div className="text-xs font-semibold text-[#4a4541]">
                            {trackedOrder.scheduledSlot}
                          </div>
                          <div className="text-[11px] text-[#76716d]">
                            Updated {trackedOrder.lastUpdated}
                          </div>
                        </div>
                      </div>

                      {/* 4-Step Stepper */}
                      <div className="grid grid-cols-4 text-center text-xs">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mb-1">
                            <Check className="w-4 h-4" />
                          </div>
                          <span className="font-semibold text-emerald-700">Logged</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mb-1">
                            <Check className="w-4 h-4" />
                          </div>
                          <span className="font-semibold text-emerald-700">Assigned</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-[#ff5d55] text-white flex items-center justify-center font-bold text-xs mb-1 animate-pulse">
                            <Truck className="w-4 h-4" />
                          </div>
                          <span className="font-semibold text-[#ff5d55]">En Route</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center font-bold text-xs mb-1">
                            4
                          </div>
                          <span className="text-[#76716d]">Completed</span>
                        </div>
                      </div>

                      <div className="border border-[#dcd7d0] p-3.5 flex items-center justify-between gap-4 bg-white">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center text-stone-600">
                            <User className="w-4 h-4 text-[#ff5d55]" />
                          </div>
                          <div>
                            <div className="text-[11px] text-[#76716d]">Assigned Technician</div>
                            <div className="text-sm font-semibold text-[#4a4541]">
                              {trackedOrder.technicianName}
                            </div>
                          </div>
                        </div>
                        <a
                          href={`tel:${trackedOrder.technicianPhone.replace(/\s+/g, "")}`}
                          className="px-3.5 py-1.5 border border-[#4a4541] hover:bg-[#4a4541] hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Call</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* SECTION: CARE BOOKLETS */}
              <section
                id="care-booklets"
                className="scroll-mt-36 pt-10 border-t border-[#dcd7d0] space-y-6"
              >
                <div>
                  <span className="text-[12px] font-semibold text-[#ff5d55] uppercase tracking-wider block mb-1">
                    Maintenance Guides
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-medium text-[#4a4541]">
                    Care Booklets
                  </h2>
                  <p className="text-sm text-[#76716d] mt-1">
                    Download official PDF manuals to keep your cabinetry, hardware, and fabrics performing at factory standards.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {careBooklets.map((booklet) => (
                    <div
                      key={booklet.id}
                      className="border border-[#dcd7d0] bg-white p-5 flex flex-col justify-between group hover:border-[#4a4541] transition-colors"
                    >
                      <div className="space-y-3">
                        <div className="relative h-36 w-full overflow-hidden bg-stone-100">
                          <Image
                            src={booklet.coverImage}
                            alt={booklet.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 25vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2 left-2 bg-black/75 text-white text-[10px] font-medium px-2 py-0.5">
                            {booklet.category}
                          </div>
                        </div>

                        <h3 className="text-sm font-medium text-[#4a4541] group-hover:text-[#ff5d55] transition-colors leading-snug">
                          {booklet.title}
                        </h3>
                        <p className="text-xs text-[#76716d] line-clamp-2">
                          {booklet.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-3 border-t border-[#f0ece6]">
                        <button
                          type="button"
                          onClick={() => handleDownloadBooklet(booklet.title, booklet.fileSize)}
                          className="w-full btn-brand-outline py-2 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#4a4541] hover:text-white transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF ({booklet.fileSize})</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION: FAQS */}
              <section id="faqs" className="scroll-mt-36 pt-10 border-t border-[#dcd7d0] space-y-6">
                <div>
                  <span className="text-[12px] font-semibold text-[#ff5d55] uppercase tracking-wider block mb-1">
                    Help &amp; Queries
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-medium text-[#4a4541]">
                    FAQs
                  </h2>
                  <p className="text-sm text-[#76716d] mt-1">
                    Frequently asked questions about warranty, AMC coverage, and technician dispatch.
                  </p>
                </div>

                <div className="border-t border-[#dcd7d0] divide-y divide-[#dcd7d0]">
                  {servicesFAQs.map((faq, idx) => {
                    const isOpen = expandedFaq === idx;
                    return (
                      <div key={idx} className="py-4">
                        <button
                          type="button"
                          onClick={() => setExpandedFaq(isOpen ? null : idx)}
                          className="w-full flex items-center justify-between text-left group cursor-pointer"
                        >
                          <span className="text-base font-medium text-[#4a4541] group-hover:text-[#ff5d55] transition-colors pr-4">
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-[#76716d] shrink-0 transition-transform duration-200 ${
                              isOpen ? "rotate-180 text-[#ff5d55]" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="pt-2 text-sm text-[#76716d] leading-relaxed animate-in fade-in duration-150">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>

          {/* 4. CUSTOMER TESTIMONIALS SECTION (Matching live interio.com) */}
          <section className="mt-24 pt-16 border-t border-[#dcd7d0] space-y-8">
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-medium text-[#4a4541] leading-tight tracking-tight">
              Here’s what our customers have to say:
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {customerTestimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="bg-[#fbf7f4] border border-[#dcd7d0] p-8 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <Quote className="w-8 h-8 text-[#ff5d55]/40" />
                    <h3 className="text-base sm:text-lg font-medium text-[#4a4541] leading-relaxed">
                      &ldquo;{testimonial.quote}&rdquo;
                    </h3>
                  </div>

                  <div className="pt-4 border-t border-[#dcd7d0] text-xs font-semibold text-[#76716d]">
                    <span className="text-[#4a4541] font-bold">{testimonial.author}</span>,{" "}
                    <span>{testimonial.city}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. IMMEDIATE CUSTOMER ASSISTANCE STRIP */}
          <section className="mt-16 bg-[#4a4541] text-white p-8 sm:p-12 border border-[#4a4541] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <span className="text-xs font-bold text-[#ff9f99] uppercase tracking-wider">
                Immediate Customer Assistance
              </span>
              <h3 className="text-2xl sm:text-3xl font-medium !text-white leading-tight">
                Need urgent plumbing or hinge assistance?
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Our customer care helpdesk operates 7 days a week from 9:30 AM to 7:00 PM. Call our toll-free line or message our technicians directly on WhatsApp.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
              <a
                href="tel:+919832095793"
                className="w-full sm:w-auto bg-[#ff5d55] hover:bg-[#e5473f] text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-[20px_2px_2px_2px] flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Call +91 98320 95793</span>
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto border border-white/60 hover:bg-white hover:text-[#4a4541] text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-[20px_2px_2px_2px] flex items-center justify-center gap-2 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span>Visit Experience Centre</span>
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* SERVICE DETAIL MODAL */}
      {selectedServiceModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#dcd7d0] max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setSelectedServiceModal(null)}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              &times;
            </button>

            <div>
              <span className="text-[11px] font-bold text-[#ff5d55] uppercase tracking-wider">
                {selectedServiceModal.category}
              </span>
              <h3 className="text-2xl font-medium text-[#4a4541] mt-1">
                {selectedServiceModal.title}
              </h3>
              <p className="text-xs text-[#76716d] mt-1">
                {selectedServiceModal.tagline}
              </p>
            </div>

            <div className="relative h-44 w-full overflow-hidden bg-stone-50 flex items-center justify-center border border-[#dcd7d0]">
              <Image
                src={selectedServiceModal.image}
                alt={selectedServiceModal.title}
                fill
                className="object-contain p-4"
              />
            </div>

            <p className="text-sm text-[#76716d] leading-relaxed">
              {selectedServiceModal.description}
            </p>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#4a4541] uppercase tracking-wide">
                What Is Included:
              </h4>
              <ul className="space-y-1.5 text-xs text-[#4a4541]">
                {selectedServiceModal.included.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#ff5d55] mt-0.5 shrink-0" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#fbf7f4] p-3.5 border border-[#dcd7d0] grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[#76716d] block">Turnaround:</span>
                <strong className="text-[#4a4541]">{selectedServiceModal.turnaroundTime}</strong>
              </div>
              <div>
                <span className="text-[#76716d] block">Consultation / Estimate:</span>
                <strong className="text-[#ff5d55]">{selectedServiceModal.pricingStarting}</strong>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  const sId = selectedServiceModal.id;
                  setSelectedServiceModal(null);
                  handleBookServiceClick(sId);
                }}
                className="w-full btn-brand-primary py-3 text-xs font-semibold cursor-pointer"
              >
                Proceed to Book This Service &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      <CartDrawer />
      <ConsultationModal />
      <Toast />
      <Footer />
    </div>
  );
}
