import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({
  title = "Republica Attorneys & Consultants - Leading Law Firm in Tanzania",
  description = "Expert legal services in Tanzania. Mining law, corporate registration, litigation, land transfers, and comprehensive legal solutions.",
  keywords = "law firm Tanzania, legal services, mining law, corporate law, litigation, Dar es Salaam lawyers",
  image = "/logo.png",
  url = "https://republicaattorneys.co.tz",
  type = "website"
}: SEOProps) {
  const fullTitle = title.includes("Republica Attorneys") ? title : `${title} - Republica Attorneys & Consultants`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Republica Attorneys & Consultants" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Republica Attorneys & Consultants" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LegalService",
          "name": "Republica Attorneys & Consultants",
          "description": description,
          "url": url,
          "logo": image,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "5th Floor, NHC House, Samora Avenue",
            "addressLocality": "Dar es Salaam",
            "addressCountry": "Tanzania"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+255768450666",
            "contactType": "customer service",
            "email": "info@republicaattorneys.co.tz"
          },
          "sameAs": [
            "https://www.facebook.com/republicaattorneys",
            "https://www.linkedin.com/company/republicaattorneys"
          ]
        })}
      </script>
    </Helmet>
  );
}