import { useEffect, useState } from "react";
import { Link } from "react-router";

const AllVolunteers = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/volunteer")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching volunteers:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading posts...</p>;
  }

  if (posts.length === 0) {
    return <p className="text-center mt-10">No volunteer posts found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">All Volunteer Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="border rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={post.thumbnail}
              alt={post.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-600 mb-2">Category: {post.category}</p>
              <p className="text-gray-500 mb-4">
                Deadline: {new Date(post.deadline).toLocaleDateString()}
              </p>
              <Link to={`/volunteer/${post._id}`}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
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

export default AllVolunteers;
