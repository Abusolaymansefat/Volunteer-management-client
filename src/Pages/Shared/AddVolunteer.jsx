// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useForm } from "react-hook-form";
// import UseAuth from "../../hooks/UseAuth";
// import { toast } from "react-toastify";

import { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddPost = () => {
  const { user } = UseAutt(); // custom hook for auth
  const { register, handleSubmit, reset } = useForm();
  const [deadline, setDeadline] = useState(new Date());

  const onSubmit = (data) => {
    const postData = {
      ...data,
      deadline,
      organizerName: user.displayName,
      organizerEmail: user.email,
    };
    console.log(postData);
    toast.success("Post added successfully!");
    reset();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Volunteer Post</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Thumbnail */}
        <div>
          <label className="block font-semibold">Thumbnail URL</label>
          <input {...register("thumbnail")} type="text" className="w-full border px-4 py-2 rounded" required />
        </div>

        {/* Title */}
        <div>
          <label className="block font-semibold">Post Title</label>
          <input {...register("title")} type="text" className="w-full border px-4 py-2 rounded" required />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold">Description</label>
          <textarea {...register("description")} rows="4" className="w-full border px-4 py-2 rounded" required />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold">Category</label>
          <select {...register("category")} className="w-full border px-4 py-2 rounded" required>
            <option value="">Select a category</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="social service">Social Service</option>
            <option value="animal welfare">Animal Welfare</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block font-semibold">Location</label>
          <input {...register("location")} type="text" className="w-full border px-4 py-2 rounded" required />
        </div>

        {/* Number of Volunteers */}
        <div>
          <label className="block font-semibold">No. of Volunteers Needed</label>
          <input {...register("volunteers")} type="number" min="1" className="w-full border px-4 py-2 rounded" required />
        </div>

        {/* Deadline */}
        <div>
          <label className="block font-semibold">Deadline</label>
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            dateFormat="yyyy-MM-dd"
            className="w-full border px-4 py-2 rounded"
            minDate={new Date()}
          />
        </div>

        {/* Organizer Name */}
        <div>
          <label className="block font-semibold">Organizer Name</label>
          <input value={user?.displayName || ""} readOnly className="w-full border px-4 py-2 rounded bg-gray-100" />
        </div>

        {/* Organizer Email */}
        <div>
          <label className="block font-semibold">Organizer Email</label>
          <input value={user?.email || ""} readOnly className="w-full border px-4 py-2 rounded bg-gray-100" />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
