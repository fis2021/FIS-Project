import express, {Request, Response , Application} from 'express';
import config from './config';

const app: Application = express();


app.get('/', (req: Request,res: Response) => {
    res.send('Hello');
})

app.listen(config.server.port, () => console.log(`Server running on ${config.server.hostname}:${config.server.port}`))