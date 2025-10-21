import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../../../api/axiosInstance";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/users");
        console.log("Fetched users:", res.data);
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        Swal.fire("Error!", "Failed to load users.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Update user role
  const handleRoleChange = async (id, newRole) => {
    try {
      const res = await axiosInstance.patch(`/users/${id}`, { role: newRole });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "User role updated successfully!", "success");
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
        );
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to update user role.", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-200">
        Manage Users
      </h2>

      {users.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No users found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 capitalize">{user.role}</td>
                  <td className="py-3 px-4 text-center">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      className="select select-sm bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded"
                    >
                      <option value="user">User</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="admin">Admin</option>
                    </select>
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

export default ManageUsers;
