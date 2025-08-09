import React, { useEffect, useState, useContext } from "react";
import { AuthContex } from "../../contexts/AuthContexts/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const ManageMyPosts = () => {
  const { user } = useContext(AuthContex);
  const navigate = useNavigate();

  const [myPosts, setMyPosts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

  
    fetch(`http://localhost:3000/volunteer?organizerEmail=${user.email}`,{
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        setMyPosts(data || []);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to fetch your posts");
        setLoading(false);
      });

   
    fetch(`http://localhost:3000/volunteer-requests?userEmail=${user.email}`,{
      credentials: 'include'
    })
      .then((res) => res.json())
      .catch(() => toast.error("Failed to fetch your volunteer requests"));
  }, [user]);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    fetch(`http://localhost:3000/volunteer/${id}`, {
      method: "DELETE",
      credentials: 'include'
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Post deleted successfully!");
          setMyPosts((prev) => prev.filter((post) => post._id !== id));
        } else {
          toast.error("Failed to delete post.");
        }
      })
      .catch(() => toast.error("Error deleting post."));
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage My Posts</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">My Volunteer Need Posts</h2>
        {myPosts.length === 0 ? (
          <p className="text-gray-600">
            You have not added any volunteer need posts yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded">
              <thead>
                <tr>
                  <th className="p-3 border">Thumbnail</th>
                  <th className="p-3 border">Title</th>
                  <th className="p-3 border">Category</th>
                  <th className="p-3 border">Volunteers Needed</th>
                  <th className="p-3 border">Deadline</th>
                  <th className="p-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myPosts.map((post) => (
                  <tr key={post._id} className="text-center border-t">
                    <td className="p-3 border">
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-16 h-16 object-cover mx-auto rounded"
                      />
                    </td>
                    <td className="p-3 border">{post.title}</td>
                    <td className="p-3 border">{post.category}</td>
                    <td className="p-3 border">{post.volunteers}</td>
                    <td className="p-3 border">
                      {new Date(post.deadline).toLocaleDateString()}
                    </td>
                    <td className="p-3 border space-x-4 flex justify-center">
                      <button
                        onClick={() => navigate(`/update-volunteer/${post._id}`)}
                        className="text-yellow-500 hover:text-yellow-600 text-xl"
                        title="Update Post"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="text-red-600 hover:text-red-700 text-xl"
                        title="Delete Post"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default ManageMyPosts;
