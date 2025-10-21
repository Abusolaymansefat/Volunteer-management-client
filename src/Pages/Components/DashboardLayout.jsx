// import { NavLink, Outlet } from "react-router-dom";
import { FaClipboardList, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <h2 className="text-2xl font-bold p-4 border-b border-gray-700">
          Dashboard
        </h2>
        <nav className="flex flex-col mt-4 gap-2">
          <NavLink
            to="/dashboard/posts"
            className={({ isActive }) =>
              `flex items-center gap-2 p-3 hover:bg-gray-700 rounded ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaClipboardList /> Manage Posts
          </NavLink>
          <NavLink
            to="/dashboard/requests"
            className={({ isActive }) =>
              `flex items-center gap-2 p-3 hover:bg-gray-700 rounded ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaUsers /> Manage Requests
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
