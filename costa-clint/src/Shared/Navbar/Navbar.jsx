import React from "react";
import { useState } from "react";
import { Menu, X, Plane, Phone, Mail, User } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router";
import Button from "../../components/UI/Button/Button";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();


  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const handleBookNowClick = () => {
    scrollToSection("home");
    setTimeout(() => {
      const bookingForm = document.querySelector("[data-booking-form]");
      if (bookingForm) {
        bookingForm.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 500);
  };

  const goToDashboard = () => {
    navigate("/admin-dashboard");
    setIsMenuOpen(false);
  };

  const goHome = () => {
    navigate("/");
    setIsMenuOpen(false);
  };

  const goToPage = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };
const handleAuth = ()=>{
  navigate('/auth/login')
}
  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg fixed w-full z-50 top-0">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={goHome}
          >
            <div className="bg-tropical-gradient p-2 rounded-lg">
              <Plane className="h-6 w-6 text-[#00afba]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Pura Vida Transfers
              </h1>
              <p className="text-xs text-gray-600">Costa Rica</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-700 transition-colors hover:text-tropical-600 ${
                  isActive
                    ? "underline underline-offset-4 text-tropical-600 font-semibold"
                    : ""
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-gray-700 transition-colors hover:text-tropical-600 ${
                  isActive
                    ? "underline underline-offset-4 text-tropical-600 font-semibold"
                    : ""
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/services"
              className={({ isActive }) =>
                `text-gray-700 transition-colors hover:text-tropical-600 ${
                  isActive
                    ? "underline underline-offset-4 text-tropical-600 font-semibold"
                    : ""
                }`
              }
            >
              Services
            </NavLink>
            <NavLink
              to="/ Destinations"
              className={({ isActive }) =>
                `text-gray-700 transition-colors hover:text-tropical-600 ${
                  isActive
                    ? "underline underline-offset-4 text-tropical-600 font-semibold"
                    : ""
                }`
              }
            >
              Destinations
            </NavLink>
            <Link
              to="/"
              onClick={() => scrollToSection("contact")}
              className={({ isActive }) =>
                `text-gray-700 transition-colors hover:text-tropical-600 ${
                  isActive
                    ? "underline underline-offset-4 text-tropical-600 font-semibold"
                    : ""
                }`
              }
            >
              Contact
            </Link>
            <NavLink
              to="/beDriver"
              className={({ isActive }) =>
                `text-gray-700 transition-colors hover:text-tropical-600 ${
                  isActive
                    ? "underline underline-offset-4 text-tropical-600 font-semibold"
                    : ""
                }`
              }
            >
              Be Driver
            </NavLink>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-sm">
                <Phone className="h-4 w-4 text-tropical-600" />
                <span className="text-gray-700">+506 2222-3333</span>
              </div>

              <button
                onClick={handleBookNowClick}
                className="text-white bg-gradient-to-r from-[#00b0bb] via-[#00afb8] to-[#00afb9] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-[#00afb9] dark:shadow-lg dark:shadow-[#00afb9] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
              >
                Book Now
              </button>
              {user && (
                <button
                  variant="outline"
                  size="sm"
                  onClick={goToDashboard}
                  className="flex items-center text-white bg-gradient-to-r from-[#00b0bb] via-[#00afb8] to-[#00afb9] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                >
                  <User className="h-4 w-4 mr-1" />
                  Dashboard
                </button>
              )}

              {!user && (
                <button onClick={handleAuth} className="btn">
                  <User className="h-4 w-4 mr-1" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-gray-700 hover:text-tropical-600 transition-colors text-left"
              >
                Home
              </button>
              <button
                onClick={() => goToPage("/about")}
                className="text-gray-700 hover:text-tropical-600 transition-colors text-left"
              >
                About
              </button>
              <button
                onClick={() => goToPage("/services")}
                className="text-gray-700 hover:text-tropical-600 transition-colors text-left"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("destinations")}
                className="text-gray-700 hover:text-tropical-600 transition-colors text-left"
              >
                Destinations
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-700 hover:text-tropical-600 transition-colors text-left"
              >
                Contact
              </button>
              <button
                onClick={goToDashboard}
                className="text-gray-700 hover:text-tropical-600 transition-colors text-left flex items-center"
              >
                <User className="h-4 w-4 mr-2" />
                Dashboard
              </button>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-tropical-600" />
                  <span className="text-gray-700">+506 2222-3333</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-tropical-600" />
                  <span className="text-gray-700">
                    info@puravidatransfers.cr
                  </span>
                </div>
                <button
                  // onClick={handleBookNowClick}
                  className="rounded-xl p-2 bg-gradient-to-r from-[#FE6C6B] to-[#FD8F53] hover:scale-105 transition-transform w-fit"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
