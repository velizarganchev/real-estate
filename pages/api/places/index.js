import nc from 'next-connect'
import db from '../../../utils/mongodb'
import { allPlaces, newPlace } from '../../../controllers/placeController'
import onError from '../../../middlewares/errors'

const handler = nc({ onError });

db.dbConnect();

handler.get(allPlaces)

handler.post(newPlace)

export default handler;