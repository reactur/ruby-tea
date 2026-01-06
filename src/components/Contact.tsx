import { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ContactProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Contact({ isOpen, onClose }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('contact_messages')
      .insert({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });

    setLoading(false);

    if (error) {
      alert('Erreur lors de l\'envoi du message');
      return;
    }

    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto pt-24">
      <div className="max-w-2xl mx-auto px-6 pb-24">
        <button
          onClick={onClose}
          className="fixed top-20 right-6 p-2 hover:bg-gray-100 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {submitted ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="font-serif text-2xl mb-2">Message envoyé</h3>
            <p className="text-gray-600">Merci de nous avoir contactés. Nous vous répondrons sous peu.</p>
          </div>
        ) : (
          <>
            <h2 className="font-serif text-4xl mb-4">Contactez-Nous</h2>
            <p className="text-gray-600 mb-12">
              Des questions? Notre équipe est là pour vous aider.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 mb-12">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Nom"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Sujet"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
              />

              <textarea
                name="message"
                placeholder="Message"
                required
                rows={8}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black resize-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-black text-white text-sm tracking-widest hover:bg-gray-900 transition-colors disabled:opacity-50"
              >
                {loading ? 'Envoi...' : 'ENVOYER'}
              </button>
            </form>

            <div className="border-t border-gray-200 pt-12">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm tracking-widest mb-3">ADRESSE</h4>
                  <p className="text-gray-600 text-sm">
                    4 Rue Saint-Honoré<br />
                    75001 Paris<br />
                    France
                  </p>
                </div>
                <div>
                  <h4 className="text-sm tracking-widest mb-3">CONTACT</h4>
                  <p className="text-gray-600 text-sm">
                    Tel: +33 1 42 60 57 04<br />
                    Email: contact@goyard.fr
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
