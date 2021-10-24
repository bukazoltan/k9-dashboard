import nc from "next-connect";
import { connectToDatabase } from "../../../utils/mongodb.js";
import { checkRightsAPI } from "../../../utils/checkRights";

const handler = nc()
  .get(async (req, res) => {
    const { db } = await connectToDatabase();
    const tawhoos = await db.collection("tawhoos").find({}).toArray();
    res.json({ content: tawhoos });
    res.end();
  })
  .post(async (req, res) => {
    let body = req.body;
    let newTawhoo = {
      taboos: body.taboos,
      wordToGuess: body.wordToGuess,
      imgURL: body.imgURL,
      called: body.called,
      tags: body.tags || [],
    };
    const hasRight = await checkRightsAPI(req, "tawhoo_mod");
    if (hasRight) {
      const { db } = await connectToDatabase();
      const tawhoos = await db.collection("tawhoos").insertOne(newTawhoo);
      res.json({ content: tawhoos });
    } else {
      res.json({ error: "unauthorized" });
      res.status(401);
    }
    res.end();
  });

export default handler;
