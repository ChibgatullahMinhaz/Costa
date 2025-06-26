import { useState } from "react";

import {
  Calendar,
  MapPin,
  Plane,
  Users,
  Clock,
  DollarSign,
  CheckCircle,
} from "lucide-react";
import Button from "../UI/Button/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../UI/Card/Card";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    transferType: "airport-hotel",
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
  const [showContactForm, setShowContactForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const airports = [
    { code: "SJO", name: "Juan Santamaría International (SJO)" },
    { code: "LIR", name: "Daniel Oduber Quirós International (LIR)" },
    { code: "SYQ", name: "Tobías Bolaños Domestic (SYQ)" },
  ];

  const popularDestinations = [
    "Manuel Antonio",
    "Tamarindo",
    "La Fortuna",
    "Monteverde",
    "Jaco",
    "Guanacaste",
    "San José Hotels",
  ];

  const calculatePrice = (passengers) => {
    let basePrice = 30;
    const extraPassengers = Math.max(0, parseInt(passengers) - 3);
    const passengerFee = extraPassengers * 5;

    setEstimatedPrice(basePrice + passengerFee);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleQuoteSubmit = () => {
    if (!formData.from || !formData.to || !formData.date || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to get a quote.",
        variant: "destructive",
      });
      return;
    }
    setShowContactForm(true);
    toast({
      title: "Quote Generated!",
      description: `Your estimated price is $${estimatedPrice} USD`,
    });
  };

  const handleBookingSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Contact Information Required",
        description:
          "Please fill in all contact details to complete your booking.",
        variant: "destructive",
      });
      return;
    }

    // Simulate booking creation
    const bookingId = `PV${Date.now().toString().slice(-6)}`;
    localStorage.setItem(
      "lastBooking",
      JSON.stringify({
        ...formData,
        bookingId,
        price: estimatedPrice,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      })
    );

    setIsSubmitted(true);
    toast({
      title: "Booking Confirmed!",
      description: `Your booking ID is ${bookingId}. Confirmation email sent!`,
    });
  };

  if (isSubmitted) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-tropical-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Booking Confirmed!
          </h3>
          <p className="text-gray-600 mb-4">
            Thank you for choosing Pura Vida Transfers
          </p>
          <div className="bg-tropical-50 rounded-lg p-4 mb-4">
            <p className="font-semibold">Booking Details:</p>
            <p>
              {formData.from} → {formData.to}
            </p>
            <p>
              {formData.date} at {formData.time}
            </p>
            <p className="text-tropical-600 font-bold">${estimatedPrice} USD</p>
          </div>
          <Button
            onClick={() => {
              setIsSubmitted(false);
              setShowContactForm(false);
              setFormData({
                transferType: "airport-hotel",
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
            }}
            className="bg-tropical-gradient"
          >
            Book Another Transfer
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
          <Plane className="mr-2 h-6 w-6 text-tropical-600" />
          {showContactForm ? "Complete Your Booking" : "Book Your Transfer"}
        </CardTitle>
        <p className="text-gray-600">
          {showContactForm
            ? "Enter your contact details"
            : "Quick and easy booking in USD"}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {!showContactForm ? (
          <>
            {/* Transfer Type */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Transfer Type
              </label>
              <select
                className="w-full border border-gray-300 rounded-md p-2"
                value={formData.transferType}
                onChange={(e) =>
                  handleInputChange("transferType", e.target.value)
                }
              >
                <option value="airport-hotel">Airport ↔ Hotel</option>
                <option value="hotel-hotel">Hotel ↔ Hotel</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* From Location */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center">
                  From *
                </label>
                <select
                  className="w-full border p-2 rounded"
                  value={formData.from}
                  onChange={(e) => handleInputChange("from", e.target.value)}
                >
                  <option value="" disabled>
                    Select origin
                  </option>
                  {(formData.transferType === "airport-hotel"
                    ? airports
                    : popularDestinations
                  ).map((item) => (
                    <option key={item.code || item} value={item.code || item}>
                      {item.name || item}
                    </option>
                  ))}
                </select>
              </div>

              {/* To Location */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center">
                  To *
                </label>
                <select
                  className="w-full border p-2 rounded"
                  value={formData.to}
                  onChange={(e) => handleInputChange("to", e.target.value)}
                >
                  <option value="" disabled>
                    Select destination
                  </option>
                  {(formData.transferType === "airport-hotel"
                    ? popularDestinations
                    : airports
                  ).map((item) => (
                    <option key={item.code || item} value={item.code || item}>
                      {item.name || item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Date */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center">
                  Date *
                </label>
                <input
                  type="date"
                  className="w-full border p-2 rounded"
                  value={formData.date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                />
              </div>

              {/* Time */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center">
                  Time *
                </label>
                <input
                  type="time"
                  className="w-full border p-2 rounded"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Passengers */}
              <div>
                <label className="text-sm font-medium mb-2 block flex items-center">
                  Passengers
                </label>
                <select
                  className="w-full border p-2 rounded"
                  value={formData.passengers}
                  onChange={(e) =>
                    handleInputChange("passengers", e.target.value)
                  }
                >
                  {Array.from({ length: 8 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Passenger" : "Passengers"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Flight Number */}
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

            {/* Estimated Price */}
            <div className="bg-tropical-50 rounded-lg p-4 mt-6 border">
              <div className="flex items-center justify-between">
                <div className="font-medium text-gray-700">
                  Estimated Price:
                </div>
                <div className="text-2xl font-bold text-tropical-600">
                  ${estimatedPrice} USD
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Base rate $30 + $
                {parseInt(formData.passengers) > 3
                  ? (parseInt(formData.passengers) - 3) * 5
                  : 0}{" "}
                extra passengers
              </p>
            </div>

            {/* Get Quote Button */}
            <button
              //   onClick={handleQuoteSubmit}
              className="w-full  bg-gradient-to-r from-[#00b0bb] via-[#00afb8] to-[#00afb9] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-[#00afb9] dark:shadow-lg dark:shadow-[#00afb9]  rounded-lg  px-5  text-center me-2 mb-2 mt-4   hover:bg-[#00afb9] text-white font-semibold text-lg py-4  hover:scale-105 transition-all duration-200"
            >
              Choose Vehicle
            </button>
            {/* <button
              type="button"
              class="text-white bg-gradient-to-r from-[#00b0bb] via-[#00afb8] to-[#00afb9] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-[#00afb9] dark:shadow-lg dark:shadow-[#00afb9] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
            >
              Blue
            </button> */}
          </>
        ) : (
          <>{/* Contact Form and Summary */}</>
        )}
        <p className="text-xs text-gray-500 text-center">
          * Final price may vary based on exact distance and time
        </p>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
