import React from "react";
import { Card, CardContent } from "../../../components/UI/Card/Card";
import {
  ArrowLeft,
  Users,
  Car,
  DollarSign,
  BarChart3,
  Settings,
  UserCheck,
  MapPin,
} from "lucide-react";
import axiosSecurePublic from "../../../Service/APIs/AxiosPublic";
import { useQuery } from "@tanstack/react-query";
import axiosSecureInstance from "../../../Service/APIs/AxiosInstance";

const fetchTotalBookings = async () => {
  const { data } = await axiosSecureInstance.get("api/totalBookings");
  return data.totalBookings;
};

const getTotalCustomers = async () => {
  const res = await axiosSecureInstance.get("api/booking/total-customers");
  return res.data.totalCustomers;
};

const fetchActiveDriversCount = async () => {
  const res = await axiosSecureInstance.get("api/drivers/total/active");
  return res.data.activeDriversCount; 
};

const Content = () => {
  const {
    data: totalBookings,
    isPending,
    isError,
  
  } = useQuery({
    queryKey: ["total-bookings"],
    queryFn: fetchTotalBookings,
  });

  const {
    data: totalCustomers,
    isPending: customerLoading,
    isError: customerError,
  } = useQuery({
    queryKey: ["total-customers"],
    queryFn: getTotalCustomers,
  });
  const {
    data: activeDriversCount,
    isLoading: activeDriversLoading,
    isError: activeDriversError,
    error: activeDriversErrorMsg,
  } = useQuery({
    queryKey: ["activeDriversCount"],
    queryFn: fetchActiveDriversCount,
  });

  return (
    <>
      {/* Content */}
      <div className="container px-4 py-8 mx-auto">
        {/* Stats Overview */}
        <div className="grid gap-6 mb-8 md:grid-cols-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  {isPending ? (
                    <p className="text-2xl font-semibold text-gray-500">
                      Loading...
                    </p>
                  ) : isError ? (
                    <p className="text-2xl font-semibold text-red-500">
                      Failed to load
                    </p>
                  ) : (
                    <p className="text-2xl font-bold">{totalBookings}</p>
                  )}
                </div>
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Drivers</p>
                  {activeDriversLoading ? (
                    <p className="text-2xl font-semibold text-gray-500">
                      Loading...
                    </p>
                  ) : activeDriversError ? (
                    <p className="text-2xl font-semibold text-red-500">
                      Failed to load: {activeDriversErrorMsg.message}
                    </p>
                  ) : (
                    <p className="text-2xl font-bold">{activeDriversCount}</p>
                  )}
                </div>
                <Car className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
         
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Customers</p>
                  {customerLoading ? (
                    <p className="text-2xl font-semibold text-gray-500">
                      Loading...
                    </p>
                  ) : customerError ? (
                    <p className="text-2xl font-semibold text-red-500">Error</p>
                  ) : (
                    <p className="text-2xl font-bold">{totalCustomers}</p>
                  )}
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Content;
