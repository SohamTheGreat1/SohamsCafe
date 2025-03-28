import express from 'express';
import { createReview, getReviews } from '../controllers/review.controller.js';
import { verifyToken } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/', verifyToken, createReview);
router.get('/:restaurantId', getReviews);

export default router;