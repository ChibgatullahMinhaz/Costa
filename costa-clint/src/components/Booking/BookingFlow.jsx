import { useContext, useState } from "react";
import { Check } from "lucide-react";
import { BookingFormContext } from "../../Service/Context/CreateContext/BookingFormContex";

import CustomizeRide from "./CustomizeRide";
import BookingDetails from "./BookingDetails";
import useStep from "../../Hooks/useStep";

const BookingFlow = ({setStepPhase}) => {
  const { methods } = useContext(BookingFormContext);
  const allValues = methods.getValues();
  const {step, setStep } = useStep();

  const steps = ["Trip Info", "Choose Vehicle", "Confirm"];

  return (
    <div className="max-w-4xl py-10 mx-auto mt-20">
      {/* Progress Tracker */}
      <div className="flex justify-between mb-6">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < step;
          const isActive = stepNumber === step;
          return (
            <div
              key={label}
              className="flex flex-col items-center w-full text-center"
            >
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center 
                  text-white font-bold transition-all duration-200
                  ${
                    isCompleted
                      ? "bg-green-500"
                      : isActive
                      ? "bg-blue-600 ring-4 ring-blue-300"
                      : "bg-gray-300"
                  }`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
              </div>
              <span
                className={`text-sm mt-1 ${
                  isActive ? "text-blue-600 font-semibold" : "text-gray-500"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

     

      {step === 2 && (
        <div>
           <h1 className="mb-8 text-2xl font-bold text-gray-800">
            Customize Your Ride
          </h1>
          <CustomizeRide setStepPhase={setStepPhase} />
        </div>
      )}
      {step === 3 && (
        <div>
         

          <BookingDetails  setStepPhase={setStepPhase}/>
        </div>
      )}
      {step === 4 && <div>Step 4 content: Thank you / Done</div>}

      {/* Navigation */}
      <div className="mt-6 ">
        {step >1 && (
          <button onClick={() => setStep(step - 1)} className="btn-primary">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingFlow;
