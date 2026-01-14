import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { supabase, type Product } from '../lib/supabase';

interface CircleProductProps {
  index: number;
  total: number;
  product: Product;
  scrollYProgress: MotionValue<number>;
}

interface TextBlockProps {
  index: number;
  total: number;
  product: Product;
  scrollYProgress: MotionValue<number>;
}

const CircleProduct: React.FC<CircleProductProps> = ({
  index,
  total,
  product,
  scrollYProgress,
}) => {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(
    scrollYProgress,
    [start - 0.1, start, end - 0.1, end],
    [0.2, 1, 1, 0.2]
  );

  const scale = useTransform(
    scrollYProgress,
    [start - 0.1, start, end - 0.1, end],
    [0.7, 1, 1, 0.7]
  );

  return (
    <Link to={`/products/${product.id}`}>
      <motion.div
        className="absolute w-48 h-48"
        style={{
          transform: `rotate(-${(index / total) * 360}deg)`,
          transformOrigin: 'center 28rem',
          opacity,
          top: '-6rem',
          left: 'calc(50% - 6rem)',
        }}
      >
        <motion.div
          className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-200 rounded-full border-4 border-black flex items-center justify-center group hover:scale-110 transition-transform"
          style={{ scale }}
        >
          <span className="text-5xl font-serif font-bold" style={{ transform: `rotate(${(index / total) * 360}deg)` }}>
            {product.name.charAt(0)}
          </span>
        </motion.div>
      </motion.div>
    </Link>
  );
};

const TextBlock: React.FC<TextBlockProps> = ({
  index,
  total,
  product,
  scrollYProgress,
}) => {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(
    scrollYProgress,
    [start - 0.1, start, end - 0.1, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [start - 0.1, start, end - 0.1, end],
    [50, 0, 0, -50]
  );

  return (
    <motion.div
      className="absolute right-0 w-full max-w-xl pr-12 pointer-events-none"
      style={{ opacity, y }}
    >
      <Link
        to={`/products/${product.id}`}
        className="block pointer-events-auto"
      >
        <div className="text-right space-y-4">
          <div className="inline-block px-4 py-1 border-2 border-black text-xs tracking-widest font-semibold">
            {String(index + 1).padStart(2, '0')}
          </div>
          <h2 className="font-serif text-6xl md:text-7xl font-bold leading-tight tracking-tight">
            {product.name}
          </h2>
          <p className="text-gray-700 text-xl leading-relaxed">
            {product.description}
          </p>
          <div className="pt-4">
            <span className="inline-flex items-center text-3xl font-serif font-bold text-gray-900">
              ${product.price}
            </span>
          </div>
          <div className="pt-2">
            <span className="inline-flex items-center text-sm tracking-widest border-b-2 border-black pb-1 hover:border-gray-400 transition-colors">
              DISCOVER RITUAL
              <svg
                className="w-4 h-4 ml-2"
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
      </Link>
    </motion.div>
  );
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name')
        .limit(5);

      if (!error && data) {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm tracking-widest text-gray-600">LOADING BLENDS...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '500vh' }}>
      <div className="sticky top-0 h-screen flex items-center justify-start overflow-hidden">
        <div className="absolute left-12 max-w-md z-10">
          <h1 className="font-serif text-6xl md:text-7xl font-bold mb-4 tracking-tight">
            Signature Blends
          </h1>
          <p className="text-gray-600 text-lg tracking-wider">
            FIVE SACRED EXPERIENCES
          </p>
        </div>

        <motion.div
          className="absolute left-[-10%] w-[56rem] h-[56rem] rounded-full border border-gray-300"
          style={{ rotate: rotation }}
        >
          {products.map((product, index) => (
            <CircleProduct
              key={product.id}
              index={index}
              total={products.length}
              product={product}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>

        {products.map((product, index) => (
          <TextBlock
            key={product.id}
            index={index}
            total={products.length}
            product={product}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      <div className="h-screen"></div>
    </div>
  );
}
