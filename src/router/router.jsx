import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import PrivateRoute from "../routers/PrivateRoute";
import AddVolunteer from "../Pages/Shared/AddVolunteer";
// import AllVolunteers from "../Pages/Home/AllVolunteer";
import VolunteerDetails from "../Pages/Shared/VolunteerDetails";
import VolunteerRequestForm from "../Pages/Shared/VolunteerRequestForm";
import ManageMyPosts from "../Pages/Shared/ManageMyPosts";
import UpdateVolunteer from "../Pages/Home/UpdateVolunteer";
import AllVolunteer from "../Pages/Home/AllVolunteer";
import MyVolunteerRequests from "../Pages/Home/MyVolunteerRequests";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/AddVolunteerPost",
        element: (
          <PrivateRoute>
            <AddVolunteer></AddVolunteer>
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-posts",
        element: (
          <PrivateRoute>
            <ManageMyPosts></ManageMyPosts>
          </PrivateRoute>
        ),
      },
      {
        path: "/volunteer-request/:_id",
        element: (
          <PrivateRoute>
            <VolunteerRequestForm></VolunteerRequestForm>
          </PrivateRoute>
        ),
      },
      {
        path: "/update-volunteer/:id",
        element: (
          <PrivateRoute>
            <UpdateVolunteer />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/volunteer/${params.id}`).then((res) =>
            res.json()
          ),
        hydrateFallbackElement: (
          <span className="loading loading-bars loading-md"></span>
        ),
      },
      {
        path: "volunteer",
        element: (
          <PrivateRoute>
            <AllVolunteer></AllVolunteer>
          </PrivateRoute>
        ),
      },
      {
        path: "my-requests",
        element: (
          <PrivateRoute>
            <MyVolunteerRequests></MyVolunteerRequests>
          </PrivateRoute>
        ),
      },
      {
        path: "volunteer/:_id",
        element: <VolunteerDetails />,
      },
    ],
  },

  {
    path: "/*",
    Component: ErrorPage,
  },
]);

export default router;
