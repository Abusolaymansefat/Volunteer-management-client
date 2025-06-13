import Lottie from "lottie-react";
import React, { use } from "react";
import registerLottie from "../../assets/lottes/register.json";
import { AuthContex } from "../../contexts/AuthContexts/AuthContext";
import { Link } from "react-router";
import { toast } from "react-toastify";

const Register = () => {
  const { createUser } = use(AuthContex);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    createUser(email, password)
      .then(() => {
        toast.success("✅ Registration successful!");
        form.reset();
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
          ></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                />
                {/* <div>
                <a className="link link-hover">Forgot password?</a>
              </div> */}
                <button className="btn btn-neutral mt-4">Register</button>
              </fieldset>
            </form>
            <div className="mt-6 text-center">
              <p className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Login
                </Link>
              </p>
            </div>
            {/* <SocialLogin></SocialLogin> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
