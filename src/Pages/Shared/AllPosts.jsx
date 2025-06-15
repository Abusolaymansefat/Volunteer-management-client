import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPosts = () => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/volunteer-posts?search=${search}`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPosts();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-4">All Volunteer Need Posts</h2>
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-6"
      />

      {loading ? (
        <p className="text-center">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-center">No volunteer posts found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post._id} className="border p-4 rounded shadow">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-40 object-cover mb-2"
              />
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p>{post.category}</p>
              <p>{new Date(post.deadline).toLocaleDateString()}</p>
              <Link to={`/volunteer/${post._id}`}>
                <button className="text-blue-600 mt-2">View Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPosts;
