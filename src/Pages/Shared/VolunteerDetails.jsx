import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { AuthContex } from "../../contexts/AuthContexts/AuthContext";
import { toast } from "react-toastify";

const VolunteerDetails = () => {
  const { _id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContex);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/volunteer/${_id}`)
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

    fetch(
      `http://localhost:3000/volunteer-requests?userEmail=${user.email}&postId=${post._id}`, {
        credentials: 'include',
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          toast.warning("You have already applied for this post.");
        } else {
          navigate(`/volunteer-request/${post._id}`);
        }
      })
      .catch(() => toast.error("Failed to check your application status."));
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/volunteer/${post._id}`, {
        method: "DELETE",
        credentials: 'include'
      });
      if (res.ok) {
        toast.success("Post deleted successfully!");
        navigate("/volunteer");
      } else {
        toast.error("Failed to delete the post.");
      }
    } catch (error) {
      toast.error("Error deleting the post.", error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading details...</p>;

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

      <div className="mt-6 flex flex-wrap gap-4">
        <button
          onClick={handleVolunteerApply}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Be a Volunteer Apply
        </button>

        <Link to={`/update-volunteer/${_id}`}>
          <button className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600">
            Update
          </button>
        </Link>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default VolunteerDetails;
