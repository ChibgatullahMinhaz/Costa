import React, { useState } from "react";
import axios from "axios";

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
      const response = await axios.get(
        `http://api.aviationstack.com/v1/flights`,
        {
          params: {
            access_key: API_KEY,
            flight_iata: search.trim(), 
          },
        }
      );

      if (response.data?.data?.length > 0) {
        setFlightDetails(response.data.data[0]);
      } else {
        setError("No flight found with that number.");
      }
    } catch (err) {
      setError("Failed to fetch flight details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl p-6 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Search Flight by Number</h1>

      <div className="flex gap-2 mb-4">
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

      {loading && <p>Loading flight details...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {flightDetails && (
        <div className="p-6 rounded-md shadow-md bg-base-200">
          <h2 className="mb-4 text-xl font-semibold">Flight Details</h2>
          <p>
            <strong>Flight Number:</strong> {flightDetails.flight?.iata || "N/A"}
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
            {flightDetails.departure?.scheduled || "N/A"}
          </p>
          <p>
            <strong>Arrival Time:</strong>{" "}
            {flightDetails.arrival?.scheduled || "N/A"}
          </p>
          <p>
            <strong>Status:</strong> {flightDetails.flight_status || "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
