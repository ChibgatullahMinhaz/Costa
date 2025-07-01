import React, { useState, useEffect, useRef } from 'react';

const GoogleAutocompleteInput = ({ value, onPlaceSelect, placeholder }) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const serviceRef = useRef(null);

  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      serviceRef.current = new window.google.maps.places.AutocompleteService();
    } else {
      console.error('Google Places is not loaded!');
    }
  }, []);

  const fetchSuggestions = (input) => {
    if (!serviceRef.current || input.length < 3) {
      setSuggestions([]);
      return;
    }

    serviceRef.current.getQueryPredictions(
      { input, componentRestrictions: { country: 'cr' } },
      (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setSuggestions(predictions);
        } else {
          setSuggestions([]);
        }
      }
    );
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onPlaceSelect(e.target.value);
    fetchSuggestions(e.target.value);
  };

  const handleSelect = (description) => {
    setInputValue(description);
    setSuggestions([]);
    onPlaceSelect(description);
  };

  return (
    <div className="relative">
      <input
        className="w-full border p-2 rounded"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />
      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border z-10 max-h-40 overflow-auto">
          {suggestions.map((s) => (
            <li
              key={s.place_id}
              onClick={() => handleSelect(s.description)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {s.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GoogleAutocompleteInput;
