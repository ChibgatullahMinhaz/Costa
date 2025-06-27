import { Home, Users, Car, Settings, Menu } from "lucide-react";
const Sidebar = ({ isOpen }) => {
  return (
    <div className=" h-screen p-4 transition-all duration-300 ease-in-out ">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center space-x-2">
          <Car className="h-6 w-6" />
          <span className="hidden sm:block text-xl font-bold">Admin</span>
        </div>

        <nav className="flex flex-col space-y-4 mt-6">
          <a
            href="#"
            className="flex items-center space-x-2 hover:text-blue-400"
          >
            <Home className="h-5 w-5" />
            <span className="hidden sm:block">Dashboard</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 hover:text-blue-400"
          >
            <Users className="h-5 w-5" />
            <span className="hidden sm:block">Users</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 hover:text-blue-400"
          >
            <Car className="h-5 w-5" />
            <span className="hidden sm:block">Vehicles</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 hover:text-blue-400"
          >
            <Settings className="h-5 w-5" />
            <span className="hidden sm:block">Settings</span>
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
