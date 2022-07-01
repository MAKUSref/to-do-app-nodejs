"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const databaseAdapter_1 = require("./utils/databaseAdapter");
const statuses_1 = __importDefault(require("./models/statuses"));
dotenv_1.default.config();
const DATABASE = [{ id: 'ss', title: 'title', description: 'desc' }];
const app = (0, express_1.default)();
app.use(express_1.default.static('public'));
app.use(body_parser_1.default.json());
const { PORT, HOST } = process.env;
// End points
app.post('/api/add', (req, res) => {
    const task = req.body;
    const info = (0, databaseAdapter_1.add)(DATABASE, task);
    const data = {
        status: info.status,
        items: info.items
    };
    const httpStatus = info.status === statuses_1.default.OK ? 200 : 400;
    res.status(httpStatus).json(data);
});
app.get('/api/remove', (req, res) => {
    res.status(200).json((0, databaseAdapter_1.remove)(DATABASE));
});
app.put('/api/clear', (req, res) => {
    res.status(200).json((0, databaseAdapter_1.clear)(DATABASE));
});
app.get('/api/get', (req, res) => {
    res.status(200).json((0, databaseAdapter_1.get)(DATABASE));
});
app.get('/', (req, res) => {
    res.sendFile('./index.html');
});
app.listen(PORT, () => {
    console.log(`[server]: Server is running at ${HOST}:${PORT}`);
});
