import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ingredients = [
  {
    id: 'a',
    name: 'Premium Black Tea Leaves',
    image: 'https://images.pexels.com/photos/230477/pexels-photo-230477.jpeg?auto=compress&cs=tinysrgb&w=800',
    delay: 0,
  },
  {
    id: 'b',
    name: 'Aromatic Herbs',
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=800',
    delay: 0.3,
  },
  {
    id: 'c',
    name: 'Sacred Spices',
    image: 'https://images.pexels.com/photos/531446/pexels-photo-531446.jpeg?auto=compress&cs=tinysrgb&w=800',
    delay: 0.6,
  },
  {
    id: 'd',
    name: 'Natural Essence',
    image: 'https://images.pexels.com/photos/4198943/pexels-photo-4198943.jpeg?auto=compress&cs=tinysrgb&w=800',
    delay: 0.9,
  },
];

export default function RitualsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bowlRef = useRef<HTMLDivElement>(null);
  const ingredientRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current || !bowlRef.current) return;

    const ctx = gsap.context(() => {
      const bowl = bowlRef.current;
      const bowlRect = bowl?.getBoundingClientRect();

      ingredientRefs.current.forEach((ingredient, index) => {
        if (!ingredient || !bowlRect) return;

        const startPositions = [
          { x: -300, y: -200, rotation: -45 },
          { x: 300, y: -250, rotation: 45 },
          { x: -350, y: -300, rotation: -60 },
          { x: 350, y: -150, rotation: 30 },
        ];

        const pos = startPositions[index];

        ScrollTrigger.create({
          trigger: ingredient,
          start: 'top bottom',
          end: 'bottom top',
          pin: true,
          pinSpacing: false,
        });

        gsap.fromTo(
          ingredient,
          {
            scale: 0.6,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            delay: ingredients[index].delay,
            ease: 'power2.out',
          }
        );

        ScrollTrigger.create({
          trigger: bowl,
          start: 'top center',
          end: 'center center',
          onEnter: () => {
            gsap.to(ingredient, {
              x: 0,
              y: window.innerHeight * 0.3,
              rotation: 0,
              scale: 0.3,
              opacity: 0,
              duration: 1.5,
              delay: ingredients[index].delay,
              ease: 'power2.in',
            });
          },
        });
      });

      gsap.fromTo(
        bowl,
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: bowl,
            start: 'top center+=100',
            end: 'center center',
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-32">
          <h1 className="font-serif text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            The Sacred Ritual
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed tracking-wide">
            FOUR ELEMENTS. ONE PERFECT BLEND.
          </p>
        </div>

        <div className="relative min-h-[300vh]">
          {ingredients.map((ingredient, index) => (
            <div
              key={ingredient.id}
              ref={(el) => {
                if (el) ingredientRefs.current[index] = el;
              }}
              className="fixed top-1/4 left-1/2 -translate-x-1/2 z-10"
              style={{
                width: '300px',
              }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity rounded-lg"></div>
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className="w-full aspect-square object-cover rounded-lg border-4 border-black shadow-2xl"
                />
                <div className="absolute -bottom-16 left-0 right-0 text-center">
                  <span className="inline-block px-4 py-2 bg-white border-2 border-black text-xs tracking-widest font-semibold">
                    {ingredient.name}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <div
            ref={bowlRef}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl"
          >
            <div className="relative">
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
                  strokeWidth="4"
                />
                <ellipse
                  cx="200"
                  cy="140"
                  rx="160"
                  ry="100"
                  fill="#f9fafb"
                  stroke="black"
                  strokeWidth="3"
                />
                <path
                  d="M 40 150 Q 200 250, 360 150"
                  fill="none"
                  stroke="black"
                  strokeWidth="3"
                />
                <ellipse
                  cx="200"
                  cy="150"
                  rx="140"
                  ry="80"
                  fill="#e5e7eb"
                  opacity="0.5"
                />
              </svg>
              <div className="absolute -bottom-20 left-0 right-0 text-center">
                <h3 className="font-serif text-4xl font-bold mb-4">
                  Perfectly Blended
                </h3>
                <p className="text-gray-600 text-lg tracking-wide">
                  Where tradition meets perfection
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-96 pt-32 grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="font-serif text-3xl font-bold mb-6">Our Philosophy</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Every blend begins with a story, a tradition passed down through generations. We honor these sacred rituals by selecting only the finest ingredients from around the world.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Each element is carefully chosen to create a harmonious balance, resulting in a tea experience that transcends the ordinary and touches the divine.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-3xl font-bold mb-6">The Process</h3>
            <div className="space-y-6">
              {['Selection', 'Preparation', 'Blending', 'Ritual'].map((step, index) => (
                <div key={step} className="flex items-start gap-4">
                  <span className="inline-block px-3 py-1 border-2 border-black text-xs font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="font-semibold mb-1">{step}</h4>
                    <p className="text-gray-600 text-sm">
                      Meticulous attention to detail at every stage of creation.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
