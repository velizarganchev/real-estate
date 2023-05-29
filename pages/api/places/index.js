import nc from 'next-connect'
import db from '../../../utils/mongodb'
import { allPlaces, newPlace } from '../../../controllers/placeController'
import { isAuthenticatedUser, authorizeRoles } from '../../../middlewares/auth'
import onError from '../../../middlewares/errors'

const handler = nc({ onError });

db.dbConnect();

handler.get(allPlaces)

handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .post(newPlace)

export default handler;