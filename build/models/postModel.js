"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addContent = exports.updataPost = exports.deletePost = exports.getPost = exports.createPost = void 0;
require("dotenv/config");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createPost = async (payload, title) => {
    const post = await prisma.post.create({
        data: {
            userId: payload.id,
            title: title
        }
    });
    return post;
};
exports.createPost = createPost;
const getPost = async (id) => {
    const post = await prisma.post.findFirst({
        where: {
            id
        }
    });
    if (!post) {
        return null;
    }
    return post;
};
exports.getPost = getPost;
const deletePost = async (id, userId) => {
    await prisma.post.delete({
        where: {
            id
        }
    });
};
exports.deletePost = deletePost;
const updataPost = async (id, userId, title) => {
    await prisma.post.update({
        where: {
            id
        },
        data: {
            title
        }
    });
};
exports.updataPost = updataPost;
const addContent = async (id, req) => {
    await prisma.post.update({
        where: {
            id
        },
        data: {
            content: req.file?.filename
        }
    });
};
exports.addContent = addContent;
