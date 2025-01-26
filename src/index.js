import express from "express";
import cors from "cors";
import {sendMessage} from "./controllers/notificationController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send", sendMessage)

export default app;