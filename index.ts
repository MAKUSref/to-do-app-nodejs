import toDoListMethods from './routes/index';
import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/api', toDoListMethods);

const { PORT, HOST } = process.env;

app.get('/', (req: Request, res: Response) => {
  res.sendFile('./index.html');
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at ${HOST}:${PORT}`);
});