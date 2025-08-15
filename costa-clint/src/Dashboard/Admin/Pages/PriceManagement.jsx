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
    alert('Pricing updated successfully!');
  };

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded shadow">
      <h2 className="mb-6 text-2xl font-semibold">Pricing Management</h2>

      {/* Base Rate */}
      <div className="mb-6">
        <label className="block mb-1 text-sm font-medium text-gray-700">Base Rate (USD)</label>
        <input
          type="number"
          value={pricing.baseRate}
          onChange={(e) => handleBaseRateChange(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {/* Per KM Rates */}
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">Per KM Rates (USD)</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(pricing.perKmRates).map(([type, rate]) => (
            <div key={type}>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                {type}
              </label>
              <input
                type="number"
                step="0.1"
                value={rate}
                onChange={(e) => handleInputChange('perKmRates', type, e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Surcharges */}
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">Surcharges</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Extra Passenger Fee (after 3) USD
            </label>
            <input
              type="number"
              value={pricing.surcharges.extraPassengerFee}
              onChange={(e) =>
                handleInputChange('surcharges', 'extraPassengerFee', e.target.value)
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Night Surcharge (%) after 10 PM
            </label>
            <input
              type="number"
              value={pricing.surcharges.nightSurchargePercent}
              onChange={(e) =>
                handleInputChange('surcharges', 'nightSurchargePercent', e.target.value)
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Update Pricing
        </button>
      </div>
    </div>
  );
}
