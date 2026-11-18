import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allProductsCatalog, getProductById } from "@/data/productsData";
import ProductDetailClient from "./ProductDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

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
    };
  }

  return {
    title: `${product.name} | Status Bath and Kitchen`,
    description: product.description || `Buy ${product.name} with up to 10-year warranty, free delivery, and free installation.`,
    openGraph: {
      title: `${product.name} | Status Bath and Kitchen`,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}

