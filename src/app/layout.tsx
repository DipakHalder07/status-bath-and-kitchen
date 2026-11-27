import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import PageScrollBar from "@/components/UI/PageScrollBar";

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
    default: "Status Bath and Kitchen | Modular Kitchens, Windows, Wardrobes, Railings & Insect Blinds",
    template: "%s | Status Bath and Kitchen",
  },
  description:
    "Status Bath & Kitchen designs, supplies and installs precision modular kitchens, WAW aluminium & Ambiiance uPVC windows, custom wardrobes, glass railings, kitchen appliances, and Meshworkz insect blinds.",
  keywords: [
    "Status Bath and Kitchen",
    "Modular Kitchens",
    "WAW Aluminium Windows",
    "Ambiiance uPVC Windows",
    "Bespoke Wardrobes",
    "Glass Railings",
    "Built-in Kitchen Appliances",
    "Meshworkz Insect Blinds",
    "Modular Kitchen Showroom",
    "Siliguri Modular Kitchens",
    "Walk-in Closets",
    "Pleated Insect Screens",
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
    title: "Status Bath and Kitchen | Modular Kitchens, Windows, Wardrobes, Railings & Insect Blinds",
    description:
      "Explore bespoke modular kitchens, WAW aluminium & Ambiiance uPVC windows, fitted wardrobes, glass railings, appliances, and insect blinds crafted for contemporary homes.",
    images: [
      {
        url: "/images/hero-kitchen.jpg",
        width: 1200,
        height: 630,
        alt: "Status Bath and Kitchen - Modular Kitchens, Windows, Railings & Wardrobes",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Status Bath and Kitchen | Modular Kitchens, Windows, Wardrobes, Railings & Insect Blinds",
    description:
      "Explore bespoke modular kitchens, WAW aluminium & Ambiiance uPVC windows, fitted wardrobes, glass railings, appliances, and insect blinds.",
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
      { url: "/images/status-kw-icon.png" },
      { url: "/images/status-kw-icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/images/status-kw-apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/images/status-kw-icon.png"],
  },
  category: "Home Architecture, Modular Kitchens, Windows & Railings",
};

// JSON-LD Structured Data for LocalBusiness & Organization
const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "HomeGoodsStore",
  "@id": `${siteUrl}/#store`,
  "name": "Status Bath and Kitchen",
  "alternateName": "Status",
  "url": siteUrl,
  "logo": `${siteUrl}/images/status-kw-logo-dark.png`,
  "image": `${siteUrl}/images/hero-kitchen.jpg`,
  "description": "Status Bath & Kitchen is a premier bespoke showroom studio for modular kitchens, WAW aluminium windows, Ambiiance uPVC windows, custom wardrobes, glass railings, appliances, and Meshworkz insect blinds.",
  "telephone": "+91 98320 95793",
  "priceRange": "$$",
  "hasMap": "https://share.google/V1jbNPSPYTSSO7Gpq",
  "sameAs": [
    "https://share.google/V1jbNPSPYTSSO7Gpq",
    "https://www.instagram.com/statuskitchensiliguri?evlk=NGR0eXJ5a3Vkd2kx",
    "https://www.facebook.com/share/14z2nMRtZpa/?mibextid=wwXIfr"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3rd Floor, Satyam Plaza, Sevoke Road (2.5 Mile), near Bhaktinagar Police Station, beside Sagar Family Restaurant, Ward 42, Don Bosco Colony",
    "addressLocality": "Siliguri",
    "addressRegion": "West Bengal",
    "postalCode": "734001",
    "addressCountry": "IN"
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
        "name": "WAW Aluminium Windows",
      },
      {
        "@type": "OfferCatalog",
        "name": "Ambiiance uPVC Windows",
      },
      {
        "@type": "OfferCatalog",
        "name": "Bespoke Wardrobes",
      },
      {
        "@type": "OfferCatalog",
        "name": "Glass Railings",
      },
      {
        "@type": "OfferCatalog",
        "name": "Kitchen Appliances",
      },
      {
        "@type": "OfferCatalog",
        "name": "Meshworkz Insect Blinds",
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
        <PageScrollBar />
      </body>
    </html>
  );
}
