import { useEffect } from "react";

interface OrganizationSchemaProps {
  type: "organization";
}

interface WebsiteSchemaProps {
  type: "website";
}

interface ArticleSchemaProps {
  type: "article";
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  modifiedDate?: string;
  image: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  type: "breadcrumb";
  items: Array<{ name: string; url: string }>;
}

type SchemaMarkupProps =
  | OrganizationSchemaProps
  | WebsiteSchemaProps
  | ArticleSchemaProps
  | BreadcrumbSchemaProps;

export default function SchemaMarkup(props: SchemaMarkupProps) {
  useEffect(() => {
    let schema: any = {};

    const siteUrl = "https://ketowell.com"; // Update with actual domain

    if (props.type === "organization") {
      schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "KetoWell",
        description: "Your AI-Native Partner in Ketogenic Health",
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        sameAs: [
          "https://twitter.com/ketowell",
          "https://facebook.com/ketowell",
          "https://linkedin.com/company/ketowell",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Support",
          email: "support@ketowell.com",
        },
      };
    } else if (props.type === "website") {
      schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "KetoWell",
        description: "Evidence-based ketogenic health app with AI-powered guidance",
        url: siteUrl,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/blog?search={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      };
    } else if (props.type === "article") {
      schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: props.title,
        description: props.description,
        image: props.image,
        author: {
          "@type": "Person",
          name: props.author,
        },
        publisher: {
          "@type": "Organization",
          name: "KetoWell",
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/logo.png`,
          },
        },
        datePublished: props.publishedDate,
        dateModified: props.modifiedDate || props.publishedDate,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${siteUrl}${props.url}`,
        },
      };
    } else if (props.type === "breadcrumb") {
      schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: props.items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${siteUrl}${item.url}`,
        })),
      };
    }

    // Create or update script tag
    const scriptId = `schema-${props.type}`;
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!scriptElement) {
      scriptElement = document.createElement("script");
      scriptElement.id = scriptId;
      scriptElement.type = "application/ld+json";
      document.head.appendChild(scriptElement);
    }

    scriptElement.textContent = JSON.stringify(schema);

    // Cleanup function
    return () => {
      const element = document.getElementById(scriptId);
      if (element) {
        element.remove();
      }
    };
  }, [props]);

  return null;
}
