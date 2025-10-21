import { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RingLoader } from "react-spinners";
import UseAuth from "../../hooks/UseAuth";
import axiosInstance from "../../api/axiosInstance";

const AddVolunteer = () => {
  const { user } = UseAuth();
  const { register, handleSubmit, reset } = useForm();
  const [deadline, setDeadline] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const postData = {
      ...data,
      deadline,
      organizerName: user.displayName,
      organizerEmail: user.email,
    };

    try {
      await axiosInstance.post("/volunteer", postData);
      toast.success("Volunteer post added successfully!");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add volunteer post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="max-w-5xl mx-auto mt-10 p-8 rounded-lg shadow-2xl
      bg-gradient-to-r from-[#3b1d3c] via-[#5e3361] to-[#2f1b30]
      text-[#fefefe]"
    >
      <h2 className="text-3xl font-extrabold mb-6 text-center drop-shadow-md">
        Add Volunteer Post
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Thumbnail & Title */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            {...register("thumbnail")}
            type="text"
            placeholder="Thumbnail URL"
            className="flex-1 border border-white/30 px-4 py-2 rounded-lg bg-white/10 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
          <input
            {...register("title")}
            type="text"
            placeholder="Post Title"
            className="flex-1 border border-white/30 px-4 py-2 rounded-lg bg-white/10 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>

        {/* Description */}
        <textarea
          {...register("description")}
          rows="4"
          placeholder="Description"
          className="w-full border border-white/30 px-4 py-2 rounded-lg bg-white/10 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />

        {/* Category & Location */}
        <div className="flex flex-col md:flex-row gap-4">
          <select
            {...register("category")}
            className="flex-1 border border-white/30 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          >
            <option value="">Select a category</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="social service">Social Service</option>
            <option value="animal welfare">Animal Welfare</option>
          </select>

          <input
            {...register("location")}
            type="text"
            placeholder="Location"
            className="flex-1 border border-white/30 px-4 py-2 rounded-lg bg-white/10 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Volunteers & Price */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            {...register("volunteers")}
            type="number"
            min="1"
            placeholder="Volunteers Needed"
            className="flex-1 border border-white/30 px-4 py-2 rounded-lg bg-white/10 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            {...register("price")}
            type="number"
            min="0"
            placeholder="Price"
            className="flex-1 border border-white/30 px-4 py-2 rounded-lg bg-white/10 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        {/* Deadline & Organizer Name */}
        <div className="flex flex-col md:flex-row gap-4">
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            dateFormat="yyyy-MM-dd"
            className="flex-1 border border-white/30 px-4 py-2 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            minDate={new Date()}
          />
          <input
            value={user?.displayName || ""}
            readOnly
            className="flex-1 border border-white/30 px-4 py-2 rounded-lg bg-white/10 text-white"
          />
        </div>

        {/* Organizer Email */}
        <input
          value={user?.email || ""}
          readOnly
          className="w-full border border-white/30 px-4 py-2 rounded-lg bg-white/10 text-white"
        />

        {/* Submit Button */}
        <div className="text-center mt-6">
          <button
            type="submit"
            disabled={loading}
            className="relative bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600
              hover:from-blue-600 hover:via-purple-600 hover:to-pink-600
              text-white font-semibold px-8 py-3 rounded-lg
              shadow-lg shadow-pink-500/30
              transition-all duration-300 ease-in-out
              hover:shadow-xl hover:shadow-purple-600/40
              hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RingLoader size={20} color="#fff" /> Adding...
              </>
            ) : (
              "Add Post"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVolunteer;
