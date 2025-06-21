import { useLoaderData, useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";

const UpdateVolunteer = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: data.title || "",
    description: data.description || "",
    thumbnail: data.thumbnail || "",
    category: data.category || "",
    location: data.location || "",
    volunteers: data.volunteers || 1,
    deadline: data.deadline?.split("T")[0] || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://volunteer-server-ten.vercel.app/volunteer/${data._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Post updated successfully!");
        navigate("/manage-posts");
      } else {
        toast.error("Failed to update post.");
      }
    } catch (error) {
      toast.error("Error while updating.",error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 shadow-md p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Update Volunteer Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Post Title"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Social Service">Social Service</option>
          <option value="Animal Welfare">Animal Welfare</option>
        </select>
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          name="volunteers"
          value={formData.volunteers}
          onChange={handleChange}
          placeholder="Number of Volunteers"
          min="1"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdateVolunteer;
