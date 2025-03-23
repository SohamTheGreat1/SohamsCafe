import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import itemRoutes from './routes/item.route.js';
import restaurantRoutes from './routes/restaurant.route.js'
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/items", itemRoutes);
app.use("/api/restaurants", restaurantRoutes);

app.listen(PORT, function () {
    connectDB();
    console.log("server started at port:", PORT);
});
