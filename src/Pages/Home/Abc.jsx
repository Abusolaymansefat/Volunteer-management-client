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
    fetch(`http://localhost:3000/volunteer-requests?email=${user.email}`)
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
    fetch(`http://localhost:3000/volunteer-requests/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Post deleted successfully");
        setPosts(posts.filter((post) => post._id !== id));
      })
      .catch(() => toast.error("Failed to delete post"));
  };

  if (loading)
    return <p className="text-center mt-10">Loading your posts...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6">My Volunteer Posts</h2>
      {posts.length === 0 ? (
        <p className="text-gray-600">You haven't created any posts yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full  border border-gray-300 rounded-md">
            <thead>
              <tr className=" text-left">
                <th className="py-3 px-4 border-b">Thumbnail</th>
                <th className="py-3 px-4 border-b">Title</th>
                <th className="py-3 px-4 border-b">Category</th>
                <th className="py-3 px-4 border-b">Volunteers</th>
                <th className="py-3 px-4 border-b">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td className="py-2 px-4 border-b">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{post.title}</td>
                  <td className="py-2 px-4 border-b">{post.category}</td>
                  <td className="py-2 px-4 border-b">{post.location}</td>
                  <td className="py-2 px-4 border-b">{post.volunteers}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(post.deadline).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b space-x-2">
                    <Link to={`/update-volunteer/${post._id}`}>
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMyPosts;
