import nc from "next-connect";
import { connectToDatabase } from "../../../../utils/mongodb.js";
import { checkRightsAPI } from "../../../../utils/checkRights";

const handler = nc()
  .get(async (req, res) => {
    const { db } = await connectToDatabase();
    const sessions = await db.collection("tawhoosessions").find({}).toArray();
    res.json({ content: sessions });
    res.end();
  })
  .post(async (req, res) => {
    let body = req.body;
    let newSession = {
      players: body.players,
      ongoing: body.ongoing,
      date: new Date(),
      ongoing: true,
    };
    const hasRight = await checkRightsAPI(req, "tawhoo_mod");
    if (hasRight) {
      const { db } = await connectToDatabase();
      const tawhoos = await db
        .collection("tawhoosessions")
        .insertOne(newSession);
      res.json({ content: tawhoos });
    } else {
      res.json({ error: "unauthorized" });
      res.status(401);
    }
    res.end();
  });

export default handler;
