import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosSecureInstance from "../../../Service/APIs/AxiosInstance";



const FlightSearch = () => {
  const [flights, setFlights] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch flights from API on component mount
  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      setError(null);
      try {
        // Replace with your actual API endpoint
        const response = await axiosSecureInstance.get("api/flights");
        setFlights(response.data);
        setFilteredFlights(response.data);
      } catch (err) {
        setError("Failed to fetch flights. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, []);

  // Filter flights when search input changes
  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const filtered = flights.filter(
      (flight) =>
        flight.flightNumber.toLowerCase().includes(lowerSearch) ||
        flight.airline.toLowerCase().includes(lowerSearch)
    );
    setFilteredFlights(filtered);
  }, [search, flights]);

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Search Flights</h1>

      <input
        type="text"
        placeholder="Search by flight number or airline..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 input input-bordered"
      />

      {loading && <p>Loading flights...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Flights List */}
      {!loading && !error && (
        <ul className="p-2 mb-6 overflow-auto rounded-md shadow-md menu bg-base-100 max-h-60">
          {filteredFlights.length === 0 && <li>No flights found</li>}
          {filteredFlights.map((flight) => (
            <li
              key={flight.id}
              className={`cursor-pointer p-2 rounded hover:bg-base-200 ${
                selectedFlight?.id === flight.id ? "bg-primary text-white" : ""
              }`}
              onClick={() => setSelectedFlight(flight)}
            >
              {flight.flightNumber} - {flight.airline}
            </li>
          ))}
        </ul>
      )}

      {/* Selected Flight Details */}
      {selectedFlight && (
        <div className="p-6 rounded-md shadow-md bg-base-200">
          <h2 className="mb-4 text-xl font-semibold">Flight Details</h2>
          <p>
            <strong>Flight Number:</strong> {selectedFlight.flightNumber}
          </p>
          <p>
            <strong>Airline:</strong> {selectedFlight.airline}
          </p>
          <p>
            <strong>Departure Airport:</strong> {selectedFlight.departure}
          </p>
          <p>
            <strong>Arrival Location:</strong> {selectedFlight.arrival}
          </p>
          <p>
            <strong>Date:</strong> {selectedFlight.date}
          </p>
          <p>
            <strong>Time:</strong> {selectedFlight.time}
          </p>
          <p>
            <strong>Status:</strong> {selectedFlight.status}
          </p>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
