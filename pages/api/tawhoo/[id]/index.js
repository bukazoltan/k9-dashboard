import nc from "next-connect";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "./../../../../utils/mongodb";
import { checkRightsAPI } from "./../../../../utils/checkRights";

const handler = nc()
  .get(async (req, res) => {
    let params = req.query;
    const hasRight = await checkRightsAPI(req, "tawhoo_mod");
    if (hasRight) {
      const { db } = await connectToDatabase();
      const tawhoo = await db
        .collection("tawhoos")
        .findOne({ _id: ObjectId(params.id) });
      res.json({ content: tawhoo });
    } else {
      res.json({ error: "unauthorized" });
      res.status(401);
    }
    res.end();
  })
  .delete(async (req, res) => {
    let params = req.query;
    const hasRight = await checkRightsAPI(req, "tawhoo_mod");
    if (hasRight) {
      try {
        const { db } = await connectToDatabase();
        await db.collection("tawhoos").deleteOne({ _id: ObjectId(params.id) });
        res.json({ content: "successfully deleted", deleted: true });
      } catch (e) {
        res.json({ error: "update unsuccessful", deleted: false });
      }
    } else {
      res.json({ error: "unauthorized" });
      res.status(401);
    }
  })
  .put(async (req, res) => {
    let params = req.query;
    let body = req.body;
    let updatedTawhoo = {
      taboos: body.taboos,
      wordToGuess: body.wordToGuess,
      imgURL: body.imgURL,
      called: body.called,
      tags: body.tags,
    };
    const hasRight = await checkRightsAPI(req, "tawhoo_mod");
    if (hasRight) {
      try {
        const { db } = await connectToDatabase();
        const tawhoo = await db
          .collection("tawhoos")
          .updateOne({ _id: ObjectId(params.id) }, { $set: updatedTawhoo });
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
