import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayot/MainLayout";
import Home from "../Pages/Home/Home";
import NotFound from "../Pages/NotFound/NotFound";
import AdminLayout from "../Layouts/Admin/AdminLayout";
import DriverLayouts from "../Layouts/DriverLayout/DriverLayouts";
import CustomerLayouts from "../Layouts/CustomerLayout/CustomerLayouts";
import AdminDashboard from "../Dashboard/Admin/AdminDashboard";

const routers = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
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
