import nc from 'next-connect'
import db from '../../../../utils/mongodb'
import { resetPassword } from '../../../../controllers/authController';

import onError from '../../../../middlewares/errors'

const handler = nc({ onError });

db.dbConnect();

handler.put(resetPassword)

export default handler;
