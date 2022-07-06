import express, { Request, Response, Router } from 'express';
import { Task, DatabaseResponse, DB_STATUSES } from '../models/database';
import DatabaseAdapter from '../utils/DatabaseAdapter';
import HTTP_STATUSES from '../models/httpStatuses';
import uuid4 from 'uuid4';

const router: Router = express.Router();

const databaseAdapter = new DatabaseAdapter();

router.post('/add', (req: Request, res: Response) => {
  const task: Task = {
    ...req.body,
    id: uuid4()
  };

  const databaseStatus = databaseAdapter.add(task);

  const data: DatabaseResponse = {
    status: databaseStatus,
    items: [task]
  }

  const httpStatus = databaseStatus === DB_STATUSES.OK ? HTTP_STATUSES.STATUS_201 : HTTP_STATUSES.STATUS_400;
  res.status(httpStatus).json(data);
});

router.delete('/remove', (req: Request, res: Response) => {
  const deletedTask: Task | undefined = databaseAdapter.remove();

  const databaseStatus = deletedTask ? DB_STATUSES.OK : DB_STATUSES.NO_ITEMS;
  const httpStatus = deletedTask ? HTTP_STATUSES.STATUS_200 : HTTP_STATUSES.STATUS_202;

  const items = deletedTask ? [ deletedTask ] : [];

  const data: DatabaseResponse = {
    status: databaseStatus,
    items
  }
  res.status(httpStatus).json(data);
});

router.put('/clear', (req: Request, res: Response) => {
  const itemsLength = databaseAdapter.clear();

  const databaseStatus = itemsLength === 0 ? DB_STATUSES.OK : DB_STATUSES.CLEAR_CORRUPTED;
  const httpStatus = itemsLength === 0 ? HTTP_STATUSES.STATUS_200 : HTTP_STATUSES.STATUS_400;

  const data: DatabaseResponse = {
    status: databaseStatus,
    items: []
  }
  res.status(httpStatus).json(data);
});

router.get('/get', (req: Request, res: Response) => {
  const items = databaseAdapter.get();

  const databaseStatus = DB_STATUSES.OK;
  const httpStatus = HTTP_STATUSES.STATUS_200;

  const data: DatabaseResponse = {
    status: databaseStatus,
    items
  }
  res.status(httpStatus).json(data);
});

export default router;
