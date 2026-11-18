import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const outfitFont = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://statusbathkitchen.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Status Bath and Kitchen | Modular Kitchens, Luxury Bathrooms, Doors & Windows",
    template: "%s | Status Bath and Kitchen",
  },
  description:
    "Status Bath & Kitchen designs, fabricates and installs precision modular kitchens, luxury bathroom suites, custom wardrobes, architectural doors, and designer windows. Experience custom finishes in our physical showroom or book a consultation.",
  keywords: [
    "Status Bath and Kitchen",
    "Modular Kitchens",
    "Luxury Bathrooms",
    "Bespoke Wardrobes",
    "Architectural Doors",
    "Designer Windows",
    "Built-in Kitchen Appliances",
    "Modular Kitchen Showroom",
    "Bathroom Vanities & Fixtures",
    "Siliguri Modular Kitchens",
    "West Bengal Interior Showroom",
    "Walk-in Closets",
    "Sliding Glass Doors",
    "Kitchen Accessories & Organizers",
  ],
  authors: [{ name: "Status Bath and Kitchen", url: siteUrl }],
  creator: "Status Bath and Kitchen",
  publisher: "Status Bath and Kitchen",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Status Bath and Kitchen",
    title: "Status Bath and Kitchen | Modular Kitchens, Luxury Bathrooms, Doors & Windows",
    description:
      "Explore bespoke modular kitchens, luxury bathroom vanities, fitted wardrobes, and architectural doors & windows crafted for contemporary homes. Visit our showroom experience studio.",
    images: [
      {
        url: "/images/hero-kitchen.jpg",
        width: 1200,
        height: 630,
        alt: "Status Bath and Kitchen - Luxury Modular Kitchen & Bathroom Showroom",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Status Bath and Kitchen | Modular Kitchens, Luxury Bathrooms, Doors & Windows",
    description:
      "Explore bespoke modular kitchens, luxury bathroom vanities, fitted wardrobes, and architectural doors & windows. Visit our physical store experience studio.",
    images: ["/images/hero-kitchen.jpg"],
    creator: "@statusbathkitchen",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/images/status-bk-icon.png" },
      { url: "/images/status-bk-icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/images/status-bk-apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/images/status-bk-icon.png"],
  },
  category: "Interior Design & Modular Architecture",
};

// JSON-LD Structured Data for LocalBusiness & Organization
const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "HomeGoodsStore",
  "@id": `${siteUrl}/#store`,
  "name": "Status Bath and Kitchen",
  "alternateName": "Status",
  "url": siteUrl,
  "logo": `${siteUrl}/images/status-bk-logo-dark.png`,
  "image": `${siteUrl}/images/hero-kitchen.jpg`,
  "description": "Status Bath & Kitchen is a premier bespoke showroom studio for modular kitchens, luxury bathrooms, custom wardrobes, architectural doors, and designer windows.",
  "telephone": "+91 98320 95793",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Showroom Studio",
    "addressLocality": "Siliguri",
    "addressRegion": "West Bengal",
    "addressCountry": "IN",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 26.7271,
    "longitude": 88.3953,
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "10:00",
      "closes": "20:00",
    },
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91 98320 95793",
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi", "Bengali"],
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Status Bath & Kitchen Solutions",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "Modular Kitchens",
      },
      {
        "@type": "OfferCatalog",
        "name": "Luxury Bathrooms",
      },
      {
        "@type": "OfferCatalog",
        "name": "Bespoke Wardrobes",
      },
      {
        "@type": "OfferCatalog",
        "name": "Architectural Doors & Windows",
      },
      {
        "@type": "OfferCatalog",
        "name": "Kitchen Appliances & Accessories",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfitFont.variable} h-full antialiased font-sans`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white text-[#4a4541] selection:bg-red-100 selection:text-red-900">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
