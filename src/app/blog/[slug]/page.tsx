import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogArticles, getBlogArticleBySlug, getRelatedArticles } from "@/data/blogData";
import BlogDetailClient from "./BlogDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://statusbathkitchen.com";

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
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = article.title;
  const canonicalUrl = `${siteUrl}/blog/${article.slug}`;
  const imageUrl = article.image.startsWith("http") ? article.image : `${siteUrl}${article.image}`;

  return {
    title,
    description: article.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: article.excerpt,
      url: canonicalUrl,
      siteName: "Status Bath and Kitchen",
      locale: "en_IN",
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      tags: article.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: article.excerpt,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
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
  const articleUrl = `${siteUrl}/blog/${article.slug}`;
  const imageUrl = article.image.startsWith("http") ? article.image : `${siteUrl}${article.image}`;

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "image": imageUrl,
    "datePublished": article.publishedAt,
    "dateModified": article.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    "author": {
      "@type": "Person",
      "name": article.author.name,
      "jobTitle": article.author.role,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Status Bath and Kitchen",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/images/status-kw-logo-color.png`,
      },
    },
    "keywords": article.tags.join(", "),
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Design Ideas & Blog",
        "item": `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": articleUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <BlogDetailClient article={article} relatedArticles={relatedArticles} />
    </>
  );
}
