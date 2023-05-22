import nc from 'next-connect'
import db from '../../../utils/mongodb'

import { registerUser } from '../../../controllers/authController'

import onError from '../../../middlewares/errors'

const handler = nc({ onError });

db.dbConnect();

handler.post(registerUser)

export default handler;