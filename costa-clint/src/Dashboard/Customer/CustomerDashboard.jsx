import React from "react";
import Button from "../../components/UI/Button/Button";
import { useNavigate } from "react-router";
import { ArrowLeft, User, Calendar, Settings } from 'lucide-react';

const CustomerDashboard = () => {
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
                Customer Dashboard
              </h1>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default CustomerDashboard;
