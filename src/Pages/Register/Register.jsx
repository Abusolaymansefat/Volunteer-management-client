import { useContext } from "react";
import { AuthContex } from "../../contexts/AuthContexts/AuthContext";
import { toast } from "react-toastify";
import registerLottie from "../../assets/lottes/register.json";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router";

const Register = () => {
  const { createUser } = useContext(AuthContex);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    // Password Validation
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;

    if (!uppercaseRegex.test(password)) {
      toast.error("❌ Password must contain at least one uppercase letter.");
      return;
    }

    if (!lowercaseRegex.test(password)) {
      toast.error("❌ Password must contain at least one lowercase letter.");
      return;
    }

    if (password.length < 6) {
      toast.error("❌ Password must be at least 6 characters long.");
      return;
    }


    createUser(email, password)
      .then(() => {
        toast.success("✅ Registration successful!");
        form.reset();
        navigate("/");
      })
      .catch((error) => {
        toast.error(`❌ ${error.message}`);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <Lottie
            style={{ width: "400px" }}
            animationData={registerLottie}
            loop={true}
          />
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-4xl font-bold text-center mb-4">Register</h1>

            <form onSubmit={handleRegister}>
              <fieldset className="fieldset space-y-4">
                <div>
                  <label className="label">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="input input-bordered w-full"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="input input-bordered w-full"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="label">Photo URL</label>
                  <input
                    type="text"
                    name="photo"
                    required
                    className="input input-bordered w-full"
                    placeholder="Enter photo URL"
                  />
                </div>

                <div>
                  <label className="label">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="input input-bordered w-full"
                    placeholder="Enter password"
                  />
                </div>

                <button type="submit" className="btn btn-neutral w-full mt-2">
                  Register
                </button>
              </fieldset>
            </form>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
