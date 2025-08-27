import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useQuery } from "@tanstack/react-query";
import InvoicePDF from "./InvoicePDF";
import axiosSecureInstance from "../../Service/APIs/AxiosInstance";
import useAuth from "../../Hooks/useAuth";

const fetchBookings = async (email) => {
  const { data } = await axiosSecureInstance.get(`invoice?email=${email}`);
  return data;
};

const InvoiceList = () => {
  const { user } = useAuth();
  const {
    data: bookings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["invoiceData", user?.email],
    queryFn: () => fetchBookings(user?.email),
    enabled: !!user?.email,
  });

  if (isLoading) return <div className="p-6">Loading bookings...</div>;
  if (isError)
    return <div className="p-6 text-red-500">Failed to load bookings.</div>;

  return (
    <div className="p-6">
      {bookings.length == 0
        ? <>
        <p className="text-center text-red-400">No Booking Found!</p>
        </>
        : bookings.map((booking, i) => (
            <div
              key={booking._id || i}
              className="p-4 mb-4 border rounded shadow"
            >
              <p>
                <strong>Invoice:</strong> INV-
                {booking._id?.slice(-6).toUpperCase()}
              </p>
              <p>
                <strong>Customer:</strong> {booking.contactInfo?.name || "N/A"}
              </p>
              <p>
                <strong>Pickup:</strong> {booking.from} →{" "}
                <strong>Dropoff:</strong> {booking.to}
              </p>

              <PDFDownloadLink
                document={
                  <InvoicePDF
                    data={{
                      invoiceNumber: `INV-${booking._id
                        ?.slice(-6)
                        .toUpperCase()}`,
                      invoiceDate: new Date().toISOString().split("T")[0],
                      customer: {
                        name: booking.contactInfo?.name,
                        email: booking.contactInfo?.email,
                        phone: booking.contactInfo?.phone,
                      },
                      booking: {
                        pickup: booking.from,
                        dropoff: booking.to,
                        date: booking.date,
                        time: booking.time,
                        flight: booking.flightNumber,
                      },
                      pricing: {
                        baseFare: 30,
                        distanceKm: 1.5,
                        distanceRate: 0,
                        extraPassengers: 3,
                        extraPassengerFee: 5,
                        nightSurchargePercent: 20,
                        taxPercent: 0,
                        totalPrice: booking.totalPrice || 0,
                        paymentMethod: booking.paymentMethod || "N/A",
                        paymentStatus: booking.paymentStatus || "Due",
                      },
                    }}
                  />
                }
                fileName={`invoice-${booking._id}.pdf`}
              >
                {({ loading }) =>
                  loading ? (
                    <button className="btn btn-disabled">Generating...</button>
                  ) : (
                    <button className="mt-2 btn btn-primary">
                      Download Invoice
                    </button>
                  )
                }
              </PDFDownloadLink>
            </div>
          ))}
    </div>
  );
};

export default InvoiceList;
