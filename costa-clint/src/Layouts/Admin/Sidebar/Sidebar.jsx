import { Home, Users, Car, Settings, Menu } from "lucide-react";
import { Link } from "react-router";
import {
  BookingOperations,
  Communication,
  FleetManagement,
  UserManagement,ReportsAndFinance
} from "../../../Dashboard/Admin/Components/SidebarDropdown/sidebarOperation";

const Sidebar = () => {
  return (
    <div className=" min-h-screen mb-5 p-4 transition-all duration-300 ease-in-out ">
      <div className="flex flex-col space-y-6">
        <nav className="flex flex-col space-y-4 mt-6">
          <Link
            to="/admin-dashboard"
            className="flex items-center space-x-2 hover:text-blue-400"
          >
            <Home className="h-5 w-5" />
            <span className="hidden sm:block">Dashboard</span>
          </Link>

          <Link
            to="/admin-dashboard/userManagement"
            className="flex items-center space-x-2 hover:text-blue-400"
          >
            <Users className="h-5 w-5" />
            <span className="hidden sm:block">Users</span>
          </Link>

          <Link
            to="/admin-dashboard/vehicles"
            className="flex items-center space-x-2 hover:text-blue-400"
          >
            <Car className="h-5 w-5" />
            <span className="hidden sm:block">Vehicles</span>
          </Link>

          
          <Link
            to="/admin-dashboard/bookingManagement"
            className="flex items-center space-x-2 hover:text-blue-400"
          >
            <Settings className="h-5 w-5" />
            <span className="hidden sm:block">Booking Management</span>
          </Link>
          <Link
            to="/admin-dashboard/reports&earning"
            className="flex items-center space-x-2 hover:text-blue-400"
          >
            <Settings className="h-5 w-5" />
            <span className="hidden sm:block">Report&Earnings</span>
          </Link>
          <Link
            to="/admin-dashboard/priceManagement"
            className="flex items-center space-x-2 hover:text-blue-400"
          >
            <Settings className="h-5 w-5" />
            <span className="hidden sm:block">Price</span>
          </Link>
          <UserManagement></UserManagement>
          <FleetManagement></FleetManagement>
          <BookingOperations></BookingOperations>
          <Communication></Communication>
          <ReportsAndFinance></ReportsAndFinance>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

//  Dashboard
// - User Management
//     - Users
//     - Driver Management
// - Fleet Management
//     - Vehicles
//     - Price
// - Booking Operations
//     - Booking Management
//     - Manual Assignment
// - Communication Tools
//     - Push Notifications
// - Reports & Finance
//     - Report & Earnings
