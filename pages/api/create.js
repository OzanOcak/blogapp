export default function handler(req, res) {
  if (req.method !== "POST")
    res.status(400).json({ massage: "invalid request!" });

  const { name } = req.body;

  res.status(200).json({ name: "post is created" });
}

// curl -X POST localhost:3000/api/create
// will get {"name":"post is created"} respond
