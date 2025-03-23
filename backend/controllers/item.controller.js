import Item from "../models/item.model.js";
import mongoose from 'mongoose';

export const getItems = async (req, res) => {
    try {
        const items = await Item.find({});
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        console.log("error in getting data:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const createItem = async (req, res) => {
    const item = req.body;
    if (!item.name || !item.price || !item.image) {
        return res.status(400).send({ message: "please provide all fields" });
    }
    const newItem = new Item(item);

    try {
        await newItem.save();
        res.status(201).json({ success: true, data: newItem });
    }
    catch (error) {
        console.error("error in creating new item", error.message);
        res.status(500).json({ success: false, message: "server error" });
    }

}

export const updateItem = async (req, res) => {
    
    const { id } = req.params;
    const item = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid item id" });
    }

    try {
        const updatedItem = await Item.findByIdAndUpdate(id, item, { new: true });
        res.status(200).json({ success: true, data: updatedItem });
    } catch (error) {
        console.log("error in updating item:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const deleteItem = async (req, res) => {
    const { id } = req.params;
    console.log("id: ", id);

    try {
        await Item.findByIdAndDelete(id);
        res.status(201).json({success: true, message: "Item Deleted"})
    }
    catch (error) {
        console.log("error in deleting item:", error.message)
        res.status(500).json({success: false, message: "Server error"})
    }
}