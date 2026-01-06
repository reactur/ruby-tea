import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Heritage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.heritage-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.heritage-title',
          start: 'top bottom-=100',
          end: 'top center',
          scrub: 1,
        },
      });

      gsap.from('.heritage-paragraph', {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: '.heritage-paragraph',
          start: 'top bottom-=50',
          end: 'top center',
          scrub: 1,
        },
      });

      gsap.from('.heritage-stat', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        scrollTrigger: {
          trigger: '.heritage-stat',
          start: 'top bottom-=50',
          end: 'top center',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="heritage-title font-serif text-5xl md:text-6xl font-light mb-8">
          The Essence
        </h3>
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p className="heritage-paragraph text-lg">
            Royal Ruby Ritual transforms the act of drinking tea into a sacred ceremony.
            Each blend is a poetic journey, crafted to nourish the soul and awaken the senses.
          </p>
          <p className="heritage-paragraph">
            Our master blenders source only the finest leaves from legendary estates,
            combining ancient wisdom with modern artistry. Every tin is a work of art,
            every cup a moment of reverence.
          </p>
          <p className="heritage-paragraph">
            From the misty highlands of Darjeeling to the verdant gardens of Japan,
            we bring you teas that honor tradition while inviting you into a personal ritual
            of reflection and renewal.
          </p>
        </div>

        <div className="mt-16 pt-16 border-t border-gray-300">
          <div className="grid grid-cols-3 gap-8">
            <div className="heritage-stat">
              <p className="font-serif text-4xl mb-2">5</p>
              <p className="text-sm tracking-wider text-gray-600">SIGNATURE BLENDS</p>
            </div>
            <div className="heritage-stat">
              <p className="font-serif text-4xl mb-2">100%</p>
              <p className="text-sm tracking-wider text-gray-600">PREMIUM QUALITY</p>
            </div>
            <div className="heritage-stat">
              <p className="font-serif text-4xl mb-2">SACRED</p>
              <p className="text-sm tracking-wider text-gray-600">RITUAL</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
