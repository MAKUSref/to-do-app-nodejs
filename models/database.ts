import STATUS from "./statuses";

export type Task = {
  id: string
  title: string;
  description?: string;
}

export type DB = Task[];

export type DatabaseResponse = {
  status: STATUS;
  items: DB;
}
