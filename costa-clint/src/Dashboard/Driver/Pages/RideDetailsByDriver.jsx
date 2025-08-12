import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosSecureInstance from "../../../Service/APIs/AxiosInstance";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const RideDetailsByDriver = () => {
  const { id } = useParams();
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const res = await axiosSecureInstance.get(
          `api/driver/ride-details/${id}`
        );
        if (!res.data) {
          setNotFound(true);
        } else {
          setRide(res.data);
          generateMap(res.data.from, res.data.to);
        }
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRideDetails();
  }, [id]);

  // Generate Google Directions Map URL
  const generateMap = (pickup, dropoff) => {
    const base = "https://www.google.com/maps/embed/v1/directions";
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const url = `${base}?key=${apiKey}&origin=${encodeURIComponent(
      pickup
    )}&destination=${encodeURIComponent(dropoff)}&mode=driving`;
    setMapUrl(url);
  };

   // ✅ PDF Export Function
  const exportPDF = () => {
    if (!ride) return;
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Ride Details", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Field", "Value"]],
      body: [
        ["Booking ID", ride.bookingID || ""],
        ["Status", ride.status || ""],
        ["Date", ride.date || ""],
        ["Time", ride.time || ""],
        ["Pickup Location", ride.from || ""],
        ["Dropoff Location", ride.to || ""],
        ["Passenger Name", ride.contactInfo?.name || ""],
        ["Passenger Email", ride.contactInfo?.email || ""],
        ["Passenger Phone", ride.contactInfo?.phone || ""],
        ["Vehicle Type", ride.selectedCar?.vehicleType || ""],
        ["Vehicle Model", ride.selectedCar?.vehicleModel || ""],
        ["Payment Status", ride.paymentStatus || ""],
        ["Total Price", `$${ride.totalPrice}`],
      ],
    });

    // Save PDF
    doc.save(`ride-${ride.bookingID}.pdf`);
  };

  if (loading)
    return <p className="mt-10 text-center">Loading ride details...</p>;
  if (notFound)
    return (
      <p className="mt-10 text-center text-red-500">
        No ride found for this ID
      </p>
    );

  return (
    <div className="max-w-5xl p-4 mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col p-4 bg-white rounded-lg shadow md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Ride Details</h1>

        <button
          onClick={exportPDF}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Export
        </button>
      </div>

      {/* Summary */}
      <div className="p-4 space-y-1 bg-white rounded-lg shadow">
        <p>
          <strong>Booking ID:</strong> {ride.bookingID}
        </p>
        <p>
          <strong>Status:</strong> {ride.status}
        </p>
        <p>
          <strong>Date & Time:</strong> {ride.date} at {ride.time}
        </p>
        <p>
          <strong>From:</strong> {ride.from}
        </p>
        <p>
          <strong>To:</strong> {ride.to}
        </p>
      </div>

      {/* Map with Route */}
      {ride.pickupLocation && ride.to ? (
        <div className="w-full overflow-hidden rounded-lg shadow h-[450px]">
          <iframe
            title="route-map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={mapUrl}
          ></iframe>
        </div>
      ) : (
        <p className="text-gray-500">No map available for this ride</p>
      )}

      {/* Details */}
      <div className="p-4 space-y-4 bg-white rounded-lg shadow">
        {/* Passenger */}
        <div>
          <h2 className="text-lg font-semibold">Passenger Info</h2>
          <p>
            <strong>Name:</strong> {ride.contactInfo?.name}
          </p>
          <p>
            <strong>Email:</strong> {ride.contactInfo?.email}
          </p>
          <p>
            <strong>Phone:</strong> {ride.contactInfo?.phone}
          </p>
        </div>

        {/* Vehicle */}
        <div>
          <h2 className="text-lg font-semibold">Vehicle Info</h2>
          <p>
            <strong>Type:</strong> {ride.selectedCar?.vehicleType}
          </p>
          <p>
            <strong>Model:</strong> {ride.selectedCar?.vehicleModel}
          </p>
          <p>
            <strong>Year:</strong> {ride.selectedCar?.vehicleYear}
          </p>
          {ride.selectedCar?.imageUrl && (
            <img
              src={ride.selectedCar.imageUrl}
              alt="Vehicle"
              className="w-full mt-2 rounded-lg md:w-1/2"
            />
          )}
        </div>

        {/* Payment */}
        <div>
          <h2 className="text-lg font-semibold">Payment Info</h2>
          <p>
            <strong>Status:</strong> {ride.paymentStatus}
          </p>
          <p>
            <strong>Amount:</strong> ${ride.totalPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RideDetailsByDriver;
