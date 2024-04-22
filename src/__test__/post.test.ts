import { PrismaClient} from "@prisma/client";
import supertest from "supertest";
import app from "../app";
import { Request, Response} from "express";
import { getPayload } from "../controllers/postController";
import 'dotenv/config'

const SecretKey = process.env.SecretKey || "SecretKey"

const prisma = new PrismaClient()
import jwt from 'jsonwebtoken'

describe("test function post", ()=>{
  describe('function getPayload', ()=>{
    test('ok', async ()=>{
      const user: {
        id: number,
        role: string
      } = {
        id: 1,
        role: "user"
      } 
      const token = jwt.sign(user, SecretKey)
      const request = {
        headers: {
          authorization: "Bearer " + token
        }
      } as Request
      const res = getPayload(request)
      expect(res?.id).toBe(user.id)
    })
    test("undefaund", ()=>{
      const token = 'not token'
      const request = {
        headers: {
          authorization: token
        }
      } as Request
      const res = getPayload(request)
      expect(res).toBe(undefined)
    })
  })
})
