import React, { useState } from "react";
import { Menu, X, Plane, Phone, Mail, User } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { useTranslation } from "react-i18next";


const navLinks = [
  { path: "/", key: "nav.home", type: "route" },
  { path: "/aboutUs", key: "nav.about", type: "route" },
  { path: "/ourServices", key: "nav.services", type: "route" },
  { path: "/destination", key: "nav.destinations", type: "route" },
  { path: "contact", key: "nav.contact", type: "scroll" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, userRole } = useAuth();
  const { t, i18n } = useTranslation();

  const handleChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

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
    <nav className="fixed top-0 z-50 w-full shadow-lg bg-white/95">
      <div className="">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="p-2 rounded-lg bg-tropical-gradient">
              <Plane className="h-6 w-6 text-[#00afba]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Pura Vida Transfers
              </h1>
              <p className="text-xs text-gray-600">Costa Rica</p>
            </div>

            <select
              name="language"
              value={i18n.language}
              onChange={handleChange}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>

          {/* Desktop Menu */}
          <div className="items-center hidden space-x-8 lg:flex">


            {navLinks.map((link) =>
              link.type === "route" ? (
                <NavLink
                  key={link.key}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-gray-700 transition-colors hover:text-tropical-600 ${
                      isActive
                        ? "underline underline-offset-4 text-tropical-600 font-semibold"
                        : ""
                    }`
                  }
                >
                  {t(link.key)}
                </NavLink>
              ) : (
                <button
                  key={link.key}
                  onClick={() => scrollToSection(link.path)}
                  className="text-gray-700 transition-colors hover:text-tropical-600"
                >
                  {t(link.key)}
                </button>
              )
            )}

            <NavLink
              to="/beDriver"
              className="text-white bg-gradient-to-r from-[#00b0bb] to-[#00afb9] hover:from-[#008a94] hover:to-[#00949e] focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-md font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {t("nav.be_driver")}
            </NavLink>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleBookNowClick}
                className="rounded-xl p-2 px-5 text-white bg-gradient-to-r from-[#FE6C6B] to-[#FD8F53] hover:brightness-110 hover:scale-105 transition-all duration-300 shadow-md"
              >
                {t("nav.book_now")}
              </button>

              {user ? (
                <>
                  <button
                    onClick={goToDashboard}
                    className="flex items-center text-white bg-gradient-to-r from-[#00b0bb] to-[#00afb9] hover:from-[#008a94] hover:to-[#00949e] focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-md font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    <User className="w-4 h-4 mr-1" />
                    {t("nav.dashboard")}
                  </button>
                </>
              ) : (
                <button onClick={handleAuth} className="btn">
                  <User className="w-4 h-4 mr-1" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="p-2 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="py-4 border-t lg:hidden">
            <div className="flex flex-col space-y-4">
               {navLinks.map((link) =>
              link.type === "route" ? (
                <NavLink
                  key={link.key}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-gray-700 transition-colors hover:text-tropical-600 ${
                      isActive
                        ? "underline underline-offset-4 text-tropical-600 font-semibold"
                        : ""
                    }`
                  }
                >
                  {t(link.key)}
                </NavLink>
              ) : (
                <button
                  key={link.key}
                  onClick={() => scrollToSection(link.path)}
                  className="text-gray-700 transition-colors hover:text-tropical-600"
                >
                  {t(link.key)}
                </button>
              )
            )}

              <NavLink
                to="/beDriver"
                className="text-white bg-gradient-to-r from-[#00b0bb] to-[#00afb9] hover:from-[#008a94] hover:to-[#00949e] focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-md font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {t("nav.be_driver")}
              </NavLink>

              <button
                onClick={goToDashboard}
                className="flex items-center text-gray-700 hover:text-tropical-600"
              >
                <User className="w-4 h-4 mr-2" />
                {t("nav.dashboard")}
              </button>

              <div className="flex flex-col pt-4 space-y-2 border-t">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="w-4 h-4 text-tropical-600" />
                  <span className="text-gray-700">+506 2222-3333</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="w-4 h-4 text-tropical-600" />
                  <span className="text-gray-700">
                    info@puravidatransfers.cr
                  </span>
                </div>
                <button
                  onClick={handleBookNowClick}
                  className="rounded-xl p-2 px-5 text-white bg-gradient-to-r from-[#FE6C6B] to-[#FD8F53] hover:brightness-110 hover:scale-105 transition-transform w-fit"
                >
                  {t("nav.book_now")}
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
