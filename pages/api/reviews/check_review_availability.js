import nc from 'next-connect'
import db from '../../../utils/mongodb'

import { isAuthenticatedUser } from '../../../middlewares/auth'
import { checkReviewAvailability } from '../../../controllers/placeController'

import onError from '../../../middlewares/errors'

const handler = nc({ onError });

db.dbConnect();

handler.use(isAuthenticatedUser).get(checkReviewAvailability)


export default handler;
