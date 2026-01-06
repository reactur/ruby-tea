import { useState } from 'react';
import { X } from 'lucide-react';
import type { Product } from '../lib/supabase';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetail({ product, onClose, onAddToCart }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right p-2 hover:bg-gray-100"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <div className="mb-8">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-96 object-cover mb-8"
            />
            <h2 className="font-serif text-4xl mb-2">{product.name}</h2>
            <p className="text-sm text-gray-600 mb-4">{product.category}</p>
            <p className="text-gray-700 leading-relaxed mb-6">
              {product.description}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <div className="flex items-center justify-between mb-8">
              <span className="font-serif text-3xl">${product.price.toFixed(2)}</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 border border-gray-400 hover:bg-black hover:text-white transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 border border-gray-400 hover:bg-black hover:text-white transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-black text-white text-sm tracking-widest hover:bg-gray-900 transition-colors"
            >
              ADD TO CART
            </button>

            <div className="mt-8 text-xs text-gray-600 space-y-2">
              <p>Free shipping on orders over $50</p>
              <p>Free returns within 30 days</p>
              <p>Premium luxury packaging included</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
