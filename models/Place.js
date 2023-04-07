import mongoose from "mongoose";

const PlaceShema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 1000
    },
    address: {
        type: String,
        required: true,
        maxlength: 150
    },
    price: {
        type: Number,
        required: true,
    },
    beds: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    checkIn: {
        type: Number,
        required: true,
    },
    checkOut: {
        type: Number,
        required: true,
    },
    maxGuests: {
        type: Number,
        required: true,
    },
    url: {
        type: String,
        required: true,
        maxlength: 60,
        unique: true
    },
    extraInfo: {
        type: String,
    },
    amenities: {
        type: [
            {
                text: {
                    type: String,
                    required: true
                },
                icon: {
                    type: String,
                    required: true
                }
            }
        ],
        required: true,
    },
    images: {
        type: [],
        required: true,
    }
},
    // { timestamps: true }
)

export default mongoose.models.Place || mongoose.model("Place", PlaceShema)


