import { useContext } from "react";
import { BookingFormContext } from "../Service/Context/CreateContext/BookingFormContex";

const useBookingForm = () => useContext(BookingFormContext);

export default useBookingForm;
