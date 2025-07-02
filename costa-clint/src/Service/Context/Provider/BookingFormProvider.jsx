import { useForm, FormProvider } from "react-hook-form";
import { BookingFormContext } from "../CreateContext/BookingFormContex";

// Default form values
const defaultValues = {
  transferType: "one way",
  from: "",
  to: "",
  date: "",
  time: "",
  passengers: "3",
  flightNumber: "",
  vehicleType: "",
  contactInfo: {
    name: "",
    email: "",
    phone: "",
  },
  paymentMethod: "",
};

export const BookingFormProvider = ({ children }) => {
  const methods = useForm({
    defaultValues,
    mode: "onChange",
  });
  const bookingInfo = {
    methods,
    defaultValues,
  };
  return (
    <BookingFormContext.Provider value={bookingInfo}>
      <FormProvider {...methods}>{children}</FormProvider>
    </BookingFormContext.Provider>
  );
};
