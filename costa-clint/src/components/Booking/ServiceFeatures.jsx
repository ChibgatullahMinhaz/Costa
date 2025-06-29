// src/components/ServiceFeatures.jsx
import React from "react";
import {
  Airplay,   // flight tracking
  Phone,     // call center
  Globe2,    // multi-lingual
  RefreshCw, // refund
  Clock      // waiting time
} from "lucide-react";

const features = [
  { title: "Flight & Ride Tracking",                Icon: Airplay   },
  { title: "24/7 Customer Call Center",             Icon: Phone     },
  { title: "Multi-lingual Driver",                  Icon: Globe2    },
  {
    title:
      "Full refund if cancelled 24h before, online cancellation",
    Icon: RefreshCw
  },
  {
    title:
      "Free 60m waiting for airport, 15m for others",
    Icon: Clock
  }
];

const ServiceFeatures = () => (
  <div className="max-w-3xl mx-auto p-6">
    <h3 className="text-lg font-semibold mb-4 text-gray-800">
      All our vehicles include:
    </h3>
    <div className="grid gap-3">
      {features.map(({ title, Icon }, idx) => (
        <div
          key={idx}
          className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full"
        >
          <Icon className="h-4 w-4 text-tropical-600 flex-shrink-0" />
          <span className="text-xs text-gray-700">{title}</span>
        </div>
      ))}
    </div>
  </div>
);

export default ServiceFeatures;