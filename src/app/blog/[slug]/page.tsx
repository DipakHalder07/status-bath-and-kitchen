import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogArticles, getBlogArticleBySlug, getRelatedArticles } from "@/data/blogData";
import BlogDetailClient from "./BlogDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | Status Bath and Kitchen",
    };
  }

  return {
    title: `${article.title} | Status Bath and Kitchen`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | Status Bath and Kitchen`,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      tags: article.tags,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.slug, 3);

  return <BlogDetailClient article={article} relatedArticles={relatedArticles} />;
}

