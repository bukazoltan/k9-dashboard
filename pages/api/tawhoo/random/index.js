import nc from "next-connect";
import _ from "lodash";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "./../../../../utils/mongodb";
import { getSession } from "next-auth/client";

const handler = nc().get(async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    const { db } = await connectToDatabase();
    const tawhoos = await db.collection("tawhoos").find({}).toArray();
    let randomTawhoo = _.sample(tawhoos);
    res.json({ content: randomTawhoo });
  } else {
    res.json({ error: "unauthorized" });
    res.status(401);
  }
  res.end();
});

export default handler;
