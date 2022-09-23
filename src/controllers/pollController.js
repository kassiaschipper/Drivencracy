import dayjs from "dayjs";
import mongo from "../db/db.js"
//import { ObjectId } from "mongodb";
const db = await mongo();
async function createPoll(req, res) {
  const { title, expireAt } = req.body;

  try {
    if (expireAt === "" || !expireAt) {
      const defaultDays = dayjs().add(30, "day");
      const poll = { title, expireAt: defaultDays.format("YYYY-MM-D hh:mm") };

      const result = await db.collection("polls").insertOne(poll);
     
      return res.status(201).send("Enquete criada!");
    }
    
    const expireDate = dayjs().add(expireAt, 'day');
    await db.collection("polls").insertOne({ title, expireAt: expireDate.format("YYYY-MM-D hh:mm") });
    return res.status(201).send("Enquete criada!");
  }
   catch (error) {
    console.log(error);
    return res.status(500);
  }
}

export { createPoll };
