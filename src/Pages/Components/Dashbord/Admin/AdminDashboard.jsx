import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axiosInstance from "../../../../api/axiosInstance";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [summary, setSummary] = useState({
    totalUsers: 0,
    totalVolunteers: 0,
    totalRequests: 0,
    totalReviews: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, volRes, reqRes, revRes] = await Promise.all([
          axiosInstance.get("/users"),
          axiosInstance.get("/volunteer"),
          axiosInstance.get("/volunteer-requests"),
          axiosInstance.get("/reviews/all"),
        ]);
        setUsers(usersRes.data);
        setVolunteers(volRes.data);
        setRequests(reqRes.data);
        setReviews(revRes.data);

        setSummary({
          totalUsers: usersRes.data.length,
          totalVolunteers: volRes.data.length,
          totalRequests: reqRes.data.length,
          totalReviews: revRes.data.length,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (type, id) => {
    let endpoint = "";
    switch (type) {
      case "users": endpoint = `/users/${id}`; break;
      case "volunteers": endpoint = `/volunteer/${id}`; break;
      case "requests": endpoint = `/volunteer-requests/${id}`; break;
      case "reviews": endpoint = `/reviews/${id}`; break;
      default: return;
    }
    await axiosInstance.delete(endpoint);
    if (type === "users") setUsers(users.filter(u => u._id !== id));
    if (type === "volunteers") setVolunteers(volunteers.filter(v => v._id !== id));
    if (type === "requests") setRequests(requests.filter(r => r._id !== id));
    if (type === "reviews") setReviews(reviews.filter(r => r._id !== id));
  };

  const renderTabContent = () => {
    const baseClass = "border p-2 mb-2 flex justify-between items-center rounded transition";
    switch (activeTab) {
      case "users":
        return users.map(u => (
          <div key={u._id} className={`${baseClass} bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700`}>
            <span className="text-gray-900 dark:text-gray-100">{u.name} ({u.email}) - {u.role || "user"}</span>
            <button
              onClick={() => handleDelete("users", u._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ));
      case "volunteers":
        return volunteers.map(v => (
          <div key={v._id} className={`${baseClass} bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700`}>
            <span className="text-gray-900 dark:text-gray-100">{v.title}</span>
            <button
              onClick={() => handleDelete("volunteers", v._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ));
      case "requests":
        return requests.map(r => (
          <div key={r._id} className={`${baseClass} bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700`}>
            <span className="text-gray-900 dark:text-gray-100">{r.userEmail} → {r.postId}</span>
            <button
              onClick={() => handleDelete("requests", r._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        ));
      case "reviews":
        return reviews.map(r => (
          <div key={r._id} className={`${baseClass} bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700`}>
            <span className="text-gray-900 dark:text-gray-100">{r.userEmail}: {r.comment} ({r.rating}⭐)</span>
            <button
              onClick={() => handleDelete("reviews", r._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ));
      default:
        return null;
    }
  };

  const chartData = [
    { name: "Users", count: summary.totalUsers },
    { name: "Volunteers", count: summary.totalVolunteers },
    { name: "Requests", count: summary.totalRequests },
    { name: "Reviews", count: summary.totalReviews },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded text-center">
          <h2 className="text-xl font-bold text-blue-500">{summary.totalUsers}</h2>
          <p>Users</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded text-center">
          <h2 className="text-xl font-bold text-green-500">{summary.totalVolunteers}</h2>
          <p>Volunteers</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded text-center">
          <h2 className="text-xl font-bold text-yellow-500">{summary.totalRequests}</h2>
          <p>Requests</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded text-center">
          <h2 className="text-xl font-bold text-purple-500">{summary.totalReviews}</h2>
          <p>Reviews</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 shadow rounded mb-6">
        <h2 className="text-xl font-bold mb-2">Overview</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip wrapperStyle={{ backgroundColor: "#f3f4f6", color: "#111827" }} />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        {["users", "volunteers", "requests", "reviews"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded font-semibold ${
              activeTab === tab ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>{renderTabContent()}</div>
    </div>
  );
};

export default AdminDashboard;
