import React, { useState } from "react";
import Navbar from "../../Shared/Navbar/Navbar";
import Hero from "../../components/Banner/Hero";
import BookingFlow from "../../components/Booking/BookingFlow";

const Home = () => {
  const [stepPhase, setStepPhase] = useState("initial");

  return (
    <>
      {stepPhase === "initial" && <Hero onBooking={setStepPhase} />}

      {stepPhase === "booking" && <BookingFlow setStepPhase={setStepPhase} />}
    </>
  );
};

export default Home;
