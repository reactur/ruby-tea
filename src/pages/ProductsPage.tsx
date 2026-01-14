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
    [0.15, 1, 1, 0.15]
  );

  const scale = useTransform(
    scrollYProgress,
    [start - 0.1, start, end - 0.1, end],
    [0.6, 1, 1, 0.6]
  );

  return (
    <Link to={`/products/${product.id}`}>
      <motion.div
        className="absolute w-32 h-32"
        style={{
          transform: `rotate(-${(index / total) * 360}deg)`,
          transformOrigin: 'center 22rem',
          opacity,
          top: '-4rem',
          left: 'calc(50% - 4rem)',
        }}
      >
        <motion.div
          className="w-full h-full bg-white rounded-full border border-black flex items-center justify-center hover:bg-gray-50 transition-colors"
          style={{ scale }}
        >
          <span className="text-3xl font-serif font-light" style={{ transform: `rotate(${(index / total) * 360}deg)` }}>
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
    [30, 0, 0, -30]
  );

  return (
    <motion.div
      className="absolute right-24 w-full max-w-md pointer-events-none"
      style={{ opacity, y }}
    >
      <Link
        to={`/products/${product.id}`}
        className="block pointer-events-auto"
      >
        <div className="text-right space-y-3">
          <div className="inline-block px-3 py-1 border border-black text-xs tracking-[0.2em] font-light">
            {String(index + 1).padStart(2, '0')}
          </div>
          <h2 className="font-serif text-5xl md:text-6xl font-light leading-tight tracking-tight">
            {product.name}
          </h2>
          <p className="text-gray-600 text-base leading-relaxed max-w-sm ml-auto">
            {product.description}
          </p>
          <div className="pt-2">
            <span className="text-2xl font-serif font-light text-gray-900">
              ${product.price}
            </span>
          </div>
          <div className="pt-3">
            <span className="inline-flex items-center text-xs tracking-[0.2em] border-b border-black pb-1 hover:border-gray-400 transition-colors">
              VIEW
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
        <div className="w-12 h-12 border border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full bg-white" style={{ height: '500vh' }}>
      <div className="sticky top-0 h-screen flex items-center justify-start overflow-hidden">
        <div className="absolute left-16 max-w-sm">
          <p className="text-xs tracking-[0.3em] text-gray-500 mb-4">COLLECTION</p>
          <h1 className="font-serif text-5xl md:text-6xl font-light mb-2 tracking-tight leading-tight">
            Signature<br />Blends
          </h1>
        </div>

        <motion.div
          className="absolute left-[-8%] w-[44rem] h-[44rem] rounded-full border border-gray-200"
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
