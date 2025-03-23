import Restaurant from "../models/restaurant.model.js";
import mongoose from 'mongoose';

export const getRestaurant = async (req, res) => {
    try {
        const restaurants = await Restaurant.find({}).populate("menu");
        res.status(200).json({ success: true, data: restaurants });
    } catch (error) {
        console.log("error in getting data:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const createRestaurant = async (req, res) => {
    const restaurant = req.body;
    if (!restaurant.name || !restaurant.location || !restaurant.image || !restaurant.menu) {
        return res.status(400).send({ message: "please provide all fields" });
    }
    restaurant.menu = restaurant.menu.map(id => new mongoose.Types.ObjectId(id));
    const newRestaurant = new Restaurant(restaurant);

    try {
        await newRestaurant.save();
        res.status(201).json({ success: true, data: newRestaurant });
    }
    catch (error) {
        console.error("error in adding new restaurant", error.message);
        res.status(500).json({ success: false, message: "server error" });
    }

}

export const updateRestaurant = async (req, res) => {
    
    const { id } = req.params;
    const restaurant = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid restaurant id" });
    }

    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, restaurant, { new: true });
        res.status(200).json({ success: true, data: updatedItem });
    } catch (error) {
        console.log("error in updating restaurant details:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const deleteRestaurant = async (req, res) => {
    const { id } = req.params;
    console.log("id: ", id);

    try {
        await Restaurant.findByIdAndDelete(id);
        res.status(201).json({success: true, message: "Restaurant Deleted"})
    }
    catch (error) {
        console.log("error in deleting restaurant:", error.message)
        res.status(500).json({success: false, message: "Server error"})
    }
}