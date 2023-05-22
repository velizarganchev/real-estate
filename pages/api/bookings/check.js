import nc from 'next-connect'
import db from '../../../utils/mongodb'

import { checkPlaceBookingAvailability } from '../../../controllers/bookingControllers'

import onError from '../../../middlewares/errors'

const handler = nc({ onError });

db.dbConnect();

handler
    .get(checkPlaceBookingAvailability)

export default handler;