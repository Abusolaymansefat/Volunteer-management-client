import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ScaleLoader } from "react-spinners";
import axiosInstance from "../../api/axiosInstance";
import useLoadingSpinner from "../../hooks/useLoadingSpinner";

const AllVolunteer = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // 🔹 search query state
  const { loading, show, hide } = useLoadingSpinner();

  useEffect(() => {
    const fetchPosts = async () => {
      show(); // start loading
      try {
        const res = await axiosInstance.get("/volunteer");
        setPosts(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        hide(); // stop loading
      }
    };

    fetchPosts();
  }, []);

  // 🔹 Filter posts based on searchQuery
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 mt-10">
        <ScaleLoader color="#5896e6" />
      </div>
    );
  }

  if (filteredPosts.length === 0)
    return <p className="text-center mt-10">No volunteer posts found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-4 text-center">All Volunteer Posts</h2>

      {/* 🔹 Search Input */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by title or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-[#5896e6]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPosts.map((post) => (
          <div key={post._id} className="rounded-lg shadow-md overflow-hidden">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-600 mb-2">{post.category}</p>
              <p className="text-gray-500 mb-4">
                Deadline: {new Date(post.deadline).toLocaleDateString()}
              </p>
              <Link to={`/volunteer/${post._id}`}>
                <button className="bg-[#5896e6] text-white px-4 py-2 rounded hover:bg-[#2d71ca]">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllVolunteer;
