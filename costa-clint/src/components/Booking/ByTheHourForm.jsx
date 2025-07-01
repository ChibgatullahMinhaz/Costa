import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import GoogleAutocompleteInput from "./GoogleAutocompleteInput";

const ByTheHourForm = ({ onBooking }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const formData = watch();
  const PET_FEE = 10;
  const BASE_HOURLY_RATE = 50;

  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const duration = parseInt(formData.duration || 0);
    const adults = parseInt(formData.adults || 0);
    const children = parseInt(formData.children || 0);
    const passengers = adults + children;
    const extraPassengers = Math.max(0, passengers - 3);

    let total = duration * BASE_HOURLY_RATE + extraPassengers * 5;

    if (formData.pet === "yes") {
      total += PET_FEE;
    }

    setSubtotal(isNaN(total) ? 0 : total);
  }, [formData.duration, formData.adults, formData.children, formData.pet]);

  const isDisabled =
    !formData.from ||
    !formData.date ||
    !formData.time ||
    !formData.duration ||
    !formData.adults ||
    formData.children === undefined ||
    formData.bags === undefined ||
    !formData.pet;

  return (
    <div className="space-y-6">
      {/* Pickup Location */}
      <div>
        <label className="text-sm font-medium">Pickup Location *</label>
        <GoogleAutocompleteInput
          value={formData.from || ""}
          onPlaceSelect={(place) => setValue("from", place)}
          placeholder="Enter pickup location"
        />
        {errors.from && (
          <p className="text-red-500 text-sm mt-1">Pickup location is required</p>
        )}
      </div>

      {/* Date and Time */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Pickup Date *</label>
          <input
            type="date"
            {...register("date", { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">Date is required</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium">Pickup Time *</label>
          <input
            type="time"
            {...register("time", { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.time && (
            <p className="text-red-500 text-sm mt-1">Time is required</p>
          )}
        </div>
      </div>

      {/* Duration */}
      <div>
        <label className="text-sm font-medium">Duration (hours) *</label>
        <input
          type="number"
          min="1"
          {...register("duration", {
            required: true,
            min: 1,
          })}
          className="w-full border p-2 rounded"
        />
        {errors.duration && (
          <p className="text-red-500 text-sm mt-1">Minimum 1 hour required</p>
        )}
      </div>

      {/* Adults, Children, Bags */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium">Adults *</label>
          <input
            type="number"
            min="1"
            {...register("adults", { required: true, min: 1 })}
            className="w-full border p-2 rounded"
          />
          {errors.adults && (
            <p className="text-red-500 text-sm mt-1">Min 1 adult required</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium">Children *</label>
          <input
            type="number"
            min="0"
            {...register("children", { required: true, min: 0 })}
            className="w-full border p-2 rounded"
          />
          {errors.children && (
            <p className="text-red-500 text-sm mt-1">Required (min 0)</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium">Bags *</label>
          <input
            type="number"
            min="0"
            {...register("bags", { required: true, min: 0 })}
            className="w-full border p-2 rounded"
          />
          {errors.bags && (
            <p className="text-red-500 text-sm mt-1">Required (min 0)</p>
          )}
        </div>
      </div>

      {/* Pet Option */}
      <div>
        <label className="text-sm font-medium">Will you bring a pet? *</label>
        <div className="flex space-x-4 mt-1">
          <label>
            <input
              type="radio"
              value="yes"
              {...register("pet", { required: true })}
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="no"
              {...register("pet", { required: true })}
            />{" "}
            No
          </label>
        </div>
        {errors.pet && (
          <p className="text-red-500 text-sm mt-1">Please select pet option</p>
        )}
      </div>

      {/* Optional: Flight Number */}
      <div>
        <label className="text-sm font-medium">Flight Number (optional)</label>
        <input
          type="text"
          {...register("flightNumber")}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Subtotal */}
      <div className="text-right font-semibold">
        Subtotal: ${subtotal}
        {formData.pet === "yes" && (
          <span className="text-sm text-green-600 ml-2">
            (Includes ${PET_FEE} pet fee)
          </span>
        )}
      </div>

      {/* Continue Button */}
      <button
        type="button"
        onClick={() => onBooking("booking")}
        disabled={isDisabled}
        className={`w-full text-white text-lg font-semibold py-4 rounded hover:scale-105 transition ${
          isDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-[#00b0bb] to-[#00afb9]"
        }`}
      >
        Continue
      </button>

      <p className="text-xs text-gray-500 text-center mt-2">
        * Final price may vary based on actual distance and time
      </p>
    </div>
  );
};

export default ByTheHourForm;
