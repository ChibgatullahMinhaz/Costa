import React, { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

const allowedAirports = [
  { name: "Juan Santamaría International", code: "SJO" },
  { name: "Daniel Oduber Quirós International", code: "LIR" },
  { name: "Tobías Bolaños Domestic", code: "SYQ" },
];

// Check if input contains an allowed airport name or code, returns matched code or null
const getAirportCodeFromInput = (input) => {
  const lowerInput = input.toLowerCase();
  for (const airport of allowedAirports) {
    if (
      lowerInput.includes(airport.name.toLowerCase()) ||
      lowerInput.includes(airport.code.toLowerCase())
    ) {
      return airport.code;
    }
  }
  return null;
};

const isAllowedPlace = (description) => {
  const airportMatch = allowedAirports.some(
    (airport) =>
      description.toLowerCase().includes(airport.name.toLowerCase()) ||
      description.toLowerCase().includes(airport.code.toLowerCase())
  );

  const hotelMatch =
    description.toLowerCase().includes("hotel") ||
    description.toLowerCase().includes("resort") ||
    description.toLowerCase().includes("lodge");

  return airportMatch || hotelMatch;
};

const GoogleAutocompleteInput = ({ value, onPlaceSelect, placeholder }) => {
  const { register } = useFormContext();
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [inputValue, setInputValue] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const serviceRef = useRef(null);

  // Flight related states for second input field
  const [flightSuggestions, setFlightSuggestions] = useState([]);
  const [isFlightField, setIsFlightField] = useState(false);

  // New states for Departure Flight Info input
  const [departureInput, setDepartureInput] = useState("");
  const [showDepartureSuggestions, setShowDepartureSuggestions] =
    useState(false);
  const [departureLoading, setDepartureLoading] = useState(false);

  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      serviceRef.current = new window.google.maps.places.AutocompleteService();
    } else {
      console.error("Google Places is not loaded!");
    }
  }, []);

  // Fetch flight data dynamically based on airport code
  const fetchFlightData = async (airportCode, isDepartureField = false) => {
    if (!airportCode) {
      if (isDepartureField) setFlightSuggestions([]);
      else setFlightSuggestions([]);
      return;
    }
    if (isDepartureField) setDepartureLoading(true);
    else setLoading(true);

    try {
      const response = await fetch(
        `https://aviation-edge.com/v2/public/flights?key=YOUR_API_KEY&arrIata=${airportCode}`
      );
      const data = await response.json();
      if (!Array.isArray(data)) {
        if (isDepartureField) setFlightSuggestions([]);
        else setFlightSuggestions([]);
        if (isDepartureField) setDepartureLoading(false);
        else setLoading(false);
        return;
      }
      const flights = data.map((flight, index) => ({
        id: index,
        airline: flight.airline?.name || "Unknown Airline",
        flightNumber: flight.flight?.iataNumber || "Unknown Flight",
        time: flight.arrival?.scheduledTime
          ? new Date(flight.arrival.scheduledTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Unknown",
        origin: flight.departure?.iataCode || "Unknown",
      }));

      if (isDepartureField) setFlightSuggestions(flights);
      else setFlightSuggestions(flights);
    } catch (error) {
      console.error("Error fetching flight data:", error);
      if (isDepartureField) setFlightSuggestions([]);
      else setFlightSuggestions([]);
    }

    if (isDepartureField) setDepartureLoading(false);
    else setLoading(false);
  };

  const fetchSuggestions = (input) => {
    if (!serviceRef.current || !input) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);

    serviceRef.current.getQueryPredictions(
      { input, componentRestrictions: { country: "cr" } },
      (predictions, status) => {
        setLoading(false);
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          predictions.length > 0
        ) {
          const filtered = predictions.filter((p) =>
            isAllowedPlace(p.description)
          );
          setSuggestions(filtered);
        } else {
          setSuggestions([]);
        }
      }
    );
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    setSelectedPlace(null);
    onPlaceSelect(val);

    const detectedAirportCode = getAirportCodeFromInput(val);
    if (detectedAirportCode) {
      setIsFlightField(true);
      fetchFlightData(detectedAirportCode);
    } else {
      setIsFlightField(false);
      fetchSuggestions(val);
    }
  };

  const handleSelect = (description) => {
    setInputValue(description);
    setSuggestions([]);
    setSelectedPlace(description);
    setHasSearched(false);
    onPlaceSelect(description);

    // Clear departure input and flight suggestions when new place selected
    setDepartureInput("");
    setFlightSuggestions([]);
    setShowDepartureSuggestions(false);
  };

  const handleFlightSelect = (flight) => {
    const formatted = `${flight.airline} ${flight.flightNumber} - ${flight.time} from ${flight.origin}`;
    setInputValue(formatted);
    setFlightSuggestions([]);
    setSelectedPlace(formatted);
    setHasSearched(false);
    onPlaceSelect(formatted);

    setDepartureInput(formatted);
    setShowDepartureSuggestions(false);
  };

  const handleDepartureFocus = () => {
    if (!selectedPlace) return;
    const airportCode = getAirportCodeFromInput(selectedPlace);
    if (airportCode) {
      fetchFlightData(airportCode, true);
      setShowDepartureSuggestions(true);
    }
  };

  const handleDepartureSelect = (flight) => {
    const formatted = `${flight.airline} ${flight.flightNumber} - ${flight.time} from ${flight.origin}`;
    setDepartureInput(formatted);
    setShowDepartureSuggestions(false);
    onPlaceSelect(formatted);
  };

  return (
    <div className="relative space-y-4">
      {/* Main location input */}
      <input
        className="w-full border p-2 rounded"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />

      {(isFlightField
        ? flightSuggestions.length > 0
        : suggestions.length > 0) ||
      loading ||
      (hasSearched &&
        suggestions.length === 0 &&
        flightSuggestions.length === 0) ? (
        <ul className="absolute w-full bg-white border border-gray-300 shadow-md z-10 max-h-40 overflow-auto rounded mt-1 text-sm">
          {loading && (
            <li className="px-3 py-2 text-gray-500 animate-pulse">
              Loading suggestions...
            </li>
          )}

          {!loading &&
            hasSearched &&
            suggestions.length === 0 &&
            flightSuggestions.length === 0 && (
              <li className="px-3 py-2 italic text-gray-400">
                No results found
              </li>
            )}

          {!loading &&
            !isFlightField &&
            suggestions.map((s) => (
              <li
                key={s.place_id}
                onClick={() => handleSelect(s.description)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {s.description}
              </li>
            ))}

          {!loading &&
            isFlightField &&
            flightSuggestions.map((flight) => (
              <li
                key={flight.id}
                onClick={() => handleFlightSelect(flight)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                ✈ {flight.airline} {flight.flightNumber} - {flight.time} from{" "}
                {flight.origin}
              </li>
            ))}
        </ul>
      ) : null}

      {/* Selected place clickable to resuggest */}
      {selectedPlace && (
        <>
          <p>Arrival Flight Info</p>
          <input
            className="w-full border p-2 rounded "
            placeholder={`Departure Flight Info\nAirline, flight no., time, destination airport`}
            defaultValue={departureInput}
            onFocus={handleDepartureFocus}
            onChange={(e) => setDepartureInput(e.target.value)}
            {...register("flight")}
          />
        </>
      )}

      {/* Departure flight suggestions dropdown */}
      {showDepartureSuggestions && (
        <ul className="absolute w-full bg-white border border-gray-300 shadow-md z-10 max-h-40 overflow-auto rounded mt-1 text-sm">
          {departureLoading && (
            <li className="px-3 py-2 text-gray-500 animate-pulse">
              Loading flight info...
            </li>
          )}

          {!departureLoading &&
            flightSuggestions.length === 0 &&
            !departureInput && (
              <li className="px-3 py-2 italic text-gray-400">
                No flights found
              </li>
            )}

          {!departureLoading &&
            flightSuggestions.map((flight) => (
              <li
                key={flight.id}
                onClick={() => handleDepartureSelect(flight)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                ✈ {flight.airline} {flight.flightNumber} - {flight.time} from{" "}
                {flight.origin}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default GoogleAutocompleteInput;
