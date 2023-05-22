import nc from 'next-connect'
import db from '../../utils/mongodb'
import { currentUserProfile } from '../../controllers/authController'

import { isAuthenticatedUser } from '../../middlewares/auth'

import onError from '../../middlewares/errors'

const handler = nc({ onError });

db.dbConnect();

handler.use(isAuthenticatedUser).get(currentUserProfile)

export default handler;
