'use client';

import Head from 'next/head';
import { usePathname } from 'next/navigation';

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
}

export function SEO({ 
  title, 
  description = "Bugweiser: Adaptive, personalized student communication platform for educational institutions.",
  ogImage = "/og-image.png",
  ogType = "website"
}: SEOProps) {
  const pathname = usePathname();
  const siteName = "Bugweiser";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const canonicalUrl = `https://bugweiser.edu${pathname}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
    </>
  );
}
