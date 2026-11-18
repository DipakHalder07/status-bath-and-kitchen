import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://statusbathkitchen.com";

export const metadata: Metadata = {
  title: "Contact Us — Showroom Location, Consultation & WhatsApp",
  description:
    "Get in touch with Status Bath & Kitchen. Visit our physical showroom studio, connect on WhatsApp (+91 98320 95793), or schedule an in-store consultation with our architects.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${siteUrl}/contact`,
    siteName: "Status Bath and Kitchen",
    title: "Contact Status Bath & Kitchen | Showroom Visit & Consultation",
    description:
      "Plan your dream kitchen, bathroom suite, custom wardrobe, or architectural doors & windows. Visit our physical experience studio or message us on WhatsApp (+91 98320 95793).",
    images: [
      {
        url: "/images/status/contact_hero.png",
        width: 1200,
        height: 630,
        alt: "Contact Status Bath and Kitchen Showroom Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Status Bath & Kitchen | Showroom Visit & WhatsApp",
    description:
      "Plan your dream modular kitchen or luxury bathroom with our master design team. Call / WhatsApp: +91 98320 95793.",
    images: ["/images/status/contact_hero.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

