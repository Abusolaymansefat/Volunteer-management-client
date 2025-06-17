import { useContext, useEffect, useState } from "react";
import { AuthContex } from "../../contexts/AuthContexts/AuthContext";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const ManageMyPosts = () => {
  const { user } = useContext(AuthContex);
  const [myPosts, setMyPosts] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    axios.get(`/my-posts?email=${user.email}`).then((res) => {
      setMyPosts(res.data || []);
    });

    axios.get(`/my-requests?email=${user.email}`).then((res) => {
      setMyRequests(res.data || []);
    });
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This post will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/volunteer-posts/${id}`).then(() => {
          setMyPosts(myPosts.filter((post) => post._id !== id));
          Swal.fire("Deleted!", "", "success");
        });
      }
    });
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel your request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/volunteer-requests/${id}`).then(() => {
          setMyRequests(myRequests.filter((r) => r._id !== id));
          Swal.fire("Cancelled!", "", "success");
        });
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Manage My Posts</h2>

      {/* My Posts */}
      <h3 className="text-xl font-semibold mb-2">My Volunteer Need Posts</h3>
      {myPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <table className="w-full mb-6 border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Deadline</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myPosts.map((post) => (
              <tr key={post._id} className="border-t">
                <td className="p-2">{post.title}</td>
                <td className="p-2">{new Date(post.deadline).toLocaleDateString()}</td>
                <td className="p-2">
                  <button onClick={() => navigate(`/update-post/${post._id}`)} className="mr-2 text-blue-600">
                    Update
                  </button>
                  <button onClick={() => handleDelete(post._id)} className="text-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* My Requests */}
      <h3 className="text-xl font-semibold mb-2">My Volunteer Requests</h3>
      {myRequests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Post</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Cancel</th>
            </tr>
          </thead>
          <tbody>
            {myRequests.map((r) => (
              <tr key={r._id} className="border-t">
                <td className="p-2">{r.title}</td>
                <td className="p-2">{r.category}</td>
                <td className="p-2">
                  <button onClick={() => handleCancel(r._id)} className="text-red-600">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageMyPosts;
