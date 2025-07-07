import React, { useContext, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import instance from "../../Service/APIs/AxiosSecure";
import { BookingFormContext } from "../../Service/Context/CreateContext/BookingFormContex";

function PaymentForm({ onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const { methods } = useContext(BookingFormContext);
  const allValues = methods.getValues();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const card = elements.getElement(CardElement);
    if (!card) return;

    try {
      // Get payment intent from backend
      const amount = parseFloat(allValues.totalPrice) * 100;
      const res = await instance.post("api/create-checkout-session", {
        amount,
        currency: "usd",
        // bookingData: allValues,
      });

      const clientSecret = res.data.clientSecret;
      // Confirm the payment with card
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: "Guest",
            email: "unknown@example.com",
          },
        },
      });

      if (result.error) {
        console.error("[Payment Error]", result.error.message);
        alert("❌ " + result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        alert("✅ Payment successful!");
        const bookingHistory = {
          allValues,
          result,
        };
        const response = await instance.post(
          "api/createBooking",
          bookingHistory
        );
        console.log(response.data);
        onSuccess?.();
      }
    } catch (error) {
      console.error("Server error:", error.message);
      alert("❌ Server error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-md bg-white p-6 rounded shadow-md"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Enter your payment details
      </h2>

      <div className="border border-gray-300 rounded p-3 bg-gray-50">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": { color: "#a0aec0" },
              },
              invalid: { color: "#fa755a" },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition duration-200 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Transactions are secured and encrypted by Stripe.
      </p>
    </form>
  );
}

export default PaymentForm;
