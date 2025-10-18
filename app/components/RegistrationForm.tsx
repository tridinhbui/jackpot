'use client';

import { useState, FormEvent } from 'react';

interface RegistrationFormProps {
  onSubmit: (data: { name: string; phone: string; email: string }) => void;
  hasSpun: boolean;
}

const RegistrationForm = ({ onSubmit, hasSpun }: RegistrationFormProps) => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePhone = (phone: string) => {
    // International phone number format (10-15 digits)
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

    // Validate name
    if (!formData.name.trim()) {
      setErrors(prev => ({ ...prev, name: 'Please enter your full name' }));
      return;
    }

    // Validate phone
    if (!formData.phone.trim()) {
      setErrors(prev => ({ ...prev, phone: 'Please enter your phone number' }));
      return;
    }

    if (!validatePhone(formData.phone)) {
      setErrors(prev => ({ ...prev, phone: 'Invalid phone number format' }));
      return;
    }

    // Check if phone already used
    if (checkPhoneExists(formData.phone)) {
      setErrors(prev => ({ 
        ...prev, 
        phone: 'This phone number has already been used. Each number can only spin once!' 
      }));
      return;
    }

    // Validate email
    if (!formData.email.trim()) {
      setErrors(prev => ({ ...prev, email: 'Please enter your email' }));
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Invalid email format' }));
      return;
    }

    setIsSubmitting(true);

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

    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
    }, 500);
  };

  if (hasSpun) {
    return (
      <div className="max-w-md mx-auto text-center p-8 bg-white rounded-3xl shadow-xl">
        <div className="mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-black flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Thank you for participating!
          </h2>
          <p className="text-gray-600">
            You have already used your spin.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Each phone number is limited to one spin only.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-black flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🎰</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Enter Your Information
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Fill in your details for a chance to win
          </p>
          <div className="mt-3 inline-block bg-red-100 border border-red-300 rounded-lg px-4 py-2">
            <p className="text-red-700 text-xs sm:text-sm font-semibold">
              ⚠️ Each phone number can only spin once
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all ${
                errors.name ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="John Smith"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Phone Input */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all ${
                errors.phone ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="+1 234 567 8900"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all ${
                errors.email ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="email@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 bg-black text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? 'Processing...' : 'Start Spinning'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs">
            Your information will be kept confidential
          </p>
        </div>
      </div>

      {/* Aventus Spa Branding */}
      <div className="text-center mt-6">
        <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-700 to-black bg-clip-text text-transparent">
          Aventus Spa
        </h3>
        <p className="text-gray-600 text-sm">Premium Nail Salon Experience</p>
      </div>
    </div>
  );
};

export default RegistrationForm;
