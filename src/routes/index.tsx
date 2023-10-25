import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BaseLayout from "@layouts/BaseLayout";
import Login from "@/pages/user/Login";
import Register from "@/pages/user/Register";
import UpdatePassword from "@/pages/user/UpdatePassword";
import UserLayout from "@/layouts/UserLayout";

const routes = [
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
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
    path: "/index",
    element: <BaseLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
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
];
const router = createBrowserRouter(routes);

const Routers = () => <RouterProvider router={router} />;

export default Routers;
