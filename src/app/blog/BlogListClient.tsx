"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Clock,
  ArrowRight,
  BookOpen,
  Sparkles,
  Calendar,
  User,
  SlidersHorizontal,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Header/Navbar";
import MobileDrawer from "@/components/Header/MobileDrawer";
import Footer from "@/components/Footer/Footer";
import CartDrawer from "@/components/Cart/CartDrawer";
import ConsultationModal from "@/components/Modals/ConsultationModal";
import Toast from "@/components/UI/Toast";
import { useCart } from "@/context/CartContext";
import { blogArticles, blogCategories, BlogArticleFull } from "@/data/blogData";

export default function BlogListClient() {
  const { openConsultation } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Articles");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    return blogArticles.filter((article) => {
      const matchesCategory =
        selectedCategory === "All Articles" || article.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredArticle = blogArticles[0];

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
              <li className="font-medium text-[#4a4541]">Design Ideas &amp; Blog</li>
            </ol>
          </nav>
        </div>

        {/* 2. HERO HEADER */}
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 mb-10 text-center">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#ff5d55] block mb-2">
            Status Living Journal
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-medium text-[#4a4541] tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Design Ideas, Guides &amp; Inspiration
          </h1>
          <p className="mt-4 text-[15px] sm:text-[17px] text-[#76716d] leading-relaxed max-w-2xl mx-auto">
            Expert insights from master architects and home space planners on space planning, material science, and modern Indian living.
          </p>

          {/* Search bar */}
          <div className="mt-6 max-w-md mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search design guides, layouts, materials..."
              className="w-full bg-[#fbf7f4] text-base sm:text-sm pl-11 pr-4 py-3 rounded-full border border-[#dcd7d0] focus:border-[#ff5d55] focus:bg-white focus:outline-hidden text-[#4a4541]"
            />
            <Search className="w-4 h-4 text-[#76716d] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 3. CATEGORY PILLS BAR (Scrollable on mobile) */}
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 mb-12">
          <div className="overflow-x-auto no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0">
            <div className="inline-flex border border-[#dcd7d0] bg-white divide-x divide-[#dcd7d0]">
              {blogCategories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative px-5 sm:px-7 py-3 text-[13px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      isActive
                        ? "bg-[#f5f0ea] text-[#4a4541] font-semibold"
                        : "bg-white text-[#76716d] hover:bg-[#faf8f5] hover:text-[#4a4541]"
                    }`}
                  >
                    <span>{cat}</span>
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff5d55]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 space-y-16">
          {/* 4. FEATURED HERO ARTICLE SPOTLIGHT (When viewing all or relevant category) */}
          {selectedCategory === "All Articles" && !searchQuery && (
            <div className="bg-[#fbf7f4] border border-[#dcd7d0] overflow-hidden group">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[440px] overflow-hidden">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 text-[#4a4541] text-[11px] uppercase tracking-wider font-semibold px-3 py-1 shadow-xs">
                    Editor&apos;s Pick
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs text-[#76716d]">
                      <span className="font-semibold text-[#ff5d55] uppercase tracking-wider">
                        {featuredArticle.category}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredArticle.readTime}
                      </span>
                    </div>

                    <Link href={`/blog/${featuredArticle.slug}`}>
                      <h2 className="text-2xl sm:text-3xl font-medium text-[#4a4541] leading-snug group-hover:text-[#ff5d55] transition-colors line-clamp-3">
                        {featuredArticle.title}
                      </h2>
                    </Link>

                    <p className="text-[14px] sm:text-[15px] text-[#76716d] leading-relaxed line-clamp-3 font-normal">
                      {featuredArticle.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#dcd7d0] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-stone-200 shrink-0">
                        <img
                          src={featuredArticle.author.avatar}
                          alt={featuredArticle.author.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#4a4541]">
                          {featuredArticle.author.name}
                        </div>
                        <div className="text-[11px] text-[#76716d]">
                          {featuredArticle.author.role}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${featuredArticle.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#ff5d55] hover:text-[#e5473f] transition-colors"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. ARTICLE GRID */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-medium text-[#4a4541] tracking-tight">
                {selectedCategory === "All Articles" ? "Latest Articles" : selectedCategory}
                <span className="text-base text-[#76716d] font-normal ml-2">
                  ({filteredArticles.length})
                </span>
              </h2>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-[#dcd7d0] p-10 bg-[#fbf7f4]">
                <p className="text-lg font-medium text-[#4a4541] mb-2">
                  No articles found matching your search.
                </p>
                <p className="text-sm text-[#76716d] mb-6">
                  Try searching with a broader keyword or browse all categories.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All Articles");
                    setSearchQuery("");
                  }}
                  className="btn-brand-primary px-6 py-2.5 text-xs font-medium cursor-pointer"
                >
                  View All Articles
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <article
                    key={article.slug}
                    className="border border-[#dcd7d0] bg-white overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-md"
                  >
                    {/* Thumbnail Image */}
                    <Link
                      href={`/blog/${article.slug}`}
                      className="block relative aspect-16/10 overflow-hidden bg-stone-100"
                    >
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 text-[#4a4541] text-[10px] uppercase font-semibold tracking-wider px-2.5 py-0.5 shadow-xs">
                        {article.category}
                      </div>
                    </Link>

                    {/* Content Box */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2 text-[11px] text-[#76716d]">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {article.publishedAt}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </span>
                        </div>

                        <Link href={`/blog/${article.slug}`} className="block">
                          <h3 className="font-medium text-lg text-[#4a4541] leading-snug group-hover:text-[#ff5d55] transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                        </Link>

                        <p className="text-[13px] text-[#76716d] leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>
                      </div>

                      {/* Author & Read Link */}
                      <div className="pt-4 border-t border-[#f0ece6] flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={article.author.avatar}
                            alt={article.author.name}
                            className="w-6 h-6 rounded-full object-cover shrink-0"
                          />
                          <span className="text-xs text-[#4a4541] font-medium truncate">
                            {article.author.name}
                          </span>
                        </div>

                        <Link
                          href={`/blog/${article.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#ff5d55] hover:text-[#e5473f] shrink-0"
                        >
                          <span>Read</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* 6. DESIGN CONSULTATION BANNER */}
          <div className="bg-[#f5f0ea] border border-[#dcd7d0] p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#ff5d55] block">
                Have a floorplan or renovation in mind?
              </span>
              <h3 className="text-2xl sm:text-3xl font-medium text-[#4a4541] leading-tight">
                Get a personalized 3D plan &amp; material quotation
              </h3>
              <p className="text-sm text-[#76716d] leading-relaxed">
                Our kitchen &amp; bath consultants bring laser measurement tools, 50+ surface samples, and 3D CAD rendering directly to your doorstep.
              </p>
            </div>

            <div className="shrink-0">
              <button
                type="button"
                onClick={() => openConsultation("Design Consultation from Blog")}
                className="btn-brand-primary px-8 py-3.5 text-xs sm:text-sm font-medium tracking-wide shadow-xs cursor-pointer flex items-center gap-2 whitespace-nowrap"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <ConsultationModal />
      <Toast />

      {/* Footer */}
      <Footer showBlogCredit={true} />
    </div>
  );
}

