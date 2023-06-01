import nc from 'next-connect'
import db from '../../../../utils/mongodb'

import { allAdminUsers } from '../../../../controllers/authController'
import { isAuthenticatedUser, authorizeRoles } from '../../../../middlewares/auth'
import onError from '../../../../middlewares/errors'

const handler = nc({ onError });

db.dbConnect();

handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .get(allAdminUsers)

export default handler;