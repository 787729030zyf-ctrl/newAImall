import React from 'react';
import { Product, Language, Translation } from '../types';
import { TRANSLATIONS } from '../constants';

interface ProductCardProps {
  product: Product;
  lang: Language;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, lang, onClick }) => {
  return (
    <div 
      onClick={() => onClick(product)}
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200 border border-gray-100"
    >
      <div className="relative w-full pb-[100%]">
        <img 
          src={product.image} 
          alt={product.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm text-gray-800 line-clamp-2 min-h-[40px] mb-2 font-medium">
          {product.title}
        </h3>
        <div className="flex items-baseline justify-between">
          <span className="text-primary text-lg font-bold">
            {TRANSLATIONS.price[lang]}{product.price}
          </span>
          <span className="text-xs text-gray-400">
            {product.sales > 10000 ? '1万+' : product.sales} {TRANSLATIONS.sold[lang]}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {product.tags.slice(0, 2).map((tag, idx) => (
            <span key={idx} className="px-1.5 py-0.5 border border-primary text-primary text-[10px] rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;