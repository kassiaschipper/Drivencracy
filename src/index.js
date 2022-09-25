import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import pollRoute from "./routes/pollRoute.js"
import choiceRoute from "./routes/choiceRoute.js"

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.use(pollRoute);
server.use(choiceRoute)

server.get("/status", (req, res) => {
    return res.send("Ok");
}); 

server.listen(process.env.PORT, () => 
console.log(`Listening on port ${process.env.PORT}`));