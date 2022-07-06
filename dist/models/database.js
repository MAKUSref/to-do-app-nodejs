"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_STATUSES = void 0;
var DB_STATUSES;
(function (DB_STATUSES) {
    DB_STATUSES["OK"] = "OK";
    DB_STATUSES["TITLE_IS_REQUIRED"] = "Title is required";
    DB_STATUSES["TITLE_TOO_SHORT"] = "Title is too short";
    DB_STATUSES["TITLE_TOO_LONG"] = "Title is too long";
    DB_STATUSES["DESCRIPTION_TOO_LONG"] = "Description is too long";
    DB_STATUSES["NO_ITEMS"] = "No items to remove";
    DB_STATUSES["CLEAR_CORRUPTED"] = "Clear items corrupted";
})(DB_STATUSES = exports.DB_STATUSES || (exports.DB_STATUSES = {}));
