import express from 'express'
import {getItems,createItem,updateItem, deleteItem} from '../controllers/item.controller.js'


const router = express.Router();

router.get("/", getItems);

router.delete("/:id", deleteItem)

router.put("/:id", updateItem)

router.get("/", function (req, res) {
    res.send("server is ready")
});

router.post("/", createItem);

export default router;