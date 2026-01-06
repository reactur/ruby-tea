interface HeroProps {
  onShopClick: () => void;
}

export default function Hero({ onShopClick }: HeroProps) {
  return (
    <section className="relative h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6">
          <h2 className="font-serif text-7xl md:text-8xl lg:text-9xl font-light text-gray-900 mb-6">
            MAISON
          </h2>
          <p className="text-sm tracking-[0.3em] text-gray-600 mb-12">
            FONDÉE EN 1853
          </p>
          <button
            onClick={onShopClick}
            className="px-8 py-3 border-2 border-black text-sm tracking-widest hover:bg-black hover:text-white transition-all duration-300"
          >
            DÉCOUVRIR
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-px h-12 bg-gray-400 animate-pulse"></div>
      </div>
    </section>
  );
}
