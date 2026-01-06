import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out',
      });

      gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
      });

      gsap.from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.7,
        ease: 'power3.out',
      });

      gsap.from('.hero-button', {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.9,
        ease: 'power3.out',
      });
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://cdn.coverr.co/videos/coverr-pouring-hot-tea-into-a-cup-5009/1080p.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div ref={contentRef} className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6">
          <p className="hero-subtitle text-sm tracking-[0.4em] text-white mb-4 opacity-90">
            SACRED TEA EXPERIENCES
          </p>
          <h2 className="hero-title font-serif text-6xl md:text-7xl lg:text-8xl font-light text-white mb-6">
            Royal Ruby Ritual
          </h2>
          <p className="hero-description text-lg text-white mb-12 max-w-xl mx-auto leading-relaxed opacity-90">
            Transform your daily tea into a deeply personal journey of mindfulness and luxury
          </p>
          <Link
            to="/products"
            className="hero-button inline-block px-8 py-3 border-2 border-white text-white text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            EXPERIENCE THE RITUAL
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-px h-12 bg-white opacity-60 animate-pulse"></div>
      </div>
    </section>
  );
}
