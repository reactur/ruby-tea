import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supabase, type Product } from '../lib/supabase';
import { useCart } from '../hooks/useCart';

gsap.registerPlugin(ScrollTrigger);

const productVideos = [
  'https://cdn.coverr.co/videos/coverr-pouring-hot-tea-into-a-cup-5009/1080p.mp4',
  'https://cdn.coverr.co/videos/coverr-tea-leaves-in-water-4993/1080p.mp4',
  'https://cdn.coverr.co/videos/coverr-close-up-of-tea-leaves-4992/1080p.mp4',
  'https://cdn.coverr.co/videos/coverr-tea-being-poured-into-a-white-cup-4991/1080p.mp4',
  'https://cdn.coverr.co/videos/coverr-making-tea-4990/1080p.mp4',
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const videoRefs = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (!error && data) {
        setProduct(data);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    if (!product || videoRefs.current.length === 0) return;

    const ctx = gsap.context(() => {
      videoRefs.current.forEach((videoSection, index) => {
        if (!videoSection) return;

        gsap.fromTo(
          videoSection,
          {
            opacity: 0,
            y: 100,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: videoSection,
              start: 'top bottom-=100',
              end: 'top center',
              scrub: 1,
            },
          }
        );

        const video = videoSection.querySelector('video');
        if (video) {
          ScrollTrigger.create({
            trigger: videoSection,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => video.play(),
            onLeave: () => video.pause(),
            onEnterBack: () => video.play(),
            onLeaveBack: () => video.pause(),
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      navigate('/');
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm tracking-widest text-gray-600">LOADING RITUAL...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/products')}
            className="flex items-center text-sm tracking-widest hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            BACK TO BLENDS
          </button>
          <div className="text-xs tracking-widest text-gray-600">${product.price}</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="font-serif text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            {product.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mb-16">
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center border-2 border-black">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-6 py-3 hover:bg-black hover:text-white transition-colors text-xl"
              >
                −
              </button>
              <span className="px-8 py-3 font-semibold text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-6 py-3 hover:bg-black hover:text-white transition-colors text-xl"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="px-12 py-4 bg-black text-white hover:bg-gray-800 transition-all text-sm tracking-widest"
            >
              ADD TO CART — ${(product.price * quantity).toFixed(2)}
            </button>
          </div>
        </div>

        <div className="space-y-32 mt-32">
          {productVideos.map((videoUrl, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) videoRefs.current[index] = el;
              }}
              className="relative"
            >
              <div className="mb-8">
                <span className="inline-block px-4 py-2 border border-black text-xs tracking-widest">
                  EXPERIENCE {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="aspect-video bg-black rounded-lg overflow-hidden border-4 border-black">
                <video
                  src={videoUrl}
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-8 max-w-2xl">
                <h3 className="font-serif text-3xl font-bold mb-4">
                  {['The Origin', 'The Harvest', 'The Preparation', 'The Ceremony', 'The Experience'][index]}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Discover the sacred journey of {product.name}, from the ancient tea gardens to your ritual moment. Each step is a meditation, each sip a revelation.
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center border-t-2 border-black pt-16">
          <h3 className="font-serif text-4xl font-bold mb-6">Begin Your Ritual</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Premium packaging included. Free shipping on orders over $50.
          </p>
          <button
            onClick={handleAddToCart}
            className="px-16 py-5 bg-black text-white hover:bg-gray-800 transition-all text-sm tracking-widest"
          >
            ADD TO CART — ${(product.price * quantity).toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}
