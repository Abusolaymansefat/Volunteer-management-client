import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { AuthContext } from "../../contexts/AuthContexts/AuthContext";
import { toast } from "react-toastify";
import { FiEdit, FiTrash2, FiUserPlus } from "react-icons/fi";
import { RingLoader, ScaleLoader } from "react-spinners";
import axiosInstance from "../../api/axiosInstance";

const VolunteerDetails = () => {
  const { _id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosInstance.get(`/volunteer/${_id}`);
        setPost(res.data);
      } catch (error) {
        toast.error("Failed to load volunteer post.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [_id]);

  const handleVolunteerApply = async () => {
    if (!user) return toast.error("Please login to apply.");

    setBtnLoading(true);
    try {
      const res = await axiosInstance.get(
        `/volunteer-requests?userEmail=${user.email}&postId=${post._id}`
      );
      if (res.data.length > 0) {
        toast.warning("You have already applied for this post.");
      } else {
        navigate(`/volunteer-request/${post._id}`);
      }
    } catch {
      toast.error("Failed to check your application status.");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    setBtnLoading(true);
    try {
      const res = await axiosInstance.delete(`/volunteer/${post._id}`);
      if (res.status === 200) {
        toast.success("Post deleted successfully!");
        navigate("/volunteer");
      } else {
        toast.error("Failed to delete the post.");
      }
    } catch {
      toast.error("Error deleting the post.");
    } finally {
      setBtnLoading(false);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10">
        <ScaleLoader />
      </p>
    );

  if (!post) return <p className="text-center mt-10">Post not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md mt-10">
      <img src={post.thumbnail} alt={post.title} className="w-full h-64 object-cover rounded" />
      <h2 className="text-3xl font-bold mt-4 mb-2">{post.title}</h2>
      <p className="text-gray-700 mb-4">{post.description}</p>
      <p><strong>Category:</strong> {post.category}</p>
      <p><strong>Location:</strong> {post.location}</p>
      <p><strong>Volunteers Needed:</strong> {post.volunteers}</p>
      <p><strong>Deadline:</strong> {new Date(post.deadline).toLocaleDateString()}</p>
      <p><strong>Organizer Name:</strong> {post.organizerName}</p>
      <p><strong>Organizer Email:</strong> {post.organizerEmail}</p>

      <div className="mt-6 flex flex-wrap gap-4 items-center">
        <button
          onClick={handleVolunteerApply}
          className="bg-[#1b5381] text-white px-6 py-2 rounded hover:bg-[#0f5fa0] flex items-center gap-2"
          disabled={btnLoading}
        >
          <FiUserPlus /> Be a Volunteer Apply
          {btnLoading && <RingLoader size={20} color="#fff" />}
        </button>

        <Link to={`/update-volunteer/${_id}`}>
          <button className="bg-[#5c85c4] text-white px-6 py-2 rounded hover:bg-[#072a5e] flex items-center gap-2">
            <FiEdit /> Update
          </button>
        </Link>

        <button
          onClick={handleDelete}
          className="bg-[#a11f3b] text-white px-6 py-2 rounded hover:bg-[#e74468] flex items-center gap-2"
          disabled={btnLoading}
        >
          <FiTrash2 />
          {btnLoading && <RingLoader size={20} color="#fff" />}
          Delete
        </button>
      </div>
    </div>
  );
};

export default VolunteerDetails;
