import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const ReviewList = ({ postId }) => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await axiosInstance.get(`/reviews/${postId}`);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [postId]);

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Reviews</h3>
      {reviews.length === 0 && <p>No reviews yet.</p>}
      {reviews.map((rev) => (
        <div key={rev._id} className="border p-2 rounded mb-2">
          <p>Rating: {rev.rating} ⭐</p>
          <p>{rev.comment}</p>
          <p className="text-gray-500 text-sm">{rev.userEmail}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
 