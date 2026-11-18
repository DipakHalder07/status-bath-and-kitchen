import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allProductsCatalog, getProductById } from "@/data/productsData";
import ProductDetailClient from "./ProductDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://statusbathkitchen.com";

export async function generateStaticParams() {
  return allProductsCatalog.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found | Status Bath and Kitchen",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = product.name;
  const description =
    product.description ||
    `Explore ${product.name} at Status Bath & Kitchen. Custom modular craftsmanship with 10-year warranty, expert showroom consultation, and certified installation.`;
  const canonicalUrl = `${siteUrl}/products/${product.id}`;
  const imageUrl = product.image.startsWith("http") ? product.image : `${siteUrl}${product.image}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: canonicalUrl,
      siteName: "Status Bath and Kitchen",
      title: `${product.name} | Status Bath and Kitchen`,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const imageUrl = product.image.startsWith("http") ? product.image : `${siteUrl}${product.image}`;
  const productUrl = `${siteUrl}/products/${product.id}`;

  const jsonLdProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": imageUrl,
    "description": product.description,
    "category": product.category,
    "brand": {
      "@type": "Brand",
      "name": "Status Bath and Kitchen",
    },
    "offers": {
      "@type": "Offer",
      "url": productUrl,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStoreOnly",
      "seller": {
        "@type": "HomeGoodsStore",
        "name": "Status Bath and Kitchen",
      },
    },
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
        "name": "Products",
        "item": `${siteUrl}/products`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.category,
        "item": `${siteUrl}/products?category=${encodeURIComponent(product.category)}`,
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": product.name,
        "item": productUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
