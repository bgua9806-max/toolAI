import React, { useEffect, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { PromotionBanner } from '../types';

const { Link } = ReactRouterDOM;

const FALLBACK_BANNERS: PromotionBanner[] = [
  {
    id: 'fallback-adobe-promo',
    title: 'Adobe Creative Cloud',
    subtitle: 'Giảm tới 70% trọn bộ bản quyền.',
    image: 'https://img.icons8.com/color/480/000000/adobe-creative-cloud--v1.png',
    ctaText: 'Khám phá ngay',
    ctaLink: '/products?category=design',
    order: 1,
    isActive: true,
    textColor: 'white',
    background: 'from-red-600 to-orange-600'
  }
];

export const PromoCarousel: React.FC = () => {
  const [banners, setBanners] = useState<PromotionBanner[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data, error } = await supabase
          .from('promotion_banners')
          .select('*')
          .eq('isActive', true)
          .order('order', { ascending: true });

        if (!error && data && data.length > 0) {
          setBanners(data as PromotionBanner[]);
        } else {
          setBanners(FALLBACK_BANNERS);
        }
      } catch (error) {
        console.warn('Promotion banners fallback used:', error);
        setBanners(FALLBACK_BANNERS);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [banners.length]);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mb-12 lg:mb-20">
        <div className="aspect-[3/1] rounded-[2rem] lg:rounded-[2.5rem] bg-gray-200 animate-pulse" />
      </section>
    );
  }

  if (banners.length === 0) return null;

  const goPrev = () => setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  const goNext = () => setCurrent((prev) => (prev + 1) % banners.length);

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mb-8 sm:mb-12 lg:mb-20">
      <div className="relative rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-lg shadow-gray-200/50 group aspect-[3/1] w-full">
        <div
          className="absolute inset-0 flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {banners.map((banner) => {
            const hasContent = !!(banner.title || banner.subtitle || banner.ctaText);
            
            return (
              <Link
                key={banner.id}
                to={banner.ctaLink || '/products'}
                className="min-w-full relative overflow-hidden bg-gray-900 text-white block"
              >
                <img src={banner.image} alt={banner.title || 'Khuyến mãi'} className="absolute inset-0 w-full h-full object-cover" />
                
                {hasContent && (
                   <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent"></div>
                )}

                <div className="relative z-10 h-full p-4 sm:p-5 md:p-16 flex flex-col justify-center">
                   {hasContent && (
                      <div className="flex-1 max-w-[85%] sm:max-w-xl text-left">
                        {banner.badge && banner.badge !== 'Khuyến mãi' && (
                          <span className="inline-block bg-white/20 backdrop-blur-md px-2 py-1 lg:px-4 lg:py-1.5 rounded-full text-[9px] lg:text-xs font-bold mb-1.5 lg:mb-6 border border-white/20 uppercase tracking-wide">
                            {banner.badge}
                          </span>
                        )}
                      {banner.title && (
                        <h3 className="text-lg md:text-5xl font-extrabold mb-1.5 lg:mb-6 leading-tight line-clamp-2 drop-shadow-lg">
                          {banner.title}
                        </h3>
                      )}
                      {banner.subtitle && (
                        <p className="text-white/90 mb-3 lg:mb-8 text-xs md:text-lg font-medium max-w-[200px] md:max-w-full line-clamp-2 drop-shadow-md">
                          {banner.subtitle}
                        </p>
                      )}
                      {banner.ctaText && (
                        <span className="hidden sm:inline-flex items-center gap-1 bg-white text-gray-900 px-4 py-2 lg:px-10 lg:py-4 rounded-full font-bold text-xs lg:text-base shadow-lg hover:scale-105 transition-transform">
                          {banner.ctaText}
                        </span>
                      )}
                    </div>
                 )}
              </div>
            </Link>
            );
          })}
        </div>

        {banners.length > 1 && (
          <>
            <button onClick={goPrev} className="hidden lg:flex absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 backdrop-blur-md items-center justify-center text-white hover:bg-white/35 opacity-0 group-hover:opacity-100 transition-all">
              <ChevronLeft size={22} />
            </button>
            <button onClick={goNext} className="hidden lg:flex absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 backdrop-blur-md items-center justify-center text-white hover:bg-white/35 opacity-0 group-hover:opacity-100 transition-all">
              <ChevronRight size={22} />
            </button>
            <div className="absolute bottom-3 lg:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`rounded-full transition-all ${current === index ? 'w-6 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/50'}`}
                  aria-label={`Chuyển tới banner khuyến mãi ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
