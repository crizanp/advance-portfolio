import type { Metadata } from "next";
import Script from "next/script";
import HomePageClient from "./components/HomePageClient";
import { constructMetadata } from "./lib/metadata";

const canonicalUrl = "https://srijanpokhrel.com.np";

export const metadata: Metadata = constructMetadata({
  title: "Srijan Pokhrel | Senior Data Engineer | Python, SQL & Data Pipelines",
  description:
    "Portfolio of Srijan Pokhrel - Senior Data Engineer with 3+ years building scalable systems, data pipelines, and REST APIs. Expertise in Python, SQL, Node.js, and database optimization.",
  canonicalUrl,
  ogImage: "https://srijanpokhrel.com.np/images/image.png",
  keywords: [
    "Srijan Pokhrel",
    "Data Engineer",
    "Full Stack Developer",
    "Python SQL Developer",
    "Data Pipelines ETL",
    "Nepal Engineer",
    "Backend Developer",
    "API Development",
  ],
});

const homePageStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}/#webpage`,
      url: canonicalUrl,
      name: "Srijan Pokhrel | Senior Data Engineer | Python, SQL & Data Pipelines",
      description:
        "Portfolio of Srijan Pokhrel - Senior Data Engineer with 3+ years building scalable systems, data pipelines, and REST APIs. Expertise in Python, SQL, Node.js, and database optimization.",
      isPartOf: {
        "@id": `${canonicalUrl}/#website`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "Person",
      "@id": `${canonicalUrl}/#person`,
      name: "Srijan Pokhrel",
      url: canonicalUrl,
      jobTitle: "Senior Data Engineer | Full-Stack Developer",
      telephone: "+977 981 057 0014",
      email: "srijanpokhrel1@gmail.com",
      sameAs: [
        "https://github.com/crizanp",
        "https://linkedin.com/in/srijanpokhrel",
        "https://www.srijanpokhrel.com.np",
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <Script
        id="home-page-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homePageStructuredData),
        }}
      />
      <HomePageClient />
    </>
  );
}