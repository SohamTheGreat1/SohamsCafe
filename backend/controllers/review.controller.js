import Review from '../models/review.model.js';
import Restaurant from '../models/restaurant.model.js';

export const createReview = async (req, res) => {
  try {
    const { restaurantId, rating, comment } = req.body;
    
    const review = new Review({
      restaurant: restaurantId,
      user: req.userId,
      rating,
      comment
    });

    await review.save();
    
    // Update restaurant's average rating
    await updateRestaurantRating(restaurantId);
    
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ restaurant: req.params.restaurantId })
      .populate('user', 'username')
      .sort({ createdAt: -1 });
      
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function updateRestaurantRating(restaurantId) {
  const result = await Review.aggregate([
    { $match: { restaurant: restaurantId } },
    { $group: { _id: null, averageRating: { $avg: "$rating" } } }
  ]);
  
  const averageRating = result[0]?.averageRating || 0;
  
  await Restaurant.findByIdAndUpdate(restaurantId, { 
    averageRating: parseFloat(averageRating.toFixed(1)) 
  });
}