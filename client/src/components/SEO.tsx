import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export default function SEO({
  title,
  description,
  keywords,
  image = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=630&fit=crop",
  url,
  type = "website",
  author,
  publishedTime,
  modifiedTime,
}: SEOProps) {
  const siteUrl = "https://ketowell.com"; // Update with actual domain
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullTitle = `${title} | KetoWell`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute("content", content);
    };

    // Basic meta tags
    updateMetaTag("description", description);
    if (keywords) {
      updateMetaTag("keywords", keywords);
    }

    // Open Graph tags
    updateMetaTag("og:title", fullTitle, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:image", image, true);
    updateMetaTag("og:url", fullUrl, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:site_name", "KetoWell", true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", fullTitle);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);

    // Article-specific tags
    if (type === "article") {
      if (author) {
        updateMetaTag("article:author", author, true);
      }
      if (publishedTime) {
        updateMetaTag("article:published_time", publishedTime, true);
      }
      if (modifiedTime) {
        updateMetaTag("article:modified_time", modifiedTime, true);
      }
    }

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", fullUrl);
  }, [title, description, keywords, image, fullUrl, type, author, publishedTime, modifiedTime, fullTitle]);

  return null;
}
