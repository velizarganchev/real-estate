import Booking from "../models/Booking";

import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";

import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment)


// Create new Booking   =>   /api/bookings
const newBooking = catchAsyncErrors(async (req, res) => {

    const {
        place,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
    } = req.body;

    const booking = await Booking.create({
        place,
        user: req.user._id,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now()
    })

    res.status(200).json({
        success: true,
        booking
    })
})

// Create new booking   =>   /api/bookings/check
const checkPlaceBookingAvailability = catchAsyncErrors(async (req, res) => {

    let { placeId, checkInDate, checkOutDate } = req.query;

    checkInDate = new Date(checkInDate);
    checkOutDate = new Date(checkOutDate);
    const bookings = await Booking.find({
        place: placeId,
        $and: [{
            checkInDate: {
                $lte: checkOutDate
            }
        }, {
            checkOutDate: {
                $gte: checkInDate
            }
        }]
    })
    // Check if there is any booking available
    let isAvailable;

    if (bookings && bookings.length === 0) {
        isAvailable = true
    } else {
        isAvailable = false
    }

    res.status(200).json({
        success: true,
        isAvailable
    })
})
// Check booked dates of a place   =>   /api/bookings/check_booked_dates
const checkBookedDatesOfPlace = catchAsyncErrors(async (req, res) => {

    const { placeId } = req.query;

    const bookings = await Booking.find({ place: placeId });

    let bookedDates = [];

    const timeDiffernece = moment().utcOffset() / 60;

    bookings.forEach(booking => {

        const checkInDate = moment(booking.checkInDate).add(timeDiffernece, 'hours')
        const checkOutDate = moment(booking.checkOutDate).add(timeDiffernece, 'hours')

        const range = moment.range(moment(checkInDate), moment(checkOutDate));

        const dates = Array.from(range.by('day'));
        bookedDates = bookedDates.concat(dates);
    })

    res.status(200).json({
        success: true,
        bookedDates
    })
})


// Get all bookings of current user   =>   /api/bookings/me
const myBookings = catchAsyncErrors(async (req, res) => {

    const bookings = await Booking.find({ user: req.user._id })
        .populate({
            path: 'place',
            select: 'name pricePerNight images'
        })
        .populate({
            path: 'user',
            select: 'name email'
        })

    res.status(200).json({
        success: true,
        bookings
    })
})


// Get booking details   =>   /api/bookings/:id
const getBookingDetails = catchAsyncErrors(async (req, res) => {

    const booking = await Booking.findById(req.query.id)
        .populate({
            path: 'place',
            select: 'name pricePerNight images'
        })
        .populate({
            path: 'user',
            select: 'name email'
        });

    if (!booking) {
        return res.status(404).json({
            success: false,
            message: 'Booking not found'
        });
    }

    if (!booking.place) {
        return res.status(404).json({
            success: false,
            message: 'Associated place not found for this booking'
        });
    }

    res.status(200).json({
        success: true,
        booking
    });
    // const booking = await Booking.findById(req.query.id)
    //     .populate({
    //         path: 'place',
    //         select: 'name pricePerNight images'
    //     })
    //     .populate({
    //         path: 'user',
    //         select: 'name email'
    //     })

    // res.status(200).json({
    //     success: true,
    //     booking
    // })
});


// Get all bookings - ADMIN   =>   /api/admin/bookings
const allAdminBookings = catchAsyncErrors(async (req, res) => {

    const bookings = await Booking.find()
        .populate({
            path: 'place',
            select: 'name pricePerNight images'
        })
        .populate({
            path: 'user',
            select: 'name email'
        })

    res.status(200).json({
        success: true,
        bookings
    })
})


// Delete booking - ADMIN   =>   /api/admin/bookings/id
const deleteBooking = catchAsyncErrors(async (req, res, next) => {

    const booking = await Booking.findById(req.query.id)

    if (!booking) {
        return next(new ErrorHandler('Booking not found with this ID', 400));
    }

    await booking.remove()

    res.status(200).json({
        success: true,
        message: 'Booking is deleted.'
    })
})

export {
    newBooking,
    checkPlaceBookingAvailability,
    checkBookedDatesOfPlace,
    myBookings,
    getBookingDetails,
    allAdminBookings,
    deleteBooking
}