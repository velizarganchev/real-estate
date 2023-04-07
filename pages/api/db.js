//import mongodb from "../../utils/mongodb"

// export default function handler(req, res) {
//   mongodb.dbConnect();
//   mongodb.dbDisconnect();
//   res.status(200).json({ name: 'John Doe' })
// }

import mongodb from "../../utils/mongodb"
import jsondb from "../../jsondb/places"
import Places from "../../models/Place";


export default async function handler(req, res) {
  await mongodb.dbConnect();

  await Places.deleteMany();
  await Places.insertMany(jsondb.places);
  const places = await Places.find({})

  await mongodb.dbDisconnect();

  //res.send({ text: 'Data saved' })
  res.send(places);
}