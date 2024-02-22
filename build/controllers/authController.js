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
const getToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, SecretKey);
};
const isValidMail = (mail) => {
    return /^\S+@\S+\.\S+$/.test(mail);
};
const regController = async (req, res) => {
    try {
        const { mail, password, userName, name } = req.body;
        if (!isValidMail(mail) || password.replace(" ", '').length < 3 || userName.replace(" ", "").length < 3) {
            return res.json({
                msg: "невалидные данные"
            });
        }
        const user_mail = await (0, authModel_1.getUserByMail)(mail);
        if (user_mail) {
            return res.json({
                msg: "пользователь с таким mail уже существует"
            });
        }
        const user_userName = await (0, authModel_1.getUserByName)(userName);
        if (user_userName) {
            return res.json({
                msg: "пользователь с таким userName уже существует"
            });
        }
        const hashPassword = bcrypt_1.default.hashSync(password, 5);
        await (0, authModel_1.createUser)(mail, hashPassword, userName.toLowerCase(), name);
        return res.json({
            msg: 'пользователь был создан'
        });
    }
    catch (e) {
        console.log(e);
        return res.json({
            msg: 'Eror'
        });
    }
};
exports.regController = regController;
const logController = async (req, res) => {
    try {
        const { mail, password } = req.body;
        if (!isValidMail(mail) || password.replace(" ", '').length < 3) {
            return res.json({
                msg: "невалидные данные"
            });
        }
        const user = await (0, authModel_1.getUserByMail)(mail);
        if (!user) {
            return res.json({
                msg: "неправильный логин или пароль"
            });
        }
        const isValidPassword = await bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.json({
                msg: "неправильный логин или пароль"
            });
        }
        const token = getToken(user.id, user.role);
        res.json({
            token: "Bearer " + token
        });
    }
    catch (e) {
        console.log(e);
        res.json({
            msg: "Eror"
        });
    }
};
exports.logController = logController;
