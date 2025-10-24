import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContexts/AuthContext";
import { toast } from "react-toastify";
import { FiXCircle } from "react-icons/fi";
import { ScaleLoader } from "react-spinners";
import useLoadingSpinner from "../../hooks/useLoadingSpinner";
import axiosInstance from "../../api/axiosInstance";

const MyVolunteerRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const { loading, show, hide } = useLoadingSpinner();

  useEffect(() => {
    if (!user?.email) return;

    const fetchRequests = async () => {
      show();
      try {
        const res = await axiosInstance.get(`/volunteer-requests?userEmail=${user.email}`);
        setRequests(res.data || []);
      } catch (error) {
        toast.error("Failed to fetch your requests");
        console.error(error);
      } finally {
        hide();
      }
    };

    fetchRequests();
  }, [user]);

  const handleCancelRequest = async (id) => {
    show();
    try {
      await axiosInstance.delete(`/volunteer-requests/${id}`);
      toast.success("Request cancelled!", {
        position: "bottom-right",
        autoClose: 2000,
      });
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (error) {
      toast.error("Failed to cancel request");
      console.error(error);
    } finally {
      hide();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 mt-10">
        <ScaleLoader color="#5896e6" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Volunteer Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-600">
          You have not made any volunteer requests yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li
              key={req._id}
              className="border p-4 rounded shadow flex justify-between items-center gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={req.thumbnail}
                  alt="Thumbnail"
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-bold text-lg">{req.title || req.postTitle}</h3>
                  <p className="text-gray-700">Category: {req.category}</p>
                  <p className="text-gray-700">{req.status}</p>
                </div>
              </div>
              <button
                onClick={() => handleCancelRequest(req._id)}
                className="text-red-500 hover:text-red-700 text-xl"
              >
                <FiXCircle className="w-6 h-6" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyVolunteerRequests;
