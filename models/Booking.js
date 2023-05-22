import mongoose from "mongoose";
//const timeZone = require('mongoose-timezone');

const BookingShema = new mongoose.Schema({
    place: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Place'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    checkInDate: {
        type: Date,
        required: true,
    },
    checkOutDate: {
        type: Date,
        required: true,
    },
    amountPaid: {
        type: Number,
        required: true,
    },
    daysOfStay: {
        type: Number,
        required: true,
    },
    paymentInfo: {
        id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        }
    },
    paidAt: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.Booking || mongoose.model("Booking", BookingShema)
