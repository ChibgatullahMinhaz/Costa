import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayot/MainLayout";
import Home from "../Pages/Home/Home";
import NotFound from "../Pages/NotFound/NotFound";
import AdminLayout from "../Layouts/Admin/AdminLayout";
import DriverLayouts from "../Layouts/DriverLayout/DriverLayouts";
import CustomerLayouts from "../Layouts/CustomerLayout/CustomerLayouts";
import AdminDashboard from "../Dashboard/Admin/AdminDashboard";
import Profile from "../Dashboard/Admin/Pages/Profile";
import UserManagement from "../Dashboard/Admin/Pages/UserManagement";
import BookingManagement from "../Dashboard/Admin/Pages/BookingManagement";
import DriverManagement from "../Dashboard/Admin/Pages/DriverManagement";
import VehiclesManagement from "../Dashboard/Admin/Pages/VehiclesManagement";
import PushNotifications from "../Dashboard/Admin/Pages/PushNotification";
import BeADriver from "../Pages/BeDriver/BeADriver";
import UserList from "../Dashboard/Admin/Components/userManagement/UserList";
import UserAnalytics from "../Dashboard/Admin/Components/userManagement/UserAnalytics";
import DriversList from "../Dashboard/Admin/Components/DriverManagement/DriverList";
import DriverPerformance from "../Dashboard/Admin/Components/DriverManagement/DriverPerformance";
import VehiclesList from "../Dashboard/Admin/Components/vehiclsemanagment/VehiclesList";
import ManualAssignment from "../Dashboard/Admin/Components/vehiclsemanagment/ManualAssignment";
import PriceManagement from "../Dashboard/Admin/Components/vehiclsemanagment/PriceManagement";
import Earnings from "../Dashboard/Admin/Pages/Earning";
import EarningOverview from "../Dashboard/Admin/Components/Earnings/EarningOverview";
import Reports from "../Dashboard/Admin/Pages/Reports";
import Settings from "../Dashboard/Admin/Pages/Settings";




const routers = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "beDriver",
        Component: BeADriver,
      },
    ],
  },
  {
    path: "/admin-dashboard",
    element: <AdminLayout></AdminLayout>,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "setting",
        element: <Settings />,
      },
      {
        path: "userManagement",
        element: <UserManagement></UserManagement>,
        children: [
          {
            index: true,
            element: <UserList></UserList>,
          },
          {
            path: "analytics",
            element: <UserAnalytics></UserAnalytics>,
          },
        ],
      },
      {
        path: "bookingManagement",
        element: <BookingManagement></BookingManagement>,
      },
      {
        path: "earning",
        element: <Earnings></Earnings>,
        children: [
          {
            index: true,
            element: <EarningOverview></EarningOverview>,
          },
          {
            path: "pricing",
            element: <PriceManagement></PriceManagement>,
          },
        ],
      },
      {
        path: "driverManagement",
        element: <DriverManagement></DriverManagement>,
        children: [
          {
            index: true,
            element: <DriversList></DriversList>,
          },
          {
            path: "driverPerformance",
            element: <DriverPerformance></DriverPerformance>,
          },
        ],
      },
      {
        path: "vehicles",
        element: <VehiclesManagement></VehiclesManagement>,
        children: [
          {
            index: true,
            element: <VehiclesList />,
          },
          {
            path: "priceManagement",
            element: <PriceManagement />,
          },
          {
            path: "manualAssign",
            element: <ManualAssignment></ManualAssignment>,
          },
        ],
      },
      {
        path: "priceManagement",
        element: <PriceManagement></PriceManagement>,
      },
      {
        path: "pushNotification",
        element: <PushNotifications></PushNotifications>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <CustomerLayouts></CustomerLayouts>,
  },
  {
    path: "/driver-dashboard",
    element: <DriverLayouts></DriverLayouts>,
  },

  {
    path: "*",
    Component: NotFound,
  },
]);
export default routers;
