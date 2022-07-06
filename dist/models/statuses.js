"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var STATUSES;
(function (STATUSES) {
    STATUSES["OK"] = "OK";
    STATUSES["TITLE_IS_REQUIRED"] = "Title is required";
    STATUSES["TITLE_TOO_SHORT"] = "Title is too short";
    STATUSES["TITLE_TOO_LONG"] = "Title is too long";
    STATUSES["DESCRIPTION_TOO_LONG"] = "Description is too long";
    STATUSES["NO_ITEMS"] = "No items to remove";
    STATUSES["CLEAR_CORRUPTED"] = "Clear items corrupted";
})(STATUSES || (STATUSES = {}));
exports.default = STATUSES;
