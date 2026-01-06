import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onContactClick: () => void;
}

export default function Header({ cartCount, onCartClick, onContactClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={onContactClick}
          className="hover:opacity-70 transition-opacity text-sm tracking-widest"
        >
          Contact
        </button>

        <Link
          to="/"
          className="text-center hover:opacity-70 transition-opacity"
        >
          <h1 className="font-serif text-2xl font-semibold tracking-wider">ROYAL RUBY RITUAL</h1>
          <p className="text-xs tracking-widest text-gray-600">SACRED TEA EXPERIENCES</p>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/products"
            className="text-sm tracking-widest hover:opacity-70 transition-opacity"
          >
            Blends
          </Link>
          <Link
            to="/rituals"
            className="text-sm tracking-widest hover:opacity-70 transition-opacity"
          >
            Rituals
          </Link>
          <button
            onClick={onCartClick}
            className="relative hover:opacity-70 transition-opacity"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 -mt-2 -mr-2 w-5 h-5 bg-black text-white text-xs flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
