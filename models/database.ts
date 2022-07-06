export type Task = {
  id: string
  title: string;
  description?: string;
}

export type DB = Task[];

export type DatabaseResponse = {
  status: DB_STATUSES;
  items: DB;
}

export enum DB_STATUSES {
  OK = 'OK',
  TITLE_IS_REQUIRED = 'Title is required',
  TITLE_TOO_SHORT = 'Title is too short',
  TITLE_TOO_LONG = 'Title is too long',
  DESCRIPTION_TOO_LONG = 'Description is too long',
  NO_ITEMS = 'No items to remove',
  CLEAR_CORRUPTED = 'Clear items corrupted'
}
