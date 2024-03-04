"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
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
    return user;
};
exports.getUserById = getUserById;
