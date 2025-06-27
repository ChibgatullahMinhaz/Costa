import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronDown, Settings } from "lucide-react";

export function BookingOperations() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 hover:text-blue-500 focus:outline-none"
      >
        <Settings className="w-5 h-5" />
        <span className="hidden sm:inline">Booking Operations</span>
        <ChevronDown
          className={`w-4 h-4 transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 ml-5  bg-white border border-gray-200 rounded shadow-md z-50">
          <div
            onClick={() => handleNavigate("/admin-dashboard/bookingManagement")}
            className="px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100"
          >
            Booking Management
          </div>
          <div
            onClick={() => handleNavigate("/admin-dashboard/manualAssign")}
            className="px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100"
          >
            Manual Assign
          </div>
        </div>
      )}
    </div>
  );
}

export function UserManagement() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 hover:text-blue-500 focus:outline-none"
      >
        <Settings className="w-5 h-5" />
        <span className="hidden sm:inline">User Management</span>
        <ChevronDown
          className={`w-4 h-4 transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 ml-5  bg-white border border-gray-200 rounded shadow-md z-50">
          <div
            onClick={() => handleNavigate("/admin-dashboard/userManagement")}
            className="px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100"
          >
            User Management
          </div>
          <div
            onClick={() => handleNavigate("/admin-dashboard/driverManagement")}
            className="px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100"
          >
            Drivers
          </div>
        </div>
      )}
    </div>
  );
}
export function FleetManagement() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 hover:text-blue-500 focus:outline-none"
      >
        <Settings className="w-5 h-5" />
        <span className="hidden sm:inline">Fleet Management</span>
        <ChevronDown
          className={`w-4 h-4 transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 ml-5  bg-white border border-gray-200 rounded shadow-md z-50">
          <div
            onClick={() => handleNavigate("/admin-dashboard/vehicles")}
            className="px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100"
          >
            Vehicles
          </div>
          <div
            onClick={() => handleNavigate("/admin-dashboard/manualAssign")}
            className="px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100"
          >
            Price
          </div>
        </div>
      )}
    </div>
  );
}

export function Communication() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 hover:text-blue-500 focus:outline-none"
      >
        <Settings className="w-5 h-5" />
        <span className="hidden sm:inline">Dispatch Tools</span>
        <ChevronDown
          className={`w-4 h-4 transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 ml-5  bg-white border border-gray-200 rounded shadow-md z-50">
          <div
            onClick={() => handleNavigate("/admin-dashboard/pushNotification")}
            className="px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100"
          >
            Push Notification
          </div>
        </div>
      )}
    </div>
  );
}
export function ReportsAndFinance() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 hover:text-blue-500 focus:outline-none"
      >
        <Settings className="w-5 h-5" />
        <span className="hidden sm:inline">Dispatch Tools</span>
        <ChevronDown
          className={`w-4 h-4 transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 ml-5  bg-white border border-gray-200 rounded shadow-md z-50">
          <div
            onClick={() => handleNavigate("/admin-dashboard/reports&earning")}
            className="px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100"
          >
            Report & Earnings
          </div>
        </div>
      )}
    </div>
  );
}