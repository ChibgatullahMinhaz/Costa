import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import useStep from "../../Hooks/useStep";
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { BookingFormContext } from "../../Service/Context/CreateContext/BookingFormContex";
import { Baby, Briefcase, CalendarDays, User } from "lucide-react";
import TimelineInfo from "./TimelineInfo";
import axiosSecurePublic from "../../Service/APIs/AxiosPublic";

const CustomizeRide = ({ setStepPhase }) => {
  const { methods } = useContext(BookingFormContext);
  const allValues = methods.getValues();
  const [selectedType, setSelectedType] = useState("Sedan");
  const { step, setStep } = useStep();
  const origin = allValues?.from;
  const destination = allValues?.to;
  const [directions, setDirections] = useState(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    if (!isLoaded) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          console.error("Directions request failed", status);
        }
      }
    );
  }, [isLoaded, destination, origin]);

  const { data: types = [] } = useQuery({
    queryKey: ["vehicles"],
    queryFn: () =>
      axiosSecurePublic.get("/api/getAllCarTypeWithPrices").then((res) => res.data),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  const { data: vehicles = [], isPending } = useQuery({
    queryKey: ["vehicles", selectedType],
    queryFn: () =>
      axiosSecurePublic
        .get(`api/getAllCarByType?type=${selectedType}`)
        .then((res) => res.data),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });
  return (
    <div className="bg-[#f9f9f9] flex text-[#1a1a1a] font-[Inter]">
      <div>
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
          {/* Ride Info Card */}
          <div className="w-full max-w-md p-6 mb-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Ride Info</h2>

              <button
                onClick={() => setStepPhase("initial")}
                className="flex items-center space-x-1 font-bold text-orange-600 hover:text-orange-700"
              >
                <span className="text-sm">✏️</span>
                <span>Modify</span>
              </button>
            </div>

            <div className="flex justify-between mb-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                {allValues?.date}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {allValues?.adults}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {allValues?.bags}
              </span>
              <span className="flex items-center gap-1">
                <Baby className="w-4 h-4" />
                {allValues?.children}
              </span>
            </div>

            {/* Live Google Map */}
            {allValues?.transferType === "hourly" ? (
              <>
                <TimelineInfo
                  from={allValues?.from}
                  duration={allValues?.duration}
                />
              </>
            ) : (
              <>
                <div className="flex items-center justify-center w-full h-48 mb-4 overflow-hidden bg-gray-200 rounded-md">
                  {isLoaded ? (
                    <GoogleMap
                      center={{ lat: 40.7128, lng: -74.006 }}
                      zoom={10}
                      mapContainerStyle={{ width: "100%", height: "100%" }}
                    >
                      {directions && (
                        <DirectionsRenderer directions={directions} />
                      )}
                    </GoogleMap>
                  ) : (
                    <p>Loading map...</p>
                  )}
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p className="flex items-center">
                    <span className="mr-2 text-gray-500">⏰</span>{" "}
                    {allValues?.time}
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2 text-gray-500">📍</span> {origin}
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2 text-gray-500">📍</span> {destination}
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2 text-gray-500">🚗</span> Estimated
                    route based on Google Maps
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Vehicle Features */}
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-700">
              All our vehicles include:
            </h2>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-center">
                <span className="mr-3 text-lg text-gray-500">✈️</span> Flight &
                Ride Tracking
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-lg text-gray-500">📞</span> 24/7
                Customer Call Center
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-lg text-gray-500">🗣️</span>{" "}
                Multilingual Driver
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-lg text-gray-500">💰</span> Full
                refund if cancelled 24 hours in advance
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-lg text-gray-500">⏰</span> Free 60
                min wait at airport pickups
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Vehicle Selection */}
      <div className="mx-auto max-w-7xl mt-7">
        <div className="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0">
          <div className="flex-1">
            <div className="flex overflow-x-auto text-xs text-gray-600 bg-white border border-gray-200 select-none rounded-t-md scrollbar-hide">
              {types.map((item, idx) => (
                <button
                  key={idx}
                  className={`flex-1 py-2 px-3 whitespace-nowrap ${
                    selectedType === item?.type
                      ? "border-b-2 border-[#1a1a1a] font-semibold text-[#1a1a1a]"
                      : "hover:text-[#1a1a1a]"
                  }`}
                  type="button"
                  onClick={() => setSelectedType(item?.type)}
                >
                  {item?.type}
                  <br />
                  <span className="text-[10px] text-gray-400">
                    From ${item?.price.toFixed(2)}
                  </span>
                </button>
              ))}
            </div>

            <div className="p-4 space-y-4 bg-white border border-t-0 border-gray-200 rounded-b-md">
              {isPending ? (
                <p>Loading......</p>
              ) : (
                vehicles.map((car, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col p-4 border border-gray-200 rounded-md sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center mb-3 space-x-4 sm:mb-0 sm:flex-1">
                      <img
                        src={car.imageUrl}
                        alt={car.subtitle}
                        className="w-20 h-auto"
                      />
                      <div className="text-xs text-gray-700">
                        <p className="font-semibold">{car.title}</p>
                        <p className="text-gray-400">{car.subtitle}</p>
                        <div className="flex items-center mt-1 space-x-3">
                          <div className="flex items-center space-x-1">
                            <i className="text-gray-400 fas fa-user"></i>
                            <span>Max Seats. {car.seatCapacity}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <i className="text-gray-400 fas fa-suitcase"></i>
                            <span>Max luggage. {car.luggageCapacity}</span>
                          </div>
                        </div>
                        <label className="inline-flex items-center mt-2 text-xs text-gray-500 cursor-pointer select-none">
                          <input className="form-checkbox" type="checkbox" />
                          <span className="ml-1">Need child seats?</span>
                        </label>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">
                        USD{" "}
                        {(
                          parseFloat(car.price) +
                          parseFloat(allValues?.totalPrice)
                        ).toFixed(2)}
                      </p>
                      <p className="mb-2 text-xs text-gray-400">
                        All inclusive
                      </p>
                      {step < 4 && (
                        <button
                          onClick={() => {
                            methods.setValue("selectedCar", car);
                            methods.setValue("vehicleType", selectedType);
                            setStep(step + 1);
                          }}
                          className="bg-[#f97316] text-white text-xs font-semibold px-4 py-1 rounded hover:bg-[#ea7c2d] transition"
                          type="button"
                        >
                          Select <i className="ml-1 fas fa-arrow-right"></i>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
              {vehicles.length === 0 && !isPending && <p>Not available</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeRide;
