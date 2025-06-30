import React from "react";
import Button from "../UI/Button/Button";
import { Plane, MapPin, Calendar, ArrowRight } from "lucide-react";
import BookingForm from "../Booking/BookingForm";
import { BookingFormProvider } from "../../Service/Context/Provider/BookingFormProvider";
import BookingStepProvider from "../../Service/Context/Provider/BookingStepProvider";
const Hero = ({ onBooking }) => {
  return (
    <section
      id="home"
      className="relative py-3 min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://elifelimo.com/front/images/front_bg.webp')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Premium Airport Transfers in
              <span className="bg-tropical-gradient bg-clip-text">
                {" "}
                Costa Rica
              </span>
            </h1>
            <p className="text-xl mb-8 text-gray-200 leading-relaxed">
              Experience the Pura Vida lifestyle from the moment you land.
              Reliable, comfortable, and professional transfers to all major
              destinations in Costa Rica.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <div className="bg-tropical-gradient p-2 rounded-lg">
                  <Plane className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">3 Airports</p>
                  <p className="text-sm text-gray-300">SJO, LIR, SYQ</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-ocean-gradient p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">All Provinces</p>
                  <p className="text-sm text-gray-300">7 Destinations</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-sunset-gradient p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">24/7 Service</p>
                  <p className="text-sm text-gray-300">Always Available</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="rounded-xl p-3 bg-[#00b0bb] hover:bg-[#00afb9]  transition-all duration-200 flex items-center cursor-pointer">
                Book Your Transfer
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                // onClick={scrollToDestinations}
                className="cursor-pointer rounded-xl p-3 border-white text-white bg-[#00b0bb] hover:bg-[#00afb9]"
              >
                View Destinations
              </button>
            </div>
          </div>

          {/* Right Content - Booking Form */}
          <BookingStepProvider>
            <div className="lg:block animate-slide-in-right" data-booking-form>
              <BookingForm onBooking={onBooking} />
            </div>
          </BookingStepProvider>
        </div>
      </div>
    </section>
  );
};

export default Hero;
