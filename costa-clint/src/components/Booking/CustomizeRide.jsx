import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import instance from "../../Service/APIs/AxiosSecure";
import useStep from "../../Hooks/useStep";
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { BookingFormContext } from "../../Service/Context/CreateContext/BookingFormContex";
import { Baby, Briefcase, CalendarDays, User } from "lucide-react";
import TimelineInfo from "./TimelineInfo";

const CustomizeRide = ({ setStepPhase }) => {
  const { methods } = useContext(BookingFormContext);
  const allValues = methods.getValues();
  const [selectedType, setSelectedType] = useState("Sedan");
  const { step, setStep } = useStep();

  // Hardcoded locations for now
  const origin = allValues?.from;
  const destination = allValues?.to;
  console.log(allValues);
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
      instance.get("/api/getAllCarTypeWithPrices").then((res) => res.data),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  const { data: vehicles = [] } = useQuery({
    queryKey: ["vehicles", selectedType],
    queryFn: () =>
      instance
        .get(`api/getAllCarByType?type=${selectedType}`)
        .then((res) => res.data),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });
  console.log(vehicles);
  return (
    <div className="bg-[#f9f9f9] flex text-[#1a1a1a] font-[Inter]">
      <div>
        <div className="flex flex-col items-center bg-gray-100 min-h-screen">
          {/* Ride Info Card */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Ride Info</h2>

              <button
                onClick={() => setStepPhase("initial")}
                className="text-orange-600 font-bold flex items-center space-x-1 hover:text-orange-700"
              >
                <span className="text-sm">✏️</span>
                <span>Modify</span>
              </button>
            </div>

            <div className="flex justify-between text-gray-600 text-sm mb-4">
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
                <div className="w-full h-48 bg-gray-200 rounded-md overflow-hidden mb-4 flex items-center justify-center">
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
                <div className="text-gray-700 text-sm space-y-2">
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
          <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              All our vehicles include:
            </h2>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li className="flex items-center">
                <span className="mr-3 text-gray-500 text-lg">✈️</span> Flight &
                Ride Tracking
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-gray-500 text-lg">📞</span> 24/7
                Customer Call Center
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-gray-500 text-lg">🗣️</span>{" "}
                Multilingual Driver
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-gray-500 text-lg">💰</span> Full
                refund if cancelled 24 hours in advance
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-gray-500 text-lg">⏰</span> Free 60
                min wait at airport pickups
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Vehicle Selection */}
      <div className="max-w-7xl mx-auto mt-7">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          <div className="flex-1">
            <div className="flex text-xs text-gray-600 border border-gray-200 rounded-t-md bg-white select-none overflow-x-auto scrollbar-hide">
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

            <div className="space-y-4 bg-white border border-t-0 border-gray-200 rounded-b-md p-4">
              {vehicles.map((car, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between border border-gray-200 rounded-md p-4"
                >
                  <div className="flex items-center space-x-4 mb-3 sm:mb-0 sm:flex-1">
                    <img
                      src={car.image}
                      alt={car.subtitle}
                      className="w-20 h-auto"
                    />
                    <div className="text-xs text-gray-700">
                      <p className="font-semibold">{car.title}</p>
                      <p className="text-gray-400">{car.subtitle}</p>
                      <div className="flex items-center space-x-3 mt-1">
                        <div className="flex items-center space-x-1">
                          <i className="fas fa-user text-gray-400"></i>
                          <span>Max. 3</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <i className="fas fa-suitcase text-gray-400"></i>
                          <span>Max. 3</span>
                        </div>
                      </div>
                      <label className="inline-flex items-center mt-2 cursor-pointer text-gray-500 text-xs select-none">
                        <input className="form-checkbox" type="checkbox" />
                        <span className="ml-1">Need child seats?</span>
                      </label>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">
                      USD {car.price.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-400 mb-2">All inclusive</p>
                    {step < 4 && (
                      <button
                        onClick={() => {
                          methods.setValue("selectedCarId", car._id);
                          methods.setValue("vehicleType", selectedType);
                          setStep(step + 1);
                        }}
                        className="bg-[#f97316] text-white text-xs font-semibold px-4 py-1 rounded hover:bg-[#ea7c2d] transition"
                        type="button"
                      >
                        Select <i className="fas fa-arrow-right ml-1"></i>
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {vehicles.length === 0 && <p>Not available</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeRide;
