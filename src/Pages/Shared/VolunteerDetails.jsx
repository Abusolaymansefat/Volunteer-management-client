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

    fetch(`http://localhost:3000/volunteer-requests?userEmail=${user.email}&postId=${post._id}`)
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

  if (loading) return <p className="text-center mt-10">Loading details...</p>;

  if (!post)
    return (
      <div className="text-center mt-10">
        <p>Volunteer post not found.</p>
        <Link to="/volunteer">
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
            Back to Posts
          </button>
        </Link>
      </div>
    );

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

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleVolunteerApply}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Be a Volunteer Apply
        </button>
        <Link to="/volunteer">
          <button className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700">
            Back to Posts
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VolunteerDetails;
