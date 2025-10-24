import { useState, useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import {
  FaClipboardList,
  FaUsers,
  FaPlusCircle,
  FaTasks,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Swal from "sweetalert2";
import logo from "../../assets/logo/Logo.svg";
import {AuthContext } from "../../contexts/AuthContexts/AuthContext";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await logout();
          Swal.fire("Logged Out!", "You have been logged out successfully.", "success");
          navigate("/login");
        } catch (error) {
          Swal.fire("Error!", "Logout failed. Try again!", "error", error);
        }
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static z-20 w-64 bg-gray-800 text-white flex flex-col justify-between transition-transform duration-300`}
      >
        <div>
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center justify-center cursor-pointer py-5 border-b border-gray-700 hover:bg-gray-700 transition"
          >
            <img src={logo} alt="Logo" className="w-20" />
          </div>

          {/* Nav Menu */}
          <nav className="flex flex-col mt-4 gap-2">
            <NavLink
              to="/dashboard/add-volunteer"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 rounded hover:bg-gray-700 transition ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <FaPlusCircle /> Add Volunteer Post
            </NavLink>

            <NavLink
              to="/dashboard/manage-posts"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 rounded hover:bg-gray-700 transition ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <FaTasks /> Manage Posts
            </NavLink>

            <NavLink
              to="/dashboard/my-requests"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 rounded hover:bg-gray-700 transition ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <FaClipboardList /> My Requests
            </NavLink>

            <NavLink
              to="/dashboard/manage-users"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 rounded hover:bg-gray-700 transition ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <FaUsers /> Manage Users
            </NavLink>
          </nav>
        </div>

        {/* Footer Section */}
        <div className="p-4 border-t border-gray-700">
          {user?.email && (
            <p className="text-center text-sm mb-3 text-gray-300">{user.email}</p>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Sidebar Toggle (Mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-30 bg-gray-800 text-white p-2 rounded"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-0 mt-12 md:mt-0 transition-all">
        <Outlet />
      </main>
    </div>
  );
}
