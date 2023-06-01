import nc from 'next-connect'
import db from '../../../../utils/mongodb'

import { getUserDetails, updateUser, deleteUser } from '../../../../controllers/authController'

import { isAuthenticatedUser, authorizeRoles } from '../../../../middlewares/auth'
import onError from '../../../../middlewares/errors'

const handler = nc({ onError });

db.dbConnect();

handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .get(getUserDetails)

handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .put(updateUser)


handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .delete(deleteUser)

export default handler;