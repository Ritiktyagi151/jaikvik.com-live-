
import { Helmet } from "react-helmet";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

const SEOManagement = ({
  title,
  description,
  keywords,
  image,
  canonical,
  noIndex,
  noFollow,
}: SEOProps) => {
  const metaTitle = title || "Default Meta Title";
  const metaDescription = description || "Default description of your site";
  const metaKeywords = keywords || "default, keywords, website";
  const metaImage = image || "/default-image.jpg";

  // Safe canonical URL (No window error in Vercel SSR)
  const metaCanonical =
    canonical ||
    (typeof window !== "undefined" ? window.location.href : "");

  // Robots meta rule
  const robotsContent = `${noIndex ? "noindex" : "index"}, ${
    noFollow ? "nofollow" : "follow"
  }`;

  return (
    <Helmet>
      {/* Title */}
      <title>{metaTitle}</title>

      {/* Meta Tags */}
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content={robotsContent} />

      {/* Canonical URL */}
      {metaCanonical && (
        <link rel="canonical" href={metaCanonical} />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaCanonical} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default SEOManagement;
