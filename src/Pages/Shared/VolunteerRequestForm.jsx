import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { AuthContex } from "../../contexts/AuthContexts/AuthContext";
import { toast } from "react-toastify";

const VolunteerRequestForm = () => {
  const { _id } = useParams();
  const { user } = useContext(AuthContex);
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/volunteer/${_id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load post data.");
        setLoading(false);
      });
  }, [_id]);

  if (!user) {
    return (
      <div className="text-center mt-10">
        <p>Please login to apply.</p>
        <Link to="/login" className="text-blue-600 underline">Go to Login</Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!suggestion.trim()) {
      toast.error("Please add your suggestion.");
      return;
    }

    const requestData = {
      postId: post._id,
      title: post.title,
      thumbnail: post.thumbnail,
      description: post.description,
      category: post.category,
      location: post.location,
      volunteers: post.volunteers, // current number
      deadline: post.deadline,
      organizerName: post.organizerName,
      organizerEmail: post.organizerEmail,
      userName: user.displayName,
      userEmail: user.email,
      suggestion,
      status: "requested",
    };

    // First create the request
    fetch("http://localhost:3000/volunteer-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to send request");
        return res.json();
      })
      .then(() => {
        // Then decrease volunteers needed using PATCH (or PUT) and $inc on server side
        return fetch(`http://localhost:3000/volunteer/${_id}/decrement-volunteers`, {
          method: "PATCH",
        });
      })
      .then(res => {
        if (!res.ok) throw new Error("Failed to update volunteers count");
        toast.success("Request sent successfully!");
        navigate("/my-requests");
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  };

  if (loading) return <p className="text-center mt-10">Loading form...</p>;

  if (!post) return (
    <div className="text-center mt-10">
      <p>Post not found.</p>
      <Link to="/volunteer" className="text-blue-600 underline">Back to posts</Link>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6  rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Apply for Volunteer Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Read-only fields */}
        <div>
          <label>Thumbnail</label>
          <img src={post.thumbnail} alt={post.title} className="w-full h-48 object-cover rounded" />
        </div>

        <input type="text" readOnly value={post.title} className="w-full p-2 border rounded" />
        <textarea readOnly value={post.description} className="w-full p-2 border rounded" rows={3} />
        <input type="text" readOnly value={post.category} className="w-full p-2 border rounded" />
        <input type="text" readOnly value={post.location} className="w-full p-2 border rounded" />
        <input type="number" readOnly value={post.volunteers} className="w-full p-2 border rounded" />
        <input type="text" readOnly value={new Date(post.deadline).toLocaleDateString()} className="w-full p-2 border rounded" />
        <input type="text" readOnly value={post.organizerName} className="w-full p-2 border rounded" />
        <input type="email" readOnly value={post.organizerEmail} className="w-full p-2 border rounded" />

        {/* User info readonly */}
        <input type="text" readOnly value={user.displayName} className="w-full p-2 border rounded" />
        <input type="email" readOnly value={user.email} className="w-full p-2 border rounded" />

        {/* Editable suggestion */}
        <textarea
          placeholder="Your suggestion"
          value={suggestion}
          onChange={e => setSuggestion(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Request
        </button>
      </form>
    </div>
  );
};

export default VolunteerRequestForm;
