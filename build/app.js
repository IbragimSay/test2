"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const swager_1 = __importDefault(require("./util/swager"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', router_1.default);
(0, swager_1.default)(app);
module.exports = app;
