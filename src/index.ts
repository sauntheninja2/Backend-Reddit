import express, {Express , Request , Response } from 'express';
import postRouter from './router/postRouter';
import cors from 'cors';
const app: Express = express();
const port = 3001;
app.use(cors());
app.use(express.json());
app.use('/api',postRouter);


app.get('/' , (req: Request , res: Response) => {
    res.send('Express + Typescript Server');
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});