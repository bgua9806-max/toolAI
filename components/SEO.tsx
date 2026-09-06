import React, { useEffect } from 'react';

const CANONICAL_SITE_URL = 'https://muatoolai.com';
const DEFAULT_OG_IMAGE_PATH = '/og-image.jpg';

const toAbsoluteUrl = (value: string) => {
  if (!value) return value;
  if (/^https?:\/\//i.test(value)) {
    // If it's a localhost URL, convert to canonical domain for SEO consistency
    return value.replace(/^https?:\/\/(localhost(:\d+)?|127\.0\.0\.1(:\d+)?)/i, CANONICAL_SITE_URL);
  }
  const normalized = value.startsWith('/') ? value : `/${value}`;
  return `${CANONICAL_SITE_URL}${normalized}`;
};

export interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  canonical?: string;
  type?: 'website' | 'article' | 'product';
  schema?: object | object[]; // Single JSON-LD or array of structured data
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description = "MuaToolAI.com - Kho phần mềm bản quyền, AI Tools & Tài khoản Premium giá rẻ, uy tín số 1 Việt Nam. Giao hàng tự động 24/7, bảo hành 1-1 trọn đời.", 
  keywords = "muatoolai, chatgpt plus, midjourney pro, canva pro, youtube premium, netflix giá rẻ, key windows 11, office 365, claude pro, cursor pro",
  image = DEFAULT_OG_IMAGE_PATH,
  url,
  canonical,
  type = 'website',
  schema
}) => {
  
  useEffect(() => {
    const currentPath = typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/';
    const finalUrl = toAbsoluteUrl(url || currentPath);
    const finalCanonical = canonical ? toAbsoluteUrl(canonical) : finalUrl;
    const finalImage = toAbsoluteUrl(image);

    // 1. Title formatting
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

    // 2. Canonical Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', finalCanonical);

    // 3. Standard Meta
    updateMeta('description', description);
    updateMeta('keywords', keywords);
    updateMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateMeta('author', 'MuaToolAI.com');

    // 4. Geo-targeting Tags (Vietnam)
    updateMeta('geo.region', 'VN');
    updateMeta('geo.placename', 'Vietnam');
    updateMeta('geo.position', '10.7769;106.7009');
    updateMeta('ICBM', '10.7769, 106.7009');

    // 5. Google / Schema.org (Itemprop)
    updateMeta('name', finalTitle, 'itemprop');
    updateMeta('description', description, 'itemprop');
    updateMeta('image', finalImage, 'itemprop');
    
    // 6. Open Graph (Facebook / Zalo / Telegram)
    updateMeta('og:title', finalTitle, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:image', finalImage, 'property');
    updateMeta('og:image:secure_url', finalImage, 'property');
    updateMeta('og:image:type', 'image/jpeg', 'property');
    updateMeta('og:image:alt', title, 'property');
    updateMeta('og:url', finalUrl, 'property');
    updateMeta('og:type', type, 'property');
    updateMeta('og:site_name', 'MuaToolAI.com', 'property');
    updateMeta('og:locale', 'vi_VN', 'property');
    updateMeta('og:image:width', '1200', 'property'); 
    updateMeta('og:image:height', '630', 'property');

    // 7. Twitter Card (Large Image)
    updateMeta('twitter:card', 'summary_large_image', 'name');
    updateMeta('twitter:title', finalTitle, 'name');
    updateMeta('twitter:description', description, 'name');
    updateMeta('twitter:image', finalImage, 'name');
    updateMeta('twitter:domain', 'muatoolai.com', 'name');
    updateMeta('twitter:url', finalUrl, 'name');

    // 8. Inject JSON-LD Schema (For Rich Snippets & AI Knowledge Graphs)
    const existingScript = document.querySelector('#seo-schema');
    if (existingScript) {
      existingScript.remove();
    }
    
    if (schema) {
      const script = document.createElement('script');
      script.id = 'seo-schema';
      script.setAttribute('type', 'application/ld+json');
      
      const schemaData = Array.isArray(schema) 
        ? { "@context": "https://schema.org", "@graph": schema }
        : schema;

      script.textContent = JSON.stringify(schemaData);
      document.head.appendChild(script);
    }

    return () => {
      const script = document.querySelector('#seo-schema');
      if (script) script.remove();
    };
  }, [title, description, keywords, image, url, canonical, type, schema]);

  return null;
};
