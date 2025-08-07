import React from "react";
import Button from "../UI/Button/Button";
import { Plane, MapPin, Calendar, ArrowRight } from "lucide-react";
import BookingForm from "../Booking/BookingForm";
import axiosSecurePublic from "../../Service/APIs/AxiosPublic";
import { useQuery } from "@tanstack/react-query";
const Hero = ({ onBooking }) => {
  // Fetch pricing config
  const {
    data: pricingConfig,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pricing-system"],
    queryFn: async () => {
      try {
        const res = await axiosSecurePublic.get("pricing/config");
        if (res.status !== 200) throw new Error("Failed to fetch config");
        return res.data;
      } catch (error) {
        console.error("API Error:", error);
        throw error;
      }
    },
  });

 
  return (
    <section
      id="home"
      className="relative flex items-center justify-center min-h-screen py-3 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url('https://elifelimo.com/front/images/front_bg.webp')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      <div className="container relative z-10 px-4 pt-20 mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="text-white animate-fade-in">
            <h1 className="mb-6 text-5xl font-bold leading-tight lg:text-6xl">
              Premium Airport Transfers in
              <span className="bg-tropical-gradient bg-clip-text">
                {" "}
                Costa Rica
              </span>
            </h1>
            <p className="mb-8 text-xl leading-relaxed text-gray-200">
              Experience the Pura Vida lifestyle from the moment you land.
              Reliable, comfortable, and professional transfers to all major
              destinations in Costa Rica.
            </p>

            <div className="grid gap-6 mb-8 sm:grid-cols-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-tropical-gradient">
                  <Plane className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">3 Airports</p>
                  <p className="text-sm text-gray-300">SJO, LIR, SYQ</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-ocean-gradient">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">All Provinces</p>
                  <p className="text-sm text-gray-300">7 Destinations</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-sunset-gradient">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">24/7 Service</p>
                  <p className="text-sm text-gray-300">Always Available</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="rounded-xl p-3 bg-[#00b0bb] hover:bg-[#00afb9]  transition-all duration-200 flex items-center cursor-pointer">
                Book Your Transfer
                <ArrowRight className="w-5 h-5 ml-2" />
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
          <div className="lg:block animate-slide-in-right" data-booking-form>
            <BookingForm onBooking={onBooking} pricingConfig={pricingConfig} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
