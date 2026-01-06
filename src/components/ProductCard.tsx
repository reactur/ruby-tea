import { ShoppingBag } from 'lucide-react';
import type { Product } from '../lib/supabase';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  onClick: () => void;
}

export default function ProductCard({ product, onAddToCart, onClick }: ProductCardProps) {
  return (
    <div className="group">
      <div
        onClick={onClick}
        className="aspect-[3/4] mb-4 bg-gradient-to-br from-gray-100 to-gray-200 cursor-pointer overflow-hidden"
      >
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
        />
      </div>
      <div onClick={onClick} className="cursor-pointer">
        <h4 className="font-serif text-lg mb-2">{product.name}</h4>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-serif text-lg">${product.price.toFixed(2)}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          className="p-2 border border-gray-400 hover:bg-black hover:text-white transition-all duration-300"
        >
          <ShoppingBag className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
