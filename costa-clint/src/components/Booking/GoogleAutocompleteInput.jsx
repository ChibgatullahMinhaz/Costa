import React, { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

const allowedAirports = [
  { name: "Juan Santamaría International", code: "SJO", aliases: ["Alajuela"] },
  { name: "Daniel Oduber Quirós International", code: "LIR", aliases: ["Liberia", "Guanacaste"] },
  { name: "Tobías Bolaños Domestic", code: "SYQ", aliases: ["San José"] },
];

// Helper to detect allowed airport
const getAllowedAirportFromInput = (input) => {
  const lowerInput = input.toLowerCase();
  return (
    allowedAirports.find(
      (airport) =>
        lowerInput.includes(airport.name.toLowerCase()) ||
        lowerInput.includes(airport.code.toLowerCase()) ||
        airport.aliases.some((alias) => lowerInput.includes(alias.toLowerCase()))
    ) || null
  );
};

// Helper to check allowed place (airport or hotel/resort in CR)
const isAllowedPlace = (description) => {
  const descLower = description.toLowerCase();
  return allowedAirports.some((airport) => {
    const inNameOrCode =
      descLower.includes(airport.name.toLowerCase()) ||
      descLower.includes(airport.code.toLowerCase());
    const inAliases = airport.aliases.some((alias) =>
      descLower.includes(alias.toLowerCase())
    );
    const hotelMatch =
      descLower.includes("hotel") ||
      descLower.includes("resort") ||
      descLower.includes("lodge");
    return inNameOrCode || inAliases || hotelMatch;
  });
};

const GoogleAutocompleteInput = ({ value, onPlaceSelect, placeholder }) => {
  const { register } = useFormContext();
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [inputValue, setInputValue] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const serviceRef = useRef(null);

  // Flight-related states
  const [flightSuggestions, setFlightSuggestions] = useState([]);
  const [isFlightField, setIsFlightField] = useState(false);

  // Departure flight states
  const [departureInput, setDepartureInput] = useState("");
  const [showDepartureSuggestions, setShowDepartureSuggestions] = useState(false);
  const [departureLoading, setDepartureLoading] = useState(false);

  useEffect(() => {
    if (window.google?.maps?.places) {
      serviceRef.current = new window.google.maps.places.AutocompleteService();
    } else {
      console.error("Google Places is not loaded!");
    }
  }, []);

  // Fetch flight data from AviationStack
  const fetchFlightData = async (airportCode, isDepartureField = false) => {
    if (!airportCode) return;

    if (isDepartureField) setDepartureLoading(true);
    else setLoading(true);

    try {
      const res = await fetch(
        `http://api.aviationstack.com/v1/flights?access_key=${import.meta.env.VITE_FLIGHT_API_KEY}&arr_iata=${airportCode}`
      );
      const json = await res.json();

      if (!json.data || !Array.isArray(json.data)) {
        if (isDepartureField) setFlightSuggestions([]);
        else setFlightSuggestions([]);
        return;
      }

      const flights = json.data.map((flight, index) => ({
        id: index,
        airline: flight.airline?.name || "Unknown Airline",
        flightNumber: flight.flight?.iata || "Unknown Flight",
        time: flight.arrival?.scheduled
          ? new Date(flight.arrival.scheduled).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Unknown",
        origin: flight.departure?.iata || "Unknown",
      }));

      setFlightSuggestions(flights);
    } catch (error) {
      console.error("Error fetching flights:", error);
      setFlightSuggestions([]);
    }

    if (isDepartureField) setDepartureLoading(false);
    else setLoading(false);
  };

  const fetchSuggestions = (input) => {
    if (!serviceRef.current || !input) {
      setSuggestions([]);
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
          const filtered = predictions.filter((p) => isAllowedPlace(p.description));
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

    const detectedAirport = getAllowedAirportFromInput(val);
    if (detectedAirport) {
      setIsFlightField(true);
      fetchFlightData(detectedAirport.code);
    } else {
      setIsFlightField(false);
      fetchSuggestions(val);
    }
  };

  const handleSelect = (description) => {
    if (!isAllowedPlace(description)) {
      alert("Selected place is not allowed.");
      return;
    }
    setInputValue(description);
    setSuggestions([]);
    setSelectedPlace(description);
    setHasSearched(false);
    onPlaceSelect(description);
  };

  const handleFlightSelect = (flight) => {
    setInputValue(flight.flightNumber); // Show only flight number
    setFlightSuggestions([]);
    setSelectedPlace(flight.flightNumber);
    onPlaceSelect(flight.flightNumber); // Pass only flight number to parent
  };

  const handleDepartureFocus = () => {
    if (!selectedPlace) return;
    const airport = getAllowedAirportFromInput(selectedPlace);
    if (airport) {
      fetchFlightData(airport.code, true);
      setShowDepartureSuggestions(true);
    }
  };

  const handleDepartureSelect = (flight) => {
    setDepartureInput(flight.flightNumber); // Store only flight number
    setShowDepartureSuggestions(false);
    onPlaceSelect(flight.flightNumber);
  };

  return (
    <div className="relative space-y-4">
      {/* Main input */}
      <input
        className="w-full p-2 border rounded"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />

      {(isFlightField ? flightSuggestions.length > 0 : suggestions.length > 0) && (
        <ul className="absolute z-10 w-full mt-1 overflow-auto text-sm bg-white border rounded shadow-md max-h-40">
          {loading && <li className="px-3 py-2 text-gray-500">Loading...</li>}

          {!loading &&
            !isFlightField &&
            suggestions.map((s) => (
              <li
                key={s.place_id}
                onClick={() => handleSelect(s.description)}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
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
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                ✈ {flight.airline} {flight.flightNumber} — {flight.time} from {flight.origin}
              </li>
            ))}
        </ul>
      )}

      {/* Departure Flight Input */}
      {selectedPlace && (
        <>
          <p>Arrival Flight Info</p>
          <input
            className="w-full p-2 border rounded"
            placeholder="Departure flight number"
            value={departureInput}
            onFocus={handleDepartureFocus}
            onChange={(e) => setDepartureInput(e.target.value)}
            {...register("flight")}
          />
        </>
      )}

      {showDepartureSuggestions && (
        <ul className="absolute z-10 w-full mt-1 overflow-auto text-sm bg-white border rounded shadow-md max-h-40">
          {departureLoading && <li className="px-3 py-2 text-gray-500">Loading flights...</li>}

          {!departureLoading &&
            flightSuggestions.map((flight) => (
              <li
                key={flight.id}
                onClick={() => handleDepartureSelect(flight)}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                ✈ {flight.airline} {flight.flightNumber} — {flight.time} from {flight.origin}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default GoogleAutocompleteInput;
