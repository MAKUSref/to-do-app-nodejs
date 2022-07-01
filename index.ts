import { DB, Task, DatabaseResponse } from './models/database';
import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { get, add, remove, clear } from './utils/databaseAdapter';
import STATUS from './models/statuses';

dotenv.config();

const DATABASE: DB = [{ id: 'ss', title: 'title', description: 'desc' }];

const app: Express = express();
app.use(express.static('public'));
app.use(bodyParser.json());

const { PORT, HOST } = process.env;

// End points
app.post('/api/add', (req: Request, res: Response) => {
  const task: Task = req.body;
  const info = add(DATABASE, task);
  const data: DatabaseResponse = {
    status: info.status,
    items: info.items
  }

  const httpStatus = info.status === STATUS.OK ? 200 : 400;
  res.status(httpStatus).json(data);
});

app.get('/api/remove', (req: Request, res: Response) => {
  res.status(200).json(remove(DATABASE));
});

app.put('/api/clear', (req: Request, res: Response) => {
  res.status(200).json(clear(DATABASE));
});

app.get('/api/get', (req: Request, res: Response) => {
  res.status(200).json(get(DATABASE));
});

app.get('/', (req: Request, res: Response) => {
  res.sendFile('./index.html');
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at ${HOST}:${PORT}`);
});