import { PRODUCTS as FALLBACK_PRODUCTS, HERO_SLIDES as FALLBACK_HERO_SLIDES } from '../constants';
import { Product, HeroSlide } from '../types';

const isInvalidImage = (image?: string | null) => {
  if (typeof image !== 'string') return true;

  const normalized = image.trim().toLowerCase();
  return (
    normalized === '' ||
    normalized.includes('placehold.co') ||
    normalized.includes('placeholder') ||
    normalized.includes('no+image') ||
    normalized.includes('no%20image') ||
    normalized.includes('no image') ||
    normalized.includes('no+img') ||
    normalized.includes('no%20img')
  );
};

const normalizeText = (value?: string | null) =>
  (value || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const PRODUCT_IMAGE_LIBRARY: Record<string, string> = {
  netflix: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=700&h=700&fit=crop&q=85',
  spotify: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=700&h=700&fit=crop&q=85',
  adobe: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=700&h=700&fit=crop&q=85',
  canva: 'https://images.unsplash.com/photo-1626785774573-4b799312c95d?w=700&h=700&fit=crop&q=85',
  chatgpt: 'https://images.unsplash.com/photo-1694509748680-77a876779b63?w=700&h=700&fit=crop&q=85',
  claude: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=700&h=700&fit=crop&q=85',
  midjourney: 'https://images.unsplash.com/photo-1684469046643-415c8e76311d?w=700&h=700&fit=crop&q=85',
  github: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=700&h=700&fit=crop&q=85',
  copilot: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=700&h=700&fit=crop&q=85',
  gamma: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=700&fit=crop&q=85',
  grok: 'https://images.unsplash.com/photo-1674027444485-cec3da58eef4?w=700&h=700&fit=crop&q=85',
  grammarly: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=700&h=700&fit=crop&q=85',
  capcut: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=700&h=700&fit=crop&q=85',
  youtube: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=700&h=700&fit=crop&q=85',
  windows: 'https://images.unsplash.com/photo-1633419461186-7d40a2e50594?w=700&h=700&fit=crop&q=85',
  office: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&h=700&fit=crop&q=85',
  elsa: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=700&h=700&fit=crop&q=85',
  expressvpn: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&h=700&fit=crop&q=85',
  vpn: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&h=700&fit=crop&q=85',
  duolingo: 'https://images.unsplash.com/photo-1552068751-345134f9a3e6?w=700&h=700&fit=crop&q=85',
};

const HERO_IMAGE_LIBRARY: Record<string, string> = {
  adobe: 'https://images.unsplash.com/photo-1626785774573-4b799312c95d?w=1600&auto=format&fit=crop&q=85',
  netflix: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1600&auto=format&fit=crop&q=85',
  chatgpt: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&auto=format&fit=crop&q=85',
  claude: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&auto=format&fit=crop&q=85',
};

export const getProductImageFallback = (product: Partial<Product>) => {
  const fallbackById = FALLBACK_PRODUCTS.find(fp => String(fp.id) === String(product.id));
  if (fallbackById?.image && !isInvalidImage(fallbackById.image)) return fallbackById.image;

  const normalizedName = normalizeText(product.name);
  const matchedKey = Object.keys(PRODUCT_IMAGE_LIBRARY).find(key => normalizedName.includes(key));
  if (matchedKey) return PRODUCT_IMAGE_LIBRARY[matchedKey];

  return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=700&fit=crop&q=85';
};

export const normalizeProductImage = (product: Product): Product => {
  if (!isInvalidImage(product.image)) return product;
  return { ...product, image: getProductImageFallback(product) };
};

export const getHeroImageFallback = (slide: Partial<HeroSlide>) => {
  const fallbackById = FALLBACK_HERO_SLIDES.find(fs => String(fs.id) === String(slide.id));
  if (fallbackById?.image && !isInvalidImage(fallbackById.image)) return fallbackById.image;

  const normalizedTitle = normalizeText(slide.title);
  const matchedKey = Object.keys(HERO_IMAGE_LIBRARY).find(key => normalizedTitle.includes(key));
  if (matchedKey) return HERO_IMAGE_LIBRARY[matchedKey];

  return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop&q=85';
};

export const normalizeHeroImage = (slide: HeroSlide): HeroSlide => {
  if (!isInvalidImage(slide.image)) return slide;
  return { ...slide, image: getHeroImageFallback(slide) };
};
