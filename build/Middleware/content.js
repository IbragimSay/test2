"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const SecretKey = process.env.SecretKey || 'my-secret';
module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const id = Number(req.params.id);
        if (!token) {
            return res.json({
                msg: "нет токена"
            });
        }
        const payload = jsonwebtoken_1.default.verify(token, SecretKey, (err, data) => {
            if (err) {
                return undefined;
            }
            else {
                return data;
            }
        });
        if (!payload) {
            return res.json({
                msg: "вы не авторизованы"
            });
        }
        const post = await prisma.post.findFirst({
            where: {
                id
            }
        });
        if (!post) {
            return res.json({
                msg: "такого поста не существует"
            });
        }
        if (post.userId != payload.id) {
            return res.json({
                msg: "у вас нет прав чтобы добавлять контент на этот пост"
            });
        }
        next();
    }
    catch (e) {
        console.log(e);
        return res.json({
            mes: "Eror"
        });
    }
};
