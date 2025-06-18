import React, { useContext, useEffect, useState } from "react";
import { AuthContex } from "../../contexts/AuthContexts/AuthContext";
import { toast } from "react-toastify";

const MyVolunteerRequests = () => {
  const { user } = useContext(AuthContex);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:3000/volunteer-requests?userEmail=${user.email}`)
      .then((res) => res.json())
      .then((data) => setRequests(data || []))
      .catch(() => toast.error("Failed to fetch your requests"));
  }, [user]);

  const handleCancelRequest = (id) => {
    if (!window.confirm("Are you sure to cancel this request?")) return;
    fetch(`http://localhost:3000/volunteer-requests/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        toast.success("Request cancelled");
        setRequests((prev) => prev.filter((req) => req._id !== id));
      })
      .catch(() => toast.error("Failed to cancel request"));
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Volunteer Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-600">You have not made any volunteer requests yet.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li
              key={req._id}
              className="border p-4 rounded shadow flex justify-between items-center gap-4"
            >
              <div className="flex items-center gap-4">
                <img src={req.thumbnail} alt="Thumbnail" className="w-20 h-20 object-cover rounded" />
                <div>
                  <h3 className="bold">{req.postTitle}</h3>
                  <p className="text-xl text-white ">Category: {req.category}</p>
                  <p className="text-xl text-white">Status: {req.status}</p>
                </div>
              </div>
              <button
                onClick={() => handleCancelRequest(req._id)}
                className="text-blue-300 hover:underline text-xl"
              >
                Cancel Request
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyVolunteerRequests;