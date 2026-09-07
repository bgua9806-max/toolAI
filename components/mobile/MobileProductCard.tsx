
import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import * as ReactRouterDOM from 'react-router-dom';
import { slugify } from '../../lib/utils';
import { getProductImageFallback } from '../../lib/imageFallbacks';

const { Link } = ReactRouterDOM;

interface MobileProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const MobileProductCard: React.FC<MobileProductCardProps> = ({ product }) => {
  const productLink = `/product/${product.slug || slugify(product.name)}`;
  const [imgSrc, setImgSrc] = useState(product.image);

  useEffect(() => {
    setImgSrc(product.image || getProductImageFallback(product));
  }, [product]);

  const handleImageError = () => {
    const fallback = getProductImageFallback(product);
    setImgSrc((current) => current === fallback ? '' : fallback);
  };

  return (
    <div className="group relative flex flex-col w-full bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)] hover:shadow-md border border-gray-100/90 transition-all">
      <Link to={productLink} className="block active:scale-95 transition-transform duration-200">
        <div className="relative aspect-square w-full overflow-hidden bg-[#F5F5F7]">
          <img
            src={imgSrc}
            alt={product.name}
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.discount > 0 && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-lg shadow-sm">
              -{product.discount}%
            </div>
          )}
          {product.isHot && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-sm">
              HOT
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-col flex-1 justify-between p-3 sm:p-3.5 pt-2.5">
        <Link to={productLink} className="block mb-2">
          <h3 className="font-bold text-gray-900 text-xs sm:text-[13px] leading-snug line-clamp-2 min-h-[34px] sm:min-h-[36px] group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto pt-2 border-t border-gray-100 flex items-center justify-between gap-1.5">
          <div className="min-w-0 flex-1">
            <span className="font-black text-[#0068FF] text-sm sm:text-base leading-none block truncate">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(product.price)}
            </span>
            {product.pricingUnit && (
              <span className="text-[10px] font-bold text-gray-400 block mt-0.5 truncate">{product.pricingUnit}</span>
            )}
          </div>

          <Link
            to={productLink}
            className="h-8 px-3 rounded-xl bg-gray-950 text-white flex items-center justify-center text-[11px] font-black active:scale-95 transition-all hover:bg-[#0068FF] shadow-sm shrink-0"
          >
            Mua ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

