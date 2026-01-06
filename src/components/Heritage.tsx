export default function Heritage() {
  return (
    <section className="py-32 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="font-serif text-5xl md:text-6xl font-light mb-8">
          L'Héritage Goyard
        </h3>
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p className="text-lg">
            Depuis 1853, la Maison Goyard perpétue un savoir-faire d'exception
            dans l'art de la malle et du bagage de luxe.
          </p>
          <p>
            Chaque création est le fruit d'un travail minutieux, réalisé dans nos
            ateliers parisiens par des artisans malletiers qui transmettent leur
            expertise de génération en génération.
          </p>
          <p>
            Le mythique motif Goyardine, avec ses chevrons entrelacés,
            est devenu l'emblème d'une élégance discrète et intemporelle.
          </p>
        </div>

        <div className="mt-16 pt-16 border-t border-gray-300">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <p className="font-serif text-4xl mb-2">1853</p>
              <p className="text-sm tracking-wider text-gray-600">FONDATION</p>
            </div>
            <div>
              <p className="font-serif text-4xl mb-2">170+</p>
              <p className="text-sm tracking-wider text-gray-600">ANNÉES</p>
            </div>
            <div>
              <p className="font-serif text-4xl mb-2">100%</p>
              <p className="text-sm tracking-wider text-gray-600">ARTISANAL</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
