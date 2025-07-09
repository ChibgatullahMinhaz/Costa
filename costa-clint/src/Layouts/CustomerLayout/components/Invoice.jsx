import React from "react";

const Invoice = () => {
  // Example static data (replace with real props or API data)
  const invoiceData = {
    invoiceNumber: "INV-20250709-001",
    invoiceDate: "2025-07-09",
    dueDate: "2025-07-16",
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 890",
    },
    booking: {
      pickup: "Juan Santamaría International Airport (SJO)",
      dropoff: "Hotel San Bada, Manuel Antonio",
      date: "2025-08-15",
      time: "10:00 AM",
      flight: "AA1234",
    },
    pricing: {
      baseFare: 30,
      distanceKm: 20,
      distanceRate: 1.5,
      extraPassengers: 2,
      extraPassengerFee: 5,
      nightSurchargePercent: 20,
      taxPercent: 0, // If any tax
      paymentMethod: "Stripe",
      paymentStatus: "Paid",
    },
  };

  // Calculate total cost
  const {
    baseFare,
    distanceKm,
    distanceRate,
    extraPassengers,
    extraPassengerFee,
    nightSurchargePercent,
    taxPercent,
  } = invoiceData.pricing;

  let subtotal =
    baseFare +
    Math.max(0, distanceKm - 10) * distanceRate +
    Math.max(0, extraPassengers - 3) * extraPassengerFee;

  const nightSurcharge = (subtotal * nightSurchargePercent) / 100;
  const taxAmount = ((subtotal + nightSurcharge) * taxPercent) / 100;
  const total = subtotal + nightSurcharge + taxAmount;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-200 rounded-lg shadow-md">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">RideApp</h1>
          <p>Airport & Hotel Transfer Services</p>
        </div>
        <div className="text-right">
          <p>
            <strong>Invoice #:</strong> {invoiceData.invoiceNumber}
          </p>
          <p>
            <strong>Date:</strong> {invoiceData.invoiceDate}
          </p>
          <p>
            <strong>Due Date:</strong> {invoiceData.dueDate}
          </p>
        </div>
      </header>

      {/* Customer Info */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Bill To:</h2>
        <p>{invoiceData.customer.name}</p>
        <p>{invoiceData.customer.email}</p>
        <p>{invoiceData.customer.phone}</p>
      </section>

      {/* Booking Info */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Booking Details:</h2>
        <p>
          <strong>Pickup:</strong> {invoiceData.booking.pickup}
        </p>
        <p>
          <strong>Dropoff:</strong> {invoiceData.booking.dropoff}
        </p>
        <p>
          <strong>Date & Time:</strong> {invoiceData.booking.date} @{" "}
          {invoiceData.booking.time}
        </p>
        <p>
          <strong>Flight Number:</strong> {invoiceData.booking.flight}
        </p>
      </section>

      {/* Pricing Table */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Pricing Breakdown:</h2>
        <table className="w-full text-left border-collapse">
          <tbody>
            <tr className="border-b border-gray-300">
              <td>Base Fare</td>
              <td>${baseFare.toFixed(2)}</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td>
                Distance Charge ({Math.max(0, distanceKm - 10)} km @ $
                {distanceRate}/km)
              </td>
              <td>
                $
                {(
                  Math.max(0, distanceKm - 10) * distanceRate
                ).toFixed(2)}
              </td>
            </tr>
            <tr className="border-b border-gray-300">
              <td>
                Extra Passenger Fee (
                {Math.max(0, extraPassengers - 3)} passengers @ $
                {extraPassengerFee})
              </td>
              <td>
                $
                {(
                  Math.max(0, extraPassengers - 3) * extraPassengerFee
                ).toFixed(2)}
              </td>
            </tr>
            <tr className="border-b border-gray-300">
              <td>Night Surcharge ({nightSurchargePercent}%)</td>
              <td>${nightSurcharge.toFixed(2)}</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td>Tax ({taxPercent}%)</td>
              <td>${taxAmount.toFixed(2)}</td>
            </tr>
            <tr className="font-bold text-lg border-t border-gray-500">
              <td>Total</td>
              <td>${total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Payment Info */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Payment Information:</h2>
        <p>
          <strong>Method:</strong> {invoiceData.pricing.paymentMethod}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`badge ${
              invoiceData.pricing.paymentStatus === "Paid"
                ? "badge-success"
                : "badge-warning"
            }`}
          >
            {invoiceData.pricing.paymentStatus}
          </span>
        </p>
      </section>

      {/* Footer / Terms */}
      <footer className="text-sm text-gray-600 mt-10">
        <p>
          Thank you for choosing RideApp. Please contact support@example.com for
          any questions regarding this invoice.
        </p>
      </footer>

      {/* Download / Print Button */}
      <div className="mt-6 flex justify-end gap-4">
        <button className="btn btn-outline btn-primary" onClick={() => window.print()}>
          Print Invoice
        </button>
        {/* You can add a PDF download button here if you integrate a PDF library */}
      </div>
    </div>
  );
};

export default Invoice;
