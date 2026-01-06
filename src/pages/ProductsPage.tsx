import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supabase, type Product } from '../lib/supabase';

gsap.registerPlugin(ScrollTrigger);

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');

      if (!error && data) {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length === 0 || !containerRef.current) return;

    const ctx = gsap.context(() => {
      productsRef.current.forEach((product, index) => {
        if (!product) return;

        const isEven = index % 2 === 0;
        const startX = isEven ? -200 : 200;
        const startY = isEven ? 200 : -200;
        const rotation = isEven ? -45 : 45;

        gsap.fromTo(
          product,
          {
            x: startX,
            y: startY,
            rotation: rotation,
            opacity: 0,
            scale: 0.6,
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: product,
              start: 'top bottom-=100',
              end: 'top center',
              scrub: 1,
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.to(product, {
          scrollTrigger: {
            trigger: product,
            start: 'top center',
            end: 'bottom top+=100',
            scrub: 1,
            onEnter: () => {
              gsap.to(product, {
                scale: 1.05,
                duration: 0.3,
              });
            },
            onLeave: () => {
              gsap.to(product, {
                scale: 0.95,
                opacity: 0.7,
                duration: 0.3,
              });
            },
            onEnterBack: () => {
              gsap.to(product, {
                scale: 1.05,
                opacity: 1,
                duration: 0.3,
              });
            },
            onLeaveBack: () => {
              gsap.to(product, {
                scale: 0.95,
                opacity: 0.7,
                duration: 0.3,
              });
            },
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [products]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-serif text-6xl md:text-8xl font-bold text-center mb-4 tracking-tight">
          Signature Blends
        </h1>
        <p className="text-center text-gray-600 text-lg tracking-wider mb-32">
          FIVE SACRED EXPERIENCES
        </p>

        <div className="space-y-[60vh]">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => {
                if (el) productsRef.current[index] = el;
              }}
              className="relative"
            >
              <Link
                to={`/products/${product.id}`}
                className="block group"
              >
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div
                    className={`${
                      index % 2 === 0 ? 'md:order-1' : 'md:order-2'
                    } aspect-square bg-gradient-to-br from-gray-50 to-gray-200 rounded-lg overflow-hidden border-2 border-black relative group-hover:scale-105 transition-transform duration-500`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-48 h-48 mx-auto bg-white rounded-full border-4 border-black flex items-center justify-center mb-6 group-hover:rotate-180 transition-transform duration-700">
                          <span className="text-6xl font-serif font-bold">
                            {product.name.charAt(0)}
                          </span>
                        </div>
                        <div className="absolute bottom-8 left-0 right-0 text-center">
                          <p className="text-sm tracking-widest text-gray-600">
                            ${product.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${
                      index % 2 === 0 ? 'md:order-2' : 'md:order-1'
                    } space-y-6`}
                  >
                    <div className="inline-block px-4 py-1 border border-black text-xs tracking-widest">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h2 className="font-serif text-5xl md:text-6xl font-bold leading-tight tracking-tight">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {product.description}
                    </p>
                    <div className="pt-4">
                      <span className="inline-flex items-center text-sm tracking-widest border-b-2 border-black pb-1 group-hover:border-gray-400 transition-colors">
                        DISCOVER RITUAL
                        <svg
                          className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
