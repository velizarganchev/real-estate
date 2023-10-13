const mongoose = require("mongoose")

const PlaceShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter place name'],
        trim: true,
        maxLength: [100, 'Place name cannot exceed 100 characters']
    },
    pricePerNight: {
        type: Number,
        required: [true, 'Please enter place price per night'],
        maxLength: [9999, 'Price cannot exceed 9999'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter place description'],
    },
    city: {
        type: String,
        required: [true, 'Please enter place city'],
    },
    address: {
        type: String,
        required: [true, 'Please enter place address'],
    },
    guestCapacity: {
        type: Number,
        required: [true, 'Please enter place guest capacity'],
    },
    numOfBeds: {
        type: Number,
        required: [true, 'Please enter number of beds in place'],
    },
    checkIn: {
        type: Number,
        required: true,
    },
    checkOut: {
        type: Number,
        required: true,
    },
    internet: {
        type: Boolean,
        default: false,
    },
    airConditioned: {
        type: Boolean,
        default: false,
    },
    petsAllowed: {
        type: Boolean,
        default: false,
    },
    parking: {
        type: Boolean,
        default: false,
    },
    entertainment: {
        type: Boolean,
        default: false,
    },
    kitchen: {
        type: Boolean,
        default: false,
    },
    refrigerator: {
        type: Boolean,
        default: false,
    },
    washer: {
        type: Boolean,
        default: false,
    },
    dryer: {
        type: Boolean,
        default: false,
    },
    selfCheckIn: {
        type: Boolean,
        default: false,
    },
    ratings: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    extraInfo: {
        type: String,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
    // { timestamps: true }
)

module.exports = mongoose.models.Place || mongoose.model("Place", PlaceShema)