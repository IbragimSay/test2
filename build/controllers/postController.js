"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.addContentController = exports.updataPostController = exports.deletePostController = exports.createPostController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const multer_1 = __importDefault(require("multer"));
const redis_1 = require("redis");
const postModel_1 = require("../models/postModel");
const client = (0, redis_1.createClient)();
const SecretKey = process.env.SecretKey || 'my-secret';
const getPayload = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return undefined;
    }
    return jsonwebtoken_1.default.verify(token, SecretKey, (err, data) => {
        if (err) {
            return undefined;
        }
        else {
            return data;
        }
    });
};
const createPostController = async (req, res) => {
    try {
        const { title } = req.body;
        const payload = getPayload(req, res);
        if (!title) {
            return res.status(400).json({
                msg: "данные невалидные"
            });
        }
        if (!payload) {
            return res.status(400).json({
                msg: "вы не авторизованы"
            });
        }
        await (0, postModel_1.createPost)(payload, title);
        await client.connect();
        await client.DEL(`user${payload.id}`);
        await client.disconnect();
        return res.status(200).json({
            msg: "пост добавлен"
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Eror"
        });
    }
};
exports.createPostController = createPostController;
const deletePostController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const payload = getPayload(req, res);
        if (!payload) {
            return res.status(400).json({
                msg: "вы не авторизованы"
            });
        }
        const post = await (0, postModel_1.getPost)(id);
        if (!post) {
            return res.status(400).json({
                msg: "такого поста не существует"
            });
        }
        if (payload.role == "Admin") {
            await client.connect();
            await client.DEL(`user${payload.id}`);
            await client.disconnect();
            await (0, postModel_1.deletePost)(id, post.userId);
            return res.status(200).json({
                msg: "пост был удалён"
            });
        }
        if (post.userId != payload.id) {
            return res.status(400).json({
                msg: "у вас нет прав чтобы удалять пост"
            });
        }
        await client.connect();
        await client.DEL(`user${payload.id}`);
        await client.disconnect();
        await (0, postModel_1.deletePost)(id, post.userId);
        return res.status(200).json({
            msg: "пост был удалён"
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Eror"
        });
    }
};
exports.deletePostController = deletePostController;
const updataPostController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({
                msg: "данные невалидные"
            });
        }
        const payload = getPayload(req, res);
        if (!payload) {
            return res.status(400).json({
                msg: "вы не авторизованы"
            });
        }
        const post = await (0, postModel_1.getPost)(id);
        if (!post) {
            return res.status(400).json({
                msg: "такого поста не существует"
            });
        }
        if (payload.role == "Admin") {
            await client.connect();
            await client.DEL(`user${payload.id}`);
            await client.disconnect();
            await (0, postModel_1.updataPost)(id, post.userId, title);
            return res.status(200).json({
                msg: "пост был изменён"
            });
        }
        if (post.userId != payload.id) {
            return res.json({
                msg: "у вас нет прав чтобы изменить этот пост"
            });
        }
        await client.connect();
        await client.DEL(`user${payload.id}`);
        await client.disconnect();
        await (0, postModel_1.updataPost)(id, post.userId, title);
        return res.status(200).json({
            msg: "пост был изменён"
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Eror"
        });
    }
};
exports.updataPostController = updataPostController;
const storage = multer_1.default.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "image");
    },
    filename: (_, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
exports.upload = upload;
const addContentController = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await (0, postModel_1.addContent)(id, req);
        res.status(200).json({
            msg: `ваш контент: ${req.file?.filename}`
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Eror"
        });
    }
};
exports.addContentController = addContentController;
