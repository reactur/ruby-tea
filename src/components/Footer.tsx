export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h4 className="text-sm tracking-widest mb-6">CUSTOMER SERVICE</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-widest mb-6">THE RITUAL</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-white transition-colors">The Essence</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Brewing Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-widest mb-6">OUR BLENDS</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Golden Crown</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Velvet Balance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Clean Slate</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dream Drifter</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-widest mb-6">NEWSLETTER</h4>
            <p className="text-sm text-gray-400 mb-4">
              Join our ritual and receive exclusive offers
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent border border-gray-600 px-4 py-2 text-sm focus:outline-none focus:border-white"
              />
              <button className="px-6 py-2 border border-gray-600 border-l-0 text-sm hover:bg-white hover:text-black transition-colors">
                Join
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              G-208, Office Block, City Centra<br />
              Matigara, West Bengal - 734010<br />
              +91 99303 82663
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; 2024 Royal Ruby Tea & Agro. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
