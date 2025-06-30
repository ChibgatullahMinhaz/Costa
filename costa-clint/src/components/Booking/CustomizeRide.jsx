import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import instance from "../../Service/APIs/AxiosSecure";
import useStep from "../../Hooks/useStep";

const vehiclesData = [
  {
    type: "Sedan",
    title: "Sedan",
    subtitle: "Toyota Camry or similar",
    price: 202.5,
    image:
      "https://storage.googleapis.com/a1aa/image/1605796e-92e9-4489-c6d0-e2ed627a7f6a.jpg",
  },
  {
    type: "Sedan",
    title: "Comfort Sedan",
    subtitle: "Toyota Camry or similar",
    price: 216.0,
    image:
      "https://storage.googleapis.com/a1aa/image/033ed0b8-fa2d-47c5-7586-0d43e422ce6c.jpg",
  },
  {
    type: "Sedan",
    title: "EV Sedan",
    subtitle: "Chevy Bolt EUV or similar",
    price: 221.49,
    image:
      "https://storage.googleapis.com/a1aa/image/feda6b9f-e80f-4efc-138d-fa44c6bfe86e.jpg",
  },
  {
    type: "Sedan",
    title: "Business Sedan",
    subtitle: "Lincoln Continental or similar",
    price: 233.1,
    image:
      "https://storage.googleapis.com/a1aa/image/d5df21fe-7544-41e7-ae35-1af546087a12.jpg",
  },
  {
    type: "Sedan",
    title: "First Class",
    subtitle: "Mercedes S550 or similar",
    price: 763.42,
    image:
      "https://storage.googleapis.com/a1aa/image/1e06f65f-f4e8-4869-4f6d-839a14fc83b7.jpg",
  },
  {
    type: "Minivan",
    title: "Minivan XL",
    subtitle: "Chrysler Pacifica or similar",
    price: 250.0,
    image: "https://storage.googleapis.com/a1aa/image/6-minivan.jpg",
  },
  {
    type: "Black",
    title: "Black SUV",
    subtitle: "Cadillac Escalade or similar",
    price: 290.0,
    image: "https://storage.googleapis.com/a1aa/image/7-black.jpg",
  },
  {
    type: "SUV",
    title: "Standard SUV",
    subtitle: "Toyota Highlander or similar",
    price: 275.0,
    image: "https://storage.googleapis.com/a1aa/image/8-suv.jpg",
  },
  {
    type: "Minibus",
    title: "City Minibus",
    subtitle: "Ford Transit or similar",
    price: 491.22,
    image: "https://storage.googleapis.com/a1aa/image/9-minibus.jpg",
  },
  {
    type: "Buses",
    title: "Luxury Bus",
    subtitle: "Volvo 9700 or similar",
    price: 1468.12,
    image: "https://storage.googleapis.com/a1aa/image/10-bus.jpg",
  },
];

const CustomizeRide = () => {
  const [selectedType, setSelectedType] = useState("Sedan");
  const { step, setStep } = useStep();
  const {
    data: types = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: () =>
      instance.get("/api/getAllCarTypeWithPrices").then((res) => res.data),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: vehicles = [],
    isLoading: loading,
    isError: ifError,
  } = useQuery({
    queryKey: ["vehicles", selectedType],
    queryFn: () =>
      instance
        .get(`api/getAllCarByType?type=${selectedType}`)
        .then((res) => res.data),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="bg-[#f9f9f9] flex text-[#1a1a1a]  font-[Inter]">
      <div>
        <div className="flex flex-col items-center  bg-gray-100 min-h-screen">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Customize Your Ride
          </h1>

          {/* Ride Info Card */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Ride Info</h2>
              <button className="text-orange-600 font-bold flex items-center space-x-1 hover:text-orange-700">
                <span className="text-sm">✏️</span>
                <span>Modify</span>
              </button>
            </div>

            <div className="flex justify-between text-gray-600 text-sm mb-4">
              <span>2025-07-02, Wed</span>
              <span>👥 3</span>
              <span>👜 3</span>
            </div>

            {/* Map Container - Replace with your actual map image or map component */}
            <div className="w-full h-48 bg-gray-200 rounded-md overflow-hidden mb-4 flex items-center justify-center">
              <img
                src="https://via.placeholder.com/400x200?text=Map+Goes+Here"
                alt="Ride Map"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-gray-700 text-sm space-y-2">
              <p className="flex items-center">
                <span className="mr-2 text-gray-500">⏰</span> 04:04 AM
              </p>
              <p className="flex items-center">
                <span className="mr-2 text-gray-500">📍</span> John F. Kennedy
                International Airport
              </p>
              <p className="flex items-center">
                <span className="mr-2 text-gray-500">📍</span> Newark Liberty
                International Airport
              </p>
              <p className="flex items-center">
                <span className="mr-2 text-gray-500">🚗</span> Estimated at 37.1
                miles and 58 minutes
              </p>
            </div>
          </div>

          {/* Vehicle Features Card */}
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
                Multi-lingual Driver
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-gray-500 text-lg">💰</span> Full
                refund if cancelled 24 hours before the service, online
                cancellation available.
              </li>
              <li className="flex items-center">
                <span className="mr-3 text-gray-500 text-lg">⏰</span> Free 60
                minutes waiting time for airport pickups, 15 minutes for all
                others.
              </li>
            </ul>
          </div>
        </div>
      </div>
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
                        onClick={() => setStep(step + 1)}
                        className="bg-[#f97316] text-white text-xs font-semibold px-4 py-1 rounded hover:bg-[#ea7c2d] transition"
                        type="button"
                      >
                        Select <i className="fas fa-arrow-right ml-1"></i>
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {vehicles.length === 0 && (
                <>
                  <p>not available</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeRide;
