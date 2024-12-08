import { Message, MessageResponse } from "./types";
import { promises as fs } from "fs";
import { randomUUID } from "crypto";

const fileName = "./db.json";
let data: MessageResponse[] = [];

const fileDb = {
    async init() {
        try {
            const fileContent = await fs.readFile(fileName);
            data = JSON.parse(fileContent.toString());
        } catch (error) {
            console.error(error);
            data = [];
           await this.saveMessages();
        }
    },

    async getMessages() {
        return data;
    },

    async addMessage(item: Message) {

        const newMessage: MessageResponse = {
            id: randomUUID(),
            message: item.message,
            author: item.author,
            datetime: new Date().toISOString(),
        };

        data.push(newMessage);

        try {
            await this.saveMessages();
            return newMessage;
        } catch (error) {
            console.error(error);
        }
    },

    async saveMessages() {
        try {
            await fs.writeFile(fileName, JSON.stringify(data, null, 2), 'utf-8');
        } catch (error) {
            console.error(error);
        }
    },
};

export default fileDb;
