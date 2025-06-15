

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContex } from "../../contexts/AuthContexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContex);
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`/api/volunteer-posts/${id}`).then((res) => setPost(res.data));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      thumbnail: form.thumbnail.value,
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      volunteersNeeded: parseInt(form.volunteersNeeded.value),
      deadline: form.deadline.value,
    };

    axios.put(`/api/volunteer-posts/${id}`, updated).then(() => {
      toast.success("Post updated successfully!");
      navigate("/manage-posts");
    });
  };

  if (!post) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6">Update Volunteer Post</h2>
      <form onSubmit={handleUpdate} className="grid gap-4">
        <input defaultValue={post.thumbnail} name="thumbnail" className="input" />
        <input defaultValue={post.title} name="title" className="input" />
        <textarea defaultValue={post.description} name="description" className="input" />
        <input defaultValue={post.category} name="category" className="input" />
        <input defaultValue={post.location} name="location" className="input" />
        <input defaultValue={post.volunteersNeeded} name="volunteersNeeded" type="number" className="input" />
        <input defaultValue={post.deadline} name="deadline" type="date" className="input" />
        <input value={user.displayName} disabled className="input" />
        <input value={user.email} disabled className="input" />

        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
