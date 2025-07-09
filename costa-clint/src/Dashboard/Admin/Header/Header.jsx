import { Link } from "react-router";
import UserDropdown from "../Components/UserDropdown/UserDropdown";
import NotificationDropdown from "../Components/NotificationDropdown/NotificationDropdown";
import { Car, Menu } from "lucide-react";

const Header = ({ setSidebarOpen, sidebarOpen }) => {
  return (
    <header className=" z-50 w-full border-b bg-white ">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6 lg:py-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden text-gray-700 hover:text-black focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex items-center space-x-2">
          <span className="block text-xl font-bold">Admin Dashboard</span>
        </div>

     
        {/* Right side icons */}
        <div className="flex items-center gap-3 lg:gap-4">
          <NotificationDropdown />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
