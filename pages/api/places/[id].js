import nc from 'next-connect'
import db from '../../../utils/mongodb'
import { getSingelePlace, updatePlace, deletePlace } from '../../../controllers/placeController'
import onError from '../../../middlewares/errors'

const handler = nc({ onError });

db.dbConnect();

handler.get(getSingelePlace)
handler.put(updatePlace)
handler.delete(deletePlace)

export default handler;