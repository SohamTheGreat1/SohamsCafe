import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    menu: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Item",
        required: true
    }],
    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
      },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
},
{
    timestamps: true
    });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
