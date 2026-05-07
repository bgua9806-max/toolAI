
import React, { useState, useEffect } from 'react';
import { Zap, ArrowRight, Clock } from 'lucide-react';
import { Product } from '../types';
import * as ReactRouterDOM from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { PRODUCTS as FALLBACK_PRODUCTS } from '../constants';
import { slugify } from '../lib/utils';

const { Link } = ReactRouterDOM;

interface FlashSaleProps {
  addToCart: (product: Product) => void;
}

interface FlashSaleItem {
  id: string;
  product_id: string;
  discount_percent: number;
  quantity_total: number;
  quantity_sold: number;
  end_time: string;
  product?: Product;
}

export const FlashSale: React.FC<FlashSaleProps> = ({ addToCart }) => {
  const [items, setItems] = useState<FlashSaleItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const fetchFlashSales = async () => {
      try {
        // 1. Lấy danh sách Flash Sale đang active
        const { data: salesData, error } = await supabase
          .from('flash_sales')
          .select('*')
          .eq('is_active', true)
          .order('end_time', { ascending: true });

        if (salesData && !error && salesData.length > 0) {
             const now = new Date();
             
             // 2. Lấy thông tin chi tiết Product từ DB
             const productIds = salesData.map(s => s.product_id);
             
             const { data: dbProducts } = await supabase
                .from('products')
                .select('*')
                .in('id', productIds);

             // 3. Merge dữ liệu thông minh (DB + Fallback)
             const mergedItems = salesData.map(sale => {
                  // Tự động ẩn slot đã quá thời gian sale.
                  // Chỉ các sản phẩm active và còn hạn mới được hiển thị ngoài storefront.
                  if (new Date(sale.end_time).getTime() <= now.getTime()) return null;

                 // Tìm sản phẩm trong DB
                 let dbProduct = dbProducts?.find(p => p.id === sale.product_id);
                 
                 // Tìm sản phẩm trong Fallback (dữ liệu mẫu)
                 const fallbackProduct = FALLBACK_PRODUCTS.find(p => p.id === sale.product_id);

                 let finalProduct: Product | undefined = undefined;

                 if (dbProduct) {
                    // Nếu có trong DB, dùng DB. Nhưng nếu DB thiếu ảnh, mượn ảnh từ Fallback
                    finalProduct = { ...dbProduct };
                    if (!finalProduct.image && fallbackProduct?.image) {
                        finalProduct.image = fallbackProduct.image;
                    }
                 } else if (fallbackProduct) {
                    // Nếu không có trong DB, dùng Fallback hoàn toàn
                    finalProduct = fallbackProduct;
                 }

                  if (!finalProduct) {
                     console.warn(`Flash Sale product not found: ${sale.product_id}`);
                     finalProduct = {
                        id: sale.product_id,
                        name: 'Sản phẩm Flash Sale',
                        description: 'Sản phẩm đang được cấu hình trong Flash Sale.',
                        price: 0,
                        originalPrice: 0,
                        discount: sale.discount_percent,
                        image: 'https://via.placeholder.com/300?text=Flash+Sale',
                        category: 'flash-sale',
                        rating: 5,
                        sold: sale.quantity_sold || 0,
                        isActive: true
                     } as Product;
                  }

                 // Đảm bảo luôn có ảnh placeholder nếu cả 2 đều thiếu
                 if (!finalProduct.image) {
                     finalProduct.image = 'https://via.placeholder.com/300?text=No+Image';
                 }

                 return {
                     ...sale,
                     product: finalProduct
                 };
             }).filter((item): item is FlashSaleItem => item !== null); // Lọc bỏ null
             
             setItems(mergedItems); // Hiển thị đầy đủ sản phẩm Flash Sale active và còn hạn
        } else {
             setItems([]);
        }
      } catch (err) {
        console.error("Flash Sale Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashSales();
  }, []);

  // Timer Logic
  useEffect(() => {
    if (items.length === 0) return;
    
    // Tìm thời gian kết thúc sớm nhất để đếm ngược
    const targetDate = new Date(items[0].end_time).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [items]);

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  // Nếu không có dữ liệu thì ẩn section
  if (!loading && items.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 lg:mb-20 animate-fade-in-up">
      <div className="bg-gradient-to-br from-orange-50 via-white to-red-50 rounded-[1.5rem] lg:rounded-[2.5rem] p-3 lg:p-8 shadow-soft border border-orange-100/70 overflow-hidden relative">
        {/* Header with Timer */}
        <div className="flex items-start justify-between gap-3 mb-4 lg:mb-10 relative z-10">
            <div className="min-w-0 flex-1">
               <div className="flex items-center gap-1.5">
                  <h2 className="text-xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 uppercase italic tracking-tighter leading-none">
                     Flash Sale
                  </h2>
                  <Zap className="text-yellow-400 fill-yellow-400 animate-bounce-slow shrink-0" size={20} />
               </div>
               <p className="text-[10px] lg:text-sm text-gray-500 font-semibold mt-1 truncate">Săn deal giá sốc - Số lượng có hạn</p>
            </div>
           
           {!loading && items.length > 0 && (
              <div className="flex items-start gap-1 sm:gap-3 select-none shrink-0 pt-0.5">
                  {/* Hours */}
                  <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                      <div className="w-8 h-8 sm:w-14 sm:h-14 bg-[#1D1D1F] text-white rounded-lg sm:rounded-2xl flex items-center justify-center font-black text-xs sm:text-2xl shadow-md sm:shadow-lg shadow-gray-200 border border-gray-100 backdrop-blur-md">
                          {formatTime(timeLeft.hours)}
                      </div>
                      <span className="text-[6px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Giờ</span>
                  </div>
                  
                  <span className="text-gray-300 font-black text-sm sm:text-2xl mt-1.5 sm:mt-2">:</span>

                  {/* Minutes */}
                  <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                      <div className="w-8 h-8 sm:w-14 sm:h-14 bg-[#1D1D1F] text-white rounded-lg sm:rounded-2xl flex items-center justify-center font-black text-xs sm:text-2xl shadow-md sm:shadow-lg shadow-gray-200 border border-gray-100 backdrop-blur-md">
                          {formatTime(timeLeft.minutes)}
                      </div>
                      <span className="text-[6px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Phút</span>
                  </div>

                  <span className="text-gray-300 font-black text-sm sm:text-2xl mt-1.5 sm:mt-2">:</span>

                  {/* Seconds - Highlighted */}
                  <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                      <div className="w-8 h-8 sm:w-14 sm:h-14 bg-gradient-to-br from-red-500 to-orange-600 text-white rounded-lg sm:rounded-2xl flex items-center justify-center font-black text-xs sm:text-2xl shadow-md sm:shadow-lg shadow-red-500/30 border border-white/20 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
                          <span className="relative z-10">{formatTime(timeLeft.seconds)}</span>
                      </div>
                      <span className="text-[6px] sm:text-[10px] font-black text-red-500 uppercase tracking-widest">Giây</span>
                  </div>
              </div>
           )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-3 lg:[grid-template-columns:repeat(auto-fit,minmax(190px,1fr))] gap-2 sm:gap-3 lg:gap-6 relative z-10">
           {loading ? (
               [1,2,3,4,5,6].map(i => <div key={i} className={`w-full aspect-[1/1.5] lg:h-[340px] lg:aspect-auto bg-white/70 rounded-[1.25rem] lg:rounded-3xl animate-pulse ${i > 3 ? 'hidden lg:block' : ''}`}></div>)
           ) : items.map((item, index) => {
              if (!item.product) return null;
              
              const originalPrice = item.product.price;
              // Tính giá sau khi giảm theo % set trong bảng flash_sales
              const salePrice = Math.floor(originalPrice * (1 - item.discount_percent / 100));
              
              // Tính phần trăm đã bán (để hiển thị thanh progress)
              let soldPercentage = 0;
              if (item.quantity_total > 0) {
                 soldPercentage = Math.round((item.quantity_sold / item.quantity_total) * 100);
              }
              if (soldPercentage > 100) soldPercentage = 100;

              return (
                  <div key={item.id} className={`group relative flex flex-col w-full bg-white rounded-[1.25rem] lg:rounded-3xl p-2 lg:p-4 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)] lg:shadow-none hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 lg:border-white/70 hover:border-orange-100 h-full ${index >= 3 ? 'hidden lg:flex' : ''}`}>
                     <Link to={`/product/${item.product.slug || slugify(item.product.name)}`} className="block active:scale-95 transition-transform duration-200">
                        <div className="relative aspect-square rounded-xl lg:rounded-2xl overflow-hidden bg-gray-50 lg:bg-white mb-2 lg:mb-4 shadow-inner">
                           <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 mix-blend-multiply" />
                           <div className="absolute top-1 left-1 lg:top-1.5 lg:left-1.5 bg-gradient-to-r from-red-500 to-orange-500 lg:bg-red-600 lg:bg-none text-white text-[9px] lg:text-xs font-black px-1.5 py-0.5 lg:px-2.5 lg:py-1.5 rounded-md lg:rounded-lg shadow-sm lg:shadow-md lg:shadow-red-600/30 flex items-center gap-1 z-10">
                              <Zap size={9} fill="currentColor" /> -{item.discount_percent}%
                           </div>
                           {soldPercentage >= 90 && (
                               <div className="hidden lg:block absolute bottom-0 left-0 right-0 bg-red-600/90 text-white text-[10px] font-bold text-center py-1 backdrop-blur-sm">
                                   Sắp hết
                               </div>
                           )}
                        </div>
                     </Link>
                     
                     <div className="flex flex-col flex-1 justify-between">
                        <Link to={`/product/${item.product.slug || slugify(item.product.name)}`}>
                            <h3 className="font-bold lg:font-black text-gray-900 text-[10px] sm:text-xs lg:text-[15px] leading-[1.3] lg:leading-snug line-clamp-2 h-7 sm:h-8 lg:h-[42px] mb-1.5 lg:mb-2 group-hover:text-primary transition-colors" title={item.product.name}>
                                {item.product.name}
                            </h3>
                        </Link>
                        
                        <div className="mt-auto">
                           <div className="flex flex-col lg:flex-row lg:items-end gap-0.5 lg:gap-2 mb-2 lg:mb-3">
                              <span className="font-extrabold lg:font-black text-[#0068FF] lg:text-red-600 text-[11px] sm:text-xs lg:text-xl leading-none">
                                 {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(salePrice)}
                              </span>
                              <span className="text-[9px] lg:text-xs text-gray-400 line-through font-semibold mt-0.5 lg:mt-0 lg:mb-1 leading-none">
                                 {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(originalPrice)}
                              </span>
                           </div>

                           {/* Scarcity Bar - Desktop Only */}
                           <div className="hidden lg:block relative h-5 bg-red-100/70 rounded-full overflow-hidden mb-4 border border-red-100">
                              <div 
                                 className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(239,68,68,0.5)]" 
                                 style={{ width: `${soldPercentage}%` }}
                              ></div>
                              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-red-700 uppercase drop-shadow-sm z-10 mix-blend-multiply">
                                 <span className="bg-white/40 px-2 rounded-full backdrop-blur-[1px]">
                                    {soldPercentage >= 90 ? 'Đã bán' : `Đã bán ${item.quantity_sold}`}
                                 </span>
                              </div>
                           </div>

                           <button 
                              onClick={() => addToCart({ ...item.product!, price: salePrice, originalPrice: originalPrice })}
                              className="w-full h-6 lg:h-auto lg:py-3 rounded-md lg:rounded-xl bg-gray-950 text-white flex items-center justify-center text-[10px] lg:text-sm font-bold lg:font-black active:scale-95 transition-all hover:bg-[#0068FF] lg:hover:bg-primary shadow-none lg:shadow-lg lg:shadow-gray-200 group-hover:shadow-red-500/30"
                           >
                              Mua ngay
                           </button>
                        </div>
                     </div>
                  </div>
              );
           })}
        </div>
        
        <Link to="/products?flashSale=true" className="sm:hidden flex justify-center w-full mt-4 py-2.5 text-xs font-black text-gray-700 bg-white/70 rounded-xl border border-white/70 shadow-sm">
            Xem tất cả Flash Sale
        </Link>

        {/* Background Decorations */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </section>
  );
};
