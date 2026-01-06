interface HeroProps {
  onShopClick: () => void;
}

export default function Hero({ onShopClick }: HeroProps) {
  return (
    <section className="relative h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-sm tracking-[0.4em] text-gray-600 mb-4">
            SACRED TEA EXPERIENCES
          </p>
          <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl font-light text-gray-900 mb-6">
            Royal Ruby Ritual
          </h2>
          <p className="text-lg text-gray-700 mb-12 max-w-xl mx-auto leading-relaxed">
            Transform your daily tea into a deeply personal journey of mindfulness and luxury
          </p>
          <button
            onClick={onShopClick}
            className="px-8 py-3 border-2 border-black text-sm tracking-widest hover:bg-black hover:text-white transition-all duration-300"
          >
            EXPERIENCE THE RITUAL
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-px h-12 bg-gray-400 animate-pulse"></div>
      </div>
    </section>
  );
}
