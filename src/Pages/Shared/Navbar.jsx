import { useState, useContext } from "react";
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
import logo from "../../assets/logo/Logo.svg";

const Navbar = () => {
  const { user, logout } = useContext(AuthContex);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOut = () => {
    logout()
      .then(() => toast.success("Logout successful"))
      .catch((error) => console.error(error));
  };

  const links = (
    <>
      <NavLink
        to="/"
        className="px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2 rounded"
        onClick={() => setIsOpen(false)}
      >
        <FaHome /> Home
      </NavLink>

      {user ? (
        <>
          <NavLink
            to="/AddVolunteerPost"
            className="px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2 rounded"
            onClick={() => setIsOpen(false)}
          >
            <FaPlusCircle /> Add Volunteer Post
          </NavLink>
          <NavLink
            to="/manage-posts"
            className="px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2 rounded"
            onClick={() => setIsOpen(false)}
          >
            <FaTasks /> Manage Posts
          </NavLink>
          <NavLink
            to="/volunteer"
            className="px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2 rounded"
            onClick={() => setIsOpen(false)}
          >
            <FaListUl /> All Volunteer Posts
          </NavLink>
          <NavLink
            to="/my-requests"
            className="px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2 rounded"
            onClick={() => setIsOpen(false)}
          >
            <FaClipboardList /> My Requests
          </NavLink>
          <div
            onClick={() => {
              setIsOpen(false);
              handleLogOut();
            }}
            className="px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2 cursor-pointer rounded"
          >
            <FaSignOutAlt /> Logout
          </div>
        </>
      ) : (
        <>
          <NavLink
            to="/login"
            className="px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2 rounded"
            onClick={() => setIsOpen(false)}
          >
            <FaSignInAlt /> Login
          </NavLink>
          <NavLink
            to="/register"
            className="px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-2 rounded"
            onClick={() => setIsOpen(false)}
          >
            <FaUserPlus /> Register
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <div className="w-full z-10 shadow-md bg-gray-100 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="py-3 border-b border-gray-300 dark:border-gray-700 px-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center flex-shrink-0">
          <img src={logo} alt="logo" className="h-10 w-auto" />
        </NavLink>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-4 flex-grow justify-center">{links}</nav>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <label className="swap swap-rotate cursor-pointer">
            <input
              type="checkbox"
              onChange={(e) =>
                document.documentElement.setAttribute(
                  "data-theme",
                  e.target.checked ? "dark" : "light"
                )
              }
              className="hidden"
            />
            <FaSun className="swap-on fill-current w-5 h-5" />
            <FaMoon className="swap-off fill-current w-5 h-5" />
          </label>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 border border-gray-300 dark:border-gray-600 rounded-md"
            aria-label="Toggle menu"
          >
            <AiOutlineMenu />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <nav className="md:hidden bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-b-xl shadow-md transition-colors duration-300">
          <div className="flex flex-col">{links}</div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
