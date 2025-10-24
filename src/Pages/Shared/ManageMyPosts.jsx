import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContexts/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { ScaleLoader } from "react-spinners";
import useLoadingSpinner from "../../hooks/useLoadingSpinner";
import axiosInstance from "../../api/axiosInstance";

const ManageMyPosts = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [myPosts, setMyPosts] = useState([]);
  const { loading, show, hide } = useLoadingSpinner();

  const fetchMyPosts = async () => {
    if (!user?.email) return;
    show();
    try {
      const res = await axiosInstance.get(`/volunteer?organizerEmail=${user.email}`);
      setMyPosts(res.data || []);
    } catch (error) {
      toast.error("Failed to fetch your posts");
      console.error(error);
    } finally {
      hide();
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    show();
    try {
      await axiosInstance.delete(`/volunteer/${id}`);
      toast.success("Post deleted successfully!");
      setMyPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (error) {
      toast.error("Error deleting post.");
      console.error(error);
    } finally {
      hide();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <ScaleLoader color="#5896e6" />
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
            <table className="min-w-full border border-[#c4bdbd] rounded shadow-lg">
              <thead>
                <tr className="text-black border border-[#c4bdbd]">
                  <th className="p-3">Thumbnail</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Volunteers Needed</th>
                  <th className="p-3">Deadline</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myPosts.map((post) => (
                  <tr
                    key={post._id}
                    className="text-center hover:shadow-md transition-shadow duration-300"
                  >
                    <td className="p-3">
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-16 h-16 object-cover mx-auto rounded"
                      />
                    </td>
                    <td className="p-3">{post.title}</td>
                    <td className="p-3">{post.category}</td>
                    <td className="p-3">{post.volunteers}</td>
                    <td className="p-3">
                      {new Date(post.deadline).toLocaleDateString()}
                    </td>
                    <td className="p-3 space-x-4 flex justify-center">
                      <button
                        onClick={() =>
                          navigate(`/update-volunteer/${post._id}`)
                        }
                        className="text-[#5fa191] hover:text-[#53c7aa] text-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                        title="Update Post"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="text-red-600 hover:text-red-700 text-xl shadow-md hover:shadow-lg transition-shadow duration-300"
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
