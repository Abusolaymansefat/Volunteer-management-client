import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const VolunteerNeedsNow = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/volunteer/top") 
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched posts:", data); 
        setPosts(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <motion.h2
        className="text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Volunteer Needs Now
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <motion.div
              key={post._id}
              className="border rounded-lg shadow-md overflow-hidden"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={post.thumbnail}
                alt={post.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-600">Category: {post.category}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Deadline: {new Date(post.deadline).toLocaleDateString()}
                </p>
                <Link to={`/volunteer/${post._id}`}>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    View Details
                  </button>
                </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full">No posts found</p>
        )}
      </div>

      <div className="text-center mt-10">
        <Link to="/volunteer">
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            See All
          </button>
        </Link>
      </div>
    </section>
  );
};

export default VolunteerNeedsNow;
