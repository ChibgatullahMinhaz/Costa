import React from "react";
import { useNavigate } from "react-router";
import Button from "../../components/UI/Button/Button";
import { ArrowLeft, MapPin, Clock, User, Phone, Navigation, CheckCircle, AlertCircle } from 'lucide-react';
import { Badge } from "../../components/UI/Badge/Badge";

const DriverDashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/")}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <h1 className="text-2xl font-bold text-gray-800">
                Driver Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800">Online</Badge>
              <div className="text-sm text-gray-600">
                Today's Earnings:{" "}
                <span className="font-bold text-green-600">$240</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
