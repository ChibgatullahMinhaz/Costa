import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import routers from "./routes/routes";
import { BookingFormProvider } from "./Service/Context/Provider/BookingFormProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookingStepProvider from "./Service/Context/Provider/BookingStepProvider";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BookingStepProvider>
        <BookingFormProvider>
          <RouterProvider router={routers} />
        </BookingFormProvider>
      </BookingStepProvider>
    </QueryClientProvider>
  </StrictMode>
);
