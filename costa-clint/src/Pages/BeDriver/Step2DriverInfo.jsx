// src/steps/Step2DriverInfo.js
import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step2DriverInfo = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Step 2: Driver Info</h2>

      <input {...register('licenseNumber', { required: 'License number is required' })}
        placeholder="License Number" className="w-full mb-3 px-3 py-2 border rounded" />
      {errors.licenseNumber && <p className="text-red-500">{errors.licenseNumber.message}</p>}

      <input {...register('carType', { required: 'Car type is required' })}
        placeholder="Car Type (e.g. SUV, Sedan)" className="w-full mb-3 px-3 py-2 border rounded" />
      {errors.carType && <p className="text-red-500">{errors.carType.message}</p>}

      <input {...register('plateNumber', { required: 'Plate number is required' })}
        placeholder="Plate Number" className="w-full mb-3 px-3 py-2 border rounded" />
      {errors.plateNumber && <p className="text-red-500">{errors.plateNumber.message}</p>}
    </div>
  );
};

export default Step2DriverInfo;
