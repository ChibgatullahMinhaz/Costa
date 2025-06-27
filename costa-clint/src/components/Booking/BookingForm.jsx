import { useState, useRef } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { Plane, CheckCircle } from "lucide-react";
import Button from "../UI/Button/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../UI/Card/Card";

const BookingForm = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Replace with your key
    libraries: ["places"],
  });

  const fromRef = useRef();
  const toRef = useRef();

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    passengers: "3",
    flightNumber: "",
    name: "",
    email: "",
    phone: "",
  });

  const [estimatedPrice, setEstimatedPrice] = useState(30);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculatePrice = (passengers) => {
    let basePrice = 30;
    const extraPassengers = Math.max(0, parseInt(passengers) - 3);
    const passengerFee = extraPassengers * 5;
    setEstimatedPrice(basePrice + passengerFee);
  };

  if (!isLoaded) return <div>Loading Google Maps...</div>;

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
          <Plane className="mr-2 h-6 w-6 text-tropical-600" /> Book Your
          Transfer
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <select
          className="w-full border border-gray-300 rounded-md p-2"
          value={formData.transferType}
          onChange={(e) => handleInputChange("transferType", e.target.value)}
        >
          <option value="airport-hotel">Airport ↔ Hotel</option>
          <option value="hotel-hotel">Hotel ↔ Hotel</option>
        </select>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* From Location */}
          <div>
            <label className="text-sm font-medium mb-2 block">From *</label>
            <Autocomplete
              onPlaceChanged={() => {
                const place = fromRef.current.getPlace();
                handleInputChange("from", place.formatted_address);
              }}
            >
              <input
                type="text"
                placeholder="Enter pickup location"
                ref={fromRef}
                className="w-full border p-2 rounded"
              />
            </Autocomplete>
          </div>

          {/* To Location */}
          <div>
            <label className="text-sm font-medium mb-2 block">To *</label>
            <Autocomplete
              onPlaceChanged={() => {
                const place = toRef.current.getPlace();
                handleInputChange("to", place.formatted_address);
              }}
            >
              <input
                type="text"
                placeholder="Enter drop-off location"
                ref={toRef}
                className="w-full border p-2 rounded"
              />
            </Autocomplete>
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Date *</label>
            <input
              type="date"
              className="w-full border p-2 rounded"
              value={formData.date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => handleInputChange("date", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Time *</label>
            <input
              type="time"
              className="w-full border p-2 rounded"
              value={formData.time}
              onChange={(e) => handleInputChange("time", e.target.value)}
            />
          </div>
        </div>

        {/* Passengers & Flight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Passengers</label>
            <select
              className="w-full border p-2 rounded"
              value={formData.passengers}
              onChange={(e) => {
                handleInputChange("passengers", e.target.value);
                calculatePrice(e.target.value);
              }}
            >
              {Array.from({ length: 8 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "Passenger" : "Passengers"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Flight Number (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. AA1234"
              className="w-full border p-2 rounded"
              value={formData.flightNumber}
              onChange={(e) =>
                handleInputChange("flightNumber", e.target.value)
              }
            />
          </div>
        </div>

        <button
          className="w-full bg-gradient-to-r from-[#00b0bb] via-[#00afb8] to-[#00afb9] hover:bg-gradient-to-br 
  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg 
  shadow-[#00afb9] dark:shadow-lg dark:shadow-[#00afb9] rounded-lg px-5 text-center me-2 mb-2 mt-4 
  hover:bg-[#00afb9] text-white font-semibold text-lg py-4 hover:scale-105 transition-all duration-200"
        >
          Choose Vehicle
        </button>

        <p className="text-xs text-gray-500 text-center">
          * Final price may vary based on exact distance and time
        </p>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
