const mongoose = require( "mongoose")

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
        maxLength: [4, 'Place name cannot exceed 4 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter place description'],
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
    },
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