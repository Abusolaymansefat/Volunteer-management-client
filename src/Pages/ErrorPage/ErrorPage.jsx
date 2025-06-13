import React from "react";
import errorImage from '../../assets/Error/error img.jpg';
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-10">
      <img
        className="w-96 mx-auto items-center rounded-2xl"
        src={errorImage}
        alt="image"
      />
      <div className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-7xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="text-white hover:bg-green-500 bg-green-600 px-6 py-3 rounded-xl transition-all duration-300"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;