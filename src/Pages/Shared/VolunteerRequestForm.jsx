import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router";
import { AuthContex } from "../../contexts/AuthContexts/AuthContext";
import { toast } from "react-toastify";
import { FiSend } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import axiosInstance from "../../api/axiosInstance";

const VolunteerRequestForm = () => {
  const { _id } = useParams();
  const { user } = useContext(AuthContex);

  const [post, setPost] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  // Fetch volunteer post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosInstance.get(`/volunteer/${_id}`);
        setPost(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load post data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [_id]);

  if (!user) {
    return (
      <div className="text-center mt-10">
        <p>Please login to apply.</p>
        <Link to="/login" className="text-blue-600 underline">
          Go to Login
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!suggestion.trim()) {
      toast.error("Please add your suggestion.");
      return;
    }

    setBtnLoading(true);

    try {
      // Check if already applied
      const checkRes = await axiosInstance.get(
        `/volunteer-requests?userEmail=${user.email}&postId=${post._id}`
      );
      if (checkRes.data.length > 0) {
        toast.warning("You have already applied for this post.");
        setBtnLoading(false);
        return;
      }

      const requestData = {
        postId: post._id,
        title: post.title,
        thumbnail: post.thumbnail,
        description: post.description,
        category: post.category,
        location: post.location,
        volunteers: post.volunteers,
        deadline: post.deadline,
        organizerName: post.organizerName,
        organizerEmail: post.organizerEmail,
        userName: user.displayName,
        userEmail: user.email,
        suggestion,
        status: "requested",
      };

      // Send volunteer request
      await axiosInstance.post("/volunteer-requests", requestData);

      // Optional: update original post (PATCH)
      await axiosInstance.patch(`/volunteer/${_id}`);

      toast.success("Request sent successfully!");
      setSuggestion("");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setBtnLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading form...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Apply for Volunteer Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Thumbnail</label>
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-48 object-cover rounded"
          />
        </div>

        <input type="text" readOnly value={post?.title || ""} className="w-full p-2 border rounded" />
        <textarea readOnly value={post?.description || ""} className="w-full p-2 border rounded" rows={3} />
        <input type="text" readOnly value={post?.category || ""} className="w-full p-2 border rounded" />
        <input type="text" readOnly value={post?.location || ""} className="w-full p-2 border rounded" />
        <input type="number" readOnly value={post?.volunteers || 0} className="w-full p-2 border rounded" />
        <input type="text" readOnly value={new Date(post?.deadline).toLocaleDateString() || ""} className="w-full p-2 border rounded" />
        <input type="text" readOnly value={post?.organizerName || ""} className="w-full p-2 border rounded" />
        <input type="email" readOnly value={post?.organizerEmail || ""} className="w-full p-2 border rounded" />

        <input type="text" readOnly value={user?.displayName || ""} className="w-full p-2 border rounded" />
        <input type="email" readOnly value={user?.email || ""} className="w-full p-2 border rounded" />

        <textarea
          placeholder="Your suggestion"
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
          required
        />

        <button
          type="submit"
          disabled={btnLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center gap-2 justify-center"
        >
          {btnLoading ? (
            <>
              <ClipLoader size={20} color="#fff" /> Sending...
            </>
          ) : (
            <>
              <FiSend /> Request
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default VolunteerRequestForm;
