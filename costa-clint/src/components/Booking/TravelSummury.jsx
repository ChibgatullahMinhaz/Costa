// src/components/TravelSummary.jsx
import React from "react";
import ServiceFeatures from "./ServiceFeatures";

const TravelSummary = ({ methods }) => {
  const travelInfo = methods?.getValues() || {};
  console.log(travelInfo);
  return (
    <div className="flex gap-6 p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      {/* Right side - Dummy Map */}
      <div className="flex-1">
        <div className=" bg-gray-200 rounded-md flex items-center justify-center text-gray-500 font-semibold">
          <span>Map placeholder</span>
        </div>

        <ServiceFeatures />
      </div>
      {/* Left side - Travel Info */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">Travel Information</h2>
        <div className="space-y-3 text-gray-700">
          {travelInfo.transferType && (
            <p>
              <strong>Transfer Type:</strong> {travelInfo.transferType}
            </p>
          )}
          {travelInfo.from && (
            <p>
              <strong>From:</strong> {travelInfo.from}
            </p>
          )}
          {travelInfo.to && (
            <p>
              <strong>To:</strong> {travelInfo.to}
            </p>
          )}
          {travelInfo.date && (
            <p>
              <strong>Date:</strong> {travelInfo.date}
            </p>
          )}
          {travelInfo.time && (
            <p>
              <strong>Pick Up Time:</strong> {travelInfo.time}
            </p>
          )}
          {travelInfo.duration && (
            <p>
              <strong>Service time:</strong>
              {travelInfo.duration} Hour
            </p>
          )}

          {travelInfo.passengers && (
            <p>
              <strong>Passengers:</strong> {travelInfo.passengers}
            </p>
          )}
          {travelInfo.flightNumber && (
            <p>
              <strong>Flight Number:</strong> {travelInfo.flightNumber}
            </p>
          )}
          {travelInfo.luggage && (
            <p>
              <strong>Luggage:</strong> {travelInfo.luggage}{" "}
              {travelInfo.luggage === 1 ? "bag" : "bags"}
            </p>
          )}
          {travelInfo.duration && (
            <p>
              <strong>Duration:</strong> {travelInfo.duration}{" "}
              {travelInfo.duration === 1 ? "hour" : "hours"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelSummary;
