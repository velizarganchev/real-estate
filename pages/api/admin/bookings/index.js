import nc from 'next-connect'
import db from '../../../../utils/mongodb'

import { allAdminBookings } from '../../../../controllers/bookingControllers'
import { isAuthenticatedUser, authorizeRoles } from '../../../../middlewares/auth'
import onError from '../../../../middlewares/errors'

const handler = nc({ onError });

db.dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(allAdminBookings)

export default handler;