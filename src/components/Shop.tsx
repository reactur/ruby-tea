import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { supabase, type Product } from '../lib/supabase';
import ProductCard from './ProductCard';
import ProductDetail from './ProductDetail';

interface ShopProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function Shop({ isOpen, onClose, onAddToCart }: ShopProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at');

      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [isOpen]);

  const categories = ['all', ...new Set(products.map(p => p.category))];
  const filtered = category === 'all'
    ? products
    : products.filter(p => p.category === category);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto pt-24">
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <button
          onClick={onClose}
          className="fixed top-20 right-6 p-2 hover:bg-gray-100 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-12">
          <h2 className="font-serif text-5xl mb-8 text-amber-900">Our Blends</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 text-sm tracking-wider whitespace-nowrap ${
                  category === cat
                    ? 'border-b-2 border-amber-900 text-amber-900'
                    : 'text-gray-600 hover:text-amber-900'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {filtered.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => onAddToCart(product, 1)}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
}
