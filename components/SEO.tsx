
import React, { useEffect } from 'react';

const DEFAULT_OG_IMAGE_PATH = '/og-image.jpg';

const toAbsoluteUrl = (value: string) => {
  if (!value) return value;
  if (/^https?:\/\//i.test(value)) return value;
  if (typeof window === 'undefined') return value;
  const normalized = value.startsWith('/') ? value : `/${value}`;
  return `${window.location.origin}${normalized}`;
};

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  schema?: object; // JSON-LD Structured Data
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description = "MuaToolAI.com - Kho phần mềm bản quyền, AI Tools & Tài khoản Premium giá rẻ, uy tín số 1 Việt Nam.", 
  image = DEFAULT_OG_IMAGE_PATH,
  url = window.location.href,
  type = 'website',
  schema
}) => {
  
  useEffect(() => {
    const finalImage = toAbsoluteUrl(image);
    const finalUrl = toAbsoluteUrl(url);

    // 1. Update Title
    const finalTitle = title.includes('MuaToolAI.com') ? title : `${title} | MuaToolAI.com`;
    document.title = finalTitle;

    // Helper to update or create meta tags
    const updateMeta = (name: string, content: string, attribute: 'name' | 'property' | 'itemprop' = 'name') => {
      if (!content) return;
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta
    updateMeta('description', description);
    updateMeta('keywords', 'netflix, chatgpt, youtube premium, key windows, office 365, software license');

    // 3. Google / Schema.org (Itemprop)
    updateMeta('name', finalTitle, 'itemprop');
    updateMeta('description', description, 'itemprop');
    updateMeta('image', finalImage, 'itemprop');
    
    // 4. Open Graph (Facebook/Zalo)
    updateMeta('og:title', finalTitle, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:image', finalImage, 'property');
    updateMeta('og:image:secure_url', finalImage, 'property');
    updateMeta('og:image:type', 'image/jpeg', 'property');
    updateMeta('og:image:alt', title, 'property'); // Alt text for image
    updateMeta('og:url', finalUrl, 'property');
    updateMeta('og:type', type, 'property');
    updateMeta('og:site_name', 'MuaToolAI.com', 'property');
    // Force image size hint for faster rendering on social
    updateMeta('og:image:width', '1200', 'property'); 
    updateMeta('og:image:height', '630', 'property');

    // 5. Twitter Card (Summary Large Image for big previews)
    updateMeta('twitter:card', 'summary_large_image', 'name');
    updateMeta('twitter:title', finalTitle, 'name');
    updateMeta('twitter:description', description, 'name');
    updateMeta('twitter:image', finalImage, 'name');
    updateMeta('twitter:domain', window.location.hostname, 'name');
    updateMeta('twitter:url', finalUrl, 'name');

    // 6. Inject JSON-LD Schema (For Google Rich Snippets)
    const existingScript = document.querySelector('#seo-schema');
    if (existingScript) {
      existingScript.remove();
    }
    
    if (schema) {
      const script = document.createElement('script');
      script.id = 'seo-schema';
      script.setAttribute('type', 'application/ld+json');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    // Cleanup logic isn't strictly necessary for meta tags in SPA as we overwrite them,
    // but clearing schema script is good practice.
    return () => {
        const script = document.querySelector('#seo-schema');
        if (script) script.remove();
    };
  }, [title, description, image, url, type, schema]);

  return null;
};
