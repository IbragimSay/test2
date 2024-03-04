"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserByMail = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUserByMail = async (mail) => {
    const user = await prisma.user.findFirst({
        where: {
            mail
        }
    });
    if (!user) {
        return undefined;
    }
    return user;
};
exports.getUserByMail = getUserByMail;
const createUser = async (mail, password, name) => {
    const user = await prisma.user.create({
        data: {
            mail,
            password,
            name
        }
    });
    return user;
};
exports.createUser = createUser;
