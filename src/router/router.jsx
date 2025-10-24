import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PrivateRoute from "../routers/PrivateRoute";

import AddVolunteer from "../Pages/Shared/AddVolunteer";
import ManageMyPosts from "../Pages/Shared/ManageMyPosts";
import MyVolunteerRequests from "../Pages/Home/MyVolunteerRequests";
import AllVolunteer from "../Pages/Home/AllVolunteer";
import VolunteerDetails from "../Pages/Shared/VolunteerDetails";
import JoinPage from "../Pages/Home/JoinPage";
import DashboardLayout from "../Pages/Components/DashboardLayout";
import ManageUsers from "../Pages/Components/Dashbord/Admin/ManageUsers";
import VolunteerRequestForm from "../Pages/Shared/VolunteerRequestForm";
import UpdatePost from "../Pages/Shared/UpdatePost";
import AdminDashboard from "../Pages/Components/Dashbord/Admin/AdminDashboard";
import UpdateVolunteer from "../Pages/Home/UpdateVolunteer";


const router = createBrowserRouter([
  // Root Routes (Navbar Layout)
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "join", Component: JoinPage },
      { path: "register", Component: Register },
      { path: "login", Component: Login },
      {
        path: "volunteer",
        element: (
          <PrivateRoute>
            <AllVolunteer />
          </PrivateRoute>
        ),
      },
      { path: "volunteer/:_id", element: <VolunteerDetails /> },
      {
        path: "volunteer-request/:_id",
        element: (
          <PrivateRoute>
            <VolunteerRequestForm />
          </PrivateRoute>
        ),
      },
    ],
  },

  // Dashboard Routes (Sidebar Layout)
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "", element: <AdminDashboard /> },
      { path: "add-volunteer", element: <AddVolunteer /> },
      { path: "manage-posts", element: <ManageMyPosts /> },
      { path: "my-requests", element: <MyVolunteerRequests /> },
      { path: "manage-users", element: <ManageUsers /> },
       {
        path: "update-volunteer/:id",
        element: <UpdateVolunteer />,
        loader: async ({ params }) => {
          const res = await fetch(`https://volunteer-server-ten.vercel.app/volunteer/${params.id}`);
          if (!res.ok) throw new Error("Failed to load post");
          return res.json();
        },
      },
    ],
  },

  // Catch All Route
  { path: "*", Component: ErrorPage },
]);

export default router;
