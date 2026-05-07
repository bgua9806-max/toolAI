
import React, { useState, useEffect, useMemo } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { PRODUCTS as FALLBACK_PRODUCTS, CATEGORIES } from '../constants';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { MobileProductCard } from '../components/mobile/MobileProductCard';
import { Filter, ChevronDown, SlidersHorizontal, X, ArrowUpDown, Search } from 'lucide-react';
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
            const productContent = slugify(`${p.name} ${p.description} ${p.category}`);
            
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

  return (
    <main className="min-h-screen bg-[#F5F5F7] pb-20">
      
      <SEO 
        title={isFlashSalePage ? "Flash Sale - Sản phẩm đang giảm giá" : selectedCategory === 'all' ? "Tất cả sản phẩm - MuaToolAI.com Store" : `Mua ${currentCategoryName} bản quyền giá rẻ`}
        description={isFlashSalePage ? "Danh sách sản phẩm đang Flash Sale tại MuaToolAI.com. Săn deal giá sốc, số lượng có hạn." : `Danh sách các sản phẩm ${currentCategoryName} tốt nhất. Bảo hành trọn đời, giá rẻ hơn gốc đến 70%.`}
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 md:mb-8 relative z-20">
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-3 md:p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
            
            <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-500 font-medium overflow-x-auto no-scrollbar whitespace-nowrap">
               <span className="cursor-pointer hover:text-blue-600 transition-colors shrink-0" onClick={() => navigate('/')}>Trang chủ</span>
               <span className="text-gray-300 shrink-0">/</span>
               <span className="font-bold text-gray-900 shrink-0">{isFlashSalePage ? 'Flash Sale' : 'Tất cả sản phẩm'}</span>
               <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-[11px] md:text-xs font-black shrink-0">{filteredProducts.length} kết quả</span>
            </div>

            <div className="grid grid-cols-[auto_1fr] md:flex md:items-center gap-2 md:gap-3 min-w-0">
              {/* Mobile Filter Trigger */}
              <button 
                className="md:hidden inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-100 rounded-xl text-xs font-bold text-gray-700 whitespace-nowrap shrink-0 leading-none"
                onClick={() => setIsMobileFilterOpen(true)}
              >
                <Filter size={15} /> Bộ lọc
              </button>

              {/* Sort Dropdown */}
              <div className="relative group min-w-0">
                 <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 rounded-xl transition-all cursor-pointer min-w-0">
                    <ArrowUpDown size={14} className="text-gray-500 shrink-0" />
                    <select 
                      value={sortBy} 
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-transparent text-xs md:text-sm font-bold text-gray-700 outline-none cursor-pointer appearance-none pr-3 md:pr-4 w-full min-w-0 whitespace-nowrap"
                    >
                      <option value="default">Phổ biến nhất</option>
                      <option value="newest">Mới nhất</option>
                      <option value="price-asc">Giá: Thấp đến Cao</option>
                      <option value="price-desc">Giá: Cao đến Thấp</option>
                      <option value="name-asc">Tên: A-Z</option>
                    </select>
                 </div>
              </div>
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
                  <div className="lg:hidden grid grid-cols-3 gap-2 sm:gap-3">
                     {[1,2,3,4,5,6,7,8,9].map(i => <div key={i} className="w-full aspect-[1/1.5] bg-gray-200 rounded-[1.25rem] animate-pulse"></div>)}
                  </div>
                  {/* Desktop Loading */}
                  <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6">
                     {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="h-[350px] bg-gray-200 rounded-3xl animate-pulse"></div>)}
                  </div>
                </>
             ) : filteredProducts.length > 0 ? (
                <>
                  {/* Mobile Grid 3 Columns */}
                  <div className="lg:hidden grid grid-cols-3 gap-2 sm:gap-3">
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
                  <button onClick={clearFilters} className="px-6 py-2 bg-primary text-white rounded-full font-bold text-sm shadow-lg shadow-red-500/20">
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
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)}></div>
          <div className="absolute inset-y-0 right-0 w-[85%] max-w-xs bg-white shadow-2xl flex flex-col">
             <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-xl">Bộ lọc tìm kiếm</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 bg-gray-50 rounded-full text-gray-500">
                   <X size={20} />
                </button>
             </div>
             
             <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <div>
                   <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Từ khóa</h4>
                   <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tìm kiếm..."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                   />
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Danh mục</h4>
                  <div className="flex flex-wrap gap-2">
                     <button 
                        onClick={() => handleCategoryChange('all')}
                        className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${selectedCategory === 'all' ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200 text-gray-600'}`}
                      >
                        Tất cả
                      </button>
                     {CATEGORIES.map((cat) => (
                        <button 
                          key={cat.id}
                          onClick={() => handleCategoryChange(cat.id)}
                          className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${selectedCategory === cat.id ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200 text-gray-600'}`}
                        >
                          {cat.name}
                        </button>
                     ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Giá tối đa</h4>
                  <input 
                    type="range" 
                    min="0" 
                    max="2000000" 
                    step="50000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                   />
                   <div className="mt-2 font-bold text-primary text-right">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceRange[1])}
                   </div>
                </div>
             </div>

             <div className="p-6 border-t border-gray-100 bg-gray-50">
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-red-500/20"
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
