import React from 'react';
import { useFormContext } from 'react-hook-form';

const Step1PersonalInfo = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Step 1: Personal Info</h2>
      <input {...register('name', { required: 'Name is required' })}
        placeholder="Full Name" className="w-full mb-3 px-3 py-2 border rounded" />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <input {...register('email', { required: 'Email is required' })}
        placeholder="Email" className="w-full mb-3 px-3 py-2 border rounded" />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input {...register('phone', { required: 'Phone is required' })}
        placeholder="Phone Number" className="w-full mb-3 px-3 py-2 border rounded" />
      {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
    </div>
  );
};

export default Step1PersonalInfo;
