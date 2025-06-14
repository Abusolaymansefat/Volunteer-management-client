import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import PrivateRoute from "../routers/PrivateRoute";
import AddVolunteer from "../Pages/Shared/AddVolunteer";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home
        },
        {
            path: '/register',
            Component: Register
        },
        {
            path: '/login',
            Component: Login
        },
        {
          path: '/AddVolunteerPost',
          element: <PrivateRoute><AddVolunteer></AddVolunteer></PrivateRoute>
        }

    ]
  },
  
    {
    path: "/*",
    Component: ErrorPage,
  },
  
]);

export default router;