import React, { useState } from "react";
import axios from "axios";
import axiosSecurePublic from "../../../Service/APIs/AxiosPublic";

const FlightSearch = () => {
  const [search, setSearch] = useState("");
  const [flightDetails, setFlightDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_FLIGHT_API_KEY;

  const handleSearch = async () => {
    if (!search.trim()) return;
    setLoading(true);
    setError(null);
    setFlightDetails(null);

    try {
      const response = await axiosSecurePublic.get(`api/flights/${search.trim()}`);
      if (response.data) {
        setFlightDetails(response?.data);
      } else {
        setError("No flight found with that number.");
      }
    } catch (err) {
      setError("Failed to fetch flight details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (isoString) => {
    return isoString
      ? new Date(isoString).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "N/A";
  };

  return (
    <div className="max-w-3xl p-6 mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-center">
        Search Flight by Number
      </h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter flight number (e.g., AA100)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full input input-bordered"
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

      {loading && (
        <p className="text-center text-gray-600">Loading flight details...</p>
      )}
      {error && <p className="text-center text-red-600">{error}</p>}

      {flightDetails && (
        <div className="p-6 space-y-3 bg-white border border-gray-200 rounded-lg shadow-lg">
          <h2 className="pb-2 mb-3 text-xl font-semibold border-b">
            Flight Details
          </h2>

          {/* Original Fields */}
          <p>
            <strong>Flight Number:</strong>{" "}
            {flightDetails.flight?.iata || "N/A"}
          </p>
          <p>
            <strong>Airline:</strong> {flightDetails.airline?.name || "N/A"}
          </p>
          <p>
            <strong>Departure Airport:</strong>{" "}
            {flightDetails.departure?.airport || "N/A"} (
            {flightDetails.departure?.iata || "N/A"})
          </p>
          <p>
            <strong>Arrival Airport:</strong>{" "}
            {flightDetails.arrival?.airport || "N/A"} (
            {flightDetails.arrival?.iata || "N/A"})
          </p>
          <p>
            <strong>Departure Time:</strong>{" "}
            {formatTime(flightDetails.departure?.scheduled)}
          </p>
          <p>
            <strong>Arrival Time:</strong>{" "}
            {formatTime(flightDetails.arrival?.scheduled)}
          </p>
          <p>
            <strong>Status:</strong> {flightDetails.flight_status || "N/A"}
          </p>

          {/* New Fields Added */}
          <p>
            <strong>Estimated Departure:</strong>{" "}
            {formatTime(flightDetails.departure?.estimated)}
          </p>
          <p>
            <strong>Estimated Arrival:</strong>{" "}
            {formatTime(flightDetails.arrival?.estimated)}
          </p>
          <p>
            <strong>Departure Delay:</strong>{" "}
            {flightDetails.departure?.delay ?? "N/A"} min
          </p>
          <p>
            <strong>Arrival Delay:</strong>{" "}
            {flightDetails.arrival?.delay ?? "N/A"} min
          </p>
          <p>
            <strong>Departure Terminal / Gate:</strong>{" "}
            {flightDetails.departure?.terminal || "N/A"} /{" "}
            {flightDetails.departure?.gate || "N/A"}
          </p>
          <p>
            <strong>Arrival Terminal / Gate:</strong>{" "}
            {flightDetails.arrival?.terminal || "N/A"} /{" "}
            {flightDetails.arrival?.gate || "N/A"}
          </p>
          <p>
            <strong>Aircraft:</strong>{" "}
            {flightDetails.aircraft?.registration || "N/A"} (
            {flightDetails.aircraft?.icao24 || "N/A"})
          </p>

          {/*Live Tracking */}
          {flightDetails.latitude && flightDetails.longitude && (
            <p>
              <strong>Live Location:</strong> Lat {flightDetails.latitude}, Lon{" "}
              {flightDetails.longitude}
            </p>
          )}
          {flightDetails.altitude && (
            <p>
              <strong>Altitude:</strong> {flightDetails.altitude} ft
            </p>
          )}
          {flightDetails.speed_horizontal && (
            <p>
              <strong>Speed:</strong> {flightDetails.speed_horizontal} km/h
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
