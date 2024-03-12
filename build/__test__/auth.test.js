"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const client_1 = require("@prisma/client");
const app_1 = __importDefault(require("../app"));
const prisma = new client_1.PrismaClient();
const validData = {
    mail: 'argen@mail.ru',
    password: 'argen',
    name: 'argen',
};
const validData_password = {
    mail: 'argen@mail.ru',
    password: 'argen1',
};
const validData_mail = {
    mail: 'argen1@mail.ru',
    password: 'argen',
};
const invalidData = {
    password: 'argen',
};
describe('test auth', () => {
    describe('test function', () => {
        test('test function getToken', () => {
            expect(true).toBe(true);
        });
    });
    beforeEach(async () => {
        await prisma.user.deleteMany();
    });
    describe("test api: reg", () => {
        beforeEach(async () => {
            await prisma.user.deleteMany();
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
                expect(res.status).toBe(401);
            });
            test('test api: user is', async () => {
                await (0, supertest_1.default)(app_1.default).post('/api/auth/reg').send(validData);
                const res = await (0, supertest_1.default)(app_1.default).post('/api/auth/reg').send(validData);
                expect(res.status).toBe(402);
            });
        });
    });
    describe("test api: log", () => {
        describe('test 200', () => {
            test('test api', async () => {
                await (0, supertest_1.default)(app_1.default).post('/api/auth/reg').send(validData);
                const res = await (0, supertest_1.default)(app_1.default).post('/api/auth/log').send(validData);
                expect(res.status).toBe(200);
            });
        });
        describe('test 400', () => {
            test('test api is not valid not valid', async () => {
                const res = await (0, supertest_1.default)(app_1.default).post('/api/auth/log').send(invalidData);
                expect(res.status).toBe(401);
            });
            test('test api incorrect mail', async () => {
                await (0, supertest_1.default)(app_1.default).post('/api/auth/reg').send(validData);
                const res = await (0, supertest_1.default)(app_1.default).post('/api/auth/log').send(validData_mail);
                expect(res.status).toBe(402);
            });
            test('test api incorrect password', async () => {
                await (0, supertest_1.default)(app_1.default).post('/api/auth/reg').send(validData);
                const res = await (0, supertest_1.default)(app_1.default).post('/api/auth/log').send(validData_password);
                expect(res.status).toBe(402);
            });
        });
    });
});
