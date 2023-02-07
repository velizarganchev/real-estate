import mongoose from "mongoose";

const BookingShema = new mongoose.Schema({
    place: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    checkIn: {
        type: Date,
        required: true,
    },
    checkout: {
        type: Date,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    numberOfGuests: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
})

export default mongoose.models.Booking || mongoose.model("Booking", BookingShema)
