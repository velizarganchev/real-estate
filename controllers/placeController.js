import mongodb from "../utils/mongodb"
import Place from "../models/Place";

import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import APIFeatures from "../utils/apiFeatures";

const allPlaces = catchAsyncErrors(async (req, res) => {

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

    await place.remove();

    res.status(200).json({
        success: true,
        message: 'Place is deleted.'
    })

})

export {
    allPlaces,
    newPlace,
    getSingelePlace,
    updatePlace,
    deletePlace
}