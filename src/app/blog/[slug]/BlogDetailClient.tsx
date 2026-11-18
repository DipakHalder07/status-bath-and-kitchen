"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Calendar,
  Share2,
  Check,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Sparkles,
  Bookmark,
  Heart,
  ChevronRight,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import Navbar from "@/components/Header/Navbar";
import MobileDrawer from "@/components/Header/MobileDrawer";
import Footer from "@/components/Footer/Footer";
import CartDrawer from "@/components/Cart/CartDrawer";
import ConsultationModal from "@/components/Modals/ConsultationModal";
import Toast from "@/components/UI/Toast";
import { useCart } from "@/context/CartContext";
import { BlogArticleFull, getRelatedArticles } from "@/data/blogData";
import { allProductsCatalog, Product } from "@/data/productsData";

interface BlogDetailClientProps {
  article: BlogArticleFull;
  relatedArticles?: BlogArticleFull[];
}

export default function BlogDetailClient({
  article,
  relatedArticles: initialRelated,
}: BlogDetailClientProps) {
  const { openConsultation, showToast } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const relatedArticles = initialRelated || getRelatedArticles(article.slug, 3);
  const shoppableProducts: Product[] = allProductsCatalog.filter((p: Product) =>
    article.relatedProductIds.includes(p.id)
  );

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      showToast("Article link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareWhatsapp = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`Read this article on Status Bath and Kitchen: ${article.title}`);
      window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, "_blank");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#4a4541] font-sans">
      {/* Top Header */}
      <Navbar forceSolid={true} onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />

      <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <main className="flex-1 w-full pt-28 sm:pt-36 pb-20">
        {/* 1. BREADCRUMBS */}
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
          <nav aria-label="Breadcrumb" className="py-4 text-[13px] sm:text-[14px] text-[#76716d]">
            <ol className="flex items-center space-x-2 flex-wrap">
              <li>
                <Link href="/" className="hover:text-[#4a4541] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-[#dcd7d0]">/</span>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#4a4541] transition-colors">
                  Design Ideas
                </Link>
              </li>
              <li>
                <span className="text-[#dcd7d0]">/</span>
              </li>
              <li className="font-medium text-[#4a4541] truncate max-w-xs sm:max-w-md">
                {article.title}
              </li>
            </ol>
          </nav>
        </div>

        {/* 2. ARTICLE HEADER */}
        <header className="max-w-[960px] mx-auto px-5 sm:px-8 pt-4 pb-8 space-y-5 text-center">
          {/* Category & Read Time */}
          <div className="flex items-center justify-center gap-2.5 text-xs">
            <Link
              href={`/blog`}
              className="px-3 py-1 bg-[#f5f0ea] hover:bg-[#ede5dc] text-[#ff5d55] font-semibold uppercase tracking-wider rounded-xs transition-colors"
            >
              {article.category}
            </Link>
            <span className="text-[#dcd7d0]">•</span>
            <span className="text-[#76716d] flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-[46px] font-medium text-[#4a4541] tracking-tight leading-[1.2]">
            {article.title}
          </h1>

          {/* Excerpt Lead */}
          <p className="text-base sm:text-lg text-[#76716d] leading-relaxed max-w-2xl mx-auto font-normal">
            {article.excerpt}
          </p>

          {/* Author & Share Bar */}
          <div className="pt-6 border-t border-[#dcd7d0] flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-stone-200 shrink-0 border border-[#dcd7d0]">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-[#4a4541]">
                  {article.author.name}
                </div>
                <div className="text-xs text-[#76716d]">
                  {article.author.role} • Published on {article.publishedAt}
                </div>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#dcd7d0] hover:border-[#4a4541] bg-white text-xs font-medium text-[#4a4541] transition-colors cursor-pointer"
                title="Copy Link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Share Link"}</span>
              </button>

              <button
                type="button"
                onClick={handleShareWhatsapp}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-medium transition-colors cursor-pointer shadow-xs"
                title="Share on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </header>

        {/* 3. HERO IMAGE */}
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 mb-12">
          <div className="relative w-full aspect-16/10 sm:aspect-21/9 overflow-hidden bg-[#f6f4f0] shadow-sm">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        </div>

        {/* 4. MAIN EDITORIAL CONTENT & SIDEBAR */}
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
            {/* LEFT COLUMN: STICKY TOC & KEY TAKEAWAYS (4 Cols on desktop) */}
            <aside className="lg:col-span-4 order-2 lg:order-1 space-y-6">
              <div className="sticky top-28 space-y-6">
                {/* Key Takeaways Card */}
                {article.keyTakeaways && article.keyTakeaways.length > 0 && (
                  <div className="p-6 bg-[#fbf7f4] border border-[#dcd7d0] space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#ff5d55]">
                      <Sparkles className="w-4 h-4" />
                      <span>Key Takeaways</span>
                    </div>
                    <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#4a4541] leading-relaxed">
                      {article.keyTakeaways.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#ff5d55] shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Table of Contents */}
                <div className="p-6 bg-white border border-[#dcd7d0] space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#4a4541]">
                    In This Article
                  </h3>
                  <nav className="space-y-2 text-xs sm:text-sm">
                    {article.sections.map((section, idx) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="block text-[#76716d] hover:text-[#ff5d55] hover:underline transition-colors py-1 leading-snug"
                      >
                        {idx + 1}. {section.heading}
                      </a>
                    ))}
                    {article.faqs && article.faqs.length > 0 && (
                      <a
                        href="#faq-section"
                        className="block text-[#76716d] hover:text-[#ff5d55] hover:underline transition-colors py-1 leading-snug"
                      >
                        Frequently Asked Questions
                      </a>
                    )}
                  </nav>
                </div>

                {/* Designer Consultation Widget */}
                <div className="p-6 bg-[#f5f0ea] border border-[#dcd7d0] space-y-3">
                  <span className="text-xs font-semibold text-[#ff5d55] uppercase tracking-wider block">
                    Free Consultation
                  </span>
                  <h4 className="text-base font-medium text-[#4a4541] leading-snug">
                    Planning a home makeover?
                  </h4>
                  <p className="text-xs text-[#76716d] leading-relaxed">
                    Our certified architects provide customized 3D floorplan visualizations and material estimates.
                  </p>
                  <button
                    type="button"
                    onClick={() => openConsultation(`Article: ${article.title}`)}
                    className="w-full py-2.5 px-4 btn-brand-primary text-xs font-medium tracking-wide shadow-xs cursor-pointer text-center"
                  >
                    Talk to a Designer
                  </button>
                </div>
              </div>
            </aside>

            {/* RIGHT COLUMN: MAIN ARTICLE TEXT (8 Cols on desktop) */}
            <article className="lg:col-span-8 order-1 lg:order-2 space-y-12">
              {article.sections.map((section, sIdx) => (
                <section key={section.id} id={section.id} className="space-y-5 scroll-mt-28">
                  <h2 className="text-2xl sm:text-3xl font-medium text-[#4a4541] tracking-tight leading-snug">
                    {section.heading}
                  </h2>

                  {/* Paragraphs */}
                  {section.paragraphs.map((para, pIdx) => (
                    <p
                      key={pIdx}
                      className={`text-[15px] sm:text-[16px] text-[#4a4541] leading-[1.8] font-normal ${
                        sIdx === 0 && pIdx === 0 ? "first-letter:text-4xl first-letter:font-bold first-letter:text-[#ff5d55] first-letter:mr-1 first-letter:float-left" : ""
                      }`}
                    >
                      {para}
                    </p>
                  ))}

                  {/* In-content image if present */}
                  {section.image && (
                    <div className="my-6 space-y-2">
                      <div className="relative w-full aspect-16/10 overflow-hidden bg-stone-100 border border-[#dcd7d0]">
                        <Image
                          src={section.image}
                          alt={section.imageCaption || section.heading}
                          fill
                          sizes="(max-width: 1024px) 100vw, 800px"
                          className="object-cover"
                        />
                      </div>
                      {section.imageCaption && (
                        <p className="text-xs text-[#76716d] italic text-center">
                          {section.imageCaption}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Pro Tip Card */}
                  {section.proTip && (
                    <div className="p-5 sm:p-6 bg-[#fbf7f4] border-l-4 border-[#ff5d55] space-y-1.5 my-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#ff5d55] block">
                        Architect Pro Tip
                      </span>
                      <p className="text-xs sm:text-sm text-[#4a4541] leading-relaxed italic">
                        &ldquo;{section.proTip}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Bullet Points */}
                  {section.bulletPoints && section.bulletPoints.length > 0 && (
                    <ul className="space-y-2.5 my-4">
                      {section.bulletPoints.map((pt, ptIdx) => (
                        <li key={ptIdx} className="flex items-start gap-2.5 text-[14px] sm:text-[15px] text-[#4a4541] leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff5d55] mt-2 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Comparison Table */}
                  {section.comparisonTable && (
                    <div className="my-8 overflow-x-auto no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0">
                      <table className="w-full min-w-[500px] border border-[#dcd7d0] text-xs sm:text-sm">
                        <thead className="bg-[#f5f0ea] border-b border-[#dcd7d0]">
                          <tr>
                            {section.comparisonTable.headers.map((h, hIdx) => (
                              <th
                                key={hIdx}
                                className="py-3 px-4 text-left font-semibold text-[#4a4541]"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#dcd7d0]">
                          {section.comparisonTable.rows.map((row, rIdx) => (
                            <tr
                              key={rIdx}
                              className={rIdx % 2 === 0 ? "bg-white" : "bg-[#fbf7f4]"}
                            >
                              {row.map((cell, cIdx) => (
                                <td
                                  key={cIdx}
                                  className={`py-3 px-4 text-[#4a4541] ${
                                    cIdx === 0 ? "font-medium" : ""
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              ))}

              {/* Shoppable Related Products Carousel / Grid */}
              {shoppableProducts.length > 0 && (
                <div className="pt-8 border-t border-[#dcd7d0] space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#ff5d55] block">
                        Featured in this guide
                      </span>
                      <h3 className="text-xl sm:text-2xl font-medium text-[#4a4541]">
                        Explore Featured Status Products
                      </h3>
                    </div>
                    <Link
                      href="/products"
                      className="text-xs font-semibold text-[#ff5d55] hover:underline"
                    >
                      View All &rarr;
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {shoppableProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="border border-[#dcd7d0] p-4 bg-[#fbf7f4] flex gap-4 items-center group"
                      >
                        <div className="relative w-24 h-24 bg-white shrink-0 overflow-hidden border border-[#dcd7d0]">
                          <Image
                            src={prod.image}
                            alt={prod.name}
                            fill
                            sizes="96px"
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="text-[11px] text-[#76716d] uppercase font-semibold">
                            {prod.category}
                          </div>
                          <Link href={`/products/${prod.id}`}>
                            <h4 className="text-sm font-medium text-[#4a4541] hover:text-[#ff5d55] transition-colors truncate">
                              {prod.name}
                            </h4>
                          </Link>
                          <div className="text-sm font-bold text-[#4a4541]">
                            ₹{prod.price.toLocaleString("en-IN")}
                          </div>
                          <Link
                            href={`/products/${prod.id}`}
                            className="inline-block text-xs font-semibold text-[#ff5d55] hover:underline pt-0.5"
                          >
                            View Details &rarr;
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs Section */}
              {article.faqs && article.faqs.length > 0 && (
                <div id="faq-section" className="pt-8 border-t border-[#dcd7d0] space-y-5 scroll-mt-28">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#ff5d55]" />
                    <h3 className="text-xl sm:text-2xl font-medium text-[#4a4541]">
                      Frequently Asked Questions
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {article.faqs.map((faq, idx) => (
                      <div
                        key={idx}
                        className="p-5 bg-white border border-[#dcd7d0] space-y-2"
                      >
                        <h4 className="font-medium text-base text-[#4a4541]">
                          {faq.q}
                        </h4>
                        <p className="text-sm text-[#76716d] leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Bio Box */}
              <div className="pt-8 border-t border-[#dcd7d0] p-6 sm:p-8 bg-[#fbf7f4] border border-[#dcd7d0] flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-xs">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1.5 flex-1">
                  <span className="text-[11px] uppercase tracking-wider text-[#ff5d55] font-semibold block">
                    Written by
                  </span>
                  <h4 className="text-lg font-medium text-[#4a4541]">
                    {article.author.name}
                  </h4>
                  <p className="text-xs text-[#76716d] leading-relaxed">
                    {article.author.role} at Status Bath and Kitchen. Specializing in ergonomic floorplan planning, high-durability BWP marine fabrication, and contemporary interior aesthetics.
                  </p>
                </div>
              </div>
            </article>
          </div>

          {/* 5. EXPLORE MORE ARTICLES (3-Column Grid) */}
          <div className="mt-20 pt-12 border-t border-[#dcd7d0] space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#ff5d55] block">
                  More Inspiration
                </span>
                <h3 className="text-2xl sm:text-3xl font-medium text-[#4a4541]">
                  Related Design Stories
                </h3>
              </div>
              <Link
                href="/blog"
                className="text-xs sm:text-sm font-semibold text-[#ff5d55] hover:underline"
              >
                View all articles &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((rel) => (
                <article
                  key={rel.slug}
                  className="border border-[#dcd7d0] bg-white overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-md"
                >
                  <Link
                    href={`/blog/${rel.slug}`}
                    className="block relative aspect-16/10 overflow-hidden bg-stone-100"
                  >
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      sizes="380px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 text-[#4a4541] text-[10px] uppercase font-semibold tracking-wider px-2.5 py-0.5 shadow-xs">
                      {rel.category}
                    </div>
                  </Link>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="text-[11px] text-[#76716d] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{rel.readTime}</span>
                      </div>
                      <Link href={`/blog/${rel.slug}`}>
                        <h4 className="font-medium text-base text-[#4a4541] leading-snug group-hover:text-[#ff5d55] transition-colors line-clamp-2">
                          {rel.title}
                        </h4>
                      </Link>
                      <p className="text-xs text-[#76716d] leading-relaxed line-clamp-2">
                        {rel.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#f0ece6] flex items-center justify-between">
                      <span className="text-xs text-[#4a4541] font-medium">
                        {rel.author.name}
                      </span>
                      <Link
                        href={`/blog/${rel.slug}`}
                        className="text-xs font-semibold text-[#ff5d55] hover:underline inline-flex items-center gap-1"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
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
