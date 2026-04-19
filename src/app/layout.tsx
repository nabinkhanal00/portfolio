import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { profile } from "@/data/portfolio";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.website),
  title: {
    default: "Nabin Khanal | Computer Engineer",
    template: "%s | Nabin Khanal",
  },
  description:
    "Portfolio of Nabin Khanal, Computer Engineer focused on backend development, systems engineering, and DevOps.",
  openGraph: {
    title: "Nabin Khanal | Computer Engineer",
    description:
      "Backend, systems, and support engineering portfolio with projects, skills, and experience.",
    url: profile.website,
    siteName: "Nabin Khanal Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>
        <div className="ambient ambient-one" aria-hidden />
        <div className="ambient ambient-two" aria-hidden />
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
