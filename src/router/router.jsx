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
import AllVolunteers from "../Pages/Home/AllVolunteer";
import VolunteerDetails from "../Pages/Shared/VolunteerDetails";
import ManageMyPosts from "../Pages/Shared/ManageMyPosts";
import VolunteerRequestForm from "../Pages/Shared/VolunteerRequestForm";

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
        },
        {
          path: '//manage-posts',
          element: <PrivateRoute><ManageMyPosts></ManageMyPosts></PrivateRoute>
        },
        {
        path: "/volunteer-request/:_id",
        element: <PrivateRoute><VolunteerRequestForm></VolunteerRequestForm></PrivateRoute>
      },
        {
        path: 'volunteer',
        element: <AllVolunteers />
      },
      {
        path: 'volunteer/:_id',
        element: <VolunteerDetails />
      },
      

    ]
  },
  
    {
    path: "/*",
    Component: ErrorPage,
  },
  
]);

export default router;