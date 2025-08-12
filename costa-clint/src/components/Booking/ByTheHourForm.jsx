import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import GoogleAutocompleteInput from "./GoogleAutocompleteInput";

const ByTheHourForm = ({ onBooking, setStep, pricingConfig }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const formData = watch();
  const PET_FEE = 10;

  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const duration = parseInt(formData.duration || 0);
    const adults = parseInt(formData.adults || 0);
    const children = parseInt(formData.children || 0);
    const passengers = adults + children;
    const extraPassengers = Math.max(0, passengers - 3);
    const BASE_HOURLY_RATE = pricingConfig?.baseFare || 30;
    let total = duration * BASE_HOURLY_RATE + extraPassengers * 5;

    if (formData.pet === "yes") {
      total += PET_FEE;
    }

    setSubtotal(isNaN(total) ? 0 : total);
  }, [formData.duration, formData.adults, formData.children, formData.pet,pricingConfig]);

  const isDisabled =
    !formData.from ||
    !formData.date ||
    !formData.time ||
    !formData.duration ||
    !formData.adults ||
    formData.children === undefined ||
    formData.bags === undefined ||
    !formData.pet;
  const handleNext = () => {
    onBooking("booking");
    setValue("totalPrice", subtotal);
    setStep(2);
  };
  return (
    <div className="space-y-6">
      {/* Pickup Location */}
      <div>
        <label className="text-sm font-medium">Pickup Location *</label>
        <GoogleAutocompleteInput
         fieldName="from"
          value={formData.from || ""}
          onPlaceSelect={(place) => setValue("from", place)}
          placeholder="Enter pickup location"
        />
        {errors.from && (
          <p className="mt-1 text-sm text-red-500">
            Pickup location is required
          </p>
        )}
      </div>

      {/* Date and Time */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Pickup Date *</label>
          <input
            type="date"
            {...register("date", { required: true })}
            className="w-full p-2 border rounded"
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-500">Date is required</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium">Pickup Time *</label>
          <input
            type="time"
            {...register("time", { required: true })}
            className="w-full p-2 border rounded"
          />
          {errors.time && (
            <p className="mt-1 text-sm text-red-500">Time is required</p>
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
          className="w-full p-2 border rounded"
        />
        {errors.duration && (
          <p className="mt-1 text-sm text-red-500">Minimum 1 hour required</p>
        )}
      </div>

      {/* Adults, Children, Bags */}
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="text-sm font-medium">Adults *</label>
          <input
            type="number"
            min="1"
            {...register("adults", { required: true, min: 1 })}
            className="w-full p-2 border rounded"
          />
          {errors.adults && (
            <p className="mt-1 text-sm text-red-500">Min 1 adult required</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium">Children *</label>
          <input
            type="number"
            min="0"
            {...register("children", { required: true, min: 0 })}
            className="w-full p-2 border rounded"
          />
          {errors.children && (
            <p className="mt-1 text-sm text-red-500">Required (min 0)</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium">Bags *</label>
          <input
            type="number"
            min="0"
            {...register("bags", { required: true, min: 0 })}
            className="w-full p-2 border rounded"
          />
          {errors.bags && (
            <p className="mt-1 text-sm text-red-500">Required (min 0)</p>
          )}
        </div>
      </div>

      {/* Pet Option */}
      <div>
        <label className="text-sm font-medium">Will you bring a pet? *</label>
        <div className="flex mt-1 space-x-4">
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
          <p className="mt-1 text-sm text-red-500">Please select pet option</p>
        )}
      </div>

      {/* Extras Textbox */}
      <div className="mt-4">
        <label className="text-sm font-medium">Extras</label>
        <input
          type="text"
          {...register("extras")}
          placeholder="Any extras?"
          className="w-full p-2 mt-1 border rounded"
        />
      </div>

      {/* Notes Textbox */}
      <div className="mt-4">
        <label className="text-sm font-medium">Notes</label>
        <textarea
          {...register("notes")}
          placeholder="Additional notes..."
          rows={3}
          className="w-full p-2 mt-1 border rounded"
        />
      </div>

      {/* Subtotal */}
      <div className="font-semibold text-right">
        Subtotal: ${subtotal}
        {formData.pet === "yes" && (
          <span className="ml-2 text-sm text-green-600">
            (Includes ${PET_FEE} pet fee)
          </span>
        )}
      </div>

      {/* Continue Button */}
      <button
        type="button"
        onClick={handleNext}
        disabled={isDisabled}
        className={`w-full text-white text-lg font-semibold py-4 rounded hover:scale-105 transition ${
          isDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-[#00b0bb] to-[#00afb9]"
        }`}
      >
        Choose Vehicles
      </button>
    </div>
  );
};

export default ByTheHourForm;
