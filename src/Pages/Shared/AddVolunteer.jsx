import { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { RingLoader } from "react-spinners"; // ✅ Loader import
import UseAuth from "../../hooks/UseAuth";

const AddVolunteer = () => {
  const { user } = UseAuth();
  const { register, handleSubmit, reset } = useForm();
  const [deadline, setDeadline] = useState(new Date());
  const [loading, setLoading] = useState(false); // ✅ For button loader

  const onSubmit = (data) => {
    setLoading(true); // start loader
    const postData = {
      ...data,
      deadline,
      organizerName: user.displayName,
      organizerEmail: user.email,
    };

    fetch("https://volunteer-server-ten.vercel.app/volunteer", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false); // stop loader
        console.log("Saved to DB:", result);
        toast.success("Post added successfully!");
        reset();
      })
      .catch((error) => {
        setLoading(false); // stop loader
        console.error("Error saving to DB:", error);
        toast.error("Failed to add post");
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Add Volunteer Post
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-semibold">Thumbnail URL</label>
          <input
            {...register("thumbnail")}
            type="text"
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Post Title</label>
          <input
            {...register("title")}
            type="text"
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            {...register("description")}
            rows="4"
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Category</label>
          <select
            {...register("category")}
            className="w-full text-black border px-4 py-2 rounded"
            required
          >
            <option value="">Select a category</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="social service">Social Service</option>
            <option value="animal welfare">Animal Welfare</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Location</label>
          <input
            {...register("location")}
            type="text"
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">
            No. of Volunteers Needed
          </label>
          <input
            {...register("volunteers")}
            type="number"
            min="1"
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        
        <div>
          <label className="block font-semibold">Price</label>
          <input
            {...register("price")}
            type="number"
            min="0"
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

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

        <div>
          <label className="block font-semibold">Organizer Name</label>
          <input
            value={user?.displayName || ""}
            readOnly
            className="w-full border px-4 py-2 rounded "
          />
        </div>

        <div>
          <label className="block font-semibold">Organizer Email</label>
          <input
            value={user?.email || ""}
            readOnly
            className="w-full border px-4 py-2 rounded "
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded flex items-center justify-center gap-2"
            disabled={loading}
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
