import { User, Baby, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";

const ICONS = {
  adults: <User className="w-4 h-4 text-gray-500" />,
  children: <Baby className="w-4 h-4 text-gray-500" />,
  bags: <Briefcase className="w-4 h-4 text-gray-500" />,
};

const StepperInput = ({ name, label, register, setValue, watch, errors, min = 0 }) => {
  const value = watch(name);
  const [count, setCount] = useState(value || min);

  useEffect(() => {
    setValue(name, count);
  }, [count, setValue, name]);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => Math.max(min, prev - 1));

  return (
    <div>
      <label className="text-sm font-medium block mb-1">{label} *</label>
      <div className="flex items-center border rounded overflow-hidden shadow-sm">
        {/* Icon */}
        <div className="bg-gray-100 px-3 flex items-center">
          {ICONS[name] || <User className="w-4 h-4 text-gray-500" />}
        </div>

        {/* - Button */}
        <button
          type="button"
          onClick={decrement}
          className="px-3 py-2 text-lg font-bold bg-gray-200 hover:bg-gray-300"
        >
          -
        </button>

        {/* Value display */}
        <input
          type="number"
          value={count}
          readOnly
          className="w-full text-center border-l border-r px-2 py-2 outline-none"
          {...register(name, { required: true, min })}
        />

        {/* + Button */}
        <button
          type="button"
          onClick={increment}
          className="px-3 py-2 text-lg font-bold bg-gray-200 hover:bg-gray-300"
        >
          +
        </button>
      </div>

      {/* Error */}
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {label} count is required (min {min})
        </p>
      )}
    </div>
  );
};

export default StepperInput;
