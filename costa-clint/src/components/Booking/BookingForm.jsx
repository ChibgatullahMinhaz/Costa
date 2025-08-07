import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import { Plane, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../UI/Card/Card";
import ByTheHourForm from "./ByTheHourForm";
import useStep from "../../Hooks/useStep";
import GoogleAutocompleteInput from "./GoogleAutocompleteInput";
import StepperInput from "../UI/StepperInput/StepperInput";
import { useQuery } from "@tanstack/react-query";
import axiosSecurePublic from "../../Service/APIs/AxiosPublic";

const getDistanceInKm = async (origin, destination) => {
  return new Promise((resolve, reject) => {
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.METRIC,
      },
      (response, status) => {
        if (status === "OK") {
          const distanceText = response.rows[0].elements[0].distance.text; // e.g. "12.3 km"
          const distanceValue = response.rows[0].elements[0].distance.value; // in meters
          resolve(distanceValue / 1000); // return in kilometers
        } else {
          reject("Distance fetch failed: " + status);
        }
      }
    );
  });
};

const BookingForm = ({ onBooking,pricingConfig }) => {
  const [distanceKm, setDistanceKm] = useState(null);

  const { step, setStep } = useStep();
  const [flowType, setFlowType] = useState("oneWay");

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const formData = watch();
  const transferType = watch("transferType");
  const PET_FEE = 10;

  const [subtotal, setSubtotal] = useState(0);


  useEffect(() => {
    const calculatePrice = async () => {
      // Fallback/default pricing if config missing
      const basePrice = pricingConfig?.baseFare || 30;
      const extraPassengerPrice = pricingConfig?.extraPassengerFee || 5;
      const perKmPrice = pricingConfig?.additionalPerKmRate || 2;
      const petFee = pricingConfig?.petFee || PET_FEE;

      const passengers =
        parseInt(formData.adults || 0, 10) +
        parseInt(formData.children || 0, 10);
      const extraPassengers = Math.max(0, passengers - 3);
      let total = basePrice + extraPassengers * extraPassengerPrice;

      if (formData.from && formData.to) {
        try {
          const distance = await getDistanceInKm(formData.from, formData.to);
          setDistanceKm(distance.toFixed(1));
          total += distance * perKmPrice;
        } catch (err) {
          console.error(err);
          setDistanceKm(null);
        }
      }

      if (formData.pet === "yes") {
        total += petFee;
      }

      setSubtotal(Math.round(total));
    };

    calculatePrice();
  }, [
    formData.from,
    formData.to,
    formData.adults,
    formData.children,
    formData.pet,
    pricingConfig,
  ]);

  const handleClick = () => {
    onBooking("booking");
    setValue("totalPrice", subtotal);
    setStep(2);
  };

  const isDisabled =
    !formData.from ||
    !formData.to ||
    !formData.date ||
    !formData.time ||
    !formData.adults ||
    formData.children === undefined ||
    formData.bags === undefined ||
    !formData.pet;

  const adults = watch("adults");
  const children = watch("children");
  const [count, setCount] = useState(adults || 1);
  const [childrenCount, setChildrenCount] = useState(children || 0);

  useEffect(() => {
    setValue("adults", count);
    setChildrenCount("children", childrenCount);
  }, [count, setValue, childrenCount]);

  return (
    <>
      <div className="flex mb-4 space-x-4">
        <button
          type="button"
          onClick={() => {
            setFlowType("oneWay");
            setValue("transferType", "one way");
          }}
          className={`px-4 py-2 rounded ${
            flowType === "oneWay" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          One Way
        </button>
        <button
          type="button"
          onClick={() => {
            setFlowType("hourly");
            setValue("transferType", "hourly");
          }}
          className={`px-4 py-2 rounded ${
            flowType === "hourly" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          By the Hour
        </button>
      </div>

      <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-bold">
            <Plane className="w-6 h-6 mr-2 text-tropical-600" />
            Book Your Transfer
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {flowType === "oneWay" ? (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                {["from", "to"].map((field) => (
                  <div key={field}>
                    <label className="text-sm font-medium capitalize">
                      {field === "from" ? "Pickup Location" : "Destination"} *
                    </label>
                    <GoogleAutocompleteInput
                      value={formData[field] || ""}
                      onPlaceSelect={(place) => setValue(field, place)}
                      placeholder={`Enter ${field}`}
                    />
                    {errors[field] && (
                      <p className="mt-1 text-sm text-red-500">
                        This field is required
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Pickup Date *</label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded"
                    {...register("date", { required: true })}
                  />
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-500">
                      Date is required
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Pickup Time *</label>
                  <input
                    type="time"
                    className="w-full p-2 border rounded"
                    {...register("time", { required: true })}
                  />
                  {errors.time && (
                    <p className="mt-1 text-sm text-red-500">
                      Time is required
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Passengers *
                  </label>
                  <div className="flex items-center overflow-hidden border rounded">
                    {/* 👈 Left icon */}
                    <div className="flex items-center px-3 bg-gray-100">
                      <User className="w-5 h-5 text-gray-500" />
                    </div>

                    {/* Input box (readonly to prevent manual edits) */}
                    <input
                      type="number"
                      defaultValue={1}
                      className="w-full px-2 py-2 text-center border-l border-r outline-none"
                      {...register("adults", { required: true, min: 1 })}
                    />
                  </div>

                  {errors.adults && (
                    <p className="mt-1 text-sm text-red-500">
                      Adults count is required (min 1)
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Children *</label>
                  <input
                    type="number"
                    min={0}
                    {...register("children", { required: true, min: 0 })}
                    className="w-full p-2 border rounded"
                  />
                  {errors.children && (
                    <p className="mt-1 text-sm text-red-500">
                      Children count is required (min 0)
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Luggage *</label>
                  <input
                    type="number"
                    min={0}
                    {...register("bags", { required: true, min: 0 })}
                    className="w-full p-2 border rounded"
                  />
                  {errors.bags && (
                    <p className="mt-1 text-sm text-red-500">
                      Bags count is required (min 0)
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Will you bring a pet? *
                </label>
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
                  <p className="mt-1 text-sm text-red-500">
                    Please select pet option
                  </p>
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

              <div className="mt-2 font-semibold text-right">
                Subtotal: ${subtotal}
                {distanceKm && (
                  <span className="ml-2 text-sm text-gray-600">
                    ({distanceKm} km distance)
                  </span>
                )}
                {formData.pet === "yes" && (
                  <span className="ml-2 text-sm text-green-600">
                    (Includes ${PET_FEE} pet fee)
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={handleClick}
                disabled={isDisabled}
                className={`w-full text-white text-lg font-semibold py-4 rounded hover:scale-105 transition ${
                  isDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#00b0bb] to-[#00afb9]"
                }`}
              >
                Choose Vehicles
              </button>
            </>
          ) : (
            <ByTheHourForm onBooking={onBooking} setStep={setStep} pricingConfig={pricingConfig} />
          )}

          <p className="mt-2 text-xs text-center text-gray-500">
            * Final price may vary based on exact distance and time
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default BookingForm;
