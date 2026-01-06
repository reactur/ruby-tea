export default function Collections() {
  const collections = [
    {
      title: "GOLDEN CROWN",
      subtitle: "Regal Black Tea",
      image: "linear-gradient(135deg, #b45309 0%, #d97706 100%)"
    },
    {
      title: "VELVET BALANCE",
      subtitle: "Emotional Harmony",
      image: "linear-gradient(135deg, #7c2d12 0%, #92400e 100%)"
    },
    {
      title: "DREAM DRIFTER",
      subtitle: "Evening Serenity",
      image: "linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%)"
    }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="font-serif text-5xl md:text-6xl font-light mb-4 text-amber-900">
            Signature Blends
          </h3>
          <p className="text-sm tracking-wider text-amber-700">
            CRAFTED FOR YOUR DAILY RITUAL
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <div
                className="aspect-[3/4] mb-6 transition-transform duration-500 group-hover:scale-[1.02] rounded-lg shadow-lg"
                style={{ background: collection.image }}
              >
              </div>
              <h4 className="font-serif text-2xl mb-2 text-center text-amber-900">
                {collection.title}
              </h4>
              <p className="text-xs tracking-wider text-amber-700 text-center">
                {collection.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
