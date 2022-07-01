import { DB, Task, DatabaseResponse } from '../models/database';
import STATUS from '../models/statuses';

const MIN_TITLE_LENGTH = 10;
const MAX_TITLE_LENGTH = 255;
const MAX_DESC_LENGTH = 255;

const remove = (db: DB): DatabaseResponse => {
  const status = db.pop() ? STATUS.OK : STATUS.NO_ITEMS;

  return {
    status,
    items: db
  }
}

const clear = (db: DB): DatabaseResponse => {
  db.length = 0;

  return {
    status: STATUS.OK,
    items: db
  };
}

const get = (db: DB): DatabaseResponse => {
  return {
    status: STATUS.OK,
    items: db
  };
}

const getStatus = (title: string, description?: string ): STATUS => {
  const isTitleEmpty = title.length === 0;
  const titleTooShort = title.length < MIN_TITLE_LENGTH;
  const titleTooLong = title.length > MAX_TITLE_LENGTH;
  
  const descriptionExist = !!description;
  const descTooLon = descriptionExist && description.length > MAX_DESC_LENGTH;
  
  if (isTitleEmpty) return STATUS.TITLE_IS_REQUIRED;
  if (titleTooShort) return STATUS.TITLE_TOO_SHORT;
  if (titleTooLong) return STATUS.TITLE_TOO_LONG;
  if (descTooLon) return STATUS.DESCRIPTION_TOO_LONG;
  return STATUS.OK;
}

const add = (db: DB, task: Task): DatabaseResponse => {
  const { title, description } = task;
  const status = getStatus(title, description);
  
  if (status === STATUS.OK) {
    db.push(task);
  }

  return {
    status,
    items: db
  }
}

export {
  remove,
  clear,
  get,
  add
}