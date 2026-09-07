
import React, { useState, useEffect, useMemo, useRef } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { PRODUCTS as FALLBACK_PRODUCTS, CATEGORIES } from '../constants';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { MobileProductCard } from '../components/mobile/MobileProductCard';
import { Filter, ChevronDown, SlidersHorizontal, X, ArrowUpDown, Search, Flame, Sparkles, TrendingUp, TrendingDown, Check, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { SEO } from '../components/SEO';
import { slugify } from '../lib/utils';
import { normalizeProductImage } from '../lib/imageFallbacks';

const { useLocation, useNavigate } = ReactRouterDOM;

interface ProductsPageProps {
  addToCart: (product: Product) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ addToCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  
  const initialCategory = searchParams.get('category');
  const initialSort = searchParams.get('sort') || 'default';
  const initialSearch = searchParams.get('q') || '';
  const isFlashSalePage = searchParams.get('flashSale') === 'true';

  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [flashSaleProductIds, setFlashSaleProductIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [sortBy, setSortBy] = useState<string>(isFlashSalePage ? 'price-asc' : initialSort);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  const SORT_OPTIONS = [
    { id: 'default', label: 'Phổ biến nhất', icon: Flame },
    { id: 'newest', label: 'Mới nhất', icon: Sparkles },
    { id: 'price-asc', label: 'Giá: Thấp đến Cao', icon: TrendingUp },
    { id: 'price-desc', label: 'Giá: Cao đến Thấp', icon: TrendingDown },
    { id: 'name-asc', label: 'Tên: A - Z', icon: ArrowUpDown },
  ];

  const currentSortLabel = SORT_OPTIONS.find(s => s.id === sortBy)?.label || 'Phổ biến nhất';

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (priceRange[1] < 5000000) count++;
    if (searchQuery.trim().length > 0) count++;
    return count;
  }, [selectedCategory, priceRange, searchQuery]);

  // Click outside to close sort dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const [productsRes, flashSalesRes] = await Promise.all([
          supabase.from('products').select('*'),
          supabase
            .from('flash_sales')
            .select('product_id, end_time')
            .eq('is_active', true)
        ]);

        if (productsRes.error) throw productsRes.error;
        
        if (productsRes.data && productsRes.data.length > 0) {
            const enhancedData = productsRes.data.map((p: Product) => normalizeProductImage(p));
            setProducts(enhancedData);
        } else {
            setProducts(FALLBACK_PRODUCTS);
        }

        const now = new Date();
        const activeFlashIds = (flashSalesRes.data || [])
          .filter((sale: any) => new Date(sale.end_time) >= now)
          .map((sale: any) => sale.product_id);
        setFlashSaleProductIds(new Set(activeFlashIds));
      } catch (err) {
        console.error(err);
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Update state when URL changes
  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
    if (initialSort) setSortBy(initialSort);
  }, [initialCategory, initialSort]);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    let result = products;

    // 1. Filter by Flash Sale when opening /products?flashSale=true
    if (isFlashSalePage) {
      result = result.filter(p => flashSaleProductIds.has(p.id));
    }

    // 2. Filter by Category FIRST (Strict Scope)
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // 2. Filter by Search (Smart Search with Vietnamese support)
    // "Chính xác" logic: Normalizes strings (removes accents) and splits query into tokens.
    // All tokens must exist in the product name/description/category.
    if (searchQuery && searchQuery.trim().length > 0) {
        const cleanQuery = slugify(searchQuery);
        // Split query into keywords (e.g. "tai-khoan-netflix" -> ["tai", "khoan", "netflix"])
        const queryTokens = cleanQuery.split('-').filter(t => t.length > 0);

        result = result.filter(p => {
            // Combine fields to search within
            const productContent = slugify(`${p.name} ${p.description || ''} ${p.category || ''} ${(p.features || []).join(' ')}`);
            
            // Check if every token in the query appears in the product content
            return queryTokens.every(token => productContent.includes(token));
        });
    }

    // 3. Filter by Price
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // 4. Sort
    const byHotPriority = (a: Product, b: Product) => {
      if (!!a.isHot !== !!b.isHot) return a.isHot ? -1 : 1;
      return 0;
    };

    switch (sortBy) {
      case 'price-asc':
        return [...result].sort((a, b) => byHotPriority(a, b) || a.price - b.price);
      case 'price-desc':
        return [...result].sort((a, b) => byHotPriority(a, b) || b.price - a.price);
      case 'name-asc':
        return [...result].sort((a, b) => byHotPriority(a, b) || a.name.localeCompare(b.name));
      case 'newest':
          return [...result].sort((a, b) => byHotPriority(a, b) || ((b.isNew === a.isNew) ? 0 : b.isNew ? 1 : -1));
      default: // Popularity / Sold
        return [...result].sort((a, b) => byHotPriority(a, b) || b.sold - a.sold);
    }
  }, [selectedCategory, priceRange, sortBy, searchQuery, products, isFlashSalePage, flashSaleProductIds]);

  // Update URL when filters change
  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    const params = new URLSearchParams(location.search);
    if (catId === 'all') params.delete('category');
    else params.set('category', catId);
    navigate({ search: params.toString() });
    setIsMobileFilterOpen(false);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 5000000]);
    setSortBy('default');
    setSearchQuery('');
    navigate('/products');
  };

  const currentCategoryName = CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Cửa hàng';

  const canonicalProductsUrl = selectedCategory === 'all' 
    ? (isFlashSalePage ? 'https://muatoolai.com/products?filter=flash-sale' : 'https://muatoolai.com/products')
    : `https://muatoolai.com/products?category=${selectedCategory}`;

  const productsSchema = [
    {
      "@type": "CollectionPage",
      "@id": `${canonicalProductsUrl}#webpage`,
      "url": canonicalProductsUrl,
      "name": isFlashSalePage ? "Flash Sale Phần Mềm Bản Quyền & AI Tools | MuaToolAI.com" : `Kho Sản Phẩm ${currentCategoryName} | MuaToolAI.com`,
      "description": `Danh sách ${filteredProducts.length} sản phẩm phần mềm và công cụ AI bản quyền giá rẻ uy tín.`
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonicalProductsUrl}#breadcrumb`,
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
          "name": isFlashSalePage ? "Flash Sale" : "Cửa hàng",
          "item": "https://muatoolai.com/products"
        }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-[#F5F5F7] pb-20">
      
      <SEO 
        title={isFlashSalePage ? "Flash Sale - Sản phẩm đang giảm giá sốc" : selectedCategory === 'all' ? "Tất cả sản phẩm - MuaToolAI.com Store" : `Mua ${currentCategoryName} bản quyền giá rẻ`}
        description={isFlashSalePage ? "Danh sách sản phẩm đang Flash Sale tại MuaToolAI.com. Săn deal giá sốc ChatGPT, Midjourney, Canva, YouTube Premium số lượng có hạn." : `Danh sách các sản phẩm ${currentCategoryName} tốt nhất. Bảo hành 1-1 trọn đời, giá rẻ hơn gốc đến 70%.`}
        canonical={canonicalProductsUrl}
        schema={productsSchema}
      />

      {/* Premium Dark Hero Banner */}
      <div className="relative bg-gray-950 pt-24 pb-12 md:pt-32 md:pb-20 mb-6 md:mb-10 overflow-hidden rounded-b-[2rem] md:rounded-b-[2.5rem] shadow-2xl shadow-gray-900/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,104,255,0.22),transparent_38%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.14),transparent_38%)]"></div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="inline-block py-1 px-3 md:py-1.5 md:px-4 rounded-full bg-white/10 border border-white/10 text-blue-200 text-[10px] md:text-xs font-black uppercase tracking-widest mb-4 md:mb-6 backdrop-blur-md">
                Cửa hàng bản quyền
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-3 md:mb-6 tracking-tight leading-tight">
                {isFlashSalePage ? (
                  <>
                    Flash Sale <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Đang Diễn Ra</span>
                  </>
                ) : (
                  <>
                    Khám Phá <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Giải Pháp</span>
                  </>
                )}
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-xl font-medium leading-relaxed">Hàng trăm phần mềm và tài khoản Premium với mức giá tiết kiệm đến 80%.</p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mb-4 sm:mb-6 relative z-30">
        <div className="bg-white/95 backdrop-blur-xl border border-gray-200/90 rounded-2xl p-3 sm:p-3.5 shadow-sm space-y-2.5">
          
          {/* Row 1: Breadcrumbs & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500 font-medium overflow-x-auto no-scrollbar whitespace-nowrap">
              <span className="cursor-pointer hover:text-[#0068FF] transition-colors shrink-0" onClick={() => navigate('/')}>Trang chủ</span>
              <span className="text-gray-300 shrink-0">/</span>
              <span className="font-bold text-gray-900 shrink-0">{isFlashSalePage ? 'Flash Sale' : 'Tất cả sản phẩm'}</span>
              <span className="bg-blue-50 text-[#0068FF] border border-blue-100/80 px-2 py-0.5 rounded-full text-[11px] font-black shrink-0">
                {filteredProducts.length} kết quả
              </span>
            </div>

            {/* Action Buttons: Filter & Custom Sort Dropdown */}
            <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto">
              {/* Mobile Filter Trigger */}
              <button 
                type="button"
                className="lg:hidden flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 h-9 px-3 bg-gray-100/90 hover:bg-gray-200/80 active:scale-95 text-xs font-bold text-gray-800 rounded-xl transition-all border border-gray-200/70 shrink-0"
                onClick={() => setIsMobileFilterOpen(true)}
              >
                <SlidersHorizontal size={14} className="text-gray-600" />
                <span>Bộ lọc</span>
                {activeFiltersCount > 0 && (
                  <span className="w-4.5 h-4.5 rounded-full bg-[#0068FF] text-white text-[10px] font-black flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Custom Sort Dropdown (No native select popup) */}
              <div ref={sortDropdownRef} className="relative flex-1 sm:flex-initial min-w-0">
                <button
                  type="button"
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="w-full sm:w-auto h-9 px-3 bg-gray-50 hover:bg-white border border-gray-200/90 hover:border-gray-300 rounded-xl text-xs font-bold text-gray-800 flex items-center justify-between sm:justify-start gap-2 shadow-xs active:scale-98 transition-all"
                >
                  <div className="flex items-center gap-1.5 min-w-0 truncate">
                    <ArrowUpDown size={13} className="text-gray-500 shrink-0" />
                    <span className="truncate">{currentSortLabel}</span>
                  </div>
                  <ChevronDown size={14} className={`text-gray-400 shrink-0 transition-transform duration-200 ${isSortOpen ? 'rotate-180 text-[#0068FF]' : ''}`} />
                </button>

                {/* Custom Popover Menu */}
                {isSortOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-52 sm:w-56 bg-white/95 backdrop-blur-xl border border-gray-200/90 rounded-2xl shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-2.5 py-1.5 text-[10px] uppercase tracking-wider font-extrabold text-gray-400">
                      Sắp xếp theo
                    </div>
                    <div className="space-y-0.5">
                      {SORT_OPTIONS.map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = sortBy === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              setSortBy(opt.id);
                              setIsSortOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                              isSelected 
                                ? 'bg-blue-50 text-[#0068FF]' 
                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            <span className="flex items-center gap-2 truncate">
                              <Icon size={14} className={isSelected ? 'text-[#0068FF]' : 'text-gray-400'} />
                              <span className="truncate">{opt.label}</span>
                            </span>
                            {isSelected && <Check size={14} className="text-[#0068FF] shrink-0" strokeWidth={2.5} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Row 2: Mobile Category Quick Pills (Horizontal Scroll) */}
          <div className="lg:hidden pt-2 border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            <button
              type="button"
              onClick={() => handleCategoryChange('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#0068FF] text-white shadow-sm'
                  : 'bg-gray-50 text-gray-600 border border-gray-200/70 hover:bg-gray-100'
              }`}
            >
              Tất cả
            </button>
            {CATEGORIES.map((cat) => {
              const isCatActive = selectedCategory === cat.id;
              const CatIcon = cat.icon;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                    isCatActive
                      ? 'bg-[#0068FF] text-white shadow-sm'
                      : 'bg-gray-50 text-gray-600 border border-gray-200/70 hover:bg-gray-100'
                  }`}
                >
                  <CatIcon size={13} className={isCatActive ? 'text-white' : 'text-gray-500'} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-64 flex-shrink-0 space-y-8">
            {/* Search Input in Sidebar for convenience */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
               <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-xs">Tìm kiếm</h3>
               <div className="relative">
                 <Search size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
                 <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Nhập tên..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0068FF]/20 focus:bg-white focus:border-[#0068FF]/50 transition-all"
                 />
               </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-xs">Danh mục</h3>
              <ul className="space-y-1.5">
                <li 
                  onClick={() => handleCategoryChange('all')}
                  className={`flex items-center justify-between cursor-pointer px-4 py-3 rounded-2xl text-sm font-bold transition-all ${selectedCategory === 'all' ? 'bg-[#0068FF] text-white shadow-lg shadow-blue-500/25' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <span>Tất cả</span>
                </li>
                {CATEGORIES.map((cat) => (
                  <li 
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`flex items-center justify-between cursor-pointer px-4 py-3 rounded-2xl text-sm font-bold transition-all ${selectedCategory === cat.id ? 'bg-[#0068FF] text-white shadow-lg shadow-blue-500/25' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-3">
                      <cat.icon size={18} />
                      {cat.name}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Filter */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Khoảng giá</h3>
              <div className="px-2">
                 <input 
                  type="range" 
                  min="0" 
                  max="2000000" 
                  step="50000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0068FF]"
                 />
                 <div className="flex justify-between mt-4 text-xs font-bold text-gray-500">
                    <span>0₫</span>
                    <span className="text-primary">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceRange[1])}</span>
                 </div>
              </div>
            </div>

             {/* Clear Filter */}
            {(selectedCategory !== 'all' || priceRange[1] !== 5000000 || searchQuery) && (
               <button 
                onClick={clearFilters}
                className="w-full py-3.5 rounded-2xl border-2 border-gray-100 text-gray-500 font-bold text-sm hover:bg-gray-50 hover:text-gray-900 hover:border-gray-200 transition-all flex items-center justify-center gap-2"
               >
                 <X size={16} /> Xóa bộ lọc
               </button>
            )}
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
             {loading ? (
                <>
                  {/* Mobile Loading */}
                  <div className="lg:hidden grid grid-cols-2 gap-3 sm:gap-4">
                     {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="w-full aspect-[1/1.4] bg-gray-200 rounded-2xl animate-pulse"></div>)}
                  </div>
                  {/* Desktop Loading */}
                  <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6">
                     {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="h-[350px] bg-gray-200 rounded-3xl animate-pulse"></div>)}
                  </div>
                </>
             ) : filteredProducts.length > 0 ? (
                <>
                  {/* Mobile Grid 2 Columns */}
                  <div className="lg:hidden grid grid-cols-2 gap-3 sm:gap-4">
                    {filteredProducts.map((product) => (
                      <MobileProductCard key={`mob-${product.id}`} product={product} />
                    ))}
                  </div>
                  {/* Desktop Grid */}
                  <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={`desk-${product.id}`} product={product} onAddToCart={addToCart} />
                    ))}
                  </div>
                </>
             ) : (
               <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                     <Search size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
                  <p className="text-gray-500 mb-6">
                    {selectedCategory !== 'all' 
                        ? `Không có kết quả cho "${searchQuery}" trong danh mục "${currentCategoryName}".` 
                        : "Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn."}
                  </p>
                  <button onClick={clearFilters} className="px-6 py-2.5 bg-[#0068FF] hover:bg-blue-700 text-white rounded-full font-bold text-sm shadow-lg shadow-blue-500/20 transition-all">
                    Xóa bộ lọc
                  </button>
               </div>
             )}
          </div>

        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)}></div>
          <div className="absolute inset-y-0 right-0 w-[85%] max-w-xs bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
             <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-black text-lg text-gray-900">Bộ lọc tìm kiếm</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors">
                   <X size={18} />
                </button>
             </div>
             
             <div className="flex-1 overflow-y-auto p-5 space-y-6">
                <div>
                   <h4 className="font-bold text-gray-900 mb-2.5 text-xs uppercase tracking-wider">Từ khóa tìm kiếm</h4>
                   <div className="relative">
                     <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                     <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Tìm tên phần mềm..."
                        className="w-full pl-9 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0068FF]/20 focus:border-[#0068FF]"
                     />
                   </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2.5 text-xs uppercase tracking-wider">Danh mục</h4>
                  <div className="flex flex-wrap gap-1.5">
                     <button 
                        onClick={() => handleCategoryChange('all')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${selectedCategory === 'all' ? 'bg-[#0068FF] text-white border-[#0068FF] shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                      >
                        Tất cả
                      </button>
                     {CATEGORIES.map((cat) => (
                        <button 
                          key={cat.id}
                          onClick={() => handleCategoryChange(cat.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${selectedCategory === cat.id ? 'bg-[#0068FF] text-white border-[#0068FF] shadow-sm' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                        >
                          {cat.name}
                        </button>
                     ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Giá tối đa</h4>
                    <span className="font-black text-xs text-[#0068FF]">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceRange[1])}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="2000000" 
                    step="50000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0068FF]"
                   />
                </div>
             </div>

             <div className="p-4 border-t border-gray-100 bg-gray-50/80">
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 bg-[#0068FF] hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                >
                  Xem {filteredProducts.length} kết quả
                </button>
             </div>
          </div>
        </div>
      )}
    </main>
  );
};
