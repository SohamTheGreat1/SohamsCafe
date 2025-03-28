import React, { useState } from 'react';
import api from '../axios.js';

const ReviewForm = ({ restaurantId, onReviewSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/reviews', {
        restaurantId,
        rating,
        comment
      });
      onReviewSubmit(response.data);
      setComment('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit review');
    }
  };

  return (
    <div className="review-form">
      <h3>Leave a Review</h3>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="rating-input">
          <label>Rating:</label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num} star{num !== 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;