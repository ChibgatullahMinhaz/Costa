import React, { useContext } from "react";
import { NextStep } from "../Service/Context/CreateContext/BokkingFlowContext";

const useStep = () => {
  const steps = useContext(NextStep);

  return steps;
};

export default useStep;
