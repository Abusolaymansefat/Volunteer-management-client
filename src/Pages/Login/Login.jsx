// import { useContext } from "react";
// import { Link, useLocation, useNavigate } from "react-router";
// import { toast } from "react-toastify";
// import { FaGoogle } from "react-icons/fa";
// import { AuthContex } from "../../contexts/AuthContexts/AuthContext";

import { useContext } from "react";
import { AuthContex } from "../../contexts/AuthContexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const { login, loginWithGoogle } = useContext(AuthContex);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    login(email, password)
      .then(() => {
        toast.success("Login successful!");
        navigate(from, { replace: true });
      })
      .catch(() => {
        toast.error("Invalid email or password.");
      });
  };

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(() => {
        toast.success("Logged in with Google!");
        navigate(from, { replace: true });
      })
      .catch(() => {
        toast.error("Google login failed.");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter email"
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="text-sm text-right">
          <Link
            to="/auth/forgotPassword"
            className="text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <div className="mt-6 text-center">
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-green-500 flex gap-3 justify-center text-white py-4 rounded hover:bg-green-600"
        >
          <FaGoogle /> Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;