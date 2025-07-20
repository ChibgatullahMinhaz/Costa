import React, { useContext, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import instance from "../../Service/APIs/AxiosSecure";
import { BookingFormContext } from "../../Service/Context/CreateContext/BookingFormContex";
import axiosSecureInstance from "../../Service/APIs/AxiosInstance";
import useAuth from "../../Hooks/useAuth";

function PaymentForm({ onSuccess }) {
  const { user } = useAuth();
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
      const res = await axiosSecureInstance.post(
        "api/create-checkout-session",
        {
          amount,
          currency: "usd",
        }
      );

      const clientSecret = res.data.clientSecret;
      // Confirm the payment with card
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });

      if (result.error) {
        console.error("[Payment Error]", result.error.message);
        alert("❌ " + result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        alert("✅ Payment successful!");
        const email = user?.email;

        const bookingHistory = {
          allValues,
          email: email,
          result,
        };
        const response = await axiosSecureInstance.post(
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
      className="w-full max-w-md p-6 space-y-4 bg-white rounded shadow-md"
    >
      <h2 className="mb-2 text-lg font-semibold text-gray-800">
        Enter your payment details
      </h2>

      <div className="p-3 border border-gray-300 rounded bg-gray-50">
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
        className="w-full px-4 py-2 font-semibold text-white transition duration-200 bg-orange-500 rounded hover:bg-orange-600 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>

      <p className="text-xs text-center text-gray-500">
        Transactions are secured and encrypted by Stripe.
      </p>
    </form>
  );
}

export default PaymentForm;
