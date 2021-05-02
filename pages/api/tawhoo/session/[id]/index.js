import nc from "next-connect";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../../utils/mongodb";
import { checkRightsAPI } from "../../../../../utils/checkRights";

const handler = nc()
  .get(async (req, res) => {
    let params = req.query;
    const hasRight = await checkRightsAPI(req, "tawhoo_mod");
    if (hasRight) {
      const { db } = await connectToDatabase();
      const tawhoo = await db
        .collection("tawhoosessions")
        .findOne({ _id: ObjectId(params.id) });
      res.json({ content: tawhoo });
    } else {
      res.json({ error: "unauthorized" });
      res.status(401);
    }
    res.end();
  })
  .put(async (req, res) => {
    let params = req.query;
    let body = req.body;
    let updatedSession = {
      players: body.players,
      ongoing: body.ongoing,
    };
    const hasRight = await checkRightsAPI(req, "tawhoo_mod");
    if (hasRight) {
      try {
        const { db } = await connectToDatabase();
        const session = await db
          .collection("tawhoosessions")
          .updateOne({ _id: ObjectId(params.id) }, { $set: updatedSession });
        res.json({ content: body, updated: true });
      } catch (e) {
        res.json({ error: "update unsuccessful", updated: false });
      }
    } else {
      res.json({ error: "unauthorized" });
      res.status(401);
    }
    res.end();
  });

export default handler;
