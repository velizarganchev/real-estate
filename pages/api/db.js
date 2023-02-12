import mongodb from "../../utils/mongodb"
import jsondb from "../../jsondb/places";
import Place from "../../models/Place";

export default async function handler(req, res) {
  await mongodb.dbConnect();
  // await Place.deleteMany();
  // await Place.insertMany(jsondb.places);
  const place = await Place.find({})
  //await mongodb.dbDisconnect();
  res.send(place)
}