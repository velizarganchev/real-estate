import nc from 'next-connect'
import db from '../../../utils/mongodb'
import { createPlaceReview, getPlaceReviews, deleteReview } from '../../../controllers/placeController'

import { isAuthenticatedUser } from '../../../middlewares/auth'

import onError from '../../../middlewares/errors'

const handler = nc({ onError });

db.dbConnect();

handler.get(getPlaceReviews)
handler.use(isAuthenticatedUser).put(createPlaceReview)
handler.use(isAuthenticatedUser).delete(deleteReview)


export default handler;
