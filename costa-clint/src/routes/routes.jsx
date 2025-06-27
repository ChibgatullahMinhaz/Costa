import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayot/MainLayout";
import Home from "../Pages/Home/Home";
import NotFound from "../Pages/NotFound/NotFound";
import AdminLayout from "../Layouts/Admin/AdminLayout";
import DriverLayouts from "../Layouts/DriverLayout/DriverLayouts";
import CustomerLayouts from "../Layouts/CustomerLayout/CustomerLayouts";
import AdminDashboard from "../Dashboard/Admin/AdminDashboard";
import Profile from "../Dashboard/Admin/Pages/Profile";
import AccountSetting from "../Dashboard/Admin/Pages/AccountSetting";
import UserManagement from "../Dashboard/Admin/Pages/UserManagement";
import BookingManagement from "../Dashboard/Admin/Pages/BookingManagement";
import ReportsAndEarnings from "../Dashboard/Admin/Pages/Reports&Earning";
import DriverManagement from "../Dashboard/Admin/Pages/DriverManagement";
import VehiclesManagement from "../Dashboard/Admin/Pages/Vehiclse";
import PriceManagement from "../Dashboard/Admin/Pages/PriceManagement";
import PushNotifications from "../Dashboard/Admin/Pages/PushNotification";
import ManualAssignment from "../Dashboard/Admin/Pages/ManualAssign";

const routers = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      }
      ,
      {
        path:'booking',
      }
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
        path: "setting",
        element: <AccountSetting></AccountSetting>,
      },
      {
        path: "userManagement",
        element: <UserManagement></UserManagement>,
      },
      {
        path: "bookingManagement",
        element: <BookingManagement></BookingManagement>,
      },
      {
        path: "reports&earning",
        element: <ReportsAndEarnings></ReportsAndEarnings>,
      },
      {
        path: "driverManagement",
        element: <DriverManagement></DriverManagement>,
      },
      {
        path: "vehicles",
        element: <VehiclesManagement></VehiclesManagement>,
      },
      {
        path: "priceManagement",
        element: <PriceManagement></PriceManagement>,
      },
      {
        path: "pushNotification",
        element: <PushNotifications></PushNotifications>,
      },
      {
        path: "manualAssign",
        element: <ManualAssignment></ManualAssignment>,
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
