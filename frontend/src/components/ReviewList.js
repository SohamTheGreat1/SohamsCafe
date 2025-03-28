import React, { useEffect, useState } from 'react';
import api from '../axios.js';

const ReviewList = ({ restaurantId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get(`/reviews/${restaurantId}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, [restaurantId]);

  if (loading) return <div>Loading reviews...</div>;

  return (
    <div className="review-list">
      <h3>Customer Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="review-card">
            <div className="review-header">
              <span className="review-user">{review.user.username}</span>
              <span className="review-rating">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </span>
              <span className="review-date">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="review-comment">{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;