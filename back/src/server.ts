import express, {Request, Response , Application} from 'express';
import { bookRouter } from './routes/book-routes'
import logging from "./logging";
import config from './config';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import { userRouter } from './routes/user-routes';
import { getBooksByName } from './controllers/bookController';
import { reviewRouter } from './routes/review-routes';

const app: Application = express();

const NAMESPACE : string = 'Server';

//Connect to DB
mongoose.connect(config.mongo.url,config.mongo.options , () => {
    logging.info(NAMESPACE, 'Connected to DB');
});

app.use(function (req: Request, res: Response, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(express.urlencoded({extended: true}));
app.use(cors());


app.use('/api',bookRouter);
app.use('/api',userRouter);
app.use('/api',reviewRouter);
app.use('*', (req, res) => res.status(404).json({message: "Pagina nu a fost gasita"}));

app.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`))
