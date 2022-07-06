"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = exports.get = exports.clear = exports.remove = void 0;
const statuses_1 = __importDefault(require("../models/statuses"));
const MIN_TITLE_LENGTH = 10;
const MAX_TITLE_LENGTH = 255;
const MAX_DESC_LENGTH = 255;
class DatabaseAdapter {
    constructor(databes) {
        this.database = databes;
    }
    get Database() {
        return this.database;
    }
    remove() {
        return this.Database.pop();
    }
    clear() {
        this.Database.length = 0;
    }
    get() {
        return [...this.Database];
    }
    add(task) {
        const { title, description } = task;
        const status = this.validate(title, description);
        if (status === statuses_1.default.OK) {
            this.Database.push(task);
        }
        return status;
    }
    validate(title, description) {
        const isTitleEmpty = title.length === 0;
        const titleTooShort = title.length < MIN_TITLE_LENGTH;
        const titleTooLong = title.length > MAX_TITLE_LENGTH;
        const descriptionExist = !!description;
        const descTooLon = descriptionExist && description.length > MAX_DESC_LENGTH;
        if (isTitleEmpty)
            return statuses_1.default.TITLE_IS_REQUIRED;
        if (titleTooShort)
            return statuses_1.default.TITLE_TOO_SHORT;
        if (titleTooLong)
            return statuses_1.default.TITLE_TOO_LONG;
        if (descTooLon)
            return statuses_1.default.DESCRIPTION_TOO_LONG;
        return statuses_1.default.OK;
    }
}
const remove = (db) => {
    const status = db.pop() ? statuses_1.default.OK : statuses_1.default.NO_ITEMS;
    return {
        status,
        items: db
    };
};
exports.remove = remove;
const clear = (db) => {
    db.length = 0;
    return {
        status: statuses_1.default.OK,
        items: db
    };
};
exports.clear = clear;
const get = (db) => {
    return {
        status: statuses_1.default.OK,
        items: db
    };
};
exports.get = get;
const getStatus = (title, description) => {
    const isTitleEmpty = title.length === 0;
    const titleTooShort = title.length < MIN_TITLE_LENGTH;
    const titleTooLong = title.length > MAX_TITLE_LENGTH;
    const descriptionExist = !!description;
    const descTooLon = descriptionExist && description.length > MAX_DESC_LENGTH;
    if (isTitleEmpty)
        return statuses_1.default.TITLE_IS_REQUIRED;
    if (titleTooShort)
        return statuses_1.default.TITLE_TOO_SHORT;
    if (titleTooLong)
        return statuses_1.default.TITLE_TOO_LONG;
    if (descTooLon)
        return statuses_1.default.DESCRIPTION_TOO_LONG;
    return statuses_1.default.OK;
};
const add = (db, task) => {
    const { title, description } = task;
    const status = getStatus(title, description);
    if (status === statuses_1.default.OK) {
        db.push(task);
    }
    return {
        status,
        items: db
    };
};
exports.add = add;
exports.default = DatabaseAdapter;
