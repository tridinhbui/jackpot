'use client';

import { useState, FormEvent } from 'react';

interface SpinRegistrationFormProps {
  onSubmit: (data: { name: string; phone: string; email: string }) => void;
}

const SpinRegistrationForm = ({ onSubmit }: SpinRegistrationFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkPhoneExists = (phone: string) => {
    if (typeof window === 'undefined') return false;
    
    const usedPhones = localStorage.getItem('usedPhones');
    if (!usedPhones) return false;
    
    const phoneList = JSON.parse(usedPhones);
    return phoneList.includes(phone);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors({ name: '', phone: '', email: '' });

    if (!formData.name.trim()) {
      setErrors(prev => ({ ...prev, name: 'Please enter your full name' }));
      return;
    }

    if (!formData.phone.trim()) {
      setErrors(prev => ({ ...prev, phone: 'Please enter your phone number' }));
      return;
    }

    if (!validatePhone(formData.phone)) {
      setErrors(prev => ({ ...prev, phone: 'Invalid phone number format' }));
      return;
    }

    if (checkPhoneExists(formData.phone)) {
      setErrors(prev => ({ 
        ...prev, 
        phone: 'This phone number has already been used. Each number can only spin once!' 
      }));
      return;
    }

    if (!formData.email.trim()) {
      setErrors(prev => ({ ...prev, email: 'Please enter your email' }));
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Invalid email format' }));
      return;
    }

    // Save phone to localStorage
    const usedPhones = localStorage.getItem('usedPhones');
    const phoneList = usedPhones ? JSON.parse(usedPhones) : [];
    phoneList.push(formData.phone);
    localStorage.setItem('usedPhones', JSON.stringify(phoneList));

    // Save user data
    const userData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('currentUser', JSON.stringify(userData));

    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 h-full flex flex-col justify-center">
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🎁</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Enter to Spin & Win!
        </h2>
        <p className="text-gray-600 text-sm">
          Fill in your details to unlock the wheel
        </p>
        <div className="mt-3 inline-block bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-300 rounded-xl px-4 py-2">
          <p className="text-red-700 text-xs font-bold">
            🎯 ONE SPIN PER PHONE NUMBER
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all text-lg ${
              errors.name ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="John Smith"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-500 font-semibold">{errors.name}</p>
          )}
        </div>

        {/* Phone Input */}
        <div>
          <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all text-lg ${
              errors.phone ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="614-618-9999"
          />
          {errors.phone && (
            <p className="mt-2 text-sm text-red-500 font-semibold">{errors.phone}</p>
          )}
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all text-lg ${
              errors.email ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="email@example.com"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-500 font-semibold">{errors.email}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-5 px-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold text-xl rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
        >
          🔓 UNLOCK & SPIN!
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-500 text-xs">
          🔒 Your information is secure and confidential
        </p>
      </div>
    </div>
  );
};

export default SpinRegistrationForm;

