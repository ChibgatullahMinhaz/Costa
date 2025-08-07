import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import routers from "./routes/routes";
import { BookingFormProvider } from "./Service/Context/Provider/BookingFormProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookingStepProvider from "./Service/Context/Provider/BookingStepProvider";
import GoogleMapsLoader from "./Maps/GoogleMapsLoader";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AuthProvider from "./Service/Context/Provider/AuthProvider";
import './i18n';
const queryClient = new QueryClient();
const stripePromise = loadStripe(import.meta.env.VITE_STRIP_PUBLISH_KEY || "");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <QueryClientProvider client={queryClient}>
        <GoogleMapsLoader>
          <AuthProvider>
            <BookingStepProvider>
              <BookingFormProvider>
                <RouterProvider router={routers} />
              </BookingFormProvider>
            </BookingStepProvider>
          </AuthProvider>
        </GoogleMapsLoader>
      </QueryClientProvider>
    </Elements>
  </StrictMode>
);
