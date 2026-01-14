import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const ingredients = [
  {
    id: 'a',
    name: 'Premium Black Tea Leaves',
    image: 'https://images.pexels.com/photos/230477/pexels-photo-230477.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'b',
    name: 'Aromatic Herbs',
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'c',
    name: 'Sacred Spices',
    image: 'https://images.pexels.com/photos/531446/pexels-photo-531446.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'd',
    name: 'Natural Essence',
    image: 'https://images.pexels.com/photos/4198943/pexels-photo-4198943.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

interface IngredientProps {
  ingredient: { id: string; name: string; image: string };
  index: number;
  scrollYProgress: MotionValue<number>;
}

const Ingredient: React.FC<IngredientProps> = ({ ingredient, index, scrollYProgress }) => {
  const startPositions = [
    { x: -400, y: -100 },
    { x: 400, y: -150 },
    { x: -450, y: -200 },
    { x: 450, y: -50 },
  ];

  const start = index * 0.15;
  const end = 0.6 + index * 0.05;

  const x = useTransform(
    scrollYProgress,
    [start, end],
    [startPositions[index].x, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [start, end],
    [startPositions[index].y, 200]
  );

  const scale = useTransform(
    scrollYProgress,
    [start, end],
    [1, 0.2]
  );

  const opacity = useTransform(
    scrollYProgress,
    [start, end - 0.1, end],
    [1, 1, 0]
  );

  const rotate = useTransform(
    scrollYProgress,
    [start, end],
    [0, 360]
  );

  return (
    <motion.div
      className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 z-20"
      style={{ x, y, scale, opacity, rotate }}
    >
      <img
        src={ingredient.image}
        alt={ingredient.name}
        className="w-full aspect-square object-cover rounded-lg border border-black shadow-xl"
      />
      <div className="absolute -bottom-12 left-0 right-0 text-center">
        <span className="inline-block px-3 py-1 bg-white border border-black text-xs tracking-[0.2em] font-light">
          {ingredient.name}
        </span>
      </div>
    </motion.div>
  );
};

export default function RitualsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const bowlOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const bowlScale = useTransform(scrollYProgress, [0.4, 0.6], [0.8, 1]);

  return (
    <div ref={containerRef} className="relative bg-white" style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute top-32 left-0 right-0 text-center z-10">
          <p className="text-xs tracking-[0.3em] text-gray-500 mb-4">THE RITUAL</p>
          <h1 className="font-serif text-5xl md:text-6xl font-light mb-2 tracking-tight">
            Four Elements
          </h1>
          <p className="text-sm text-gray-600 tracking-[0.2em]">
            ONE PERFECT BLEND
          </p>
        </div>

        {ingredients.map((ingredient, index) => (
          <Ingredient
            key={ingredient.id}
            ingredient={ingredient}
            index={index}
            scrollYProgress={scrollYProgress}
          />
        ))}

        <motion.div
          className="absolute bottom-32 left-1/2 -translate-x-1/2 w-full max-w-xl"
          style={{ opacity: bowlOpacity, scale: bowlScale }}
        >
          <svg
            viewBox="0 0 400 300"
            className="w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="200"
              cy="150"
              rx="180"
              ry="120"
              fill="white"
              stroke="black"
              strokeWidth="2"
            />
            <ellipse
              cx="200"
              cy="140"
              rx="160"
              ry="100"
              fill="#fafafa"
              stroke="black"
              strokeWidth="1"
            />
            <path
              d="M 40 150 Q 200 250, 360 150"
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
            <ellipse
              cx="200"
              cy="150"
              rx="140"
              ry="80"
              fill="#f5f5f5"
              opacity="0.6"
            />
          </svg>
          <div className="absolute -bottom-16 left-0 right-0 text-center">
            <h3 className="font-serif text-3xl font-light mb-2">
              Perfectly Blended
            </h3>
            <p className="text-xs text-gray-500 tracking-[0.2em]">
              TRADITION MEETS PERFECTION
            </p>
          </div>
        </motion.div>
      </div>

      <div className="h-screen"></div>
    </div>
  );
}
