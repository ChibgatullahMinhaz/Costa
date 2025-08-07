import React from "react";
import {
  Plane,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react";
import Button from "../../components/UI/Button/Button";
import { Link } from "react-router";
import { t } from "i18next";

const Footer = () => {
  return (
    <footer id="contact" className="text-white bg-gray-900">
      <div className="container px-4 py-16 mx-auto">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6 space-x-2">
              <div className="p-2 rounded-lg bg-tropical-gradient">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Pura Vida Transfers</h3>
                <p className="text-sm text-gray-400">Costa Rica</p>
              </div>
            </div>
            <p className="mb-4 leading-relaxed text-gray-300">
              Your trusted partner for premium airport and hotel transfers
              throughout Costa Rica. Experience the Pura Vida lifestyle from the
              moment you arrive.
            </p>
            <div className="flex space-x-4">
              <Button
                size="sm"
                variant="outline"
                className="text-gray-300 border-gray-600 hover:bg-tropical-600 hover:border-tropical-600"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-gray-300 border-gray-600 hover:bg-tropical-600 hover:border-tropical-600"
              >
                <Instagram className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-gray-300 border-gray-600 hover:bg-tropical-600 hover:border-tropical-600"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#home"
                  className="text-gray-300 transition-colors hover:text-tropical-400"
                >
                  {t("nav.home")}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-300 transition-colors hover:text-tropical-400"
                >
                  {t("nav.services")}
                </a>
              </li>
              <li>
                <a
                  href="#destinations"
                  className="text-gray-300 transition-colors hover:text-tropical-400"
                >
                  {t("nav.destinations")}
                </a>
              </li>

              <li>
                <a
                  href="#about"
                  className="text-gray-300 transition-colors hover:text-tropical-400"
                >
                  {t("nav.about")}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-300 transition-colors hover:text-tropical-400"
                >
                  {t("nav.contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-6 text-lg font-semibold">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-300">Airport Transfers</span>
              </li>
              <li>
                <span className="text-gray-300">Hotel-to-Hotel</span>
              </li>
              <li>
                <span className="text-gray-300">Group Transportation</span>
              </li>
              <li>
                <span className="text-gray-300">Custom Tours</span>
              </li>
              <li>
                <span className="text-gray-300">24/7 Support</span>
              </li>
              <li>
                <span className="text-gray-300">Flight Tracking</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-6 text-lg font-semibold">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="flex-shrink-0 w-5 h-5 mt-1 text-tropical-400" />
                <div>
                  <p className="text-gray-300">+506 2222-3333</p>
                  <p className="text-sm text-gray-400">24/7 Support</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MessageCircle className="flex-shrink-0 w-5 h-5 mt-1 text-tropical-400" />
                <div>
                  <p className="text-gray-300">+506 8888-9999</p>
                  <p className="text-sm text-gray-400">WhatsApp</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="flex-shrink-0 w-5 h-5 mt-1 text-tropical-400" />
                <div>
                  <p className="text-gray-300">info@puravidatransfers.cr</p>
                  <p className="text-sm text-gray-400">Email Support</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="flex-shrink-0 w-5 h-5 mt-1 text-tropical-400" />
                <div>
                  <p className="text-gray-300">San José, Costa Rica</p>
                  <p className="text-sm text-gray-400">Nationwide Service</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 mt-12 border-t border-gray-800">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 text-sm text-gray-400 md:mb-0">
              © 2025 Pura Vida Transfers CR. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                to="#"
                className="text-gray-400 transition-colors hover:text-tropical-400"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-gray-400 transition-colors hover:text-tropical-400"
              >
                Terms of Service
              </Link>
              <Link
                to="#"
                className="text-gray-400 transition-colors hover:text-tropical-400"
              >
                Cancellation Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
