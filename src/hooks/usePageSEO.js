import { useEffect } from 'react';

/**
 * Lightweight native SEO Hook for CHRONOS
 * Dynamically manages document.title, meta descriptions, and OpenGraph/Twitter social tags.
 */
export const usePageSEO = ({
  title = 'CHRONOS — TIME. REIMAGINED.',
  description = 'Explore the CHRONOS luxury smartwatch collection. Aerospace-grade titanium, surgical ceramic, and sapphire crystal precision engineering.',
  image = '/assets/chronos-pro-main.jpg',
  type = 'website',
}) => {
  useEffect(() => {
    // 1. Update document title
    document.title = title;

    // Helper to update or create meta tags
    const setMetaTag = (selector, attribute, value) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          const name = selector.match(/name="([^"]+)"/)?.[1];
          if (name) element.setAttribute('name', name);
        } else if (selector.startsWith('meta[property=')) {
          const prop = selector.match(/property="([^"]+)"/)?.[1];
          if (prop) element.setAttribute('property', prop);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    // 2. Standard Meta Description
    setMetaTag('meta[name="description"]', 'content', description);

    // 3. Open Graph Tags
    setMetaTag('meta[property="og:title"]', 'content', title);
    setMetaTag('meta[property="og:description"]', 'content', description);
    setMetaTag('meta[property="og:type"]', 'content', type);
    if (image) {
      setMetaTag('meta[property="og:image"]', 'content', image);
    }

    // 4. Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'content', title);
    setMetaTag('meta[name="twitter:description"]', 'content', description);
    if (image) {
      setMetaTag('meta[name="twitter:image"]', 'content', image);
    }
  }, [title, description, image, type]);
};

export default usePageSEO;
