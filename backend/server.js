import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import itemRoutes from './routes/item.route.js';
const app = express();

dotenv.config();

app.use(express.json());

app.use("/api/items", itemRoutes);

app.listen(3000, function () {
    connectDB();
    console.log("server started at port 3000");
});
