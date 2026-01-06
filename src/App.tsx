import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Collections from './components/Collections';
import Heritage from './components/Heritage';
import Footer from './components/Footer';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Contact from './components/Contact';
import { useCart } from './hooks/useCart';
import type { Product } from './lib/supabase';

function App() {
  const [shopOpen, setShopOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { items, addItem, removeItem, updateQuantity, clear, total } = useCart();

  const handleAddToCart = (product: Product, quantity: number) => {
    addItem(product, quantity);
    if (!cartOpen) {
      setCartOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        cartCount={items.length}
        onShopClick={() => setShopOpen(true)}
        onCartClick={() => setCartOpen(true)}
        onContactClick={() => setContactOpen(true)}
      />
      {!shopOpen && !cartOpen && !contactOpen && (
        <main>
          <Hero onShopClick={() => setShopOpen(true)} />
          <Collections />
          <Heritage />
        </main>
      )}
      {!shopOpen && !cartOpen && !contactOpen && <Footer />}

      <Shop
        isOpen={shopOpen}
        onClose={() => setShopOpen(false)}
        onAddToCart={handleAddToCart}
      />
      <Cart
        items={items}
        total={total}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onRemove={removeItem}
        onUpdateQuantity={updateQuantity}
        onClear={clear}
      />
      <Contact
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}

export default App;
