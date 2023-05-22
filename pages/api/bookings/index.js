import nc from 'next-connect'
import db from '../../../utils/mongodb'

import { isAuthenticatedUser } from '../../../middlewares/auth'
import { newBooking } from '../../../controllers/bookingControllers'

import onError from '../../../middlewares/errors'

const handler = nc({ onError });

db.dbConnect();

handler
    .use(isAuthenticatedUser)
    .post(newBooking)

export default handler;