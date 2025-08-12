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

const BookingForm = ({ onBooking, pricingConfig }) => {
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
  const fromFlight = watch("fromFlight");
  const toFlight = watch("toFlight");
  const PET_FEE = 10;
  console.log(formData);
  const [subtotal, setSubtotal] = useState(0);

  // useEffect(() => {
  //   const calculatePrice = async () => {
  //     const basePrice = pricingConfig?.baseFare || 30;
  //     const extraPassengerPrice = pricingConfig?.extraPassengerFee || 5;
  //     const perKmPrice = pricingConfig?.additionalPerKmRate || 1.5;
  //     const petFee = pricingConfig?.petFee || PET_FEE;

  //     const passengers =
  //       parseInt(formData.adults || 0, 10) +
  //       parseInt(formData.children || 0, 10);
  //     const extraPassengers = Math.max(0, passengers - 3);

  //     let total = basePrice + extraPassengers * extraPassengerPrice;

  //     if (formData.from && formData.to) {
  //       try {
  //         const distance = await getDistanceInKm(formData.from, formData.to);
  //         setDistanceKm(distance.toFixed(1));
  //         const chargeableDistance = Math.max(0, distance - 10);
  //         total += chargeableDistance * perKmPrice;
  //       } catch (err) {
  //         console.error(err);
  //         setDistanceKm(null);
  //       }
  //     }

  //     if (formData.pet === "yes") {
  //       total += petFee;
  //     }

  //     // Night surcharge: add 20% if time is after 10 PM
  //     if (formData.time) {
  //       const [hourStr] = formData.time.split(":");
  //       const hour = parseInt(hourStr, 10);
  //       if (hour >= 22) {
  //         total *= 1.2;
  //       }
  //     }

  //     setSubtotal(Math.round(total));
  //   };

  //   calculatePrice();
  // }, [
  //   formData.from,
  //   formData.to,
  //   formData.adults,
  //   formData.children,
  //   formData.pet,
  //   formData.time,
  //   pricingConfig,
  // ]);

  useEffect(() => {
    const calculatePrice = async () => {
      try {
        const basePrice = pricingConfig?.baseFare || 30;
        const extraPassengerPrice = pricingConfig?.extraPassengerFee || 5;
        const perKmPrice = pricingConfig?.additionalPerKmRate || 1.5;
        const petFee = pricingConfig?.petFee || PET_FEE;

        const adults = parseInt(formData.adults || 0, 10);
        const children = parseInt(formData.children || 0, 10);
        const passengers = adults + children;
        const extraPassengers = Math.max(0, passengers - 3);

        let total = basePrice + extraPassengers * extraPassengerPrice;

        if (formData.from && formData.to) {
          const distance = await getDistanceInKm(formData.from, formData.to);
          setDistanceKm(distance.toFixed(1));
          const chargeableDistance = Math.max(0, distance - 10);
          total += chargeableDistance * perKmPrice;
        } else {
          setDistanceKm(null);
        }

        if (formData.pet === "yes") {
          total += petFee;
        }

        // Night surcharge after 10 PM (22:00)
        if (formData.time && formData.amPm) {
          let hour = parseInt(formData.time.split(":")[0], 10);
          if (formData.amPm === "PM" && hour !== 12) {
            hour += 12; // Convert PM to 24-hour format (except 12 PM)
          }
          if (formData.amPm === "AM" && hour === 12) {
            hour = 0; // Midnight edge case
          }
          if (hour >= 22) {
            total *= 1.2; // Night surcharge
          }
        }

        setSubtotal(Math.round(total));
      } catch (error) {
        console.error("Price calculation error:", error);
        setSubtotal(0);
        setDistanceKm(null);
      }
    };

    calculatePrice();
  }, [
    formData.from,
    formData.to,
    formData.adults,
    formData.children,
    formData.pet,
    formData.time,
    formData.amPm,
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
                {/* <div>
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
                </div> */}

                <div>
                  <label className="text-sm font-medium">Pickup Time *</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      pattern="^(0?[1-9]|1[0-2]):[0-5][0-9]$"
                      placeholder="hh:mm"
                      className="w-24 p-2 border rounded"
                      {...register("time", {
                        required: true,
                        pattern: /^(0?[1-9]|1[0-2]):[0-5][0-9]$/,
                      })}
                    />
                    <select
                      {...register("amPm", { required: true })}
                      className="p-2 border rounded"
                    >
                      <option value="">AM/PM</option>
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                  {errors.time && (
                    <p className="mt-1 text-sm text-red-500">
                      Valid time is required (hh:mm)
                    </p>
                  )}
                  {errors.amPm && (
                    <p className="mt-1 text-sm text-red-500">
                      Please select AM or PM
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
            <ByTheHourForm
              onBooking={onBooking}
              setStep={setStep}
              pricingConfig={pricingConfig}
            />
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
