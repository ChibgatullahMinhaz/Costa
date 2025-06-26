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

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-tropical-gradient p-2 rounded-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Pura Vida Transfers</h3>
                <p className="text-sm text-gray-400">Costa Rica</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Your trusted partner for premium airport and hotel transfers
              throughout Costa Rica. Experience the Pura Vida lifestyle from the
              moment you arrive.
            </p>
            <div className="flex space-x-4">
              <Button
                size="sm"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-tropical-600 hover:border-tropical-600"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-tropical-600 hover:border-tropical-600"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-tropical-600 hover:border-tropical-600"
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#home"
                  className="text-gray-300 hover:text-tropical-400 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-300 hover:text-tropical-400 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#destinations"
                  className="text-gray-300 hover:text-tropical-400 transition-colors"
                >
                  Destinations
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-300 hover:text-tropical-400 transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-tropical-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-tropical-400 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
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
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-tropical-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">+506 2222-3333</p>
                  <p className="text-sm text-gray-400">24/7 Support</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MessageCircle className="h-5 w-5 text-tropical-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">+506 8888-9999</p>
                  <p className="text-sm text-gray-400">WhatsApp</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-tropical-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">info@puravidatransfers.cr</p>
                  <p className="text-sm text-gray-400">Email Support</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-tropical-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">San José, Costa Rica</p>
                  <p className="text-sm text-gray-400">Nationwide Service</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Pura Vida Transfers CR. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                to="#"
                className="text-gray-400 hover:text-tropical-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-tropical-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-tropical-400 transition-colors"
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
