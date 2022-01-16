import nc from "next-connect";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../../utils/mongodb";

const handler = nc().get(async (req, res) => {
  let params = req.query;
  const { db } = await connectToDatabase();
  const cardset = await db
    .collection("tawhoocardsets")
    .findOne({ _id: ObjectId(params.id) });
  res.json({ content: cardset });
  res.end();
});

export default handler;
