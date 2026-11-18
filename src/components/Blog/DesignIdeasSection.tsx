"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { blogArticles } from "@/data/blogData";

export default function DesignIdeasSection() {
  const spotlightArticles = blogArticles.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-[#faf8f5] border-t border-stone-200/60">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        {/* Banner Card with Exact Live Background Image */}
        <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-white p-8 sm:p-14 mb-12 shadow-xl">
          <picture className="absolute inset-0 w-full h-full">
            <img
              src="https://interio.com/media/.renditions/wysiwyg/B2C-Homepage/Get_inspired_522x300px.jpg"
              alt="Design ideas to inspire you"
              className="w-full h-full object-cover opacity-45"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />

          <div className="relative z-10 max-w-xl space-y-4">
            <span className="text-xs font-bold text-[#ff9f99] uppercase tracking-wider">
              Interior Lookbooks &amp; Tips
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold leading-tight text-white">
              Design ideas to inspire you
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              Blogs, articles, moodboards and more &ndash; expert advice from our design team so you stay up to date on all the latest trends.
            </p>
            <div className="pt-2">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#ff5d55] text-gray-900 hover:text-white text-xs font-bold transition-all shadow-md group"
              >
                <span>View all articles</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Articles Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {spotlightArticles.map((art) => (
            <Link
              key={art.slug}
              href={`/blog/${art.slug}`}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/70 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full aspect-16/10 overflow-hidden bg-stone-100">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold">
                    {art.category}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{art.readTime}</span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#ff5d55] transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h4>
                  <p className="text-xs text-[#76716d] line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2">
                <span className="text-xs font-bold text-[#ff5d55] flex items-center gap-1 group-hover:underline">
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
