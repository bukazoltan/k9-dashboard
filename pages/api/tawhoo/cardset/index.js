import nc from "next-connect";
import { connectToDatabase } from "../../../../utils/mongodb.js";
import { checkRightsAPI } from "../../../../utils/checkRights";

const handler = nc().get(async (req, res) => {
  const { db } = await connectToDatabase();
  const tawhoocardsets = await db
    .collection("tawhoocardsets")
    .find({})
    .toArray();
  res.json({ content: tawhoocardsets });
  res.end();
});

export default handler;
