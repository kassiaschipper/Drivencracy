import { ObjectId } from "bson";
import dayjs from "dayjs";
import mongo from "../db/db.js"

const db = await mongo();

async function createPoll(req, res) {
  const { title, expireAt } = req.body;

  try {
    if (expireAt === "" || !expireAt) {
      const defaultDays = dayjs().add(30, "day");
      const poll = { title, expireAt: defaultDays.format("YYYY-MM-D hh:mm") };

      const result = await db.collection("polls").insertOne(poll);
     
      return res.status(201).send("Enquete criada com sucesso!");
    }
    
    const expireDate = dayjs().add(expireAt, 'day');
    await db.collection("polls").insertOne({ title, expireAt: expireDate.format("YYYY-MM-D hh:mm") });
    return res.status(201).send("Enquete criada com sucesso");
  }
   catch (error) {
    console.log(error);
    return res.status(500);
  }
}

async function showPolls( req, res) {
   const polls = await db.collection("polls").find({}).toArray();
  try {
       if (polls.length === 0) { //lista vazia, nenhuma enquete foi cadastrada 
      return res.status(204).send("Nenhuma enquete cadastrada");
    }
    return res.status(200).send(polls);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}

async function showPollChoices (req, res){
const pollId = req.params.id;
//console.log(pollId)
    try {
      const choicesByPollId = await db.collection("choices").find({pollId: ObjectId(pollId)}).toArray(); 
      console.log(choicesByPollId)
      if(choicesByPollId.length === 0 ){
        return res.status(404).send("Enquete não encontrada");
      }
      return res.send(choicesByPollId);
    } catch (error) {
      return res.sendStatus(500);
    }
}

export { createPoll, showPolls, showPollChoices };
