import { useContext, useState } from "react";
import { Check } from "lucide-react";
import { BookingFormContext } from "../../Service/Context/CreateContext/BookingFormContex";
import TravelSummury from "./TravelSummury";

const BookingFlow = () => {
  const {methods} = useContext(BookingFormContext);
  console.log(methods);
  const allValues = methods.getValues();
  console.log(allValues);
  const [step, setStep] = useState(1);

  const steps = ["Trip Info", "Choose Vehicle", "Confirm", "Done"];

  return (
    <div className="max-w-4xl mx-auto py-10 mt-20">
      {/* Progress Tracker */}
      <div className="flex justify-between mb-6">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber === 1 || stepNumber < step;
          const isActive = stepNumber === step;
          return (
            <div
              key={label}
              className="flex flex-col items-center text-center w-full"
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
                {isCompleted ? <Check className="h-5 w-5" /> : index + 1}
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

      {/* Step content */}
      {step === 1 && <div>
        <TravelSummury methods={methods}></TravelSummury>
        </div>}
      {step === 2 && <div>Step 2 content: Vehicle List</div>}
      {step === 3 && <div>Step 3 content: Confirm Page</div>}
      {step === 4 && <div>Step 4 content: Thank you / Done</div>}

      {/* Navigation */}
      <div className="mt-6 ">
        {step < 4 && (
          <button onClick={() => setStep(step + 1)} className="btn-primary">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingFlow;
