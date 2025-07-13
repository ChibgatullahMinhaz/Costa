import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef } from "react";
import useAuth from "../../../Hooks/useAuth";

const Invoice = () => {
  const {user } = useAuth()
  const invoiceData = {
    invoiceNumber: "INV-20250709-001",
    invoiceDate: "2025-07-09",
    dueDate: "2025-07-16",
    customer: {
      name:user.displayName ,
      email: user.email,
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

  const invoiceRef = useRef();
  const handleDownloadPDF = async () => {
    try {
      const element = invoiceRef.current;
      if (!element) return;

      const styleEls = document.querySelectorAll("style");
      const tailwindEls = [];

      styleEls.forEach((styleEl) => {
        const text = styleEl.textContent || "";
        if (text.includes("oklch") || text.includes("--tw")) {
          tailwindEls.push({ el: styleEl, media: styleEl.media });
          styleEl.media = "print"; 
        }
      });

      // 📸 Capture the element
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      const imgScaledWidth = imgWidth * ratio;
      const imgScaledHeight = imgHeight * ratio;

      pdf.addImage(imgData, "PNG", 0, 0, imgScaledWidth, imgScaledHeight);
      pdf.save(`${invoiceData.invoiceNumber}.pdf`);

      // ✅ Restore Tailwind styles
      tailwindEls.forEach(({ el, media }) => {
        el.media = media;
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const paymentStatus = invoiceData.pricing.paymentStatus;

  return (
    <>
      <div
        ref={invoiceRef}
        style={{
          maxWidth: "800px",
          margin: "auto",
          padding: "24px",
          backgroundColor: "#ffffff",
          color: "#000000",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
          fontSize: "16px",
          lineHeight: "1.5",
        }}
      >
        {/* Header */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#1d4ed8",
                margin: 0,
              }}
            >
              RideApp
            </h1>
            <p style={{ margin: "4px 0 0 0" }}>
              Airport & Hotel Transfer Services
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: "4px 0" }}>
              <strong>Invoice #:</strong> {invoiceData.invoiceNumber}
            </p>
            <p style={{ margin: "4px 0" }}>
              <strong>Date:</strong> {invoiceData.invoiceDate}
            </p>
            <p style={{ margin: "4px 0" }}>
              <strong>Due Date:</strong> {invoiceData.dueDate}
            </p>
          </div>
        </header>

        {/* Customer Info */}
        <section style={{ marginBottom: "24px", color: "#000000" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "8px",
            }}
          >
            Bill To:
          </h2>
          <p style={{ margin: "2px 0" }}>{invoiceData.customer.name}</p>
          <p style={{ margin: "2px 0" }}>{invoiceData.customer.email}</p>
          <p style={{ margin: "2px 0" }}>{invoiceData.customer.phone}</p>
        </section>

        {/* Booking Info */}
        <section style={{ marginBottom: "24px", color: "#000000" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "8px",
            }}
          >
            Booking Details:
          </h2>
          <p style={{ margin: "2px 0" }}>
            <strong>Pickup:</strong> {invoiceData.booking.pickup}
          </p>
          <p style={{ margin: "2px 0" }}>
            <strong>Dropoff:</strong> {invoiceData.booking.dropoff}
          </p>
          <p style={{ margin: "2px 0" }}>
            <strong>Date & Time:</strong> {invoiceData.booking.date} @{" "}
            {invoiceData.booking.time}
          </p>
          <p style={{ margin: "2px 0" }}>
            <strong>Flight Number:</strong> {invoiceData.booking.flight}
          </p>
        </section>

        {/* Pricing Table */}
        <section style={{ marginBottom: "24px", color: "#000000" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "8px",
            }}
          >
            Pricing Breakdown:
          </h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <tbody>
              <tr style={{ borderBottom: "1px solid #d1d5db" }}>
                <td style={{ padding: "8px 0" }}>Base Fare</td>
                <td style={{ padding: "8px 0" }}>${baseFare.toFixed(2)}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #d1d5db" }}>
                <td style={{ padding: "8px 0" }}>
                  Distance Charge ({Math.max(0, distanceKm - 10)} km @ $
                  {distanceRate}/km)
                </td>
                <td style={{ padding: "8px 0" }}>
                  ${(Math.max(0, distanceKm - 10) * distanceRate).toFixed(2)}
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #d1d5db" }}>
                <td style={{ padding: "8px 0" }}>
                  Extra Passenger Fee ({Math.max(0, extraPassengers - 3)}{" "}
                  passengers @ ${extraPassengerFee})
                </td>
                <td style={{ padding: "8px 0" }}>
                  $
                  {(
                    Math.max(0, extraPassengers - 3) * extraPassengerFee
                  ).toFixed(2)}
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #d1d5db" }}>
                <td style={{ padding: "8px 0" }}>
                  Night Surcharge ({nightSurchargePercent}%)
                </td>
                <td style={{ padding: "8px 0" }}>
                  ${nightSurcharge.toFixed(2)}
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #d1d5db" }}>
                <td style={{ padding: "8px 0" }}>Tax ({taxPercent}%)</td>
                <td style={{ padding: "8px 0" }}>${taxAmount.toFixed(2)}</td>
              </tr>
              <tr
                style={{
                  fontWeight: "700",
                  fontSize: "1.125rem",
                  borderTop: "2px solid #6b7280",
                }}
              >
                <td style={{ padding: "8px 0" }}>Total</td>
                <td style={{ padding: "8px 0" }}>${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Payment Info */}
        <section style={{ marginBottom: "24px", color: "#000000" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "8px",
            }}
          >
            Payment Information:
          </h2>
          <p style={{ margin: "4px 0" }}>
            <strong>Method:</strong> {invoiceData.pricing.paymentMethod}
          </p>
          <p style={{ margin: "4px 0" }}>
            <strong>Status:</strong>{" "}
            <span
              style={{
                padding: "0.25em 0.5em",
                borderRadius: "0.25rem",
                color: paymentStatus === "Paid" ? "#15803d" : "#b45309",
                backgroundColor:
                  paymentStatus === "Paid" ? "#dcfce7" : "#fef3c7",
                fontWeight: "600",
              }}
            >
              {paymentStatus}
            </span>
          </p>
        </section>

        {/* Footer */}
        <footer
          style={{
            fontSize: "0.875rem",
            color: "#4b5563",
            marginTop: "40px",
            lineHeight: "1.4",
          }}
        >
          <p>
            Thank you for choosing RideApp. Please contact support@example.com
            for any questions regarding this invoice.
          </p>
        </footer>
      </div>

      {/* Download PDF Button */}
      <div
        style={{
          marginTop: "24px",
          display: "flex",
          justifyContent: "flex-end",
          maxWidth: "800px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <button
          onClick={handleDownloadPDF}
          style={{
            backgroundColor: "#2563eb",
            color: "#ffffff",
            padding: "0.5rem 1rem",
            borderRadius: "0.375rem",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "1rem",
          }}
          type="button"
        >
          Download Invoice
        </button>
      </div>
    </>
  );
};

export default Invoice;
