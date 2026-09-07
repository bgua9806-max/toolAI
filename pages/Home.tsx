
import React, { useEffect, useState } from 'react';
import { Hero } from '../components/Hero';
import { CategoryBar } from '../components/CategoryBar';
import { ProductCard } from '../components/ProductCard';
import { MobileProductCard } from '../components/mobile/MobileProductCard';
import { FlashSale } from '../components/FlashSale';
import { PromoCarousel } from '../components/PromoCarousel';
import { PRODUCTS as FALLBACK_PRODUCTS } from '../constants';
import { Product } from '../types';
import { normalizeProductImage } from '../lib/imageFallbacks';
import { ArrowRight } from 'lucide-react';
import * as ReactRouterDOM from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { SEO } from '../components/SEO';

const { Link } = ReactRouterDOM;

interface HomeProps {
  addToCart: (product: Product) => void;
}

const sortProductsByPriority = (items: Product[]) => {
  return [...items].sort((a, b) => {
    if (!!a.isHot !== !!b.isHot) return a.isHot ? -1 : 1;
    if ((b.rating || 0) !== (a.rating || 0)) return (b.rating || 0) - (a.rating || 0);
    return (b.sold || 0) - (a.sold || 0);
  });
};

export const Home: React.FC<HomeProps> = ({ addToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          const enhancedData = (data as any[]).map((p: Product) => normalizeProductImage(p));
          setProducts(sortProductsByPriority(enhancedData));
        } else {
          setProducts(sortProductsByPriority(FALLBACK_PRODUCTS));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts(sortProductsByPriority(FALLBACK_PRODUCTS));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  
  // Logic lọc sản phẩm
  const hotCandidates = products.filter(p => p.isHot || p.rating >= 4.9);
  const hotProducts = sortProductsByPriority(
    Array.from(new Map<string, Product>(hotCandidates.map((item) => [item.id, item])).values())
  ).slice(0, 15);
  
  const newProducts = products.filter(p => p.isNew || (typeof p.id === 'string' && parseInt(p.id) > 8));

  // JSON-LD Schema including Organization & OnlineStore for Google and AI Search
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "OnlineStore"],
        "@id": "https://muatoolai.com/#organization",
        "name": "MuaToolAI.com",
        "url": "https://muatoolai.com",
        "logo": "https://muatoolai.com/favicon.png",
        "description": "Kho tài khoản AI Tools và phần mềm bản quyền giá rẻ uy tín số 1 Việt Nam. Bảo hành 1-1 trọn đời.",
        "telephone": "+84906291941",
        "email": "support@MuaToolAI.com",
        "priceRange": "69.000đ - 1.500.000đ",
        "currenciesAccepted": "VND",
        "paymentAccepted": "Bank Transfer, VietQR, MoMo, ZaloPay",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "VN"
        },
        "sameAs": [
          "https://www.facebook.com/profile.php?id=61552104173388&locale=vi_VN",
          "https://zalo.me/g/bguamkuy0hcgjpvf9kyp",
          "https://t.me/aidayne"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://muatoolai.com/#website",
        "name": "MuaToolAI.com",
        "url": "https://muatoolai.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://muatoolai.com/products?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#F2F2F7] pb-24">
      <SEO 
        title="MuaToolAI.com - Phần Mềm Bản Quyền & AI Tools Giá Rẻ Uy Tín Số 1" 
        description="Mua bản quyền ChatGPT Plus, Midjourney, Canva Pro, Netflix, Youtube Premium, Adobe, Windows, Office giá rẻ, bảo hành 1-1 trọn đời. Giao hàng tự động 24/7."
        canonical="https://muatoolai.com/"
        schema={homeSchema}
      />
      <Hero />
      <CategoryBar />
      
      {/* Flash Sale Section */}
      <FlashSale addToCart={addToCart} />

      {/* Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 lg:mb-20">
        <div className="flex items-end justify-between mb-4 lg:mb-8">
          <div>
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 tracking-tight">Sản phẩm nổi bật</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 lg:mt-2 font-medium">Được cộng đồng tin dùng nhiều nhất</p>
          </div>
          
          <Link to="/products?sort=default" className="flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-hover transition-colors ml-2">
              <span className="hidden sm:inline">Xem tất cả</span> <ArrowRight size={16} />
          </Link>
        </div>
        
        {/* DESKTOP GRID */}
        {loading ? (
             <div className="hidden lg:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
               {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(i => (
                 <div key={i} className="h-[350px] bg-gray-200 rounded-3xl animate-pulse"></div>
               ))}
             </div>
        ) : (
             <div className="hidden lg:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
                  {hotProducts.map((product) => (
                    <ProductCard key={`hot-${product.id}`} product={product} onAddToCart={addToCart} />
                  ))}
             </div>
        )}

        {/* MOBILE GRID 2 COLS */}
        <div className="lg:hidden grid grid-cols-2 gap-3 sm:gap-4 pb-4">
            {loading ? (
                [1,2,3,4,5,6,7,8].map(i => <div key={i} className="w-full aspect-[1/1.4] bg-gray-200 rounded-2xl animate-pulse"></div>)
            ) : hotProducts.slice(0, 12).map((product) => (
                <MobileProductCard key={`mob-hot-${product.id}`} product={product} />
            ))}
        </div>
      </section>

      {/* Promo Banner Carousel */}
      <PromoCarousel />

      {/* New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-4 lg:mb-8">
           <div>
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 tracking-tight">Mới cập nhật</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 lg:mt-2 font-medium">Công nghệ mới nhất thị trường</p>
          </div>
          <Link to="/products?sort=newest" className="flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-hover transition-colors">
            <span className="hidden sm:inline">Xem tất cả</span> <ArrowRight size={16} />
          </Link>
        </div>
        
        {/* DESKTOP GRID */}
        {loading ? (
           <div className="hidden lg:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
              {[1,2,3,4,5].map(i => <div key={i} className="h-[350px] bg-gray-200 rounded-3xl animate-pulse"></div>)}
           </div>
        ) : (
          <div className="hidden lg:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
            {newProducts.map((product) => (
              <ProductCard key={`new-${product.id}`} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        )}

        {/* MOBILE GRID 2 COLS */}
        <div className="lg:hidden grid grid-cols-2 gap-3 sm:gap-4 pb-4">
            {loading ? (
                [1,2,3,4,5,6].map(i => <div key={i} className="w-full aspect-[1/1.4] bg-gray-200 rounded-2xl animate-pulse"></div>)
            ) : newProducts.slice(0, 10).map((product) => (
                <MobileProductCard key={`mob-new-${product.id}`} product={product} />
            ))}
        </div>
      </section>
    </main>
  );
}
