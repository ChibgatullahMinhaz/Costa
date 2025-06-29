// src/components/BookingSteps/ByTheHourForm.jsx
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

const airportList = ["Istanbul Airport", "Heathrow Airport", "JFK Airport"];
const hotelList   = ["Hilton Hotel", "Grand Hyatt", "Radisson Blu"];

const ByTheHourForm = ({ onBooking }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const [suggestions, setSuggestions] = useState([]);
  const fromValue = watch("from") || "";

  // Autocomplete only for pickup ("from")
  const handleFromChange = (val) => {
    setValue("from", val);
    const options =
      watch("transferType") === "airport-hotel" ? airportList : hotelList;
    const matches = options.filter((loc) =>
      loc.toLowerCase().includes(val.toLowerCase())
    );
    setSuggestions(matches);
  };

  const handleSuggestionClick = (loc) => {
    setValue("from", loc);
    setSuggestions([]);
  };

  return (
    <div className="space-y-6">
      {/* Pickup Location */}
      <div className="relative">
        <label className="block text-sm font-medium mb-1">Pickup *</label>
        <input
          {...register("from", { required: "Pickup location is required" })}
          value={fromValue}
          onChange={(e) => handleFromChange(e.target.value)}
          placeholder="Enter pickup location"
          className="w-full border p-2 rounded"
        />
        {errors.from && (
          <p className="text-red-500 text-sm mt-1">{errors.from.message}</p>
        )}
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border w-full z-10 mt-1 max-h-40 overflow-auto">
            {suggestions.map((loc) => (
              <li
                key={loc}
                onMouseDown={() => handleSuggestionClick(loc)}
                className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {loc}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium mb-1">Date *</label>
        <input
          type="date"
          {...register("date", { required: "Date is required" })}
          className="w-full border p-2 rounded"
        />
        {errors.date && (
          <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
        )}
      </div>

      {/* Time */}
      <div>
        <label className="block text-sm font-medium mb-1">Time *</label>
        <input
          type="time"
          {...register("time", { required: "Time is required" })}
          className="w-full border p-2 rounded"
        />
        {errors.time && (
          <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
        )}
      </div>

      {/* Passengers */}
      <div>
        <label className="block text-sm font-medium mb-1">Passengers</label>
        <select
          {...register("passengers")}
          className="w-full border p-2 rounded"
        >
          {[...Array(8).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1} {num === 0 ? "Passenger" : "Passengers"}
            </option>
          ))}
        </select>
      </div>

      {/* Luggage */}
      <div>
        <label className="block text-sm font-medium mb-1">Luggage (bags)</label>
        <select
          {...register("luggage")}
          className="w-full border p-2 rounded"
        >
          {[...Array(6).keys()].map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? "bag" : "bags"}
            </option>
          ))}
        </select>
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-medium mb-1">Duration (hours) *</label>
        <input
          type="number"
          min="1"
          {...register("duration", {
            required: "Duration is required",
            min: { value: 1, message: "At least 1 hour" },
          })}
          className="w-full border p-2 rounded"
        />
        {errors.duration && (
          <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
        )}
      </div>

      {/* Flight Number */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Flight Number (Optional)
        </label>
        <input
          type="text"
          {...register("flightNumber")}
          className="w-full border p-2 rounded"
          placeholder="e.g. AA1234"
        />
      </div>

      {/* Continue / Choose Vehicle */}
      <button
        type="button"
        onClick={() => onBooking("booking")}
        className="w-full bg-gradient-to-r from-[#00b0bb] to-[#00afb9] 
                   text-white font-semibold py-3 rounded-lg 
                   hover:scale-105 transition-all duration-200"
      >
        Choose Vehicle
      </button>
    </div>
  );
};

export default ByTheHourForm;
