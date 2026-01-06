import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { supabase, type OrderItem } from '../lib/supabase';

interface CheckoutProps {
  items: OrderItem[];
  total: number;
  onClose: () => void;
  onBack: () => void;
  onClear: () => void;
}

export default function Checkout({
  items,
  total,
  onClose,
  onBack,
  onClear,
}: CheckoutProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postal: '',
    country: 'India',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateStep = () => {
    if (step === 1) {
      return formData.firstName && formData.lastName && formData.email;
    }
    if (step === 2) {
      return formData.address && formData.city && formData.postal && formData.country;
    }
    if (step === 3) {
      return formData.cardName && formData.cardNumber && formData.cardExpiry && formData.cardCvc;
    }
    return false;
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from('orders')
      .insert({
        customer_name: `${formData.firstName} ${formData.lastName}`,
        customer_email: formData.email,
        items,
        total_amount: total,
        status: 'pending'
      });

    setLoading(false);

    if (error) {
      alert('Error placing order. Please try again.');
      return;
    }

    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="fixed inset-0 z-40 bg-white overflow-y-auto pt-24">
        <div className="max-w-2xl mx-auto px-6 pb-24">
          <div className="text-center py-12">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                <span className="text-2xl">&#10003;</span>
              </div>
            </div>
            <h2 className="font-serif text-4xl mb-4">Order Confirmed</h2>
            <p className="text-gray-600 mb-2">Order number: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <p className="text-gray-600 mb-8">A confirmation email has been sent to {formData.email}</p>

            <button
              onClick={() => {
                onClear();
                onClose();
              }}
              className="px-8 py-3 bg-black text-white text-sm tracking-widest hover:bg-gray-900 transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-40 bg-white overflow-y-auto pt-24">
      <div className="max-w-2xl mx-auto px-6 pb-24">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-8 text-sm hover:opacity-70"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Cart
        </button>

        <div className="mb-12">
          <div className="flex gap-4 mb-8">
            {[1, 2, 3].map(s => (
              <div
                key={s}
                className={`flex-1 h-1 ${
                  s <= step ? 'bg-black' : 'bg-gray-300'
                } transition-colors`}
              />
            ))}
          </div>

          <h2 className="font-serif text-3xl mb-8">
            {step === 1 && 'Personal Information'}
            {step === 2 && 'Shipping Address'}
            {step === 3 && 'Payment'}
          </h2>
        </div>

        {step === 1 && (
          <div className="space-y-4 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 mb-8">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
              />
              <input
                type="text"
                name="postal"
                placeholder="Zip Code"
                value={formData.postal}
                onChange={handleChange}
                className="px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
            >
              <option>India</option>
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
              <option>Australia</option>
              <option>Germany</option>
            </select>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 mb-8">
            <input
              type="text"
              name="cardName"
              placeholder="Name on Card"
              value={formData.cardName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
            />
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              maxLength={16}
              value={formData.cardNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="cardExpiry"
                placeholder="MM/YY"
                maxLength={5}
                value={formData.cardExpiry}
                onChange={handleChange}
                className="px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
              />
              <input
                type="text"
                name="cardCvc"
                placeholder="CVV"
                maxLength={4}
                value={formData.cardCvc}
                onChange={handleChange}
                className="px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 pt-8 mb-8">
          <div className="flex justify-between text-lg font-serif mb-8">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!validateStep() || loading}
            className="w-full py-4 bg-black text-white text-sm tracking-widest hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : step === 3 ? 'CONFIRM ORDER' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
