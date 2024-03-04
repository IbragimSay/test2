"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getPosts = async () => {
    const posts = await prisma.post.findMany();
    return posts;
};
exports.getPosts = getPosts;
