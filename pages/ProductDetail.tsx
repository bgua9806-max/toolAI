
import React, { useEffect, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Product, Variant, Review } from '../types';
import { 
  Star, ArrowLeft, Share2, MessageCircle, 
  CheckCircle, ChevronRight, ShieldCheck, Zap, Info, 
  ChevronDown, ChevronUp, Check, Home, Search,
  BookOpen, MessageSquare, List, User
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { PRODUCTS as FALLBACK_PRODUCTS } from '../constants';
import { MobileProductCard } from '../components/mobile/MobileProductCard';
import { ProductCard } from '../components/ProductCard'; // Import for Desktop
import { slugify } from '../lib/utils';
import { SEO } from '../components/SEO';

const { useParams, Link, useNavigate } = ReactRouterDOM;

interface ProductDetailProps {
  addToCart: (product: Product) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ addToCart }) => {
  const { id: paramSlug } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Data State
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [loading, setLoading] = useState(true);
  
  // UI State
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  // Removed activeTab state as we are moving to scroll layout

  // Fetch Data Logic
  const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data: allProducts, error } = await supabase.from('products').select('*');
        let currentProduct: Product | null = null;

        if (!error && allProducts) {
            currentProduct = allProducts.find((p: Product) => {
                const pSlug = p.slug || slugify(p.name);
                return pSlug === paramSlug || String(p.id) === paramSlug;
            }) || null;
        }

        if (!currentProduct) {
           currentProduct = FALLBACK_PRODUCTS.find(p => {
               const pSlug = slugify(p.name);
               return pSlug === paramSlug || String(p.id) === paramSlug;
           }) || null;
        }

        if (currentProduct) {
             if (!currentProduct.image) {
                 const fallback = FALLBACK_PRODUCTS.find(fp => String(fp.id) === String(currentProduct!.id));
                 currentProduct.image = fallback?.image || 'https://placehold.co/600x600?text=No+Image';
             }

             // Nếu không có features trong DB, thử lấy từ fallback hoặc tạo giả
             if (!currentProduct.features || currentProduct.features.length === 0) {
                 const fallback = FALLBACK_PRODUCTS.find(fp => String(fp.id) === String(currentProduct!.id));
                 currentProduct.features = fallback?.features || [
                     'Bảo hành trọn đời sản phẩm',
                     'Hỗ trợ nâng cấp chính chủ',
                     'Kích hoạt nhanh trong 5 phút',
                     'Hỗ trợ đa nền tảng (PC, Mobile)'
                 ];
             }

             // Nếu không có reviews, tạo giả
             if (!currentProduct.reviews || currentProduct.reviews.length === 0) {
                 const fallback = FALLBACK_PRODUCTS.find(fp => String(fp.id) === String(currentProduct!.id));
                 currentProduct.reviews = fallback?.reviews || [];
             }

             setProduct(currentProduct);
             
             if (currentProduct.variants && currentProduct.variants.length > 0) {
                 setSelectedVariant(currentProduct.variants[0]);
             }

             const source = !error && allProducts ? allProducts : FALLBACK_PRODUCTS;
             const related = source
                 .filter((p: Product) => p.category === currentProduct!.category && p.id !== currentProduct!.id)
                 .slice(0, 6)
                 .map((p: Product) => !p.image ? {...p, image: 'https://placehold.co/400?text=No+Img'} : p);
             setRelatedProducts(related);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProduct();
  }, [paramSlug]);

  useEffect(() => {
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 50); // Tăng ngưỡng scroll để hiệu ứng mượt hơn
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ZALO_GROUP_URL = 'https://zalo.me/g/bguamkuy0hcgjpvf9kyp';

  const getConsultationMessage = () => {
      if (!product) return 'Xin chào MuaToolAI.com, tôi cần tư vấn sản phẩm.';
      const packageName = selectedVariant ? ` - Gói: ${selectedVariant.name}` : '';
      const referencePrice = Number.isFinite(Number(currentPrice))
          ? ` - Giá tham khảo đang hiển thị: ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(currentPrice)}`
          : '';
      return `Xin chào MuaToolAI.com, tôi muốn tư vấn sản phẩm: ${product.name}${packageName}${referencePrice}. Vui lòng báo giá mới nhất và hướng dẫn kích hoạt giúp tôi.`;
  };

  const getZaloUrl = () => ZALO_GROUP_URL;

  const openZaloConsultation = () => {
      window.open(getZaloUrl(), '_blank', 'noopener,noreferrer');
  };

  const copyToClipboard = () => {
      navigator.clipboard.writeText(window.location.href);
      alert('Đã sao chép liên kết!');
  };

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  if (!product) return <div className="min-h-screen flex items-center justify-center flex-col gap-4"><span>Không tìm thấy sản phẩm</span><Link to="/" className="text-primary font-bold">Về trang chủ</Link></div>;

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentOriginalPrice = selectedVariant ? selectedVariant.originalPrice : product.originalPrice;
  const discountPercent = Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100);

  // Helper for schema mapping
  const getApplicationCategory = (cat: string) => {
    const map: Record<string, string> = {
      'design': 'DesignApplication',
      'entertainment': 'MultimediaApplication',
      'music': 'MultimediaApplication',
      'work': 'BusinessApplication',
      'security': 'SecurityApplication',
      'education': 'EducationalApplication',
      'game': 'GameApplication',
      'ai': 'ApplicationSuite', // General fallback for AI
      'cloud': 'UtilitiesApplication'
    };
    return map[cat] || 'SoftwareApplication';
  };

  const getOperatingSystem = () => {
    if (product.platforms && product.platforms.length > 0) {
      return product.platforms.join(', ');
    }
    // Fallback logic based on category
    if (['design', 'work'].includes(product.category)) return 'Windows, macOS';
    if (['entertainment', 'music', 'education'].includes(product.category)) return 'Windows, macOS, Android, iOS';
    return 'Windows, macOS, Android, iOS';
  };

  // Enhanced JSON-LD for Software Application
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "SoftwareApplication",
    "name": product.name,
    "image": product.image,
    "description": product.description,
    "applicationCategory": getApplicationCategory(product.category),
    "operatingSystem": getOperatingSystem(),
    "softwareVersion": product.version || "Latest",
    "brand": {
      "@type": "Brand",
      "name": product.developer || "MuaToolAI.com"
    },
    "sku": product.id,
    "offers": {
      "@type": "Offer",
      "url": window.location.href,
      "priceCurrency": "VND",
      "price": currentPrice,
      "priceValidUntil": "2025-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviews?.length || 1
    }
  };

  const trustItems = [
    'Báo giá mới nhất theo gói',
    'Tư vấn đúng nhu cầu',
    'Hỗ trợ kích hoạt trực tiếp',
    'Bảo hành rõ ràng'
  ];

  const orderSteps = [
    { title: 'Nhắn Zalo', desc: 'Gửi tên sản phẩm và gói bạn quan tâm.' },
    { title: 'Nhận báo giá', desc: 'Shop xác nhận giá mới nhất và tình trạng gói.' },
    { title: 'Thanh toán', desc: 'Chọn phương thức phù hợp sau khi đã được tư vấn.' },
    { title: 'Kích hoạt', desc: 'Nhận tài khoản/key và hướng dẫn sử dụng.' }
  ];

  const renderMarkdown = (text?: string) => {
      if (!text) return null;
      let html = text.replace(/\\n/g, '<br/>').replace(/\n/g, '<br/>');
      html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans selection:bg-primary selection:text-white">
      <SEO 
        title={product.name} 
        description={product.description} 
        image={product.image}
        url={window.location.href}
        type="product"
        schema={productSchema}
      />

      {/* --- MOBILE LAYOUT --- */}
      <div className="lg:hidden pb-32"> 
          
          {/* 1. Dynamic Glass Navbar (Mobile) */}
          <div 
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-in-out ${
                isScrolled 
                ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-200/50 py-2' 
                : 'bg-transparent py-4'
            }`}
          >
             <div className="px-4 flex items-center justify-between gap-4">
                 {/* Back Button */}
                 <button 
                    onClick={() => navigate(-1)} 
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isScrolled 
                        ? 'bg-transparent text-gray-800 hover:bg-gray-100' 
                        : 'bg-white/90 backdrop-blur-md shadow-lg text-gray-800 border border-white/50'
                    }`}
                 >
                    <ArrowLeft size={20} />
                 </button>

                 {/* Title (Fade In on Scroll) */}
                 <div 
                    className={`flex-1 text-center transition-all duration-300 transform ${
                        isScrolled 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                    }`}
                 >
                    <h1 className="font-bold text-gray-900 text-sm truncate px-2">{product.name}</h1>
                 </div>

                 {/* Action Buttons */}
                 <div className="flex gap-3">
                    <button 
                        onClick={() => navigate('/')}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isScrolled 
                            ? 'bg-transparent text-gray-800 hover:bg-gray-100' 
                            : 'bg-white/90 backdrop-blur-md shadow-lg text-gray-800 border border-white/50'
                        }`}
                    >
                        <Home size={20} />
                    </button>
                    <button 
                        onClick={copyToClipboard}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isScrolled 
                            ? 'bg-transparent text-gray-800 hover:bg-gray-100' 
                            : 'bg-white/90 backdrop-blur-md shadow-lg text-gray-800 border border-white/50'
                        }`}
                    >
                        <Share2 size={20} />
                    </button>
                 </div>
             </div>
          </div>

          {/* 2. Premium Mobile Hero (Light) */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50 pt-24 pb-10 rounded-b-[2.5rem] shadow-sm border-b border-gray-100 mb-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,104,255,0.08),transparent_40%),radial-gradient(circle_at_85%_15%,rgba(16,185,129,0.06),transparent_35%)]"></div>
              <div className="relative px-5">
                  <div className="flex items-center justify-between gap-3 mb-5">
                      <span className="text-[10px] font-black text-blue-700 bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-full uppercase tracking-widest">{product.category}</span>
                      <div className="flex items-center gap-1 text-yellow-600 font-bold text-xs bg-yellow-50 border border-yellow-200 px-3 py-1.5 rounded-full">
                          <Star size={13} fill="currentColor" /> {product.rating}
                      </div>
                  </div>
                  <div className="relative mx-auto max-w-sm aspect-square rounded-[2rem] bg-white border border-gray-100 p-8 shadow-lg">
                      <div className="absolute inset-6 rounded-full bg-blue-500/5 blur-3xl"></div>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="relative w-full h-full object-contain filter drop-shadow-lg"
                      />
                      {discountPercent > 0 && (
                          <div className="absolute top-4 right-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                              <Zap size={12} fill="currentColor" /> -{discountPercent}%
                          </div>
                      )}
                  </div>
              </div>
          </div>

          {/* 3. Main Info */}
          <div className="px-4 space-y-4">
              
              {/* Title & Price Card */}
              <div className="bg-white p-5 rounded-[1.75rem] shadow-sm border border-gray-100 -mt-2 relative z-10">
                  <div className="flex items-start justify-between mb-2">
                      <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {product.category}
                      </span>
                      <div className="flex items-center gap-1 text-yellow-500 font-bold text-xs">
                          <Star size={14} fill="currentColor" /> {product.rating} ({product.reviews?.length || 0} đánh giá)
                      </div>
                  </div>
                  
                  <h1 className="text-xl font-black text-gray-900 mb-3 leading-snug">
                      {product.name}
                  </h1>

                  <div className="rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-blue-50 border border-emerald-100 p-4">
                      <div className="flex items-center justify-between gap-3 mb-3">
                          <div>
                              <span className="block text-[10px] font-black text-emerald-700 uppercase tracking-widest">Giá cập nhật liên tục</span>
                              <span className="text-xs text-gray-500 font-medium">Nhắn Zalo để nhận báo giá mới nhất</span>
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-white text-emerald-700 border border-emerald-100 text-[10px] font-black shadow-sm">Live quote</span>
                      </div>
                      <div className="flex items-end gap-2">
                          <span className="text-3xl font-black text-gray-900">
                              Liên hệ Zalo
                          </span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                          Giá tham khảo: <span className="font-bold text-primary">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(currentPrice)}</span>
                          {product.pricingUnit && <span className="font-bold text-gray-500 ml-1">{product.pricingUnit}</span>}
                          {discountPercent > 0 && <span className="ml-1 text-gray-400 line-through">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(currentOriginalPrice)}</span>}
                      </div>
                  </div>
              </div>

              {/* Variants Selector */}
              {product.variants && product.variants.length > 0 && (
                  <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between gap-3 mb-4">
                          <div>
                              <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">Chọn gói dịch vụ</h3>
                              <p className="text-xs text-gray-500 mt-1">Gói đang chọn sẽ được tự động đưa vào tin nhắn Zalo.</p>
                          </div>
                          <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-full whitespace-nowrap shrink-0">{product.variants.length} gói</span>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                          {product.variants.map((v, idx) => {
                              const isActive = selectedVariant?.id === v.id;
                              return (
                                  <button
                                      key={v.id}
                                      onClick={() => setSelectedVariant(v)}
                                      className={`
                                          w-full text-left p-4 rounded-2xl border-2 transition-all relative overflow-hidden active:scale-[0.99]
                                          ${isActive 
                                              ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/10' 
                                              : 'border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-200'
                                          }
                                      `}
                                  >
                                      <div className="flex items-start justify-between gap-3">
                                          <div>
                                              <div className={`font-black text-sm ${isActive ? 'text-blue-700' : 'text-gray-900'}`}>{v.name}</div>
                                              <div className="text-xs text-gray-500 mt-1">Giá tham khảo: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v.price)}</div>
                                          </div>
                                          <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${isActive ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-200 text-transparent'}`}>
                                              <Check size={14} strokeWidth={3} />
                                          </div>
                                      </div>
                                      {idx === 0 && <span className="inline-flex mt-3 text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">Đề xuất bắt đầu</span>}
                                  </button>
                              )
                          })}
                      </div>
                  </div>
              )}

              {/* Zalo Order Flow (Light) */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-[1.5rem] shadow-sm border border-blue-100 overflow-hidden relative">
                  <div className="absolute -top-16 -right-16 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
                  <h3 className="font-black text-lg text-gray-900 mb-1 relative">Mua qua Zalo trong 4 bước</h3>
                  <p className="text-xs text-gray-500 mb-5 relative">Rõ giá trước, chọn đúng gói, có người hỗ trợ kích hoạt.</p>
                  <div className="space-y-3 relative">
                      {orderSteps.map((step, idx) => (
                          <div key={step.title} className="flex gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#0068FF] text-white flex items-center justify-center text-xs font-black shrink-0">{idx + 1}</div>
                              <div>
                                  <div className="text-sm font-bold text-gray-900">{step.title}</div>
                                  <div className="text-xs text-gray-500 leading-relaxed">{step.desc}</div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Tính năng nổi bật */}
              {product.features && product.features.length > 0 && (
                  <div className="bg-white p-5 rounded-[1.5rem] shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <CheckCircle size={18} className="text-green-500" /> Tính năng nổi bật
                      </h3>
                      <div className="space-y-3">
                          {product.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                                      <Check size={12} className="text-green-600" strokeWidth={3} />
                                  </div>
                                  <span className="text-sm font-medium text-gray-700 leading-snug">{feature}</span>
                              </div>
                          ))}
                      </div>
                  </div>
              )}

              {/* BLOCK 1: MÔ TẢ */}
              <div className="bg-white p-5 rounded-[1.5rem] shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Info size={18} className="text-blue-500" /> Mô tả chi tiết
                  </h3>
                  <div className={`text-sm text-gray-600 leading-relaxed overflow-hidden transition-all ${isDescExpanded ? 'max-h-full' : 'max-h-[200px]'}`}>
                      <p className="whitespace-pre-line">{product.description}</p>
                      {product.content && <div className="mt-4 pt-4 border-t border-gray-100 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: product.content }} />}
                  </div>
                  <button 
                      onClick={() => setIsDescExpanded(!isDescExpanded)}
                      className="w-full mt-3 py-2 text-xs font-bold text-primary bg-primary/5 rounded-lg flex items-center justify-center gap-1"
                  >
                      {isDescExpanded ? 'Thu gọn' : 'Xem thêm'} 
                      {isDescExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
              </div>

              {/* BLOCK 2: HƯỚNG DẪN */}
              <div className="bg-white p-5 rounded-[1.5rem] shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <BookOpen size={18} className="text-orange-500" /> Hướng dẫn sử dụng
                  </h3>
                  
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex gap-3 mb-4">
                      <MessageCircle size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-emerald-900 font-medium leading-relaxed">
                          Vì giá và tồn kho thay đổi thường xuyên, vui lòng nhắn Zalo để được báo giá mới nhất, xác nhận gói phù hợp và nhận hướng dẫn kích hoạt trực tiếp.
                      </p>
                  </div>
                  
                  <div className="text-sm text-gray-700 leading-relaxed">
                      {product.activationGuide ? (
                          <div className="markdown-body">{renderMarkdown(product.activationGuide)}</div>
                      ) : (
                          <div className="text-center text-gray-400 py-2 italic text-xs">
                              Hệ thống sẽ gửi hướng dẫn chi tiết qua email.
                          </div>
                      )}
                  </div>
              </div>

              {/* BLOCK 3: ĐÁNH GIÁ */}
              <div className="bg-white p-5 rounded-[1.5rem] shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <MessageSquare size={18} className="text-purple-500" /> Đánh giá khách hàng
                  </h3>

                  <div className="flex items-center gap-4 mb-6">
                      <div className="text-center">
                          <div className="text-4xl font-black text-gray-900">{product.rating}</div>
                          <div className="flex items-center gap-0.5 text-yellow-400 justify-center my-1">
                              {[1,2,3,4,5].map(s => <Star key={s} size={12} fill={s <= Math.round(product.rating) ? "currentColor" : "none"} />)}
                          </div>
                          <div className="text-xs text-gray-400 font-bold">{product.reviews?.length || 0} lượt</div>
                      </div>
                      <div className="flex-1 space-y-1">
                          {[5,4,3,2,1].map(star => (
                              <div key={star} className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                                  <span className="w-2">{star}</span>
                                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: star === 5 ? '80%' : star === 4 ? '15%' : '5%' }}></div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>

                  <div className="space-y-4">
                      {product.reviews && product.reviews.length > 0 ? (
                          product.reviews.map((review) => (
                              <div key={review.id} className="pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                  <div className="flex items-center justify-between mb-2">
                                      <div className="flex items-center gap-2">
                                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs font-bold">
                                              {review.avatar ? <img src={review.avatar} className="w-full h-full rounded-full object-cover"/> : <User size={14}/>}
                                          </div>
                                          <div>
                                              <div className="text-xs font-bold text-gray-900">{review.user}</div>
                                              <div className="flex items-center gap-1 text-[10px] text-yellow-500">
                                                  {[...Array(5)].map((_, i) => <Star key={i} size={8} fill={i < review.rating ? "currentColor" : "none"} stroke={i < review.rating ? "none" : "currentColor"} />)}
                                              </div>
                                          </div>
                                      </div>
                                      <span className="text-[10px] text-gray-400">{review.date}</span>
                                  </div>
                                  {review.purchasedType && (
                                      <div className="inline-block px-2 py-0.5 bg-gray-50 text-gray-500 text-[10px] rounded font-medium mb-2">
                                          Đã mua: {review.purchasedType}
                                      </div>
                                  )}
                                  <p className="text-xs text-gray-600 leading-relaxed">{review.comment}</p>
                              </div>
                          ))
                      ) : (
                          <div className="text-center py-6">
                              <p className="text-gray-400 text-sm italic">Chưa có đánh giá nào.</p>
                          </div>
                      )}
                  </div>
              </div>

              {/* Related */}
              {relatedProducts.length > 0 && (
                  <div className="relative -mx-4 mt-2 overflow-hidden bg-white py-5 shadow-sm border-y border-gray-100">
                      <div className="px-4 mb-3 flex items-end justify-between gap-3">
                          <div>
                              <h3 className="font-black text-gray-900 text-base">Có thể bạn thích</h3>
                              <p className="text-xs text-gray-500 mt-0.5">Gợi ý cùng danh mục, kéo ngang để xem thêm</p>
                          </div>
                          <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full shrink-0">{relatedProducts.length} mục</span>
                      </div>
                      <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar px-4 snap-x snap-mandatory scroll-px-4">
                          {relatedProducts.map(p => (
                              <div key={p.id} className="shrink-0 w-[112px] min-[390px]:w-[124px] snap-start">
                                  <MobileProductCard product={p} onAddToCart={addToCart} />
                              </div>
                          ))}
                      </div>
                  </div>
              )}
          </div>

          {/* 4. Fixed Bottom Action (Mobile) */}
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-[env(safe-area-inset-bottom)]">
              <div className="p-3 flex items-center gap-3">
                  <div className="flex flex-col pl-2">
                      <span className="text-[10px] text-gray-500 font-bold">Báo giá qua Zalo</span>
                      <span className="text-sm font-black text-gray-900 leading-none">
                          Giá tham khảo: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(currentPrice)}
                          {product.pricingUnit && <span className="text-xs font-bold text-gray-500 ml-1">{product.pricingUnit}</span>}
                      </span>
                  </div>
                  <div className="flex-1 flex gap-2 justify-end">
                      <button 
                          onClick={copyToClipboard}
                          className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-900 active:scale-95 transition-transform"
                          aria-label="Chia sẻ sản phẩm"
                      >
                          <Share2 size={22} />
                      </button>
                      <button 
                          onClick={openZaloConsultation}
                          className="flex-1 bg-[#0068FF] text-white font-bold rounded-xl text-base shadow-lg shadow-blue-500/25 active:scale-95 transition-transform flex items-center justify-center gap-2 whitespace-nowrap px-2"
                      >
                          <MessageCircle size={20} /> Nhắn Zalo
                      </button>
                  </div>
              </div>
          </div>
      </div>

      {/* --- DESKTOP LAYOUT (HIDDEN ON MOBILE) --- */}
      <div className="hidden lg:block pt-28 pb-20">
          <div className="max-w-7xl mx-auto px-8">
              <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-blue-50 via-white to-emerald-50 shadow-lg border border-gray-200">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(0,104,255,0.08),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.06),transparent_35%)]"></div>
                  <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
                  <div className="relative grid grid-cols-[0.95fr_1.05fr] gap-12 p-10 xl:p-14 items-center">
                      <div className="relative">
                          <div className="absolute inset-8 bg-blue-500/5 blur-3xl rounded-full"></div>
                          <div className="relative aspect-square rounded-[2.5rem] bg-white border border-gray-100 p-12 flex items-center justify-center shadow-lg group">
                              <img src={product.image} alt={product.name} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-lg" />
                              {discountPercent > 0 && (
                                  <div className="absolute top-6 left-6 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-black px-4 py-2 rounded-full shadow-lg">
                                      -{discountPercent}%
                                  </div>
                              )}
                          </div>
                      </div>

                      <div>
                          <div className="flex items-center gap-3 mb-5">
                              <span className="px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-700 font-black text-xs uppercase tracking-widest">{product.category}</span>
                              <div className="flex items-center gap-1 text-yellow-600 font-bold bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-full">
                                  <Star size={15} fill="currentColor" /> {product.rating} <span className="text-gray-300">•</span> {product.reviews?.length || 0} đánh giá
                              </div>
                          </div>
                          <h1 className="text-5xl xl:text-6xl font-black leading-[1.02] tracking-tight mb-5 text-gray-900">{product.name}</h1>
                          <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-2xl line-clamp-3">{product.description}</p>

                          <div className="grid grid-cols-[1fr_auto] gap-4 mb-6">
                              <div className="rounded-[2rem] bg-white text-gray-950 p-6 shadow-sm border border-gray-100">
                                  <div className="text-xs font-black text-emerald-700 uppercase tracking-[0.2em] mb-2">Báo giá linh hoạt</div>
                                  <div className="text-4xl font-black tracking-tight">Liên hệ Zalo</div>
                                  <div className="mt-2 text-sm text-gray-500">
                                      Giá tham khảo: <span className="font-extrabold text-blue-600">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(currentPrice)}</span>
                                      {product.pricingUnit && <span className="font-bold text-gray-500 ml-1">{product.pricingUnit}</span>}
                                      {discountPercent > 0 && <span className="ml-2 text-gray-400 line-through font-medium">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(currentOriginalPrice)}</span>}
                                  </div>
                              </div>
                              <button onClick={copyToClipboard} className="w-16 rounded-[1.5rem] bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all flex items-center justify-center" aria-label="Chia sẻ sản phẩm">
                                  <Share2 size={24} />
                              </button>
                          </div>

                          <button onClick={openZaloConsultation} className="w-full py-5 bg-[#0068FF] text-white font-black rounded-[1.5rem] shadow-2xl shadow-blue-500/30 hover:bg-[#005BE0] hover:-translate-y-1 active:scale-[0.99] transition-all flex items-center justify-center gap-3 text-lg">
                              <MessageCircle size={24} /> Nhắn Zalo nhận báo giá mới nhất
                          </button>
                          <div className="mt-4 grid grid-cols-4 gap-3">
                              {trustItems.map(item => (
                                  <div key={item} className="rounded-2xl bg-white border border-gray-100 p-3 text-xs font-bold text-gray-600 leading-snug shadow-sm">
                                      <CheckCircle size={16} className="text-emerald-500 mb-2" /> {item}
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
              </div>

              <div className="grid grid-cols-[0.9fr_1.1fr] gap-10 mt-10 items-start">
                  <div className="space-y-8 sticky top-28 self-start">
                      {product.variants && (
                          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                              <div className="flex items-end justify-between gap-4 mb-5">
                                  <div>
                                      <label className="block text-sm font-black text-gray-400 uppercase tracking-widest">Chọn gói dịch vụ</label>
                                      <p className="text-sm text-gray-500 mt-1">Gói đang chọn sẽ tự điền vào tin nhắn Zalo.</p>
                                  </div>
                                  <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full whitespace-nowrap shrink-0">{product.variants.length} lựa chọn</span>
                              </div>
                              <div className="space-y-3">
                                  {product.variants.map((v, idx) => {
                                      const isActive = selectedVariant?.id === v.id;
                                      return (
                                          <button
                                              key={v.id}
                                              onClick={() => setSelectedVariant(v)}
                                              className={`w-full p-4 rounded-2xl border-2 font-bold transition-all text-left hover:-translate-y-0.5 ${isActive ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg shadow-blue-500/10' : 'border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-200 text-gray-700'}`}
                                          >
                                              <div className="flex items-center justify-between gap-3">
                                                  <span>{v.name}</span>
                                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${isActive ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-200 text-transparent'}`}>
                                                      <Check size={14} strokeWidth={3} />
                                                  </div>
                                              </div>
                                              <div className="mt-2 text-xs font-medium text-gray-500">Giá tham khảo: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v.price)}</div>
                                              {idx === 0 && <div className="mt-3 inline-flex text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">Đề xuất bắt đầu</div>}
                                          </button>
                                      )
                                  })}
                              </div>
                          </div>
                      )}

                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[2.5rem] p-8 shadow-sm border border-blue-100 overflow-hidden relative">
                          <div className="absolute -top-20 -right-20 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl"></div>
                          <div className="relative mb-7">
                              <span className="text-xs font-black text-blue-600 uppercase tracking-[0.2em]">Quy trình rõ ràng</span>
                              <h3 className="text-3xl font-black mt-2 text-gray-900">Mua qua Zalo</h3>
                              <p className="text-gray-500 mt-2">Luôn xác nhận giá mới nhất trước khi thanh toán.</p>
                          </div>
                          <div className="relative space-y-4">
                              {orderSteps.map((step, idx) => (
                                  <div key={step.title} className="flex gap-4">
                                      <div className="w-10 h-10 rounded-full bg-[#0068FF] text-white flex items-center justify-center font-black shrink-0">{idx + 1}</div>
                                      <div>
                                          <div className="font-black mb-1 text-gray-900">{step.title}</div>
                                          <div className="text-sm text-gray-500 leading-relaxed">{step.desc}</div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>

                  <div className="space-y-8">
                      {product.features && product.features.length > 0 && (
                          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
                              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                  <CheckCircle size={20} className="text-green-500" /> Tính năng nổi bật
                              </h3>
                              <div className="grid grid-cols-2 gap-4">
                                  {product.features.map((feature, idx) => (
                                      <div key={idx} className="flex items-start gap-3 rounded-2xl bg-gray-50 border border-gray-100 p-4">
                                          <Check size={16} className="text-green-600 mt-1 shrink-0" strokeWidth={3} />
                                          <span className="text-gray-700 font-medium">{feature}</span>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      )}

                      <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
                          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><Info size={24} className="text-blue-600"/> Mô tả chi tiết</h3>
                          <div className="prose prose-lg text-gray-600">
                              <p className="whitespace-pre-line">{product.description}</p>
                              {product.content && <div className="mt-4 pt-4 border-t border-gray-100" dangerouslySetInnerHTML={{ __html: product.content }} />}
                          </div>
                      </div>

                      <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
                          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><BookOpen size={24} className="text-orange-600"/> Hướng dẫn sử dụng</h3>
                          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex items-center gap-4 mb-6">
                              <MessageCircle size={24} className="text-emerald-600" />
                              <span className="text-emerald-900 font-medium">Nhắn Zalo để được báo giá mới nhất, xác nhận tồn kho và nhận hướng dẫn kích hoạt phù hợp với sản phẩm.</span>
                          </div>
                          <div className="prose prose-lg text-gray-600">
                              {product.activationGuide ? renderMarkdown(product.activationGuide) : "Đang cập nhật nội dung..."}
                          </div>
                      </div>

                      <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
                          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><MessageSquare size={24} className="text-purple-600"/> Đánh giá ({product.reviews?.length || 0})</h3>
                          <div className="space-y-6">
                              {product.reviews && product.reviews.length > 0 ? (
                                  product.reviews.map((review) => (
                                      <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                                          <div className="flex items-center gap-3 mb-2">
                                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                                                  {review.user.charAt(0)}
                                              </div>
                                              <div>
                                                  <div className="font-bold text-gray-900">{review.user}</div>
                                                  <div className="flex items-center gap-1 text-yellow-400">
                                                      {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} stroke={i < review.rating ? "none" : "currentColor"} />)}
                                                  </div>
                                              </div>
                                              <div className="ml-auto text-sm text-gray-400">{review.date}</div>
                                          </div>
                                          <p className="text-gray-600">{review.comment}</p>
                                      </div>
                                  ))
                              ) : (
                                  <div className="text-center text-gray-400 italic">Chưa có đánh giá nào.</div>
                              )}
                          </div>
                      </div>
                  </div>
              </div>

              {/* Related Desktop */}
              {relatedProducts.length > 0 && (
                  <div className="mt-16 border-t border-gray-200 pt-12">
                      <h3 className="text-3xl font-extrabold text-gray-900 mb-10">Sản phẩm tương tự</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                          {relatedProducts.slice(0,4).map(p => (
                              <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
                          ))}
                      </div>
                  </div>
              )}
          </div>
      </div>

    </div>
  );
};
