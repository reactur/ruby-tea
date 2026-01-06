export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h4 className="text-sm tracking-widest mb-6">SERVICE CLIENT</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Livraison</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Retours</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-widest mb-6">LA MAISON</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Notre Histoire</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Savoir-Faire</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Boutiques</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Carrières</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-widest mb-6">SERVICES</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Personnalisation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Réparations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Entretien</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Authentification</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-widest mb-6">NEWSLETTER</h4>
            <p className="text-sm text-gray-400 mb-4">
              Recevez nos dernières actualités
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 bg-transparent border border-gray-600 px-4 py-2 text-sm focus:outline-none focus:border-white"
              />
              <button className="px-6 py-2 border border-gray-600 border-l-0 text-sm hover:bg-white hover:text-black transition-colors">
                OK
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; 2024 Maison Goyard. Tous droits réservés.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
