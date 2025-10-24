import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContexts/AuthContext";

const Login = () => {
  const { login, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await login(email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch {
      toast.error("Invalid email or password.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch {
      toast.error("Google login failed.");
    }
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
          <Link to="/auth/forgotPassword" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>

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
          className="btn bg-white hover:bg-gray-50 w-full p-6 text-xl text-black border-[#e5e5e5]"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
