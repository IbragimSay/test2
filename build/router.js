"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const auth_1 = __importDefault(require("./router/auth"));
const post_1 = __importDefault(require("./router/post"));
const profile_1 = __importDefault(require("./router/profile"));
const posts_1 = __importDefault(require("./router/posts"));
const route = (0, express_1.Router)();
route.use('/auth', auth_1.default);
route.use('/post', post_1.default);
route.use('/posts', posts_1.default);
route.use('/profile', profile_1.default);
module.exports = route;
