import React, { useState } from "react";
import { Menu, X, Plane, Phone, Mail, User } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, userRole } = useAuth();

  const navLinks = [
    { path: "/", label: "Home", type: "route" },
    { path: "/aboutUs", label: "About", type: "route" },
    { path: "/ourServices", label: "Services", type: "route" },
    { path: "/destination", label: "Destinations", type: "route" },
    { path: "contact", label: "Contact", type: "scroll" },
  ];

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
    if (!user || !userRole?.role) return;
    const role = userRole.role.toLowerCase();
    switch (role) {
      case "admin":
        navigate("/admin-dashboard");
        break;
      case "driver":
        navigate("/driver-dashboard");
        break;
      default:
        navigate("/dashboard");
    }
    setIsMenuOpen(false);
  };

  const handleAuth = () => {
    navigate("/auth/login");
  };

  return (
    <nav className="bg-white/95 shadow-lg fixed w-full z-50 top-0">
      <div className=" ">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/")}
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
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) =>
              link.type === "route" ? (
                <NavLink
                  key={link.label}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-gray-700 transition-colors hover:text-tropical-600 ${
                      isActive
                        ? "underline underline-offset-4 text-tropical-600 font-semibold"
                        : ""
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ) : (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.path)}
                  className="text-gray-700 hover:text-tropical-600 transition-colors"
                >
                  {link.label}
                </button>
              )
            )}

            <NavLink
              to="/beDriver"
              className="text-white bg-gradient-to-r from-[#00b0bb] to-[#00afb9] hover:from-[#008a94] hover:to-[#00949e] focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-md font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Be Driver
            </NavLink>

            <div className="flex items-center space-x-4">
              {/* <div className="flex items-center space-x-1 text-sm">
                <Phone className="h-4 w-4 text-tropical-600" />
                <span className="text-gray-700">+506 2222-3333</span>
              </div> */}

              <button
                onClick={handleBookNowClick}
                className="rounded-xl p-2 px-5 text-white bg-gradient-to-r from-[#FE6C6B] to-[#FD8F53] hover:brightness-110 hover:scale-105 transition-all duration-300 shadow-md"
              >
                Book Now
              </button>

              {user ? (
                <>
                  <button
                    onClick={goToDashboard}
                    className="flex items-center text-white bg-gradient-to-r from-[#00b0bb] to-[#00afb9] hover:from-[#008a94] hover:to-[#00949e] focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-md font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    <User className="h-4 w-4 mr-1" />
                    Dashboard
                  </button>
                </>
              ) : (
                <button onClick={handleAuth} className="btn">
                  <User className="h-4 w-4 mr-1" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
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
          <div className="lg:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) =>
                link.type === "route" ? (
                  <button
                    key={link.label}
                    onClick={() => {
                      navigate(link.path);
                      setIsMenuOpen(false);
                    }}
                    className="text-gray-700 hover:text-tropical-600 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.path)}
                    className="text-gray-700 hover:text-tropical-600 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                )
              )}

              <NavLink
                to="/beDriver"
                className="text-white bg-gradient-to-r from-[#00b0bb] to-[#00afb9] hover:from-[#008a94] hover:to-[#00949e] focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-md font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Be Driver
              </NavLink>

              <button
                onClick={goToDashboard}
                className="text-gray-700 hover:text-tropical-600 flex items-center"
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
                  onClick={handleBookNowClick}
                  className="rounded-xl p-2 px-5 text-white bg-gradient-to-r from-[#FE6C6B] to-[#FD8F53] hover:brightness-110 hover:scale-105 transition-transform w-fit"
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
