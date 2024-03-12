import { getPayload } from "../controllers/postController"
import jwt from 'jsonwebtoken'
import {Request} from 'express'
import 'dotenv/config'
const SecretKey = process.env.SecretKey || 'argen=ibragim'


describe('test post', ()=>{
    describe('test post function', ()=>{
        test('test funtion getPayload', async () => {
            const user = {
                id: 3,
                role: "User"
            }
            const token = "Bearer " + jwt.sign(user, SecretKey)
            const reqest = {
                headers: {
                    authorization: token
                }
            } as Request
            const res = getPayload(reqest)
            expect(res?.id).toBe(user.id)
        })
        test('test funtion getPayload undefine', () => {
            const token = 'undefine'
            const reqest = {
                headers: {
                    authorization: token
                }
            } as Request
            const res = getPayload(reqest)
            expect(res).toBe(undefined)
        })
    })
})