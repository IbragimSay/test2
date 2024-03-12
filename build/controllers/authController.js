"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logController = exports.regController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const authModel_1 = require("../models/authModel");
const SecretKey = process.env.SecretKey || "my-secret";
const isValidMail = (mail) => {
    return /^\S+@\S+\.\S+$/.test(mail);
};
const regController = async (req, res) => {
    try {
        const { mail, password, name } = req.body;
        if (!mail || !password || !name) {
            return res.status(401).json({
                msg: "невалидные данные"
            });
        }
        if (!isValidMail(mail) || password.replace(" ", '').length < 3, name.replace(" ", "").length < 3) {
            return res.status(401).json({
                msg: "невалидные данные"
            });
        }
        const user_mail = await (0, authModel_1.getUserByMail)(mail);
        if (user_mail) {
            return res.status(402).json({
                msg: "пользователь с таким mail уже существует"
            });
        }
        const hashPassword = bcrypt_1.default.hashSync(password, 5);
        await (0, authModel_1.createUser)(mail, hashPassword, name);
        return res.status(200).json({
            msg: 'пользователь был создан'
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: 'Eror'
        });
    }
};
exports.regController = regController;
const logController = async (req, res) => {
    try {
        const { mail, password } = req.body;
        if (!mail || !password) {
            return res.status(401).json({
                msg: "невалидные данные"
            });
        }
        if (!isValidMail(mail) || password.replace(" ", '').length < 3) {
            return res.status(401).json({
                msg: "невалидные данные"
            });
        }
        const user = await (0, authModel_1.getUserByMail)(mail);
        if (!user) {
            return res.status(402).json({
                msg: "неправильный логин или пароль"
            });
        }
        const isValidPassword = await bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(402).json({
                msg: "неправильный логин или пароль"
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, SecretKey);
        return res.status(200).json({
            token: "Bearer " + token
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Eror"
        });
    }
};
exports.logController = logController;
