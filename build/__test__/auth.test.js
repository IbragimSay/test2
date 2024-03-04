"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const authController_1 = require("../controllers/authController");
const client_1 = require("@prisma/client");
const app_1 = __importDefault(require("../app"));
const prisma = new client_1.PrismaClient();
const validData = {
    mail: 'argen@mail.ru',
    password: 'argen',
    name: 'argen',
};
const invalidData = {
    mail: 'argen@mail.ru',
    password: 'argen',
};
describe('test auth', () => {
    describe("test reg", () => {
        beforeEach(async () => {
            await prisma.user.deleteMany();
        });
        test('test getHashPassword', () => {
            expect((0, authController_1.getHashPassword)('password')).toBeDefined();
        });
        describe('test 200', () => {
            test('test api', async () => {
                const res = await (0, supertest_1.default)(app_1.default).post('/api/auth/reg').send(validData);
                expect(res.status).toBe(200);
            });
        });
        describe('test 400', () => {
            test('test api: data is not valid', async () => {
                const res = await (0, supertest_1.default)(app_1.default).post('/api/auth/reg').send(invalidData);
                expect(res.status).toBe(400);
            });
            test('test api: user is', async () => {
                await (0, supertest_1.default)(app_1.default).post('/api/auth/reg').send(validData);
                const res = await (0, supertest_1.default)(app_1.default).post('/api/auth/reg').send(validData);
                expect(res.status).toBe(400);
            });
        });
    });
});
