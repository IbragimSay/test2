"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByUserName = exports.getUserById = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUserById = async (id) => {
    const user = await prisma.user.findFirst({
        where: {
            id
        },
        include: {
            posts: true
        }
    });
    if (!user) {
        return null;
    }
    return user;
};
exports.getUserById = getUserById;
const getUserByUserName = async (userName) => {
    const user = await prisma.user.findFirst({
        where: {
            userName
        },
        include: {
            posts: true
        }
    });
    if (!user) {
        return null;
    }
    return user;
};
exports.getUserByUserName = getUserByUserName;
