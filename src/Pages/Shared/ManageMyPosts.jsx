import React, { useEffect, useState, useContext } from "react";
import { AuthContex } from "../../contexts/AuthContexts/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const ManageMyPosts = () => {
  const { user } = useContext(AuthContex);
  const navigate = useNavigate();

  const [myPosts, setMyPosts] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    // Fetch volunteer posts created by this user
    fetch(`http://localhost:3000/volunteer?organizerEmail=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyPosts(data || []);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to fetch your posts");
        setLoading(false);
      });

    // Fetch volunteer requests made by this user
    fetch(`http://localhost:3000/volunteer-requests?userEmail=${user.email}`)
      .then((res) => res.json())
      .then((data) => setMyRequests(data || []))
      .catch(() => toast.error("Failed to fetch your volunteer requests"));
  }, [user]);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    fetch(`http://localhost:3000/volunteer/${id}`, {
      method: "DELETE",
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

  // Optional: Cancel volunteer request
  
  const handleCancelRequest = (id) => {
    if (!window.confirm("Cancel this request?")) return;

    fetch(`http://localhost:3000/volunteer-requests/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Request cancelled");
          setMyRequests((prev) => prev.filter((req) => req._id !== id));
        } else {
          toast.error("Failed to cancel request");
        }
      })
      .catch(() => toast.error("Error cancelling request"));
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

      {/* My Volunteer Need Posts */}
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
                    <td className="p-3 border">{post.title}</td>
                    <td className="p-3 border">{post.category}</td>
                    <td className="p-3 border">{post.volunteers}</td>
                    <td className="p-3 border">
                      {new Date(post.deadline).toLocaleDateString()}
                    </td>
                    <td className="p-3 border space-x-2">
                      <button
                        onClick={() => navigate(`/update-volunteer/${post._id}`)}
                        className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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
      </section>

      {/* My Volunteer Requests */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">My Volunteer Requests</h2>
        {myRequests.length === 0 ? (
          <p className="text-gray-600">
            You have not made any volunteer requests yet.
          </p>
        ) : (
          <ul className="space-y-4">
            {myRequests.map((req) => (
              <li
                key={req._id}
                className="border p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{req.postTitle}</h3>
                  <p className="text-sm text-gray-600">Status: {req.status}</p>
                </div>
                {/* Optional: Cancel Button */}
                
                <button
                  onClick={() => handleCancelRequest(req._id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Cancel Request
                </button>
               
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default ManageMyPosts;
