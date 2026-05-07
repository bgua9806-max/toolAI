import { BlogPost, Product } from '../types';
import { slugify } from './utils';

export const SEO_CONFIG = {
  siteUrl: 'https://muatoolai.com',
  siteName: 'Mua Tool AI',
  brandName: 'Mua Tool AI',
  legalName: 'Mua Tool AI Việt Nam',
  defaultTitle: 'Mua Tool AI Giá Rẻ, Tài Khoản AI Premium & Phần Mềm Bản Quyền',
  defaultDescription:
    'Mua Tool AI, ChatGPT Plus, Claude, Gemini Advanced, Netflix, YouTube Premium, Windows, Office và phần mềm bản quyền giá tốt. Tư vấn nhanh, giao hàng tự động, hỗ trợ kích hoạt tận tâm.',
  defaultImage: 'https://muatoolai.com/og-image.jpg',
  locale: 'vi_VN',
  contactUrl: 'https://zalo.me/g/bguamkuy0hcgjpvf9kyp',
  keywords: [
    'mua tool ai',
    'tool ai giá rẻ',
    'chatgpt plus giá rẻ',
    'claude 3 opus',
    'gemini advanced',
    'tài khoản ai premium',
    'mua netflix giá rẻ',
    'youtube premium giá rẻ',
    'key windows bản quyền',
    'office 365 giá rẻ',
    'phần mềm bản quyền giá rẻ',
    'vpn premium',
    'mua tài khoản premium'
  ]
};

export const absoluteUrl = (path = '/') => {
  if (path.startsWith('http')) return path;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SEO_CONFIG.siteUrl}${normalizedPath}`;
};

export const canonicalUrl = (path = '/') => absoluteUrl(path.split('?')[0] || '/');

export const productUrl = (product: Product) =>
  absoluteUrl(`/product/${product.slug || slugify(product.name)}`);

export const blogUrl = (post: BlogPost) =>
  absoluteUrl(`/blog/${post.slug || post.id}`);

export const buildOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SEO_CONFIG.siteUrl}/#organization`,
  name: SEO_CONFIG.brandName,
  legalName: SEO_CONFIG.legalName,
  url: SEO_CONFIG.siteUrl,
  logo: absoluteUrl('/brand/muatoolai-logo.png'),
  image: SEO_CONFIG.defaultImage,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    areaServed: 'VN',
    availableLanguage: ['Vietnamese'],
    url: SEO_CONFIG.contactUrl
  },
  sameAs: [SEO_CONFIG.contactUrl]
});

export const buildWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SEO_CONFIG.siteUrl}/#website`,
  name: SEO_CONFIG.siteName,
  url: SEO_CONFIG.siteUrl,
  inLanguage: 'vi-VN',
  publisher: { '@id': `${SEO_CONFIG.siteUrl}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SEO_CONFIG.siteUrl}/products?search={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
});

export const buildBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

export const buildProductSchema = (product: Product) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': `${productUrl(product)}#product`,
  name: product.name,
  description: product.description,
  image: [product.image],
  url: productUrl(product),
  sku: product.id,
  brand: {
    '@type': 'Brand',
    name: product.developer || SEO_CONFIG.brandName
  },
  category: product.category,
  aggregateRating: product.rating
    ? {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: Math.max(product.reviews?.length || product.sold || 1, 1)
      }
    : undefined,
  offers: {
    '@type': 'Offer',
    url: productUrl(product),
    priceCurrency: 'VND',
    price: product.price,
    availability: product.isActive === false ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
    seller: { '@id': `${SEO_CONFIG.siteUrl}/#organization` }
  }
});

export const buildItemListSchema = (products: Product[], pageUrl: string) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  url: pageUrl,
  numberOfItems: products.length,
  itemListElement: products.slice(0, 24).map((product, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: productUrl(product),
    name: product.name
  }))
});

export const buildArticleSchema = (post: BlogPost) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: post.excerpt,
  image: [post.image],
  datePublished: post.date,
  dateModified: post.date,
  author: {
    '@type': 'Person',
    name: post.author || SEO_CONFIG.brandName
  },
  publisher: { '@id': `${SEO_CONFIG.siteUrl}/#organization` },
  mainEntityOfPage: blogUrl(post),
  inLanguage: 'vi-VN'
});

export const mergeSchemas = (...schemas: Array<object | undefined | null>) => ({
  '@context': 'https://schema.org',
  '@graph': schemas.filter(Boolean)
});
