import express from 'express';
import messagesRouter from "./routers/messages";
import fileDb from "./fileDb";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/messages', messagesRouter);

const run = async () => {
    await fileDb.init();

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });
};

run().catch(e => console.error(e));
