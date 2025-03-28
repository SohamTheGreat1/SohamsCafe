import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import itemRoutes from './routes/item.route.js';
import restaurantRoutes from './routes/restaurant.route.js'
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import { verifyToken } from './controllers/auth.controller.js';
import reviewRoutes from './routes/review.route.js';

const app = express();

dotenv.config();

app.use(cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));


const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/items", verifyToken, itemRoutes);
app.use("/api/restaurants", verifyToken, restaurantRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);

app.listen(PORT, function () {
    connectDB();
    console.log("server started at port:", PORT);
});
