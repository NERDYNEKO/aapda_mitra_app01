import React, { useState } from 'react';
import { HeartIcon } from './icons/HeartIcon';

const presetAmounts = [100, 500, 1000];

export const Donation: React.FC = () => {
  const [amount, setAmount] = useState<number | string>(500);

  const handleDonateClick = () => {
    alert(`Thank you for your generous donation of ₹${amount}! Your support helps us continue our life-saving work.`);
    setAmount(500); // Reset to default
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string for clearing input, otherwise parse as number
    setAmount(value === '' ? '' : parseInt(value, 10));
  };
  
  const isCustomAmount = !presetAmounts.includes(Number(amount));

  return (
    <div className="w-full max-w-md bg-brand-gray-800 rounded-xl shadow-lg p-6 border border-brand-gray-700">
      <h3 className="text-xl font-bold text-brand-gray-100 mb-4 flex items-center gap-3">
        <HeartIcon />
        Support Our Cause
      </h3>
      <p className="text-brand-gray-400 mb-6 text-sm">
        Your contribution helps provide critical resources and aid to those affected by disasters.
      </p>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {presetAmounts.map(preset => (
          <button
            key={preset}
            onClick={() => setAmount(preset)}
            className={`py-3 px-2 text-center font-bold rounded-lg transition-colors border-2 ${
              amount === preset
                ? 'bg-brand-blue border-brand-blue text-white'
                : 'bg-brand-gray-700 border-brand-gray-600 text-brand-gray-200 hover:bg-brand-gray-600'
            }`}
          >
            ₹{preset}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <label htmlFor="custom-amount" className="sr-only">Custom Amount</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-gray-400">₹</span>
          <input
            type="number"
            id="custom-amount"
            placeholder="Custom Amount"
            value={isCustomAmount ? amount : ''}
            onChange={handleAmountChange}
            className="w-full pl-7 pr-4 py-3 bg-brand-gray-700 border-2 border-brand-gray-600 rounded-lg text-brand-gray-100 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
          />
        </div>
      </div>

      <button
        onClick={handleDonateClick}
        disabled={!amount || Number(amount) <= 0}
        className="w-full py-3 bg-brand-green text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition-colors disabled:bg-brand-gray-600 disabled:cursor-not-allowed"
      >
        Donate Now
      </button>
    </div>
  );
};