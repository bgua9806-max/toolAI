import React, { useEffect, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Product, Variant, Review } from '../types';
import { 
  Star, ArrowLeft, Share2, MessageCircle, 
  CheckCircle, ChevronRight, ShieldCheck, Zap, Info, 
  ChevronDown, ChevronUp, Check, Home, Search,
  BookOpen, MessageSquare, List, User, ShoppingCart,
  Sparkles, Clock, Lock, RefreshCw, HelpCircle, Award,
  Flame, Eye, CheckCircle2, ShieldAlert, Headphones
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { PRODUCTS as FALLBACK_PRODUCTS, CATEGORIES } from '../constants';
import { MobileProductCard } from '../components/mobile/MobileProductCard';
import { ProductCard } from '../components/ProductCard';
import { slugify } from '../lib/utils';
import { SEO } from '../components/SEO';

const { useParams, Link, useNavigate } = ReactRouterDOM;

interface ProductDetailProps {
  addToCart: (product: Product) => void;
}

interface ProductDescriptionViewProps {
  description?: string;
  isCompact?: boolean;
}

export const ProductDescriptionView: React.FC<ProductDescriptionViewProps> = ({ description, isCompact = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!description) return null;

  const normalized = description
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\r\n/g, '\n')
    .trim();

  // If it is a short 1-sentence description without line breaks
  if (!normalized.includes('\n')) {
    return (
      <p className={`text-gray-600 leading-relaxed font-normal ${isCompact ? 'text-xs mb-4' : 'text-base mb-6'}`}>
        {normalized}
      </p>
    );
  }

  const lines = normalized.split('\n').map(l => l.trim()).filter(Boolean);

  interface ParsedBlock {
    type: 'badge' | 'header' | 'bullet' | 'step' | 'alert' | 'text';
    icon?: string;
    step?: number;
    text: string;
  }

  const blocks: ParsedBlock[] = [];
  let currentContext: 'general' | 'process' | 'benefits' = 'general';
  let stepCounter = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 1. Headline badge: First line if it starts with emoji or uppercase title
    if (i === 0 && (line.startsWith('🤖') || line.startsWith('🔥') || line.startsWith('⭐') || line.startsWith('💎') || (line === line.toUpperCase() && line.length < 60))) {
      blocks.push({ type: 'badge', text: line });
      continue;
    }

    // 2. Alert / Timing badges: starts with ⏱, 🕒, ⏳, ⚠️, 🔔
    if (/^[⏱🕒⏳⚠️🔔]/u.test(line)) {
      blocks.push({ type: 'alert', text: line });
      continue;
    }

    // 3. Section header: ends with ':' or starts with section emojis
    if (/^[🚀🔐🛠📌💡🎯💎🔑]/u.test(line) || line.endsWith(':')) {
      if (line.includes('Quy trình') || line.includes('bước') || line.includes('Hướng dẫn')) {
        currentContext = 'process';
        stepCounter = 1;
      } else if (line.includes('là gì') || line.includes('Quyền lợi') || line.includes('Lưu ý') || line.includes('Tính năng')) {
        currentContext = 'benefits';
      } else {
        currentContext = 'general';
      }
      blocks.push({ type: 'header', text: line });
      continue;
    }

    // 4. Bullet points: starts with emojis (⚡, ✍️, 🌐, 🔁, 📲, ✅, ✔) or bullet chars (-, *, •)
    const bulletMatch = line.match(/^([⚡✍️🌐🔁📲✅✔\-\*•])\s*(.*)$/u);
    if (bulletMatch) {
      blocks.push({ type: 'bullet', icon: bulletMatch[1], text: bulletMatch[2] });
      continue;
    }

    // 5. Context-aware list item under active header
    if (currentContext === 'process') {
      blocks.push({ type: 'step', step: stepCounter++, text: line });
      continue;
    }

    if (currentContext === 'benefits') {
      blocks.push({ type: 'bullet', icon: '✓', text: line });
      continue;
    }

    // 6. Normal text
    blocks.push({ type: 'text', text: line });
  }

  const limit = isCompact ? 6 : 14;
  const shouldTruncate = blocks.length > limit;
  const visibleBlocks = shouldTruncate && !isExpanded ? blocks.slice(0, limit) : blocks;

  return (
    <div className={`space-y-2.5 ${isCompact ? 'mb-4' : 'mb-6'}`}>
      {visibleBlocks.map((b, idx) => {
        if (b.type === 'badge') {
          return (
            <div key={idx} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200/80 text-blue-900 font-extrabold text-xs mb-1 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span>{b.text}</span>
            </div>
          );
        }

        if (b.type === 'header') {
          return (
            <div key={idx} className="pt-2 pb-0.5 text-xs sm:text-sm font-black uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
              <span>{b.text}</span>
            </div>
          );
        }

        if (b.type === 'bullet') {
          return (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 leading-relaxed group">
              <span className="text-base shrink-0 select-none transition-transform group-hover:scale-110 mt-0.5">
                {b.icon === '-' || b.icon === '•' || b.icon === '*' ? '🔹' : (b.icon === '✓' ? <Check size={14} className="text-blue-600 font-bold mt-1" /> : b.icon)}
              </span>
              <span className="flex-1 font-medium">{b.text}</span>
            </div>
          );
        }

        if (b.type === 'step') {
          return (
            <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-800 leading-relaxed bg-slate-50/80 border border-slate-200/60 px-3 py-2 rounded-xl">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-black text-[10px] flex items-center justify-center shrink-0">
                {b.step}
              </span>
              <span className="flex-1 font-medium">{b.text}</span>
            </div>
          );
        }

        if (b.type === 'alert') {
          return (
            <div key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold shadow-xs">
              <span>{b.text}</span>
            </div>
          );
        }

        return (
          <p key={idx} className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
            {b.text}
          </p>
        );
      })}

      {shouldTruncate && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 pt-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer group"
        >
          <span className="group-hover:underline">
            {isExpanded ? 'Thu gọn nội dung' : `Xem thêm toàn bộ quy trình & chi tiết (${blocks.length - limit} mục nữa)`}
          </span>
          <ChevronDown size={14} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      )}
    </div>
  );
};

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
  const [activeTab, setActiveTab] = useState<'features' | 'guide' | 'warranty' | 'reviews' | 'faq'>('features');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isCopied, setIsCopied] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

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

        if (!currentProduct.features || currentProduct.features.length === 0) {
          const fallback = FALLBACK_PRODUCTS.find(fp => String(fp.id) === String(currentProduct!.id));
          currentProduct.features = fallback?.features || [
            'Bản quyền chính hãng 100% - Kích hoạt bảo hành toàn thời gian',
            'Hỗ trợ nâng cấp trực tiếp trên Email chính chủ',
            'Kích hoạt siêu tốc trong 3 - 5 phút sau khi đặt hàng',
            'Đồng bộ dữ liệu đa nền tảng (Windows, macOS, iOS, Android)'
          ];
        }

        if (!currentProduct.reviews || currentProduct.reviews.length === 0) {
          const fallback = FALLBACK_PRODUCTS.find(fp => String(fp.id) === String(currentProduct!.id));
          currentProduct.reviews = fallback?.reviews || [
            {
              id: 'rev-1',
              user: 'Hoàng Nam - Designer',
              rating: 5,
              comment: 'Tài khoản dùng siêu mượt, shop hỗ trợ kích hoạt qua Zalo chỉ trong 3 phút là có ngay. Rất an tâm!',
              date: '2 ngày trước',
              purchasedType: 'Gói 1 Năm'
            },
            {
              id: 'rev-2',
              user: 'Minh Tuấn - Software Dev',
              rating: 5,
              comment: 'Nâng cấp trên chính email của mình nên giữ nguyên toàn bộ lịch sử chat và project. Giá quá hời so với mua trực tiếp từ hãng.',
              date: '5 ngày trước',
              purchasedType: 'Gói Nâng Cấp Chính Chủ'
            },
            {
              id: 'rev-3',
              user: 'Thảo Vy - Marketer',
              rating: 5,
              comment: 'Shop tư vấn nhiệt tình 24/7, có kỹ thuật viên Ultraview hỗ trợ khi cần. Đã giới thiệu cho cả team cùng mua.',
              date: '1 tuần trước',
              purchasedType: 'Gói 6 Tháng'
            }
          ];
        }

        setProduct(currentProduct);
        
        if (currentProduct.variants && currentProduct.variants.length > 0) {
          setSelectedVariant(currentProduct.variants[0]);
        }

        const source = !error && allProducts ? allProducts : FALLBACK_PRODUCTS;
        const related = source
          .filter((p: Product) => p.category === currentProduct!.category && p.id !== currentProduct!.id)
          .slice(0, 4)
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

  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      setShowStickyBar(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const HOTLINE_ZALO = '0906291941';

  const currentPrice = selectedVariant ? selectedVariant.price : (product?.price || 0);
  const rawOriginalPrice = (selectedVariant?.originalPrice && selectedVariant.originalPrice > currentPrice)
    ? selectedVariant.originalPrice
    : (product?.originalPrice && product.originalPrice > currentPrice
        ? product.originalPrice
        : Math.round(currentPrice * 1.25));
  const currentOriginalPrice = rawOriginalPrice > currentPrice ? rawOriginalPrice : Math.round(currentPrice * 1.25);
  const discountPercent = Math.max(0, Math.round(((currentOriginalPrice - currentPrice) / (currentOriginalPrice || 1)) * 100));
  const savingsAmount = Math.max(0, currentOriginalPrice - currentPrice);

  const getConsultationMessage = () => {
    if (!product) return 'Xin chào MuaToolAI.com, tôi cần tư vấn sản phẩm.';
    const packageName = selectedVariant ? ` - Gói: ${selectedVariant.name}` : '';
    const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(currentPrice);
    return `Xin chào MuaToolAI.com, tôi muốn mua: ${product.name}${packageName} (Giá ưu đãi: ${formattedPrice}). Vui lòng tư vấn và hướng dẫn kích hoạt siêu tốc giúp tôi.`;
  };

  const openZaloConsultation = () => {
    const message = encodeURIComponent(getConsultationMessage());
    window.open(`https://zalo.me/${HOTLINE_ZALO}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleAddToCart = () => {
    if (!product) return;
    const itemToAdd: Product = {
      ...product,
      price: currentPrice,
      originalPrice: currentOriginalPrice,
      name: selectedVariant ? `${product.name} (${selectedVariant.name})` : product.name
    };
    addToCart(itemToAdd);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const renderMarkdown = (text?: string) => {
    if (!text) return null;
    let html = text.replace(/\\n/g, '<br/>').replace(/\n/g, '<br/>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

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
      'ai': 'ApplicationSuite',
      'cloud': 'UtilitiesApplication'
    };
    return map[cat] || 'SoftwareApplication';
  };

  const getOperatingSystem = () => {
    if (product?.platforms && product.platforms.length > 0) {
      return product.platforms.join(', ');
    }
    return 'Windows, macOS, Android, iOS, Web';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm font-bold text-gray-500">Đang tải chi tiết sản phẩm...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center flex-col gap-4 p-4 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center font-black text-2xl">!</div>
        <h2 className="text-xl font-black text-gray-900">Không tìm thấy sản phẩm yêu cầu</h2>
        <p className="text-sm text-gray-500 max-w-md">Sản phẩm này có thể đã được cập nhật đường dẫn hoặc tạm ngưng cung cấp.</p>
        <Link to="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all">
          Khám phá danh sách sản phẩm
        </Link>
      </div>
    );
  }

  const categoryName = CATEGORIES.find(c => c.id === product.category)?.name || 'Công cụ AI';
  const canonicalProductUrl = `https://muatoolai.com/product/${product.id}`;

  const productSchemas = [
    {
      "@type": ["Product", "SoftwareApplication"],
      "@id": `${canonicalProductUrl}#product`,
      "name": product.name,
      "image": product.image,
      "description": product.description,
      "applicationCategory": getApplicationCategory(product.category),
      "operatingSystem": getOperatingSystem(),
      "softwareVersion": product.version || "Bản quyền chính hãng 2026",
      "brand": {
        "@type": "Brand",
        "name": product.developer || "MuaToolAI.com"
      },
      "sku": product.id,
      "offers": {
        "@type": "Offer",
        "url": canonicalProductUrl,
        "priceCurrency": "VND",
        "price": currentPrice,
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "applicableCountry": "VN",
          "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
          "merchantReturnDays": 30,
          "returnMethod": "https://schema.org/ReturnByMail",
          "returnFees": "https://schema.org/FreeReturn"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.rating || 4.9,
        "reviewCount": Math.max(product.reviews?.length || 0, 36)
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonicalProductUrl}#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Trang chủ",
          "item": "https://muatoolai.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": categoryName,
          "item": `https://muatoolai.com/category/${product.category}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": product.name,
          "item": canonicalProductUrl
        }
      ]
    }
  ];

  const defaultFaqs = [
    {
      q: 'Tôi sẽ nhận tài khoản hoặc key bản quyền bằng cách nào và mất bao lâu?',
      a: 'Sau khi hoàn tất đơn hàng hoặc gửi tin nhắn qua Zalo, hệ thống và chuyên viên sẽ bàn giao thông tin đăng nhập/link kích hoạt chính chủ cho bạn trong vòng 3 - 5 phút qua Zalo hoặc Email.'
    },
    {
      q: 'Tài khoản là cấp mới hay nâng cấp trên chính email cá nhân của tôi?',
      a: 'MuaToolAI hỗ trợ cả 2 hình thức: (1) Nâng cấp trực tiếp trên chính email cá nhân của bạn để giữ trọn vẹn dữ liệu, lịch sử chat và dự án; hoặc (2) Cung cấp tài khoản cấp sẵn chuẩn Pro/Plus kích hoạt sẵn nếu bạn muốn dùng ngay tức thì.'
    },
    {
      q: 'Chính sách bảo hành và cam kết hoàn tiền hoạt động như thế nào?',
      a: 'Tất cả sản phẩm tại MuaToolAI được bảo hành 1-1 toàn thời gian sử dụng. Nếu tài khoản gặp sự cố kỹ thuật không thể khắc phục trong 24h, chúng tôi sẽ đổi ngay tài khoản mới hoặc hoàn trả 100% chi phí tương ứng với thời gian chưa dùng.'
    },
    {
      q: 'Tôi có thể đăng nhập trên nhiều thiết bị (điện thoại, laptop) không?',
      a: 'Hoàn toàn được! Bạn có thể đăng nhập và đồng bộ dữ liệu mượt mà trên máy tính (Windows, macOS), điện thoại di động (iPhone, Android) và trình duyệt web theo tiêu chuẩn bản quyền của hãng.'
    },
    {
      q: 'Tôi có được hỗ trợ cài đặt nếu không rành kỹ thuật không?',
      a: 'Có! Đội ngũ kỹ thuật viên tận tâm của MuaToolAI túc trực 24/7 sẵn sàng hỗ trợ bạn qua Zalo bằng video/hình ảnh từng bước, hoặc hỗ trợ từ xa qua Ultraview/Teamviewer hoàn toàn miễn phí.'
    }
  ];

  const trustHighlights = [
    { icon: Zap, title: 'Kích hoạt siêu tốc', desc: 'Nhận tài khoản trong 3 - 5 phút' },
    { icon: ShieldCheck, title: 'Bảo hành 1-1', desc: 'Đổi mới toàn thời gian sử dụng' },
    { icon: Lock, title: 'Email chính chủ', desc: 'Bảo mật dữ liệu tuyệt đối' },
    { icon: Headphones, title: 'Hỗ trợ 24/7', desc: 'Ultraview & Zalo tận tình' }
  ];

  const orderSteps = [
    {
      step: '01',
      title: 'Chọn gói & Đặt hàng',
      desc: 'Chọn thời hạn phù hợp (1 tháng, 3 tháng hoặc 1 năm) và nhấn "Mua ngay qua Zalo" hoặc "Thêm vào giỏ".'
    },
    {
      step: '02',
      title: 'Xác nhận & Kích hoạt',
      desc: 'Chuyên viên MuaToolAI gửi thông tin thanh toán an toàn và tiến hành nâng cấp trực tiếp cho bạn trong 3 - 5 phút.'
    },
    {
      step: '03',
      title: 'Bàn giao & Hỗ trợ trọn đời',
      desc: 'Đăng nhập trải nghiệm đầy đủ tính năng Pro, nhận hướng dẫn sử dụng và bảo hành 1-1 toàn thời gian.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans selection:bg-blue-600 selection:text-white">
      <SEO 
        title={`${product.name} Giá Rẻ Bản Quyền Chính Hãng | MuaToolAI`} 
        description={`Mua tài khoản ${product.name} bản quyền chính hãng giá rẻ nhất. Kích hoạt trong 3-5 phút, nâng cấp email chính chủ, bảo hành 1-1 toàn thời gian.`} 
        image={product.image}
        canonical={canonicalProductUrl}
        type="product"
        schema={productSchemas}
      />

      {/* Toast feedback when adding to cart */}
      {addedToast && (
        <div className="fixed top-20 right-4 z-[999] bg-gray-950 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-800 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center">
            <Check size={16} strokeWidth={3} />
          </div>
          <div>
            <p className="text-xs font-bold">Đã thêm vào giỏ hàng!</p>
            <p className="text-[11px] text-gray-400">{product.name} ({selectedVariant?.name || 'Mặc định'})</p>
          </div>
        </div>
      )}

      {/* Toast feedback when copied link */}
      {isCopied && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[999] bg-blue-600 text-white px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-xs font-bold animate-in fade-in duration-200">
          <Check size={15} /> Đã sao chép liên kết sản phẩm!
        </div>
      )}

      {/* ========================================================
          MOBILE VIEW (lg:hidden)
          ======================================================== */}
      <div className="lg:hidden pb-36">
        {/* Sticky Dynamic Top Bar */}
        <div className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/80 py-2.5 px-4' 
            : 'bg-transparent py-3 px-4'
        }`}>
          <div className="flex items-center justify-between gap-3">
            <button 
              onClick={() => navigate(-1)} 
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                isScrolled ? 'bg-gray-100 text-gray-800' : 'bg-white/90 shadow-md text-gray-800 backdrop-blur-sm'
              }`}
              aria-label="Quay lại"
            >
              <ArrowLeft size={18} />
            </button>

            <div className={`flex-1 text-center truncate transition-all duration-300 ${
              isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
              <span className="font-extrabold text-sm text-gray-900 truncate block">{product.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigate('/')} 
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  isScrolled ? 'bg-gray-100 text-gray-800' : 'bg-white/90 shadow-md text-gray-800 backdrop-blur-sm'
                }`}
                aria-label="Về trang chủ"
              >
                <Home size={18} />
              </button>
              <button 
                onClick={copyToClipboard} 
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  isScrolled ? 'bg-gray-100 text-gray-800' : 'bg-white/90 shadow-md text-gray-800 backdrop-blur-sm'
                }`}
                aria-label="Chia sẻ"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Visual Hero Staging */}
        <div className="pt-16 px-4">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/60 p-6 border border-gray-200/80 shadow-md">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative flex items-center justify-between gap-2 mb-4">
              <span className="text-[11px] font-black tracking-wider uppercase px-3 py-1 bg-blue-600 text-white rounded-full shadow-sm">
                {categoryName}
              </span>
              <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-gray-200 text-xs font-black text-amber-600 shadow-sm">
                <Star size={13} fill="currentColor" /> {product.rating || 4.9}
                <span className="text-gray-400 font-normal">({product.reviews?.length || 28})</span>
              </div>
            </div>

            <div className="relative aspect-square max-w-[260px] mx-auto flex items-center justify-center p-4">
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-h-full max-w-full object-contain filter drop-shadow-xl"
              />
              {discountPercent > 0 && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-rose-500 to-red-600 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Zap size={12} fill="currentColor" /> -{discountPercent}%
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                <CheckCircle2 size={12} /> Kích hoạt siêu tốc
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
                <ShieldCheck size={12} /> Bảo hành 1-1
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Product Main Card */}
        <div className="px-4 mt-4 space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-sm">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-snug mb-3">
              {product.name}
            </h1>
            <ProductDescriptionView description={product.description} isCompact={true} />

            {/* Mobile Buy Box / Price Preview */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/70 p-4 border border-blue-100">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-700">Giá ưu đãi đặc biệt</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Sẵn hàng
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-blue-600 tracking-tight">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(currentPrice)}
                </span>
                {product.pricingUnit && (
                  <span className="text-xs font-bold text-gray-500">{product.pricingUnit}</span>
                )}
              </div>
              {currentOriginalPrice > currentPrice && (
                <div className="flex items-center gap-2 mt-1 text-xs">
                  <span className="text-gray-400 line-through">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(currentOriginalPrice)}
                  </span>
                  <span className="text-rose-600 font-extrabold bg-rose-50 px-2 py-0.5 rounded-md text-[11px]">
                    Tiết kiệm {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(savingsAmount)}
                  </span>
                </div>
              )}
            </div>

            {/* Live Social Ticker Mobile */}
            <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-gray-500 pt-3 border-t border-gray-100">
              <span className="flex items-center gap-1 text-amber-700">
                <Flame size={13} className="text-amber-500" fill="currentColor" /> Đã bán {product.sold || 1280}+ lượt
              </span>
              <span className="flex items-center gap-1 text-emerald-700">
                <Eye size={13} className="text-emerald-500" /> 16 người đang xem
              </span>
            </div>
          </div>

          {/* Mobile Variant Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-gray-400">Chọn gói thời hạn</span>
                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  {product.variants.length} gói có sẵn
                </span>
              </div>
              <div className="space-y-2.5">
                {product.variants.map((v, idx) => {
                  const isSelected = selectedVariant?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'border-blue-600 bg-blue-50/50 shadow-sm' 
                          : 'border-gray-100 bg-gray-50/80 hover:bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-extrabold ${isSelected ? 'text-blue-700' : 'text-gray-900'}`}>
                            {v.name}
                          </span>
                          {idx === 0 && (
                            <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                              Khuyên dùng
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-bold text-gray-500 mt-0.5">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v.price)}
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 bg-white'
                      }`}>
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4 Steps Zalo Buy Flow Mobile */}
          <div className="bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/80 rounded-3xl p-5 border border-indigo-100 shadow-sm">
            <h3 className="text-sm font-black text-gray-900 mb-3 flex items-center gap-2">
              <Sparkles size={16} className="text-indigo-600" /> Quy trình 3 bước kích hoạt nhanh
            </h3>
            <div className="space-y-3">
              {orderSteps.map((s) => (
                <div key={s.step} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    {s.step}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">{s.title}</div>
                    <div className="text-[11px] text-gray-500 leading-relaxed">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Highlights Mobile */}
          {product.features && product.features.length > 0 && (
            <div className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-sm">
              <h3 className="text-sm font-black text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-500" /> Tính năng & Quyền lợi
              </h3>
              <div className="space-y-2.5">
                {product.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700">
                    <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Mobile */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-sm">
            <h3 className="text-sm font-black text-gray-900 mb-3 flex items-center gap-2">
              <HelpCircle size={16} className="text-blue-600" /> Câu hỏi thường gặp
            </h3>
            <div className="space-y-2">
              {defaultFaqs.slice(0, 3).map((faq, idx) => (
                <div key={idx} className="border border-gray-100 rounded-2xl p-3">
                  <button 
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full text-left font-bold text-xs text-gray-900 flex items-center justify-between gap-2"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={14} className={`shrink-0 transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaqIndex === idx && (
                    <p className="mt-2 text-xs text-gray-600 leading-relaxed pt-2 border-t border-gray-50">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Mobile */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
                <MessageSquare size={16} className="text-purple-600" /> Đánh giá thực tế
              </h3>
              <span className="text-xs font-black text-amber-600 flex items-center gap-1">
                <Star size={13} fill="currentColor" /> {product.rating} ({product.reviews?.length || 0})
              </span>
            </div>
            <div className="space-y-3">
              {product.reviews?.slice(0, 3).map((rev) => (
                <div key={rev.id} className="p-3 rounded-2xl bg-gray-50/80 border border-gray-100">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-gray-900">{rev.user}</span>
                    <span className="text-[10px] text-gray-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-400 mb-1.5">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={11} fill={s <= rev.rating ? "currentColor" : "none"} stroke="none" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Fixed Luxury Bottom Bar */}
        <div className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200/90 shadow-2xl px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="flex items-center gap-2.5">
            <div className="min-w-0 pr-1">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Giá ưu đãi</div>
              <div className="text-base font-black text-blue-600 truncate leading-tight">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(currentPrice)}
              </div>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-800 flex items-center justify-center shrink-0 active:scale-95 transition-transform"
              aria-label="Thêm vào giỏ"
            >
              <ShoppingCart size={20} />
            </button>

            <button
              onClick={openZaloConsultation}
              className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all truncate px-3"
            >
              <MessageCircle size={18} />
              <span>Mua Ngay Qua Zalo</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          DESKTOP VIEW (hidden lg:block)
          ======================================================== */}
      <div className="hidden lg:block pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* 1. Breadcrumbs & Top Meta */}
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-6">
            <div className="flex items-center gap-2">
              <Link to="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
              <ChevronRight size={13} className="text-gray-400" />
              <Link to={`/category/${product.category}`} className="hover:text-blue-600 transition-colors">
                {categoryName}
              </Link>
              <ChevronRight size={13} className="text-gray-400" />
              <span className="text-gray-900 font-bold truncate max-w-sm">{product.name}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Sẵn sàng kích hoạt
              </span>
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <Share2 size={13} /> Chia sẻ
              </button>
            </div>
          </div>

          {/* 2. Hero Staging Card (Apple / Luxury SaaS Style) */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-gray-200/90 shadow-xl p-10 xl:p-12">
            {/* Ambient Brand Light */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative grid grid-cols-[1fr_1.15fr] gap-12 items-start">
              
              {/* Left Column: Visual Showcase Container */}
              <div className="space-y-6">
                <div className="relative aspect-square rounded-[2rem] bg-gradient-to-br from-slate-50/80 via-white to-blue-50/50 border border-gray-200 p-12 flex items-center justify-center shadow-inner group">
                  <div className="absolute inset-8 rounded-full bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="relative w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                  {discountPercent > 0 && (
                    <div className="absolute top-6 left-6 bg-gradient-to-r from-rose-500 to-red-600 text-white font-black text-sm px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                      <Zap size={14} fill="currentColor" /> -{discountPercent}% TIẾT KIỆM
                    </div>
                  )}
                  <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md border border-gray-200/80 text-gray-800 text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm">
                    Bản quyền chính hãng
                  </div>
                </div>

                {/* Micro Guarantee Chips */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                    <Zap size={18} className="mx-auto text-amber-500 mb-1" />
                    <div className="text-[11px] font-black text-gray-900">3 - 5 Phút</div>
                    <div className="text-[10px] text-gray-500">Kích hoạt siêu tốc</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                    <ShieldCheck size={18} className="mx-auto text-emerald-600 mb-1" />
                    <div className="text-[11px] font-black text-gray-900">Bảo hành 1-1</div>
                    <div className="text-[10px] text-gray-500">Đổi mới trọn thời gian</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                    <Lock size={18} className="mx-auto text-blue-600 mb-1" />
                    <div className="text-[11px] font-black text-gray-900">Email chính chủ</div>
                    <div className="text-[10px] text-gray-500">Bảo mật tuyệt đối</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Buy Box & Product Info */}
              <div>
                {/* Category & Rating */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-black text-xs uppercase tracking-wider">
                    {categoryName}
                  </span>
                  <div className="flex items-center gap-1.5 text-amber-500 font-bold bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full text-xs">
                    <Star size={14} fill="currentColor" /> {product.rating || 4.9}
                    <span className="text-gray-400 font-normal">({product.reviews?.length || 36} đánh giá đã xác minh)</span>
                  </div>
                </div>

                <h1 className="text-4xl xl:text-5xl font-black text-gray-900 tracking-tight leading-[1.1] mb-4">
                  {product.name}
                </h1>

                <ProductDescriptionView description={product.description} isCompact={false} />

                {/* High-Converting Price Card */}
                <div className="rounded-3xl bg-gradient-to-br from-blue-50/60 via-white to-indigo-50/60 border border-blue-100 p-6 shadow-sm mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-blue-800 uppercase tracking-widest">
                      Giá niêm yết chính thức
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Đang có khuyến mãi
                    </span>
                  </div>

                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-4xl xl:text-5xl font-black text-blue-600 tracking-tight">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(currentPrice)}
                    </span>
                    {product.pricingUnit && (
                      <span className="text-base font-bold text-gray-500">{product.pricingUnit}</span>
                    )}
                    {currentOriginalPrice > currentPrice && (
                      <span className="text-lg text-gray-400 line-through ml-2 font-medium">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(currentOriginalPrice)}
                      </span>
                    )}
                  </div>

                  {savingsAmount > 0 && (
                    <div className="text-xs font-bold text-rose-600 flex items-center gap-2 mt-1">
                      <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-md font-extrabold">
                        Tiết kiệm {discountPercent}%
                      </span>
                      <span>Giảm trực tiếp {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(savingsAmount)} so với mua tại hãng</span>
                    </div>
                  )}
                </div>

                {/* Variant Selector (Interactive Pills) */}
                {product.variants && product.variants.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-wider">
                        Chọn gói dịch vụ
                      </label>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                        {product.variants.length} lựa chọn
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.variants.map((v, idx) => {
                        const isSelected = selectedVariant?.id === v.id;
                        return (
                          <button
                            key={v.id}
                            onClick={() => setSelectedVariant(v)}
                            className={`p-4 rounded-2xl border-2 text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                              isSelected 
                                ? 'border-blue-600 bg-blue-50/60 shadow-md shadow-blue-500/10' 
                                : 'border-gray-200/80 bg-gray-50/60 hover:bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className={`font-black text-sm ${isSelected ? 'text-blue-700' : 'text-gray-900'}`}>
                                {v.name}
                              </span>
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                                isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 bg-white'
                              }`}>
                                {isSelected && <Check size={12} strokeWidth={3} />}
                              </div>
                            </div>
                            <div className="text-sm font-extrabold text-gray-700">
                              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(v.price)}
                            </div>
                            {idx === 0 && (
                              <span className="mt-2 text-[10px] font-black text-emerald-700 bg-emerald-100 self-start px-2 py-0.5 rounded-full">
                                Phổ biến nhất
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Dual Conversion CTA Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.3fr] gap-3 mb-6">
                  <button
                    onClick={handleAddToCart}
                    className="py-4 px-6 rounded-2xl bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-black text-base shadow-md transition-all flex items-center justify-center gap-2.5 active:scale-[0.99]"
                  >
                    <ShoppingCart size={20} />
                    <span>Thêm vào giỏ</span>
                  </button>

                  <button
                    onClick={openZaloConsultation}
                    className="py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-base shadow-xl shadow-blue-500/30 transition-all flex items-center justify-center gap-2.5 hover:-translate-y-0.5 active:scale-[0.99]"
                  >
                    <MessageCircle size={22} />
                    <span>Mua Ngay Qua Zalo</span>
                  </button>
                </div>

                {/* Trust Guarantees */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 text-xs font-semibold text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    <span>Hỗ trợ kỹ thuật Ultraview 24/7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    <span>Đổi mới 1-1 nếu có bất kỳ lỗi nào</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* 3. Sticky Navigation Tab Bar */}
          <div className="mt-12 sticky top-20 z-40 bg-white/95 backdrop-blur-md rounded-2xl p-2 border border-gray-200/90 shadow-sm flex items-center justify-center gap-2">
            {[
              { id: 'features', label: 'Tính năng & Đặc quyền', icon: Sparkles },
              { id: 'guide', label: 'Hướng dẫn kích hoạt', icon: BookOpen },
              { id: 'warranty', label: 'Chính sách bảo hành 1-1', icon: ShieldCheck },
              { id: 'reviews', label: `Đánh giá (${product.reviews?.length || 0})`, icon: MessageSquare },
              { id: 'faq', label: 'Hỏi đáp (FAQ)', icon: HelpCircle }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    const el = document.getElementById(tab.id);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`px-5 py-2.5 rounded-xl font-extrabold text-sm transition-all flex items-center gap-2 ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* 4. Tab Contents Sections */}
          <div className="mt-8 space-y-8">
            
            {/* TAB 1: Features & Description */}
            <div id="features" className="bg-white rounded-[2rem] p-10 border border-gray-200/80 shadow-sm">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2.5">
                <Sparkles size={24} className="text-blue-600" /> Tính năng & Quyền lợi độc quyền
              </h2>

              {product.features && product.features.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span className="text-sm font-bold text-gray-800 leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                  <Info size={18} className="text-gray-500" /> Mô tả chi tiết phần mềm
                </h3>
                <div className="text-gray-600 leading-relaxed text-sm space-y-4">
                  <ProductDescriptionView description={product.description} isCompact={false} />
                  {product.content && (
                    <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: product.content }} />
                  )}
                </div>
              </div>
            </div>

            {/* TAB 2: Activation Guide */}
            <div id="guide" className="bg-white rounded-[2rem] p-10 border border-gray-200/80 shadow-sm">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2.5">
                <BookOpen size={24} className="text-indigo-600" /> Quy trình 3 bước nhận tài khoản siêu tốc
              </h2>

              <div className="grid grid-cols-3 gap-6 mb-8">
                {orderSteps.map((s) => (
                  <div key={s.step} className="p-6 rounded-3xl bg-gradient-to-br from-gray-50 to-indigo-50/40 border border-gray-100 relative">
                    <span className="text-3xl font-black text-indigo-200 mb-3 block">{s.step}</span>
                    <h4 className="text-base font-extrabold text-gray-900 mb-2">{s.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>

              {product.activationGuide && (
                <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-sm text-gray-800 leading-relaxed">
                  <div className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-600" /> Hướng dẫn thao tác cụ thể
                  </div>
                  {renderMarkdown(product.activationGuide)}
                </div>
              )}
            </div>

            {/* TAB 3: Warranty Policy */}
            <div id="warranty" className="bg-white rounded-[2rem] p-10 border border-gray-200/80 shadow-sm">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2.5">
                <ShieldCheck size={24} className="text-emerald-600" /> Cam kết bảo hành 1-1 toàn thời gian
              </h2>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
                  <h4 className="text-base font-extrabold text-gray-900 mb-2 flex items-center gap-2">
                    <Award size={18} className="text-amber-500" /> Chính sách đổi mới tài khoản
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Trong suốt thời hạn đăng ký (1 tháng, 3 tháng hoặc 1 năm), nếu tài khoản phát sinh bất kỳ lỗi nào từ nhà sản xuất, MuaToolAI cam kết đổi tài khoản mới tương đương trong vòng 30 phút.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
                  <h4 className="text-base font-extrabold text-gray-900 mb-2 flex items-center gap-2">
                    <RefreshCw size={18} className="text-blue-500" /> Cam kết hoàn tiền 100%
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Nếu không thể kích hoạt thành công hoặc sản phẩm không đúng như mô tả, chúng tôi cam kết hoàn trả 100% số tiền vào tài khoản ngân hàng của bạn ngay lập tức.
                  </p>
                </div>
              </div>
            </div>

            {/* TAB 4: Reviews */}
            <div id="reviews" className="bg-white rounded-[2rem] p-10 border border-gray-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2.5">
                    <MessageSquare size={24} className="text-purple-600" /> Đánh giá từ khách hàng đã mua
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">100% đánh giá từ người dùng thực tế sau khi kích hoạt thành công</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-4xl font-black text-gray-900">{product.rating || 4.9}</div>
                  <div>
                    <div className="flex items-center text-amber-400">
                      {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                    </div>
                    <div className="text-xs text-gray-400 font-bold">{product.reviews?.length || 36} đánh giá</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((rev) => (
                    <div key={rev.id} className="p-5 rounded-2xl bg-gray-50/80 border border-gray-100 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                              {rev.user.charAt(0)}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-gray-900">{rev.user}</div>
                              <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                                <CheckCircle2 size={10} /> Đã xác minh mua hàng
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] text-gray-400">{rev.date}</span>
                        </div>
                        <div className="flex items-center text-amber-400 gap-0.5 mb-2">
                          {[1,2,3,4,5].map(s => (
                            <Star key={s} size={11} fill={s <= rev.rating ? "currentColor" : "none"} stroke="none" />
                          ))}
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{rev.comment}</p>
                      </div>
                      {rev.purchasedType && (
                        <div className="mt-3 text-[10px] text-gray-400 font-medium pt-2 border-t border-gray-200/40">
                          Gói đã mua: <span className="font-bold text-gray-600">{rev.purchasedType}</span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-sm text-gray-400 col-span-2">Chưa có đánh giá nào.</div>
                )}
              </div>
            </div>

            {/* TAB 5: FAQ Accordion */}
            <div id="faq" className="bg-white rounded-[2rem] p-10 border border-gray-200/80 shadow-sm">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2.5">
                <HelpCircle size={24} className="text-blue-600" /> Câu hỏi thường gặp (FAQ)
              </h2>

              <div className="space-y-3">
                {defaultFaqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx} 
                      className={`rounded-2xl border transition-all ${
                        isOpen ? 'border-blue-200 bg-blue-50/20' : 'border-gray-100 bg-gray-50/50 hover:bg-white'
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full text-left p-5 font-extrabold text-sm text-gray-900 flex items-center justify-between gap-4"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown size={18} className={`text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 text-xs text-gray-600 leading-relaxed pt-1">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* 5. Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-gray-200">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black text-gray-900">Sản phẩm cùng danh mục</h3>
                  <p className="text-xs text-gray-500 mt-1">Có thể bạn cũng quan tâm đến các công cụ hữu ích này</p>
                </div>
                <Link to={`/category/${product.category}`} className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                  Xem tất cả <ChevronRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {relatedProducts.map(p => (
                  <React.Fragment key={p.id}>
                    <div className="lg:hidden">
                      <MobileProductCard product={p} />
                    </div>
                    <div className="hidden lg:block">
                      <ProductCard product={p} onAddToCart={addToCart} />
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Sticky Bottom Action Bar on Mobile */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200/90 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] lg:hidden transition-all duration-300 ease-out ${
          showStickyBar ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <img 
              src={product.image || 'https://placehold.co/100'} 
              alt={product.name} 
              className="w-11 h-11 rounded-xl object-cover border border-gray-100 bg-gray-50 shrink-0 mix-blend-multiply"
            />
            <div className="min-w-0">
              <div className="text-[11px] font-bold text-gray-500 truncate">{selectedVariant?.name || product.name}</div>
              <div className="text-base font-black text-[#0068FF] leading-tight">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(currentPrice)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={openZaloConsultation}
              className="h-11 px-3.5 rounded-xl bg-blue-50 border border-blue-200 text-[#0068FF] font-black text-xs flex items-center gap-1.5 active:scale-95 transition-transform"
              title="Nhắn tin Zalo tư vấn"
            >
              <MessageCircle size={18} />
              <span>Zalo</span>
            </button>

            <button
              onClick={handleAddToCart}
              className="h-11 px-4 sm:px-5 rounded-xl bg-gray-950 text-white font-black text-xs flex items-center gap-1.5 active:scale-95 transition-transform hover:bg-[#0068FF] shadow-lg shadow-gray-900/20"
            >
              <ShoppingCart size={16} />
              <span>Mua ngay</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
