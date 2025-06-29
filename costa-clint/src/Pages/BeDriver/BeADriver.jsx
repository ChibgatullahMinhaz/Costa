import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Step1 from './Step1PersonalInfo';
import Step2 from './Step2DriverInfo';
import Step3 from './Step3AddressDocuments';
import Step4 from './Step4ReviewSubmit';

const steps = [Step1, Step2, Step3, Step4];

const BeADriver = () => {
  const methods = useForm({ mode: 'onBlur' });
  const [step, setStep] = useState(0);

  const CurrentStep = steps[step];

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = (data) => {
    if (step < steps.length - 1) {
      nextStep();
    } else {
      // Handle final submission
      console.log('Submit to backend:', { ...data, role: 'driver' });
      // e.g. axios.post('/api/drivers', { ...data, role: 'driver' })
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-30 p-6 bg-white rounded shadow">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <CurrentStep />
          <div className="flex justify-between mt-6">
            {step > 0 && (
              <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded">
                Back
              </button>
            )}
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              {step === steps.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default BeADriver;
