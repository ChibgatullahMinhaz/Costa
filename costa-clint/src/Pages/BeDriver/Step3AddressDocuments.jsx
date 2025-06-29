// src/steps/Step3AddressDocuments.js
import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step3AddressDocuments = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Step 3: Address & Documents</h2>

      <input {...register('address', { required: 'Address is required' })}
        placeholder="Home Address" className="w-full mb-3 px-3 py-2 border rounded" />
      {errors.address && <p className="text-red-500">{errors.address.message}</p>}

      <input type="file" {...register('driverPhoto')} className="w-full mb-3" />
      <small>Upload your photo (optional)</small>
    </div>
  );
};

export default Step3AddressDocuments;
