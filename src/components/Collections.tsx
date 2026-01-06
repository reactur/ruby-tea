export default function Collections() {
  const collections = [
    {
      title: "GOLDEN CROWN",
      subtitle: "Regal Black Tea",
      image: "linear-gradient(135deg, #e5e5e5 0%, #f5f5f5 100%)"
    },
    {
      title: "VELVET BALANCE",
      subtitle: "Emotional Harmony",
      image: "linear-gradient(135deg, #d4d4d4 0%, #e8e8e8 100%)"
    },
    {
      title: "DREAM DRIFTER",
      subtitle: "Evening Serenity",
      image: "linear-gradient(135deg, #c9c9c9 0%, #dcdcdc 100%)"
    }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="font-serif text-5xl md:text-6xl font-light mb-4">
            Signature Blends
          </h3>
          <p className="text-sm tracking-wider text-gray-600">
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
                className="aspect-[3/4] mb-6 transition-transform duration-500 group-hover:scale-[1.02]"
                style={{ background: collection.image }}
              >
              </div>
              <h4 className="font-serif text-2xl mb-2 text-center">
                {collection.title}
              </h4>
              <p className="text-xs tracking-wider text-gray-600 text-center">
                {collection.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
