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
    <div className="max-w-3xl mx-auto mt-10 p-6 rounded-lg shadow-lg
      bg-gradient-to-r from-[#c9a3bf] via-[#3d2a3f] to-[#6e676d]
      text-white"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Add Volunteer Post
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* 2-column layout on md+ */}
        <div className="flex flex-col md:flex-row md:gap-4">
          <input
            {...register("thumbnail")}
            type="text"
            placeholder="Thumbnail URL"
            className="flex-1 border border-white/40 px-4 py-2 rounded bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            required
          />
          <input
            {...register("title")}
            type="text"
            placeholder="Post Title"
            className="flex-1 border border-white/40 px-4 py-2 rounded bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/50 mt-4 md:mt-0"
            required
          />
        </div>

        <textarea
          {...register("description")}
          rows="4"
          placeholder="Description"
          className="w-full border border-white/40 px-4 py-2 rounded bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          required
        />

        <div className="flex flex-col md:flex-row md:gap-4">
          <select
            {...register("category")}
            className="flex-1 border border-white/40 px-4 py-2 rounded bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
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
            className="flex-1 border border-white/40 px-4 py-2 rounded bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/50 mt-4 md:mt-0"
            required
          />
        </div>

        <div className="flex flex-col md:flex-row md:gap-4">
          <input
            {...register("volunteers")}
            type="number"
            min="1"
            placeholder="No. of Volunteers Needed"
            className="flex-1 border border-white/40 px-4 py-2 rounded bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            required
          />
          <input
            {...register("price")}
            type="number"
            min="0"
            placeholder="Price"
            className="flex-1 border border-white/40 px-4 py-2 rounded bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/50 mt-4 md:mt-0"
            required
          />
        </div>

        <div className="flex flex-col md:flex-row md:gap-4">
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            dateFormat="yyyy-MM-dd"
            className="flex-1 border border-white/40 px-4 py-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            minDate={new Date()}
          />
          <input
            value={user?.displayName || ""}
            readOnly
            className="flex-1 border border-white/40 px-4 py-2 rounded bg-white/30 text-white mt-4 md:mt-0"
          />
        </div>

        <input
          value={user?.email || ""}
          readOnly
          className="w-full border border-white/40 px-4 py-2 rounded bg-white/30 text-white"
        />

        <div className="text-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600
              hover:from-pink-700 hover:via-purple-700 hover:to-blue-700
              text-white px-6 py-2 rounded flex items-center justify-center gap-2"
          >
            {loading ? <><RingLoader size={20} color="#fff" /> Adding...</> : "Add Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVolunteer;
