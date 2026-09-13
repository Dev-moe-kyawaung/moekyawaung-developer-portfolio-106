import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { PROFILE } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = "https://moekyawaung.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PROFILE.name} — ${PROFILE.role}`,
    template: `%s · ${PROFILE.name}`,
  },
  description: PROFILE.summary,
  keywords: [
    "Android Engineer",
    "Kotlin",
    "Jetpack Compose",
    "Clean Architecture",
    "Senior Android Developer",
    "Realtime Systems",
    "Design Systems",
    "MVVM",
    "MVI",
    "Firebase",
  ],
  authors: [{ name: PROFILE.name, url: SITE_URL }],
  creator: PROFILE.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: `${PROFILE.name} · Portfolio`,
    title: `${PROFILE.name} — ${PROFILE.role}`,
    description: PROFILE.summary,
    images: [{ url: PROFILE.avatar, width: 520, height: 520, alt: PROFILE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PROFILE.name} — ${PROFILE.role}`,
    description: PROFILE.summary,
    images: [PROFILE.avatar],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  alternateName: PROFILE.aka,
  jobTitle: PROFILE.role,
  url: SITE_URL,
  email: PROFILE.email,
  telephone: PROFILE.phone,
  image: PROFILE.avatar,
  sameAs: [
    "https://github.com/Dev-moe-kyawaung",
    "https://www.linkedin.com/in/moe-kyaw-aung-2653093a1",
    "https://bsky.app/profile/moekyawaung96.bsky.social",
  ],
  knowsAbout: [
    "Android Development",
    "Kotlin",
    "Jetpack Compose",
    "Software Architecture",
    "Realtime Systems",
    "Mobile Design Systems",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}
    >
      <body className="bg-stage min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--color-brand)] focus:px-4 focus:py-2 focus:font-medium focus:text-[#06121a]"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
