import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Contact from './components/Contact';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import RitualsPage from './pages/RitualsPage';
import { useCart } from './hooks/useCart';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { items, removeItem, updateQuantity, clear, total } = useCart();
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    ScrollTrigger.refresh();
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      <Header
        cartCount={items.length}
        onCartClick={() => setCartOpen(true)}
        onContactClick={() => setContactOpen(true)}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/rituals" element={<RitualsPage />} />
      </Routes>

      <Footer />

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
