import { DB, Task, DatabaseResponse, DB_STATUSES } from '../models/database';
// import DB_STATUSES from '../models/statuses';

const MIN_TITLE_LENGTH = 10;
const MAX_TITLE_LENGTH = 255;
const MAX_DESC_LENGTH = 255;

class DatabaseAdapter {
  private database: DB = [];

  get Database() {
    return this.database;
  }

  remove(): Task | undefined {
    return this.Database.pop();
  }

  clear(): number {
    this.Database.length = 0;
    return this.Database.length;
  }

  get(): Task[] {
    return [ ...this.Database ];
  }

  add(task: Task): DB_STATUSES {
    const { title, description } = task;
    const status = this.validate(title, description);

    if (status === DB_STATUSES.OK) {
      this.Database.push(task);
    }

    return status;
  }

  private validate(title: string, description?: string ): DB_STATUSES {
    const isTitleEmpty = title.length === 0;
    const titleTooShort = title.length < MIN_TITLE_LENGTH;
    const titleTooLong = title.length > MAX_TITLE_LENGTH;
    
    const descriptionExist = !!description;
    const descTooLon = descriptionExist && description.length > MAX_DESC_LENGTH;
    
    if (isTitleEmpty) return DB_STATUSES.TITLE_IS_REQUIRED;
    if (titleTooShort) return DB_STATUSES.TITLE_TOO_SHORT;
    if (titleTooLong) return DB_STATUSES.TITLE_TOO_LONG;
    if (descTooLon) return DB_STATUSES.DESCRIPTION_TOO_LONG;
    return DB_STATUSES.OK;
  }
}

export default DatabaseAdapter;