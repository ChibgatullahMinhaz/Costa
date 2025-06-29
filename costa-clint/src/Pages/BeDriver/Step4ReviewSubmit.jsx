// src/steps/Step4ReviewSubmit.js
import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step4ReviewSubmit = () => {
  const { getValues } = useFormContext();
  const values = getValues();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Step 4: Review & Submit</h2>
      <ul className="space-y-2 text-sm">
        <li><strong>Name:</strong> {values.name}</li>
        <li><strong>Email:</strong> {values.email}</li>
        <li><strong>Phone:</strong> {values.phone}</li>
        <li><strong>License #:</strong> {values.licenseNumber}</li>
        <li><strong>Car Type:</strong> {values.carType}</li>
        <li><strong>Plate #:</strong> {values.plateNumber}</li>
        <li><strong>Address:</strong> {values.address}</li>
      </ul>
    </div>
  );
};

export default Step4ReviewSubmit;
