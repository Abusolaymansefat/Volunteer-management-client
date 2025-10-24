import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const ReviewForm = ({ postId, userEmail, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/reviews", {
        postId,
        userEmail,
        rating,
        comment,
      });
      setRating(0);
      setComment("");
      onReviewAdded(); // Refresh reviews
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded mb-4">
      <label className="block mb-2">
        Rating:
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="ml-2 border rounded"
        >
          <option value={0}>Select</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} Star
            </option>
          ))}
        </select>
      </label>
      <label className="block mb-2">
        Comment:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border rounded w-full mt-1"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
