import { useState } from 'react';
import { X } from 'lucide-react';
import { type OrderItem } from '../lib/supabase';
import Checkout from './Checkout';

interface CartProps {
  items: OrderItem[];
  total: number;
  isOpen: boolean;
  onClose: () => void;
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onClear: () => void;
}

export default function Cart({
  items,
  total,
  isOpen,
  onClose,
  onRemove,
  onUpdateQuantity,
  onClear,
}: CartProps) {
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isOpen) return null;

  if (showCheckout) {
    return (
      <Checkout
        items={items}
        total={total}
        onClose={onClose}
        onBack={() => setShowCheckout(false)}
        onClear={onClear}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-40 bg-white overflow-y-auto pt-24">
      <div className="max-w-2xl mx-auto px-6 pb-24">
        <button
          onClick={onClose}
          className="fixed top-20 right-6 p-2 hover:bg-gray-100 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="font-serif text-4xl mb-8">Your Cart</h2>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-6">Your cart is empty</p>
            <button
              onClick={onClose}
              className="px-6 py-2 border border-black hover:bg-black hover:text-white transition-colors text-sm tracking-wider"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-6 mb-8">
              {items.map(item => (
                <div key={item.id} className="flex gap-6 pb-6 border-b border-gray-200">
                  <div className="flex-1">
                    <h4 className="font-serif text-lg mb-2">{item.name}</h4>
                    <p className="text-sm text-gray-600 mb-4">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 border border-gray-300 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 border border-gray-300 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-lg mb-6">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-sm text-gray-600 hover:text-black"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6 mb-8">
              <div className="flex justify-between text-lg font-serif mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => setShowCheckout(true)}
                className="w-full py-4 bg-black text-white text-sm tracking-widest hover:bg-gray-900 transition-colors mb-3"
              >
                PROCEED TO CHECKOUT
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 border border-black text-sm tracking-widest hover:bg-black hover:text-white transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
