'use client';

import { useState, FormEvent } from 'react';

interface ElegantRegistrationFormProps {
  onSubmit: (data: { name: string; phone: string; email: string }) => void;
}

const ElegantRegistrationForm = ({ onSubmit }: ElegantRegistrationFormProps) => {
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
        phone: 'This number has already been registered' 
      }));
      return;
    }

    if (!formData.email.trim()) {
      setErrors(prev => ({ ...prev, email: 'Please enter your email address' }));
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
    <div className="h-full flex flex-col justify-center px-8 lg:px-16">
      <div className="max-w-md mx-auto w-full">
        {/* Header */}
        <div className="mb-12">
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-black mb-4 tracking-tight">
            Register to Participate
          </h2>
          <div className="elegant-divider mb-6"></div>
          <p className="text-gray-600 text-sm uppercase tracking-wider font-light">
            Enter your information below
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-xs uppercase tracking-widest text-gray-900 font-medium mb-3">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-0 py-3 border-0 border-b-2 bg-transparent focus:outline-none focus:ring-0 transition-all text-lg ${
                errors.name ? 'border-black' : 'border-gray-300 focus:border-black'
              }`}
              placeholder="John Smith"
            />
            {errors.name && (
              <p className="mt-2 text-xs text-black tracking-wide">{errors.name}</p>
            )}
          </div>

          {/* Phone Input */}
          <div>
            <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-gray-900 font-medium mb-3">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full px-0 py-3 border-0 border-b-2 bg-transparent focus:outline-none focus:ring-0 transition-all text-lg ${
                errors.phone ? 'border-black' : 'border-gray-300 focus:border-black'
              }`}
              placeholder="614 618 9999"
            />
            {errors.phone && (
              <p className="mt-2 text-xs text-black tracking-wide">{errors.phone}</p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-xs uppercase tracking-widest text-gray-900 font-medium mb-3">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-0 py-3 border-0 border-b-2 bg-transparent focus:outline-none focus:ring-0 transition-all text-lg ${
                errors.email ? 'border-black' : 'border-gray-300 focus:border-black'
              }`}
              placeholder="email@example.com"
            />
            {errors.email && (
              <p className="mt-2 text-xs text-black tracking-wide">{errors.email}</p>
            )}
          </div>

          {/* Notice */}
          <div className="pt-4">
            <p className="text-xs text-gray-500 italic tracking-wide leading-relaxed">
              By submitting this form, you agree to participate once. Each phone number is limited to a single entry.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 px-8 bg-black text-white text-sm uppercase tracking-widest font-medium hover:bg-gray-900 transition-all duration-300 border border-black"
          >
            Submit Entry
          </button>
        </form>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-400 tracking-wide">
            Your information is secure and confidential
          </p>
        </div>
      </div>
    </div>
  );
};

export default ElegantRegistrationForm;

