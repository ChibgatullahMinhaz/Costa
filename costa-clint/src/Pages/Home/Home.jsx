import React, { useState } from "react";
import Navbar from "../../Shared/Navbar/Navbar";
import Hero from "../../components/Banner/Hero";
import BookingFlow from "../../components/Booking/BookingFlow";
import Destinations from "../Destinations/Destinations";
import Services from "../Services/Services";
import BookingStep from "./bookingStep";

const Home = () => {
  const [stepPhase, setStepPhase] = useState("initial");

  return (
    <>
      {stepPhase === "initial" && (
        <>
          <Hero onBooking={setStepPhase} />
          <div className="max-w-[95%] mx-auto">
            <BookingStep />
            <Services />
            <Destinations />
          </div>
        </>
      )}

      {stepPhase === "booking" && <BookingFlow setStepPhase={setStepPhase} />}
    </>
  );
};

export default Home;
