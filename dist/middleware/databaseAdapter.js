"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addItem = exports.getItems = exports.clearAll = exports.removeLast = void 0;
const MIN_TITLE_LENGTH = 10;
const MAX_TITLE_LENGTH = 255;
const MAX_DESC_LENGTH = 255;
const verifyItem = (item, min, max, isRequired) => {
    if (isRequired && !item)
        return false;
    if (item && item.trim().length < min)
        return false;
    if (item && item.trim().length > max)
        return false;
    return true;
};
const removeLast = (db) => {
    return db.pop();
};
exports.removeLast = removeLast;
const clearAll = (db) => {
    db.length = 0;
};
exports.clearAll = clearAll;
const getItems = (db) => {
    return db;
};
exports.getItems = getItems;
const addItem = (db, task) => {
    const titleCorrect = verifyItem(task.title, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH, true);
    const descCorrect = verifyItem(task.description, 0, MAX_DESC_LENGTH, false);
    if (titleCorrect && descCorrect) {
        db.push(task);
        return true;
    }
    return false;
};
exports.addItem = addItem;
