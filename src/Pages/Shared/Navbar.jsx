import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router";
import { AiOutlineMenu } from "react-icons/ai";
import {
  FaSun,
  FaMoon,
  FaHome,
  FaPlusCircle,
  FaTasks,
  FaListUl,
  FaClipboardList,
  FaUserPlus,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContex } from "../../contexts/AuthContexts/AuthContext";
import logo from "../../assets/logo/Old .png";

const Navbar = () => {
  const { user, logout } = useContext(AuthContex);
  const [isOpen, setIsOpen] = useState(false);

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    // localStorage থেকে থিম নাও, না থাকলে light দিয়ে শুরু করো
    return localStorage.getItem("theme") === "dark";
  });

  // থিম পরিবর্তন হলে html tag-এ class যোগ/অপসারণ করো + localStorage আপডেট করো
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogOut = () => {
    logout()
      .then(() => toast.success("Logout successful"))
      .catch((error) => console.error(error));
  };

  return (
    <div className="w-full z-10 shadow-sm  dark:bg-[#f0ecec] dark:text-white transition">
      <div className="py-3 border-b border-gray-300 dark:border-gray-700">
        <div className="flex flex-row items-center justify-between px-4">
          {/* Logo */}
          <NavLink to="/" className="items-center">
            <img src={logo} alt="logo" />
          </NavLink>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-white dark:bg-gray-700 text-black dark:text-yellow-400"
              title="Toggle Dark Mode"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* Dropdown */}
            <div className="relative">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 border border-gray-300 dark:border-gray-600 flex items-center gap-2 rounded-full cursor-pointer hover:shadow-md transition"
              >
                <AiOutlineMenu />
                <div className="hidden md:block">
                  <img
                    src={user?.photoURL || user}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[60vw] md:w-52 overflow-hidden right-0 top-12 text-sm bg-white dark:bg-gray-800 text-black dark:text-white">
                  <div className="flex flex-col cursor-pointer">
                    <NavLink
                      to="/"
                      className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                      <FaHome /> Home
                    </NavLink>
                    {user ? (
                      <>
                        <NavLink
                          to="/AddVolunteerPost"
                          className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                        >
                          <FaPlusCircle /> Add Volunteer Post
                        </NavLink>
                        <NavLink
                          to="/manage-posts"
                          className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                        >
                          <FaTasks /> Manage Posts
                        </NavLink>
                        <NavLink
                          to="/volunteer"
                          className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                        >
                          <FaListUl /> All Volunteer Posts
                        </NavLink>
                        <NavLink
                          to="/my-requests"
                          className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                        >
                          <FaClipboardList /> My Requests
                        </NavLink>
                        <div
                          onClick={handleLogOut}
                          className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 cursor-pointer"
                        >
                          <FaSignOutAlt /> Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <NavLink
                          to="/login"
                          className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                        >
                          <FaSignInAlt /> Login
                        </NavLink>
                        <NavLink
                          to="/register"
                          className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                        >
                          <FaUserPlus /> Register
                        </NavLink>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
