import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

export default async function mongo() {
  let db;

  try {
    db = mongoClient.db("drivencracy");
    return db;
  } catch (error) {
    console.log(error);
    return error;
  }
}
