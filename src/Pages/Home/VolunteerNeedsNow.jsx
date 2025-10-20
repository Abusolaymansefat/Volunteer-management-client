/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";

const VolunteerNeedsNow = ({ posts = [], loading = false }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [viewLoadingId, setViewLoadingId] = useState(null);

  const navigate = useNavigate();

  const handleSeeAll = () => {
    setBtnLoading(true);
    setTimeout(() => {
      navigate("/volunteer");
    }, 800);
  };

  const handleViewDetails = (id) => {
    setViewLoadingId(id);
    setTimeout(() => {
      navigate(`/volunteer/${id}`);
    }, 800);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
      <motion.h2
        className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-[#fff]"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Volunteer Needs Now
      </motion.h2>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <ClipLoader size={50} color="#6594aa" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post) => (
              <motion.div
                key={post._id}
                className="border border-gray-300 dark:border-gray-700 rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800 transition-colors duration-300 flex flex-col"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                    <strong className="dark:text-gray-200">Category:</strong>{" "}
                    {post.category}
                  </p>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    ${post.price}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    <strong className="dark:text-gray-200">Deadline:</strong>{" "}
                    {new Date(post.deadline).toLocaleDateString()}
                  </p>

                  <button
                    onClick={() => handleViewDetails(post._id)}
                    className="w-full bg-[#6594aa] text-white px-4 py-2 rounded hover:bg-[#73c7ee] transition duration-300 flex justify-center items-center gap-2"
                    disabled={viewLoadingId === post._id}
                  >
                    {viewLoadingId === post._id ? (
                      <>
                        <ClipLoader size={18} color="#fff" /> Loading...
                      </>
                    ) : (
                      "View Details"
                    )}
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-700 dark:text-gray-300">
              No posts found
            </p>
          )}
        </div>
      )}

      <div className="text-center mt-12">
        <button
          onClick={handleSeeAll}
          className="bg-[#122e2c] text-white px-6 py-2 rounded hover:bg-[#1e7570] transition duration-300 flex justify-center items-center gap-2"
          disabled={btnLoading}
        >
          {btnLoading ? (
            <>
              <ClipLoader size={20} color="#fff" /> Loading...
            </>
          ) : (
            "See All Posts"
          )}
        </button>
      </div>
    </section>
  );
};

export default VolunteerNeedsNow;
