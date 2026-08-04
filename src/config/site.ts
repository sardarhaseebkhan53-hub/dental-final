export const siteConfig = {
  name: "Serene Dental",
  description: "Where Beautiful Smiles Begin",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/images/og-image.jpg",
  links: {
    twitter: "https://twitter.com/serenedental",
    facebook: "https://facebook.com/serenedental",
    instagram: "https://instagram.com/serenedental",
  },
  creator: "Serene Dental Clinic",
  theme: {
    primaryColor: "#0F766E",
    accentColor: "#C8874A",
  },
} as const;
