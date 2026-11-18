"use client";

import React, { useState, useId } from "react";
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
  CareBooklet,
} from "@/data/servicesData";

const subNavItems = [
  { id: "service-details", label: "Service details" },
  { id: "request-service", label: "Request a service" },
  { id: "track-service", label: "Track your service" },
  { id: "care-booklets", label: "Care Booklets" },
  { id: "faqs", label: "FAQs" },
];

export default function ServicesClient() {
  const { openConsultation, showToast } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("service-details");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);

  // Form State
  const [selectedServiceId, setSelectedServiceId] = useState<string>("annual-care");
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formPincode, setFormPincode] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formTimeSlot, setFormTimeSlot] = useState("Morning (9 AM - 12 PM)");
  const [formNotes, setFormNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedTicketId, setGeneratedTicketId] = useState("");

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
    pincode: string;
    lastUpdated: string;
  } | null>(null);
  const [trackError, setTrackError] = useState("");

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleBookServiceClick = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    scrollToSection("request-service");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone || !formPincode) {
      showToast("Please fill in your name, mobile number, and PIN code.");
      return;
    }

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newTicketId = `SR-${randomNum}`;
    setGeneratedTicketId(newTicketId);
    setIsSubmitted(true);

    const serviceName =
      servicesList.find((s) => s.id === selectedServiceId)?.title || "Service Request";

    // Pre-populate tracking with this newly created ticket
    setTrackedOrder({
      ticketId: newTicketId,
      serviceName,
      customerName: formName,
      status: "assigned",
      technicianName: "Deepak Rawat (Senior Specialist)",
      technicianPhone: "+91 98200 44123",
      scheduledSlot: `${formDate || "Tomorrow"}, ${formTimeSlot}`,
      pincode: formPincode,
      lastUpdated: "Just now",
    });

    showToast(`Service request logged! Ticket ID: ${newTicketId}`);
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackError("");

    if (!trackQuery.trim()) {
      setTrackError("Please enter a valid Service Ticket ID (e.g. SR-78291) or 10-digit mobile number.");
      return;
    }

    const clean = trackQuery.trim().toUpperCase();

    if (clean.includes("SR-") || clean.length >= 5) {
      setTrackedOrder({
        ticketId: clean.startsWith("SR-") ? clean : `SR-${clean}`,
        serviceName: "Modular Kitchen & Hinge Precision Servicing",
        customerName: "Verified Homeowner",
        status: "en-route",
        technicianName: "Vikram Jadhav (Certified Technician)",
        technicianPhone: "+91 98192 11044",
        scheduledSlot: "Today, 2:00 PM - 5:00 PM",
        pincode: "400079",
        lastUpdated: "12 mins ago",
      });
      showToast("Ticket found! Displaying live technician dispatch status.");
    } else {
      setTrackError("No active service record found for this identifier. Please verify or contact support.");
    }
  };

  const handleDownloadBooklet = (title: string, size: string) => {
    showToast(`Downloading "${title}" (${size})...`);
  };

  const filteredServices = servicesList.filter((s) => {
    if (selectedCategory === "All") return true;
    return s.category === selectedCategory || s.category === "All";
  });

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

        {/* 2. HERO: "Our Services" with Brand Accent */}
        <div className="w-full relative bg-[#fbf7f4] border-y border-[#dcd7d0] py-12 sm:py-16 mb-8 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 relative z-10">
            <div className="max-w-3xl space-y-4">
              <span className="text-[13px] font-semibold uppercase tracking-wider text-[#ff5d55]">
                Expert Care &amp; Maintenance
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-medium text-[#4a4541] leading-[1.15] tracking-tight">
                Our Services
              </h1>
              <p className="text-base sm:text-lg text-[#76716d] leading-relaxed">
                From precision repainting and deep fabric sanitization to annual modular health checks and spatial densification &ndash; our factory-trained technicians keep your home and office functioning like new.
              </p>

              {/* Quick Actions */}
              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <button
                  type="button"
                  onClick={() => scrollToSection("request-service")}
                  className="btn-brand-primary px-7 py-3 text-xs sm:text-sm font-medium tracking-wide shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Request a Service</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("track-service")}
                  className="btn-brand-outline px-6 py-3 text-xs sm:text-sm font-medium tracking-wide cursor-pointer hover:bg-stone-100 flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Track Your Service</span>
                </button>
                <button
                  type="button"
                  onClick={() => openConsultation("Free In-Home Consultation")}
                  className="px-6 py-3 text-xs sm:text-sm font-medium text-[#ff5d55] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Subdued Background Pattern */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 hidden lg:block pointer-events-none">
            <div className="relative w-full h-full">
              <Image
                src="/images/site/cat-acc-pantry.jpg"
                alt="Service background"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* 3. STICKY SUB-NAV BAR (Exact match to live interio.com) */}
        <div className="sticky top-[72px] sm:top-[88px] lg:top-[96px] z-30 bg-white border-b border-[#dcd7d0] py-3.5 mb-12 sm:mb-16 overflow-x-auto no-scrollbar shadow-xs -mx-5 px-5 sm:mx-0 sm:px-0">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
            <ul className="flex items-center space-x-8 text-[14px] font-medium whitespace-nowrap">
              {subNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className={`transition-colors pb-1 border-b-2 cursor-pointer ${
                        isActive
                          ? "border-[#ff5d55] text-[#4a4541] font-semibold"
                          : "border-transparent text-[#76716d] hover:text-[#4a4541]"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
              <li>
                <Link
                  href="/contact"
                  className="transition-colors pb-1 border-b-2 border-transparent text-[#76716d] hover:text-[#4a4541]"
                >
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 space-y-24">
          {/* 4. SERVICE DETAILS SECTION */}
          <section id="service-details" className="space-y-8 scroll-mt-36">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#dcd7d0] pb-6">
              <div>
                <span className="text-[13px] text-[#76716d] uppercase tracking-wider font-medium block mb-1">
                  Comprehensive Offerings
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-medium text-[#4a4541] leading-tight">
                  Service details
                </h2>
              </div>

              {/* Category Segment Filter */}
              <div className="inline-flex border border-[#dcd7d0] bg-white divide-x divide-[#dcd7d0] overflow-x-auto no-scrollbar">
                {["All", "Residential", "Modular", "Commercial"].map((cat) => {
                  const isCatActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                        isCatActive
                          ? "bg-[#f5f0ea] text-[#4a4541] font-semibold"
                          : "bg-white text-[#76716d] hover:bg-[#faf8f5] hover:text-[#4a4541]"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Service Cards Grid (Matching live interio.com 3-column & 2-column layout) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  className="border border-[#dcd7d0] bg-white flex flex-col justify-between group hover:border-[#ff5d55] transition-colors shadow-xs"
                >
                  <div>
                    {/* Image Container */}
                    <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1">
                        {service.category}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-white/95 text-[#4a4541] text-[11px] font-semibold px-2.5 py-1 shadow-xs border border-[#dcd7d0]">
                        {service.pricingStarting}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      <div>
                        <h3 className="text-xl font-medium text-[#4a4541] group-hover:text-[#ff5d55] transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-xs font-medium text-[#ff5d55] mt-0.5">
                          {service.tagline}
                        </p>
                      </div>

                      <p className="text-[13px] text-[#76716d] leading-relaxed line-clamp-3">
                        {service.description}
                      </p>

                      {/* Highlights */}
                      <div className="pt-2 border-t border-[#f0ece6] space-y-1.5">
                        {service.highlights.slice(0, 2).map((hl, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2 text-xs text-[#4a4541]">
                            <Check className="w-3.5 h-3.5 text-[#ff5d55] mt-0.5 shrink-0" />
                            <span className="line-clamp-1">{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="p-6 pt-0 border-t border-[#f0ece6] mt-4 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedServiceModal(service)}
                      className="text-xs font-semibold text-[#76716d] hover:text-[#4a4541] underline cursor-pointer"
                    >
                      Read More &rarr;
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBookServiceClick(service.id)}
                      className="btn-brand-primary px-4 py-2 text-xs font-medium cursor-pointer shadow-xs"
                    >
                      Book Service
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. REQUEST A SERVICE BOOKING FORM */}
          <section
            id="request-service"
            className="scroll-mt-36 pt-8 border-t border-[#dcd7d0] space-y-8"
          >
            <div className="max-w-2xl">
              <span className="text-[13px] text-[#76716d] uppercase tracking-wider font-medium block mb-1">
                Direct Scheduling
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-medium text-[#4a4541] leading-tight">
                Request a service
              </h2>
              <p className="text-sm text-[#76716d] leading-relaxed mt-2">
                Select your required care service, choose a convenient date, and our authorized technician will be assigned directly to your doorstep.
              </p>
            </div>

            <div className="bg-[#fbf7f4] border border-[#dcd7d0] p-6 sm:p-10 max-w-4xl">
              {isSubmitted ? (
                <div className="text-center py-10 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-medium text-[#4a4541]">
                    Service Request Confirmed!
                  </h3>
                  <p className="text-sm text-[#76716d] max-w-md mx-auto">
                    Thank you, <strong className="text-[#4a4541]">{formName}</strong>. Your ticket has been logged into our central dispatch system.
                  </p>
                  <div className="inline-block bg-white border border-[#dcd7d0] px-6 py-3 rounded-md text-sm font-semibold text-[#ff5d55] tracking-wide">
                    Ticket ID: {generatedTicketId}
                  </div>
                  <p className="text-xs text-[#76716d]">
                    We will send an SMS and WhatsApp confirmation to <strong>{formPhone}</strong> shortly before technician arrival.
                  </p>
                  <div className="pt-4 flex justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => scrollToSection("track-service")}
                      className="btn-brand-primary px-6 py-2.5 text-xs font-semibold"
                    >
                      Track This Request &rarr;
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormName("");
                        setFormPhone("");
                        setFormPincode("");
                        setFormAddress("");
                      }}
                      className="btn-brand-outline px-6 py-2.5 text-xs font-semibold"
                    >
                      Book Another Service
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Service Selection Pills */}
                  <div>
                    <label className="block text-xs font-semibold text-[#4a4541] uppercase tracking-wide mb-2.5">
                      1. Select Required Service *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {servicesList.map((srv) => {
                        const isChosen = selectedServiceId === srv.id;
                        return (
                          <button
                            key={srv.id}
                            type="button"
                            onClick={() => setSelectedServiceId(srv.id)}
                            className={`p-3 text-left border text-xs font-medium transition-all cursor-pointer ${
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

                  {/* Personal Contact Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#4a4541] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Ramesh Kulkarni"
                        className="w-full bg-white border border-[#dcd7d0] px-3.5 py-2.5 text-sm rounded-none focus:border-[#ff5d55] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4a4541] mb-1.5">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value.replace(/\D/g, ""))}
                        placeholder="10-digit mobile number"
                        className="w-full bg-white border border-[#dcd7d0] px-3.5 py-2.5 text-sm rounded-none focus:border-[#ff5d55] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4a4541] mb-1.5">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={formPincode}
                        onChange={(e) => setFormPincode(e.target.value.replace(/\D/g, ""))}
                        placeholder="e.g. 400079"
                        className="w-full bg-white border border-[#dcd7d0] px-3.5 py-2.5 text-sm rounded-none focus:border-[#ff5d55] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Full Address */}
                  <div>
                    <label className="block text-xs font-semibold text-[#4a4541] mb-1.5">
                      Service Address / Landmark
                    </label>
                    <input
                      type="text"
                      value={formAddress}
                      onChange={(e) => setFormAddress(e.target.value)}
                      placeholder="Building, Flat No., Street, Area"
                      className="w-full bg-white border border-[#dcd7d0] px-3.5 py-2.5 text-sm rounded-none focus:border-[#ff5d55] focus:outline-hidden"
                    />
                  </div>

                  {/* Preferred Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#4a4541] mb-1.5">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        className="w-full bg-white border border-[#dcd7d0] px-3.5 py-2.5 text-sm rounded-none focus:border-[#ff5d55] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4a4541] mb-1.5">
                        Preferred Time Slot
                      </label>
                      <select
                        value={formTimeSlot}
                        onChange={(e) => setFormTimeSlot(e.target.value)}
                        className="w-full bg-white border border-[#dcd7d0] px-3.5 py-2.5 text-sm rounded-none focus:border-[#ff5d55] focus:outline-hidden"
                      >
                        <option>Morning (9:00 AM - 12:00 PM)</option>
                        <option>Afternoon (12:00 PM - 4:00 PM)</option>
                        <option>Evening (4:00 PM - 7:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  {/* Additional Remarks */}
                  <div>
                    <label className="block text-xs font-semibold text-[#4a4541] mb-1.5">
                      Issue Description / Specific Hardware Concerns
                    </label>
                    <textarea
                      rows={3}
                      value={formNotes}
                      onChange={(e) => setFormNotes(e.target.value)}
                      placeholder="e.g. 2 soft-close drawers are sticking, or need fabric color sample swatches for L-shape sofa reupholstery..."
                      className="w-full bg-white border border-[#dcd7d0] p-3 text-sm rounded-none focus:border-[#ff5d55] focus:outline-hidden"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-[#76716d] flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Certified Status technicians with photo ID &amp; sanitation kit.</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto btn-brand-primary px-8 py-3 text-xs sm:text-sm font-medium tracking-wide shadow-md cursor-pointer"
                    >
                      Confirm Service Request &rarr;
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>

          {/* 6. TRACK YOUR SERVICE */}
          <section
            id="track-service"
            className="scroll-mt-36 pt-8 border-t border-[#dcd7d0] space-y-8"
          >
            <div className="max-w-2xl">
              <span className="text-[13px] text-[#76716d] uppercase tracking-wider font-medium block mb-1">
                Real-Time Updates
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-medium text-[#4a4541] leading-tight">
                Track your service
              </h2>
              <p className="text-sm text-[#76716d] leading-relaxed mt-2">
                Enter your Service Ticket ID (e.g. <code>SR-78291</code>) or your registered 10-digit mobile number to view real-time technician assignment and visit status.
              </p>
            </div>

            {/* Tracker Input Card */}
            <div className="max-w-2xl bg-white border border-[#dcd7d0] p-6 sm:p-8 space-y-6">
              <form onSubmit={handleTrackSubmit} className="space-y-4">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={trackQuery}
                    onChange={(e) => setTrackQuery(e.target.value)}
                    placeholder="Enter Ticket ID (e.g. SR-78291) or Mobile Number"
                    className="w-full bg-stone-50 border border-[#dcd7d0] px-4 py-3 text-sm focus:bg-white focus:border-[#ff5d55] focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 px-5 py-2 bg-[#ff5d55] hover:bg-[#e5473f] text-white text-xs font-semibold transition-colors"
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
                        customerName: "Pooja Singhania",
                        status: "en-route",
                        technicianName: "Vikram Jadhav (Certified Technician)",
                        technicianPhone: "+91 98192 11044",
                        scheduledSlot: "Today, 2:30 PM - 4:30 PM",
                        pincode: "400079",
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

              {/* Live Tracking Result */}
              {trackedOrder && (
                <div className="pt-6 border-t border-[#dcd7d0] space-y-6 animate-in fade-in duration-200">
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-[#fbf7f4] p-4 border border-[#dcd7d0]">
                    <div>
                      <span className="text-[11px] text-[#76716d] uppercase font-semibold">
                        Service Ticket
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
                        Slot Assigned
                      </span>
                      <div className="text-xs font-semibold text-[#4a4541]">
                        {trackedOrder.scheduledSlot}
                      </div>
                      <div className="text-[11px] text-[#76716d]">
                        Updated {trackedOrder.lastUpdated}
                      </div>
                    </div>
                  </div>

                  {/* 5-Step Stepper */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-[#4a4541] uppercase tracking-wide">
                      Progress Stepper
                    </div>
                    <div className="grid grid-cols-4 text-center text-xs relative">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mb-1.5 z-10">
                          <Check className="w-4 h-4" />
                        </div>
                        <span className="font-semibold text-emerald-700">Logged</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mb-1.5 z-10">
                          <Check className="w-4 h-4" />
                        </div>
                        <span className="font-semibold text-emerald-700">Assigned</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-[#ff5d55] text-white flex items-center justify-center font-bold text-xs mb-1.5 z-10 animate-pulse">
                          <Truck className="w-4 h-4" />
                        </div>
                        <span className="font-semibold text-[#ff5d55]">En Route</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center font-bold text-xs mb-1.5 z-10">
                          4
                        </div>
                        <span className="text-[#76716d]">Completed</span>
                      </div>
                    </div>
                  </div>

                  {/* Technician Card */}
                  <div className="border border-[#dcd7d0] p-4 flex items-center justify-between gap-4 bg-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 font-bold">
                        <User className="w-5 h-5 text-[#ff5d55]" />
                      </div>
                      <div>
                        <div className="text-xs text-[#76716d]">Assigned Technician</div>
                        <div className="text-sm font-semibold text-[#4a4541]">
                          {trackedOrder.technicianName}
                        </div>
                      </div>
                    </div>
                    <a
                      href={`tel:${trackedOrder.technicianPhone.replace(/\s+/g, "")}`}
                      className="px-4 py-2 border border-[#4a4541] hover:bg-[#4a4541] hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Tech</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 7. CARE BOOKLETS */}
          <section
            id="care-booklets"
            className="scroll-mt-36 pt-8 border-t border-[#dcd7d0] space-y-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="max-w-2xl">
                <span className="text-[13px] text-[#76716d] uppercase tracking-wider font-medium block mb-1">
                  Official Maintenance Guides
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-medium text-[#4a4541] leading-tight">
                  Care Booklets
                </h2>
                <p className="text-sm text-[#76716d] leading-relaxed mt-2">
                  Official Godrej Interio &amp; Status engineered care manuals. Download free PDF handbooks to keep your cabinetry, hardware, and fabrics performing at factory standards.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {careBooklets.map((booklet) => (
                <div
                  key={booklet.id}
                  className="border border-[#dcd7d0] bg-white flex flex-col justify-between group hover:border-[#4a4541] transition-colors"
                >
                  <div>
                    <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                      <Image
                        src={booklet.coverImage}
                        alt={booklet.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-black/75 text-white text-[11px] font-medium px-2.5 py-1">
                        {booklet.category}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-white text-[#4a4541] text-[11px] font-bold px-2.5 py-1 border border-[#dcd7d0]">
                        {booklet.fileSize}
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="text-base font-medium text-[#4a4541] group-hover:text-[#ff5d55] transition-colors leading-snug">
                        {booklet.title}
                      </h3>
                      <p className="text-xs text-[#76716d] leading-relaxed line-clamp-3">
                        {booklet.description}
                      </p>

                      <div className="pt-2 border-t border-[#f0ece6] space-y-1">
                        <div className="text-[11px] font-semibold text-[#4a4541] uppercase tracking-wide">
                          What&apos;s Inside:
                        </div>
                        {booklet.keyPoints.slice(0, 2).map((kp, kIdx) => (
                          <div key={kIdx} className="flex items-start gap-1.5 text-xs text-[#76716d]">
                            <span className="text-[#ff5d55] font-bold">&bull;</span>
                            <span className="line-clamp-1">{kp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-[#f0ece6] mt-4">
                    <button
                      type="button"
                      onClick={() => handleDownloadBooklet(booklet.title, booklet.fileSize)}
                      className="w-full btn-brand-outline py-2.5 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#4a4541] hover:text-white transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF Manual</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 8. FAQS ACCORDION */}
          <section id="faqs" className="scroll-mt-36 pt-8 border-t border-[#dcd7d0] space-y-8">
            <div className="max-w-2xl">
              <span className="text-[13px] text-[#76716d] uppercase tracking-wider font-medium block mb-1">
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-medium text-[#4a4541] leading-tight">
                FAQs
              </h2>
              <p className="text-sm text-[#76716d] leading-relaxed mt-2">
                Have questions regarding warranty coverage, service technicians, or Annual Maintenance Contracts? Find immediate answers below.
              </p>
            </div>

            <div className="max-w-3xl border-t border-[#dcd7d0] divide-y divide-[#dcd7d0]">
              {servicesFAQs.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div key={idx} className="py-4 sm:py-5">
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(isOpen ? null : idx)}
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
                      <div className="pt-3 pb-1 text-sm text-[#76716d] leading-relaxed animate-in fade-in duration-150">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* 9. IMMEDIATE SUPPORT BANNER (Matching live site) */}
          <section className="bg-[#4a4541] text-white p-8 sm:p-12 border border-[#4a4541] flex flex-col md:flex-row items-center justify-between gap-8">
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
                href="tel:18002671122"
                className="w-full sm:w-auto bg-[#ff5d55] hover:bg-[#e5473f] text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-[20px_2px_2px_2px] flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Call 1800-267-1122</span>
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

            <div className="relative h-44 w-full overflow-hidden border border-[#dcd7d0]">
              <Image
                src={selectedServiceModal.image}
                alt={selectedServiceModal.title}
                fill
                className="object-cover"
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
                <span className="text-[#76716d] block">Pricing Starting At:</span>
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
