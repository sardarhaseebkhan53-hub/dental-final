import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ToastProvider } from "@/components/ui/toast-provider";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ),
  title: {
    default: "Serene Dental — Where Beautiful Smiles Begin",
    template: "%s | Serene Dental",
  },
  description:
    "Experience premium dental care at Serene Dental Clinic. From general dentistry to cosmetic procedures, our expert team delivers exceptional results in a calm, luxurious environment.",
  keywords: [
    "dental clinic",
    "dentist",
    "dental care",
    "teeth whitening",
    "dental implants",
    "orthodontics",
    "cosmetic dentistry",
    "pediatric dentistry",
    "dental emergency",
  ],
  authors: [{ name: "Serene Dental Clinic" }],
  creator: "Serene Dental",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Serene Dental",
    title: "Serene Dental — Where Beautiful Smiles Begin",
    description:
      "Premium dental care with over 25 years of excellence. Book your appointment today.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Serene Dental — Where Beautiful Smiles Begin",
    description: "Premium dental care with over 25 years of excellence.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {},
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="theme-color" content="#0F766E" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
        {/* Skip to content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
        <ToastProvider />
        </Providers>
      </body>
    </html>
  );
}
