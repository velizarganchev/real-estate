import mongodb from "../../utils/mongodb"

export default function handler(req, res) {
  mongodb.dbConnect();
  mongodb.dbDisconnect();
  res.status(200).json({ name: 'John Doe' })
}

// import mongodb from "../../utils/mongodb"
// import jsondb from "../../jsondb/products"
// import Product from "../../models/Product";


// export default async function handler(req, res) {
//   await mongodb.dbConnect();

//   await Product.deleteMany();
//   await Product.insertMany(jsondb.products);
//   const products = await Product.find({})

//   await mongodb.dbDisconnect();

//   //res.send({ text: 'Data saved' })
//   res.send(products);
// }