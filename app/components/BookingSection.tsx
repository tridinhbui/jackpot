'use client';

import { useState, FormEvent } from 'react';

const BookingSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    serviceDate: '',
    timeHours: '',
    timeMinutes: '',
    timePeriod: 'AM',
    services: [] as string[],
    technician: '',
  });

  const services = [
    'Pedicure',
    'Manicure',
    'Dipping Powder',
    'Gel X / Tap Gel',
    'Builder Gel',
    'Acrylic Full Set',
    'Acrylic Overlay',
    'Re-fill Acrylic',
    "Kid's Service(s)",
    'Waxing / Tinting',
    'Nail Design',
    'Nail Repair',
    'Other',
  ];

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle booking submission
    alert('Booking request submitted! We will confirm in 30-60 minutes.');
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 mb-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Book Your Appointment
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
          <a
            href="tel:614-618-9999"
            className="px-6 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all"
          >
            📞 CALL TO BOOK: 614-618-9999
          </a>
          <a
            href="https://www.fresha.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold rounded-xl hover:shadow-lg transition-all"
          >
            BOOK via FRESHA
          </a>
        </div>
        <p className="text-gray-600 text-sm sm:text-base">
          or Book with Form Below
        </p>
      </div>

      {/* Info Box */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-8 border border-gray-200">
        <p className="text-gray-700 mb-4">
          <span className="font-semibold">Can&apos;t find a time that works for you?</span> Give us a call at{' '}
          <a href="tel:614-618-9999" className="font-bold text-black hover:underline">
            614-618-9999
          </a>{' '}
          - we&apos;ll do everything we can to fit you in at a time that suits you!
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Address:</span> 94 Meadow Park Ave - Lewis Center, OH 43035
          <br />
          <span className="text-sm">(Next to Bath & Body Works)</span>{' '}
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black font-semibold hover:underline"
          >
            Get Direction →
          </a>
        </p>
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              First name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              placeholder="Enter your first name"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Last name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              placeholder="Enter your last name"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="614-618-9999"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Service Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.serviceDate}
              onChange={(e) => setFormData({ ...formData, serviceDate: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Time Request <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="1"
                max="12"
                value={formData.timeHours}
                onChange={(e) => setFormData({ ...formData, timeHours: e.target.value })}
                placeholder="HH"
                className="w-20 px-3 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <span className="flex items-center">:</span>
              <input
                type="number"
                min="0"
                max="59"
                value={formData.timeMinutes}
                onChange={(e) => setFormData({ ...formData, timeMinutes: e.target.value })}
                placeholder="MM"
                className="w-20 px-3 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <select
                value={formData.timePeriod}
                onChange={(e) => setFormData({ ...formData, timePeriod: e.target.value })}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>

        {/* Confirmation Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-800">
            ℹ️ We&apos;ll confirm your booking in 30-60 minutes. For immediate bookings, please call us at{' '}
            <span className="font-bold">614.618.9999</span>
          </p>
        </div>

        {/* Services */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Choose your service(s) <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {services.map((service) => (
              <label
                key={service}
                className={`flex items-center justify-center px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                  formData.services.includes(service)
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.services.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                  className="hidden"
                />
                <span className="text-sm font-medium text-center">{service}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Technician Request */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Technician Request
          </label>
          <input
            type="text"
            value={formData.technician}
            onChange={(e) => setFormData({ ...formData, technician: e.target.value })}
            placeholder="Optional: Preferred technician name"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        {/* Group Booking Note */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-700">
            For group bookings or special events, please call us at{' '}
            <a href="tel:614-618-9999" className="font-bold text-black hover:underline">
              (614) 618-9999
            </a>
            . Our event manager is ready to assist you in finding the perfect package for your needs!
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 px-6 bg-black text-white font-bold text-lg rounded-xl shadow-lg hover:bg-gray-900 hover:shadow-xl transition-all"
        >
          Submit Booking Request
        </button>
      </form>
    </div>
  );
};

export default BookingSection;

