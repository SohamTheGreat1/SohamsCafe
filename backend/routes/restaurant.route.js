import express from 'express'
import {getRestaurant,createRestaurant,updateRestaurant,getRestaurantById,deleteRestaurant} from '../controllers/restaurant.controller.js'

const router1 = express.Router();

router1.get("/", getRestaurant);

router1.delete("/:id", deleteRestaurant)

router1.put("/:id", updateRestaurant)

router1.get("/", function (req, res) {
    res.send("server is ready")
});

router1.post("/", createRestaurant);

router1.get("/:id", getRestaurantById); 

export default router1;