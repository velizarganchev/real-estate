//import mongodb from "../../utils/mongodb"

// export default function handler(req, res) {
//   mongodb.dbConnect();
//   mongodb.dbDisconnect();
//   res.status(200).json({ name: 'John Doe' })
// }

import mongodb from "../../utils/mongodb"

export default function handler(req, res) {
  mongodb.dbConnect();
  mongodb.dbDisconnect();
  res.status(200).json({ name: 'John Doe' })
}