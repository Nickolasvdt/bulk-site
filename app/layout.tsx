import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site-config";
import { ContactModalProvider } from "@/components/contact/ContactModalProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema, siteNavigationSchema } from "@/lib/seo/schema";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { MobileBottomNav } from "@/components/ui/MobileBottomNav";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Bulk — Presença digital para negócio local crescer",
    template: "%s | Bulk",
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Bulk — Presença digital para negócio local crescer",
    description: SITE.description,
    type: "website",
    locale: "pt_BR",
    url: SITE.url,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulk — Presença digital para negócio local crescer",
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <JsonLd data={siteNavigationSchema} />
        <ContactModalProvider>
          <Nav />
          {children}
          <Footer />
          <AnnouncementBar />
          <WhatsAppFloat />
          <MobileBottomNav />
        </ContactModalProvider>
      </body>
    </html>
  );
}
