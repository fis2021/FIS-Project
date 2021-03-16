import express, {Request, Response , Application} from 'express';
import logging from "./logging";
import config from './config';

import mongoose from 'mongoose';

const app: Application = express();

const NAMESPACE : string = 'Server';

//Connect to DB
mongoose.connect(config.mongo.url,config.mongo.options , () => {
    logging.info(NAMESPACE, 'Connected to DB');
});

app.get('/', (req: Request,res: Response) => {
    res.send('Hello');
})

app.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`))