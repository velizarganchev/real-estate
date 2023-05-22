import nc from 'next-connect'
import db from '../../../utils/mongodb'
import { forgotPassword } from '../../../controllers/authController'

import onError from '../../../middlewares/errors'

const handler = nc({ onError });

db.dbConnect();

handler.post(forgotPassword)

export default handler;
