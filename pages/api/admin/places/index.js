import nc from 'next-connect'
import db from '../../../../utils/mongodb'

import { allAdminPlaces } from '../../../../controllers/placeController'
import { isAuthenticatedUser, authorizeRoles } from '../../../../middlewares/auth'
import onError from '../../../../middlewares/errors'

const handler = nc({ onError });

db.dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(allAdminPlaces)

export default handler;