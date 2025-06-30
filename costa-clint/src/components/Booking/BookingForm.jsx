// BookingForm.jsx
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { Plane } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../UI/Card/Card";
import ByTheHourForm from "./ByTheHourForm";
import useStep from "../../Hooks/useStep";

const airportList = ["Istanbul Airport", "Heathrow Airport", "JFK Airport"];
const hotelList = ["Hilton Hotel", "Grand Hyatt", "Radisson Blu"];

const BookingForm = ({ onBooking }) => {
  const { step, setStep } = useStep();
  console.log(step, setStep)
  const [flowType, setFlowType] = useState("oneWay");
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const formData = watch();

  const [suggestions, setSuggestions] = useState({ from: [], to: [] });

  const handleInputChange = (field, value) => {
    setValue(field, value);

    // Recalculate price when passengers change
    if (field === "passengers") {
      const extra = Math.max(0, parseInt(value) - 3);
      setValue("estimatedPrice", 30 + extra * 5);
    }

    // Autocomplete for From & To
    if (field === "from" || field === "to") {
      const options =
        formData.transferType === "airport-hotel"
          ? field === "from"
            ? airportList
            : hotelList
          : hotelList;

      setSuggestions((prev) => ({
        ...prev,
        [field]: options.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase())
        ),
      }));
    }
  };

  const handleSuggestionClick = (field, value) => {
    setValue(field, value);
    setSuggestions((prev) => ({ ...prev, [field]: [] }));
  };
  const handleClick = () => {
    onBooking("booking");
    setStep(2);
  };
  return (
    <>
      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        <button
          type="button"
          onClick={() => setFlowType("oneWay")}
          className={`px-4 py-2 rounded ${
            flowType === "oneWay" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          One Way
        </button>
        <button
          type="button"
          onClick={() => setFlowType("hourly")}
          className={`px-4 py-2 rounded ${
            flowType === "hourly" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          By the Hour
        </button>
      </div>

      <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <Plane className="mr-2 h-6 w-6 text-tropical-600" />
            Book Your Transfer
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {flowType === "oneWay" ? (
            <>
              {/* Transfer Type */}
              <select
                {...register("transferType")}
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  handleInputChange("transferType", e.target.value)
                }
              >
                <option value="airport-hotel">Airport ↔ Hotel</option>
                <option value="hotel-hotel">Hotel ↔ Hotel</option>
              </select>

              {/* From & To with Autocomplete */}
              <div className="grid md:grid-cols-2 gap-4">
                {["from", "to"].map((field) => (
                  <div key={field} className="relative">
                    <label className="text-sm font-medium">
                      {field === "from" ? "From *" : "To *"}
                    </label>
                    <input
                      className="w-full border p-2 rounded"
                      {...register(field, { required: true })}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                    />
                    {suggestions[field].length > 0 && (
                      <ul className="absolute bg-white border w-full z-10">
                        {suggestions[field].map((item) => (
                          <li
                            key={item}
                            onMouseDown={() =>
                              handleSuggestionClick(field, item)
                            }
                            className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* Date & Time */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Date *</label>
                  <input
                    type="date"
                    className="w-full border p-2 rounded"
                    {...register("date", { required: true })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Time *</label>
                  <input
                    type="time"
                    className="w-full border p-2 rounded"
                    {...register("time", { required: true })}
                  />
                </div>
              </div>

              {/* Passengers & Flight Number */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Passengers</label>
                  <select
                    {...register("passengers")}
                    className="w-full border p-2 rounded"
                    onChange={(e) =>
                      handleInputChange("passengers", e.target.value)
                    }
                  >
                    {[...Array(8).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1} {num === 0 ? "Passenger" : "Passengers"}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Flight Number (Optional)
                  </label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    {...register("flightNumber")}
                  />
                </div>
              </div>

              {/* Next */}
              <button
                type="button"
                onClick={handleClick}
                className="w-full bg-gradient-to-r from-[#00b0bb] to-[#00afb9] text-white text-lg font-semibold py-4 rounded hover:scale-105 transition"
              >
                Choose Vehicle
              </button>
            </>
          ) : (
            <ByTheHourForm onBooking={onBooking} />
          )}

          <p className="text-xs text-gray-500 text-center mt-2">
            * Final price may vary based on exact distance and time
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default BookingForm;
