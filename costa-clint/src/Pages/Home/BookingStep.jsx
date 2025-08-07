import React from "react";
const steps = [
  {
    title: "Tell Us About Your Trip",
    description:
      "Enter your pickup location, destination, date, and time. We’ll take care of the logistics.",
    icon: "📝",
  },
  {
    title: "Customize Your Ride",
    description:
      "Choose your preferred vehicle, add special requirements, and make it perfect for your journey.",
    icon: "🚗",
  },
  {
    title: "Pay and Ready to Go!",
    description:
      "Complete your payment and you're all set. Sit back, relax, and enjoy the ride.",
    icon: "💳",
  },
];

const BookingStep = () => {
  return (
    <section className="px-6 py-12 bg-white">
      <h2 className="mb-10 text-3xl font-bold text-center">
        3 Steps to Hassle-Free Booking
      </h2>
      <div className="grid max-w-6xl grid-cols-1 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className="p-6 transition duration-300 bg-gray-100 shadow rounded-2xl hover:shadow-lg"
          >
            <div className="mb-4 text-4xl">{step.icon}</div>
            <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookingStep;
