import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import routers from "./routes/routes";
import { BookingFormProvider } from "./Service/Context/Provider/BookingFormProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BookingFormProvider>
      <RouterProvider router={routers} />
    </BookingFormProvider>
  </StrictMode>
);
