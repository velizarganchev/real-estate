import mongoose from "mongoose";

const BookingShema = new mongoose.Schema({
    place: {
        type: String,
        required: true
    },
    checkIn: {
        type: Date,
        required: true,
    },
    checkOut: {
        type: Date,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    address: {
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
    payment: {
        type: Number,
        required: true
    }
})

export default mongoose.models.Booking || mongoose.model("Booking", BookingShema)
