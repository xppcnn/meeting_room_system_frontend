import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BaseLayout from "@layouts/BaseLayout";
import Login from "@/pages/user/Login";
import Register from "@/pages/user/Register";
import UpdatePassword from "@/pages/user/UpdatePassword";
import UserLayout from "@/layouts/UserLayout";
import Dashboards from "@/pages/dashboards";
import Account from "@/pages/user/Account";
import Demo from "@/pages/demo";

const routes = [
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "demo",
        element: <Demo />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "updatePassword",
        element: <UpdatePassword />,
      },
    ],
  },
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "dashboards",
        element: <Dashboards />,
      },
      {
        path: "account",
        element: <Account />,
      },
    ],
  },
];
const router = createBrowserRouter(routes);

const Routers = () => <RouterProvider router={router} />;

export default Routers;
