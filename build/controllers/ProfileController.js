"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfil = exports.getMyProfil = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const profileModel_1 = require("../models/profileModel");
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
        const payload = getPayload(req);
        if (!payload) {
            return res.json({
                msg: 'вы не авторизованы'
            });
        }
        const user = await (0, profileModel_1.getUserById)(payload.id);
        res.json({
            msg: user
        });
    }
    catch (e) {
        console.log(e);
        res.json({
            msg: "Eror"
        });
    }
};
exports.getMyProfil = getMyProfil;
const getProfil = async (req, res) => {
    try {
        const userName = req.params.userName;
        const user = await (0, profileModel_1.getUserByUserName)(userName);
        if (!user) {
            return res.json({
                msg: "такого пользователя не существует"
            });
        }
        res.json({
            msg: user
        });
    }
    catch (e) {
        console.log(e);
        res.json({
            msg: "Eror"
        });
    }
};
exports.getProfil = getProfil;
