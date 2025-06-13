import { useContext } from "react";
import { AuthContex } from "../../contexts/AuthContexts/AuthContext";
import { NavLink } from "react-router";
import { toast } from "react-toastify";
import logoimg from "../../assets/logo/Old .png"


const Navbar = () => {
  const { user, logout } = useContext(AuthContex);

  const handleLogOut = () => {
    logout()
      .then(() => {
        toast.success("Logout successful");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/services">Services</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost text-xl">
          <img src={logoimg} alt="" />
          <h2></h2>
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      
      <div className="navbar-end space-x-2">
        <input
              type="checkbox"
              className="toggle toggle-md"
              onChange={(e) => {
                document.documentElement.setAttribute(
                  "data-theme",
                  e.target.checked ? "dark" : "light"
                );
              }}
              title="Toggle Dark Mode"
            />
        {user ? (
          <>
            <span className="font-semibold">{user.email}</span>
            <button onClick={handleLogOut} className="btn btn-sm">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink className="btn btn-sm" to="/register">
              Register
            </NavLink>
            <NavLink className="btn btn-sm" to="/login">
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
