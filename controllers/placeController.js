import Place from "../models/Place";
import Booking from "../models/Booking"
import cloudinary from "cloudinary";

import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import APIFeatures from "../utils/apiFeatures";

// Get All Places
const allPlaces = catchAsyncErrors(async (req, res) => {

    // return next(new ErrorHandler('Place not found with this ID.', 404))

    const resPerPage = 4;
    const placesCount = await Place.countDocuments();

    const apiFeatures = new APIFeatures(Place.find(), req.query)
        .search()
        .filter()

    let places = apiFeatures.query;
    let filteredPlacesCount = places.length;

    apiFeatures.pagination(resPerPage)
    places = await apiFeatures.query;

    res.status(200).json({
        success: true,
        placesCount,
        resPerPage,
        filteredPlacesCount,
        places: places
    })
})

// Create new place => /api/places
const newPlace = catchAsyncErrors(async (req, res) => {

    const images = req.body.images;

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {

        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'realestate/places',
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })

    }

    req.body.images = imagesLinks;
    req.body.user = req.user._id

    const place = await Place.create(req.body)

    res.status(200).json({
        success: true,
        place: place
    })

})
// Get place details => /api/places/:id

const getSingelePlace = catchAsyncErrors(async (req, res, next) => {

    const place = await Place.findById(req.query.id)

    if (!place) {
        return next(new ErrorHandler('Place not found with this ID.', 404))
    }
    res.status(200).json({
        success: true,
        place: place
    })

})

// Update place => /api/places/:id
const updatePlace = catchAsyncErrors(async (req, res) => {

    let place = await Place.findById(req.query.id)

    if (!place) {
        return next(new ErrorHandler('Place not found with this ID.', 404))
    }

    if (req.body.images) {

        // Delete images associated with the place
        for (let i = 0; i < place.images.length; i++) {
            await cloudinary.v2.uploader.destroy(place.images[i].public_id)
        }

        let imagesLinks = []
        const images = req.body.images;

        for (let i = 0; i < images.length; i++) {

            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'realestate/places',
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })

        }

        req.body.images = imagesLinks;

    }

    place = await Place.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: true
    })

    res.status(200).json({
        success: true,
        place: place
    })

})

// Delete place => /api/places/:id
const deletePlace = catchAsyncErrors(async (req, res) => {

    const place = await Place.findById(req.query.id)

    if (!place) {
        return next(new ErrorHandler('Place not found with this ID.', 404))
    }

    // Delete images associated with the room
    for (let i = 0; i < place.images.length; i++) {
        await cloudinary.v2.uploader.destroy(place.images[i].public_id)
    }


    await place.remove();

    res.status(200).json({
        success: true,
        message: 'Place is deleted.'
    })

})

// Create a new review   =>   /api/reviews
const createPlaceReview = catchAsyncErrors(async (req, res) => {

    const { rating, comment, placeId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const place = await Place.findById(placeId);

    const isReviewed = place.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {

        place.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })

    } else {
        place.reviews.push(review);
        place.numOfReviews = place.reviews.length
    }

    place.ratings = place.reviews.reduce((acc, item) => item.rating + acc, 0) / place.reviews.length

    await place.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
    })

})


// Check Review Availability   =>   /api/reviews/check_review_availability
const checkReviewAvailability = catchAsyncErrors(async (req, res) => {

    const { placeId } = req.query;

    const bookings = await Booking.find({ user: req.user._id, place: placeId })

    let isReviewAvailable = false;
    if (bookings.length > 0) isReviewAvailable = true


    res.status(200).json({
        success: true,
        isReviewAvailable
    })

})


// Get all places - ADMIN   =>   /api/admin/places
const allAdminPlaces = catchAsyncErrors(async (req, res) => {

    const places = await Place.find();

    res.status(200).json({
        success: true,
        places
    })

})


// Get all place reviews - ADMIN   =>   /api/reviews
const getPlaceReviews = catchAsyncErrors(async (req, res) => {

    const place = await Place.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: place.reviews
    })

})


// Delete place review - ADMIN   =>   /api/reviews
const deleteReview = catchAsyncErrors(async (req, res) => {

    const place = await Place.findById(req.query.placeId);

    const reviews = place.reviews.filter(review => review._id.toString() !== req.query.id.toString())

    const numOfReviews = reviews.length;

    const ratings = place.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Place.findByIdAndUpdate(req.query.placeId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })

})

export {
    allPlaces,
    newPlace,
    getSingelePlace,
    updatePlace,
    deletePlace,
    createPlaceReview,
    checkReviewAvailability,
    allAdminPlaces,
    getPlaceReviews,
    deleteReview
}