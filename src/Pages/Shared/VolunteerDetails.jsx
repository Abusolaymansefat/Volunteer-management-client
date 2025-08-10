import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { AuthContex } from "../../contexts/AuthContexts/AuthContext";
import { toast } from "react-toastify";
import { FiEdit, FiTrash2, FiUserPlus } from "react-icons/fi";
import { RingLoader, ScaleLoader } from "react-spinners";

const VolunteerDetails = () => {
  const { _id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false); 
  const { user } = useContext(AuthContex);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://volunteer-server-ten.vercel.app/volunteer/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load volunteer post.");
        setLoading(false);
      });
  }, [_id]);

  const handleVolunteerApply = () => {
    if (!user) {
      toast.error("Please login to apply.");
      return;
    }

    setBtnLoading(true); 
    fetch(
      `https://volunteer-server-ten.vercel.app/volunteer-requests?userEmail=${user.email}&postId=${post._id}`,
      { credentials: "include" }
    )
      .then((res) => res.json())
      .then((data) => {
        setBtnLoading(false);
        if (data.length > 0) {
          toast.warning("You have already applied for this post.");
        } else {
          navigate(`/volunteer-request/${post._id}`);
        }
      })
      .catch(() => {
        setBtnLoading(false);
        toast.error("Failed to check your application status.");
      });
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    setBtnLoading(true);
    try {
      const res = await fetch(
        `https://volunteer-server-ten.vercel.app/volunteer/${post._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      setBtnLoading(false);
      if (res.ok) {
        toast.success("Post deleted successfully!");
        navigate("/volunteer");
      } else {
        toast.error("Failed to delete the post.");
      }
    } catch (error) {
      setBtnLoading(false);
      toast.error("Error deleting the post.", error);
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
      <img
        src={post.thumbnail}
        alt={post.title}
        className="w-full h-64 object-cover rounded"
      />
      <h2 className="text-3xl font-bold mt-4 mb-2">{post.title}</h2>
      <p className="text-gray-700 mb-4">{post.description}</p>
      <p>
        <strong>Category:</strong> {post.category}
      </p>
      <p>
        <strong>Location:</strong> {post.location}
      </p>
      <p>
        <strong>Volunteers Needed:</strong> {post.volunteers}
      </p>
      <p>
        <strong>Deadline:</strong>{" "}
        {new Date(post.deadline).toLocaleDateString()}
      </p>
      <p>
        <strong>Organizer Name:</strong> {post.organizerName}
      </p>
      <p>
        <strong>Organizer Email:</strong> {post.organizerEmail}
      </p>

      <div className="mt-6 flex flex-wrap gap-4 items-center">
        <button
          onClick={handleVolunteerApply}
          className="bg-[#1b5381] text-white px-6 py-2 rounded hover:bg-[#0f5fa0] flex items-center gap-2"
          disabled={btnLoading}
        >
          <FiUserPlus />
          Be a Volunteer Apply
          {btnLoading && <RingLoader size={20} color="#fff" />} 
        </button>

        <Link to={`/update-volunteer/${_id}`}>
          <button className="bg-[#5c85c4] text-white px-6 py-2 rounded hover:bg-[#072a5e] flex items-center gap-2">
            <FiEdit />
            Update
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
