/** 
import { dbConnect } from "../../lib/db-connect";

export default async function handler(req, res) {
  if (req.method !== "POST")
    res.status(400).json({ massage: "invalid request!" });

  await dbConnect();

  const { name } = req.body;

  res.status(200).json({ name: "post is created" });
}
*/

// curl -X POST localhost:3000/api/create
// will get {"name":"post is created"} respond

// with curl post , server responds new connection is created and later it will
//respond it is connected existing db
