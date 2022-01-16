import nc from "next-connect";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../../utils/mongodb";
import { checkRightsAPI } from "../../../../../utils/checkRights";

const handler = nc().get(async (req, res) => {
  let params = req.query;
  const hasRight = await checkRightsAPI(req, "tawhoo_mod");
  if (hasRight) {
    const { db } = await connectToDatabase();
    const cardset = await db
      .collection("tawhoocardsets")
      .findOne({ _id: ObjectId(params.id) });
    res.json({ content: cardset });
  } else {
    res.json({ error: "unauthorized" });
    res.status(401);
  }
  res.end();
});

export default handler;
