// import { useEffect, useState, useContext } from "react";
// import { AuthContex } from "../../contexts/AuthContexts/AuthContext";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

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
    axios.get(`/api/my-posts?email=${user.email}`).then((res) => {
      setMyPosts(res.data);
    });
    axios.get(`/api/my-requests?email=${user.email}`).then((res) => {
      setMyRequests(res.data);
    });
  }, [user.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This post will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/volunteer-posts/${id}`).then(() => {
          setMyPosts((prev) => prev.filter((p) => p._id !== id));
          Swal.fire("Deleted!", "Your post has been removed.", "success");
        });
      }
    });
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel this volunteer request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/api/volunteer-requests/${id}`).then(() => {
          setMyRequests((prev) => prev.filter((r) => r._id !== id));
          Swal.fire("Cancelled!", "Your request has been cancelled.", "success");
        });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">Manage My Posts</h2>

      {/* My Volunteer Need Posts */}
      <h3 className="text-2xl font-semibold mb-3">My Volunteer Need Posts</h3>
      {myPosts.length === 0 ? (
        <p>You haven’t added any volunteer need posts yet.</p>
      ) : (
        <table className="w-full border mb-8">
          <thead>
            <tr className="bg-gray-200">
              <th>Title</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myPosts.map((post) => (
              <tr key={post._id} className="text-center border-t">
                <td>{post.title}</td>
                <td>{post.deadline}</td>
                <td>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 mr-2 rounded"
                    onClick={() => navigate(`/update-post/${post._id}`)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* My Volunteer Requests */}
      <h3 className="text-2xl font-semibold mb-3">My Volunteer Requests</h3>
      {myRequests.length === 0 ? (
        <p>You haven’t requested to volunteer for any post yet.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th>Post</th>
              <th>Category</th>
              <th>Status</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {myRequests.map((r) => (
              <tr key={r._id} className="text-center border-t">
                <td>{r.title}</td>
                <td>{r.category}</td>
                <td>{r.status}</td>
                <td>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleCancel(r._id)}
                  >
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
