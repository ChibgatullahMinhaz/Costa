import React, { useState } from "react";
import { NextStep } from "../CreateContext/BokkingFlowContext";

const BookingStepProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const stepInfo = {
    step,
    setStep,
  };
  return <NextStep value={stepInfo}>{children}</NextStep>;
};

export default BookingStepProvider;
