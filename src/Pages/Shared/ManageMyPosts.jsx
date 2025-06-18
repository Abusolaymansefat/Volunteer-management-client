import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { AuthContex } from "../../contexts/AuthContexts/AuthContext";

const ManageMyPosts = () => {
  const { user } = useContext(AuthContex);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch user's posts
  useEffect(() => {
    fetch(`http://localhost:3000/volunteer?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to fetch your posts");
        setLoading(false);
      });
  }, [user.email]);

  // handle delete
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this post?")) {
      fetch(`http://localhost:3000/volunteer-requests/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          toast.success("Post deleted successfully");
          setPosts(posts.filter((post) => post._id !== id));
        })
        .catch(() => toast.error("Failed to delete post"));
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading your posts...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6">My Volunteer Posts</h2>
      {posts.length === 0 ? (
        <p className="text-gray-600">You haven't created any posts yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <div key={post._id} className="border rounded-lg p-4 shadow-md">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-2">{post.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{post.category}</p>
              <p className="mb-2">
                <strong>Location:</strong> {post.location}
              </p>
              <p>
                <strong>Volunteers:</strong> {post.volunteers}
              </p>
              <p>
                <strong>Deadline:</strong>{" "}
                {new Date(post.deadline).toLocaleDateString()}
              </p>

              <div className="mt-4 flex gap-3">
                <Link to={`/update-volunteer/${post._id}`}>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
                    Update
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(post._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageMyPosts;
