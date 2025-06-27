import React, { useState } from 'react';

const defaultPricing = {
  baseRate: 30,
  perKmRates: {
    Sedan: 1.5,
    SUV: 2.0,
    Van: 3.0,
  },
  surcharges: {
    extraPassengerFee: 5,
    nightSurchargePercent: 20,
  },
};

export default function PriceManagement() {
  const [pricing, setPricing] = useState(defaultPricing);

  const handleInputChange = (section, key, value) => {
    setPricing((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: Number(value),
      },
    }));
  };

  const handleBaseRateChange = (value) => {
    setPricing((prev) => ({
      ...prev,
      baseRate: Number(value),
    }));
  };

  const handleSubmit = () => {
    console.log('Updated Pricing:', pricing);
    alert('Pricing updated successfully!');
    // In real app: send to API via PATCH/PUT
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Pricing Management</h2>

      {/* Base Rate */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Base Rate (USD)</label>
        <input
          type="number"
          value={pricing.baseRate}
          onChange={(e) => handleBaseRateChange(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Per KM Rates */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Per KM Rates (USD)</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(pricing.perKmRates).map(([type, rate]) => (
            <div key={type}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {type}
              </label>
              <input
                type="number"
                step="0.1"
                value={rate}
                onChange={(e) => handleInputChange('perKmRates', type, e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Surcharges */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Surcharges</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Extra Passenger Fee (after 3) USD
            </label>
            <input
              type="number"
              value={pricing.surcharges.extraPassengerFee}
              onChange={(e) =>
                handleInputChange('surcharges', 'extraPassengerFee', e.target.value)
              }
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Night Surcharge (%) after 10 PM
            </label>
            <input
              type="number"
              value={pricing.surcharges.nightSurchargePercent}
              onChange={(e) =>
                handleInputChange('surcharges', 'nightSurchargePercent', e.target.value)
              }
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Update Pricing
        </button>
      </div>
    </div>
  );
}
