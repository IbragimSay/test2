"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postController_1 = require("../controllers/postController");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const SecretKey = process.env.SecretKey || 'argen=ibragim';
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const validData = {
    mail: 'argen@mail.ru',
    password: 'argen',
    name: 'argen',
};
describe('test post', () => {
    beforeEach(async () => {
        await prisma.user.deleteMany();
    });
    describe('test post function', () => {
        test('test funtion getPayload', async () => {
            const user = {
                id: 3,
                role: "User"
            };
            const token = "Bearer " + jsonwebtoken_1.default.sign(user, SecretKey);
            const reqest = {
                headers: {
                    authorization: token
                }
            };
            const res = (0, postController_1.getPayload)(reqest);
            expect(res?.id).toBe(user.id);
        });
        test('test funtion getPayload undefine', () => {
            const token = 'undefine';
            const reqest = {
                headers: {
                    authorization: token
                }
            };
            const res = (0, postController_1.getPayload)(reqest);
            expect(res).toBe(undefined);
        });
    });
    describe('test post api', () => {
        describe('test add post', () => {
            describe('test 200', () => {
                test('200', async () => {
                    await (0, supertest_1.default)(app_1.default).post('/api/auth/reg').send(validData);
                    const resAuth = await (0, supertest_1.default)(app_1.default).post('/api/auth/log').send(validData);
                    const res = await (0, supertest_1.default)(app_1.default).post('/api/post').send({ title: 'argen' }).set({ 'Authorization': `Bearer ` + resAuth.body.msg });
                    expect(res.status).toBe(401);
                });
            });
        });
    });
});
