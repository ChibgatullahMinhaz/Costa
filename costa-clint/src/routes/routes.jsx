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
      {
       path:'profile',
       element: <Profile></Profile> 
      },
      {
       path:'setting',
       element: <AccountSetting></AccountSetting> 
      }
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
