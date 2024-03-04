"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfil = exports.getMyProfil = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const profileModel_1 = require("../models/profileModel");
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
const SecretKey = process.env.SecretKey || "my-secret";
const getPayload = (req) => {
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
const getMyProfil = async (req, res) => {
    try {
        await client.connect();
        const payload = getPayload(req);
        if (!payload) {
            return res.status(400).json({
                msg: 'вы не авторизованы'
            });
        }
        const userID = await client.get(`user${payload.id}`);
        if (userID) {
            await client.disconnect();
            return res.status(200).json(JSON.parse(userID));
        }
        const user = await (0, profileModel_1.getUserById)(payload.id);
        await client.set(`user${payload.id}`, JSON.stringify(user));
        await client.disconnect();
        return res.status(200).json(user);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Eror"
        });
    }
};
exports.getMyProfil = getMyProfil;
const getProfil = async (req, res) => {
    try {
        await client.connect();
        const id = Number(req.params.id);
        const userID = await client.get(`user${id}`);
        if (userID) {
            await client.disconnect();
            return res.status(200).json(JSON.parse(userID));
        }
        const user = await (0, profileModel_1.getUserById)(id);
        if (!user) {
            await client.disconnect();
            return res.status(400).json({
                msg: "такого пользователя не существует"
            });
        }
        await client.set(`user${id}`, JSON.stringify(user));
        await client.disconnect();
        return res.status(200).json(user);
    }
    catch (e) {
        await client.disconnect();
        console.log(e);
        res.json({
            msg: "Eror"
        });
    }
};
exports.getProfil = getProfil;
