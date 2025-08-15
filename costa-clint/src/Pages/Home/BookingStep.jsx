import React from "react";
import { useTranslation } from "react-i18next";

const BookingStep = () => {
  const { t } = useTranslation();

  // Get all step data from translations
  const steps = [
    t("booking_steps.step1", { returnObjects: true }),
    t("booking_steps.step2", { returnObjects: true }),
    t("booking_steps.step3", { returnObjects: true })
  ];

  return (
    <section className="px-6 py-12 bg-white">
      <h2 className="mb-10 text-3xl font-bold text-center">
        {t("booking_steps.title")}
      </h2>
      <div className="grid max-w-6xl grid-cols-1 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className="p-6 transition duration-300 bg-gray-100 shadow rounded-2xl hover:shadow-lg"
          >
            <div className="mb-4 text-4xl">{step.icon}</div>
            <h3 className="mb-2 text-xl font-semibold">{step.heading}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookingStep;
