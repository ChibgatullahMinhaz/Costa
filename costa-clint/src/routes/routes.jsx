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
import Earnings from "../Dashboard/Admin/Pages/Earning";
import EarningOverview from "../Dashboard/Admin/Components/Earnings/EarningOverview";
import Reports from "../Dashboard/Admin/Pages/Reports";
import UserUpdated from "../Dashboard/Admin/Components/userManagement/UserUpdated";
import UserDetails from "../Dashboard/Admin/Components/userManagement/UserDetails";
import AuthLayout from "../Layouts/Auth/AuthLayout";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import AdminRoutes from "./AdminRoutes";
import PrivateRoute from "./PrivateRoute";
import DriverRoute from "./DriverRoutes";
import Unauthorized from "../Pages/Unauthorized/Unauthorized";
import UserRoutes from "./UserRoutes";
import About from "../Pages/About/About";
import Destinations from "../Pages/Destinations/Destinations";
import Services from "../Pages/Services/Services";
import DashboardHome from "../Layouts/CustomerLayout/components/Home";
import MyBookings from "../Layouts/CustomerLayout/components/MyBookings";
import FlightSearch from "../Layouts/CustomerLayout/components/FlightSearch";
import DriverDashboardHome from "../Dashboard/Driver/Components/DriverDashboardHome";
import DriverDetails from "../Dashboard/Admin/Pages/DriverDetails";
import UpdateDriver from "../Dashboard/Admin/Components/DriverManagement/UpdateDriver";
import BookingUpdateForm from "../Layouts/CustomerLayout/components/BookingUpdateForm";
import VehicleUpdateForm from "../Dashboard/Admin/Components/vehiclsemanagment/VehicleUpdateForm";
import Pricing from "../Dashboard/Admin/Pages/Pricing";
import InvoiceList from "../components/Invoice/InvoiceList";
import NotificationDetails from "../Pages/pushNotification/NotificationDetails";
import AddVehicleForm from "../Dashboard/Admin/Components/vehiclsemanagment/AddVehicale";

// Dummy data


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
      {
        path: "/aboutUs",
        Component: About,
      },
      {
        path: "/destination",
        Component: Destinations,
      },
      {
        path: "/ourServices",
        Component: Services,
      },
      {
        path: "/notification",
        Component: NotificationDetails,
      },
    ],
  },
  {
    path: "/admin-dashboard",
    element: (
      // <AdminRoutes>
        <AdminLayout></AdminLayout>
      // </AdminRoutes>
    ),
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
        path: "userManagement",
        element: <UserManagement></UserManagement>,
        children: [
          {
            index: true,
            element: <UserList></UserList>,
          },
          {
            path: "userUpdate/:id",
            element: <UserUpdated></UserUpdated>,
          },
          {
            path: "details/:id",
            element: <UserDetails></UserDetails>,
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
          {
            path: "driverDetails/:id",
            element: <DriverDetails></DriverDetails>,
          },
          {
            path: "updateDriver/:id",
            element: <UpdateDriver></UpdateDriver>,
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
            path: "updateVehicle/:id",
            element: <VehicleUpdateForm />,
          },
          {
            path: "Pricing",
            element: <Pricing />,
          },
          {
            path: "add/vehicles",
            element: <AddVehicleForm />,
          },
          {
            path: "manualAssign",
            element: <ManualAssignment></ManualAssignment>,
          },
        ],
      },
      {
        path: "pushNotification",
        element: <PushNotifications></PushNotifications>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <UserRoutes>
          <CustomerLayouts></CustomerLayouts>
        </UserRoutes>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "myBookings",
        Component: MyBookings,
      },
      {
        path: "invoice",
        element: <InvoiceList  />,
      },
      {
        path: "flights",
        Component: FlightSearch,
      },
      {
        path: "updateBooking/:id",
        Component: BookingUpdateForm,
      },
    ],
  },
  {
    path: "/driver-dashboard",
    element: (
      // <DriverRoute>
        <DriverLayouts></DriverLayouts>
      // </DriverRoute>
    ),
    children: [
      {
        index: true,
        Component: DriverDashboardHome,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/unauthorized",
    element: (
      <PrivateRoute>
        <Unauthorized />,
      </PrivateRoute>
    ),
  },

  {
    path: "*",
    Component: NotFound,
  },
]);
export default routers;
