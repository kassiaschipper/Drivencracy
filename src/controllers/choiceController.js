import mongo from "../db/db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

const db = await mongo();

async function createChoice(req, res) {
  const { title, pollId } = req.body;
  const today = dayjs().format("YYYY-MM-D hh:mm");
  const createdChoice = req.body;

  try {
    const searchPoll = await db
      .collection("polls")
      .findOne({ _id: ObjectId(pollId) });
      console.log(searchPoll)
        //console.log(searchPoll.expireAt);
    
    if (searchPoll === null) {
      return res.sendStatus(404); // Enquete não encontrada
    }

    const findTitle = await db.collection("choices").findOne({ title: title });
    if (findTitle) {
      return res.sendStatus(409);
    }
            
   if( today > searchPoll.expireAt){
    return res.status(403);
   }

   const result = await db.collection("choices").insertOne({ ...createdChoice });

   return res.status(201).send(result);

} catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
 
}



export { createChoice };
