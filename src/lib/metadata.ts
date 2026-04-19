import type { Metadata } from "next";
import { profile, siteMetadata } from "@/data/portfolio";

type RouteKey = keyof typeof siteMetadata.routes;

const socialImage = {
  url: siteMetadata.socialImage.url,
  width: siteMetadata.socialImage.width,
  height: siteMetadata.socialImage.height,
  alt: siteMetadata.socialImage.alt,
};

function getFullTitle(title?: string) {
  return title ? `${title} | ${profile.name}` : siteMetadata.defaultTitle;
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(profile.website),
  title: {
    default: siteMetadata.defaultTitle,
    template: `%s | ${profile.name}`,
  },
  description: siteMetadata.defaultDescription,
  keywords: [...siteMetadata.defaultKeywords],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon-nk.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon-nk.svg"],
  },
  openGraph: {
    title: siteMetadata.defaultTitle,
    description: siteMetadata.defaultDescription,
    url: profile.website,
    siteName: siteMetadata.siteName,
    type: "website",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.defaultTitle,
    description: siteMetadata.defaultDescription,
    images: [socialImage.url],
  },
};

export function buildMetadata(routeKey: RouteKey): Metadata {
  const route = siteMetadata.routes[routeKey];
  const title = getFullTitle(route.title);

  return {
    title: route.title,
    description: route.description,
    keywords: [...siteMetadata.defaultKeywords],
    alternates: {
      canonical: route.path,
    },
    openGraph: {
      title,
      description: route.description,
      url: route.path,
      siteName: siteMetadata.siteName,
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: route.description,
      images: [socialImage.url],
    },
  };
}

export const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.currentRole,
  description: siteMetadata.defaultDescription,
  url: profile.website,
  image: new URL(siteMetadata.socialImage.url, profile.website).toString(),
  email: `mailto:${profile.email}`,
  worksFor: {
    "@type": "Organization",
    name: profile.currentCompany,
  },
  homeLocation: {
    "@type": "Place",
    name: profile.location,
  },
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: [
    "Backend engineering",
    "Production support",
    "Systems debugging",
    "Practical automation",
    "Go",
    "Python",
    "JavaScript",
  ],
};
