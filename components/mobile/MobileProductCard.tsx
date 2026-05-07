
import React from 'react';
import { Product } from '../../types';
import * as ReactRouterDOM from 'react-router-dom';
import { slugify } from '../../lib/utils';

const { Link } = ReactRouterDOM;

interface MobileProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const MobileProductCard: React.FC<MobileProductCardProps> = ({ product }) => {
  const productLink = `/product/${product.slug || slugify(product.name)}`;

  return (
    <div className="group relative flex flex-col w-full bg-white rounded-[1.25rem] p-2 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)] border border-gray-100">
      <Link to={productLink} className="block active:scale-95 transition-transform duration-200">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 mb-2">
          <img 
            src={product.image || 'https://placehold.co/300'} 
            alt={product.name} 
            className="w-full h-full object-cover mix-blend-multiply"
          />
          {product.discount > 0 && (
            <div className="absolute top-1 left-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-sm">
              -{product.discount}%
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-col flex-1 justify-between">
        <Link to={productLink}>
          <h3 className="font-bold text-gray-900 text-[10px] sm:text-xs leading-[1.3] line-clamp-2 h-7 sm:h-8 mb-1.5">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto">
          <div className="flex flex-col mb-2">
             <span className="font-extrabold text-[#0068FF] text-[11px] sm:text-xs leading-none">
               {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(product.price)}
               {product.pricingUnit && <span className="text-[9px] font-bold text-gray-500 ml-1">{product.pricingUnit}</span>}
             </span>
             {product.originalPrice > product.price && (
               <span className="text-[9px] text-gray-400 line-through mt-0.5">
                 {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(product.originalPrice)}
               </span>
             )}
          </div>
          
          <a 
            href="https://zalo.me/g/bguamkuy0hcgjpvf9kyp"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-6 rounded-md bg-gray-950 text-white flex items-center justify-center text-[10px] font-bold active:scale-95 transition-transform hover:bg-[#0068FF]"
          >
            Mua ngay
          </a>
        </div>
      </div>
    </div>
  );
};
