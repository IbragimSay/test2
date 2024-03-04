import supertest from 'supertest'
import { getHashPassword } from '../controllers/authController'
import { PrismaClient } from '@prisma/client'
import app from '../app'

const prisma =  new PrismaClient()
const validData = {
    mail: 'argen@mail.ru',
    password: 'argen',
    name: 'argen',
}
const invalidData = {
    mail: 'argen@mail.ru',
    password: 'argen',
}

describe('test auth', ()=>{
    describe("test reg", ()=>{
        beforeEach( async()=>{
            await prisma.user.deleteMany()
        })
        test('test getHashPassword',  ()=>{
            expect(getHashPassword('password')).toBeDefined()
        })
        describe('test 200', ()=>{
            test('test api', async()=>{
                const res = await supertest(app).post('/api/auth/reg').send(validData)
                expect(res.status).toBe(200)
            })
        })
        describe('test 400',()=>{
            test('test api: data is not valid', async()=>{
                const res = await supertest(app).post('/api/auth/reg').send(invalidData)
                expect(res.status).toBe(400)
            })
            test('test api: user is', async ()=>{
                await supertest(app).post('/api/auth/reg').send(validData)
                const res = await supertest(app).post('/api/auth/reg').send(validData)
                expect(res.status).toBe(400)
            })
        })
    })
})