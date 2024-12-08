import express from "express";
import fileDb from "../fileDb";
import {MessageResponse} from "../types";

const messagesRouter = express.Router();

messagesRouter.get("/", async (req, res) => {
    try {
        const messages: MessageResponse[]  = await fileDb.getMessages();

        const sortedMessages = messages.sort((a, b) => {
            return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
        });

        const lastMessages = sortedMessages.slice(0, 30);

        const dataQuery = req.query.datetime as string;

        if (dataQuery) {
            const queryTime = Date.parse(dataQuery);
            if (isNaN(queryTime)) {
                res.status(404).send({ error: "Invalid date format" });
            }

            const filteredMessages = lastMessages.filter((message) => {
                return new Date(message.datetime).getTime() > queryTime;
            });

            res.send(filteredMessages);
        } else {
            res.send(lastMessages);
        }
    } catch (error) {
        console.error(error);
    }
});

messagesRouter.post("/add", async (req, res) => {
    const { message, author } = req.body;

    if (!message || message.trim() === "" || !author || author.trim() === "") {
        res.status(400).send({ error: "Message and Author must be present in the request" });
    }

    const newMessage: MessageResponse = {
        id: "",
        message: req.body.message,
        author: req.body.author,
        datetime: "",
    }

    try {
        const savedMessage = await fileDb.addMessage(newMessage);
        res.send(savedMessage);
    } catch (error) {
        console.error(error);
    }
});

export default messagesRouter;
