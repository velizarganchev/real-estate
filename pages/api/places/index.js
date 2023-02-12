import mongodb from "../../../utils/mongodb";
import Booking from "../../../models/Booking";

export default async function handler(req, res) {
    const { method } = req;
    await mongodb.dbConnect();

    if (method === "GET") {
        try {
            const bookings = await Booking.find();
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    if (method === "POST") {
        try {
            const booking = await Booking.create(req.body);
            res.status(201).json(booking);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
