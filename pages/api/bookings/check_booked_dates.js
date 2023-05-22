import nc from 'next-connect'
import db from '../../../utils/mongodb'

import { checkBookedDatesOfPlace } from '../../../controllers/bookingControllers'

import onError from '../../../middlewares/errors'

const handler = nc({ onError });

db.dbConnect();

handler
    .get(checkBookedDatesOfPlace)

export default handler;