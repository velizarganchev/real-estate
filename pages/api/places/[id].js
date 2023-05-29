import nc from 'next-connect'
import db from '../../../utils/mongodb'
import { getSingelePlace, updatePlace, deletePlace } from '../../../controllers/placeController'
import { isAuthenticatedUser, authorizeRoles } from '../../../middlewares/auth'
import onError from '../../../middlewares/errors'

const handler = nc({ onError });

db.dbConnect();

handler.get(getSingelePlace)
handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .put(updatePlace)
handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .delete(deletePlace)

export default handler;