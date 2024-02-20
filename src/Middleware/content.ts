import { NextFunction,Request, Response } from "express";
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import {PrismaClient} from"@prisma/client"
const prisma = new PrismaClient()
const SecretKey = process.env.SecretKey || 'my-secret'
export = async (req:Request, res: Response, next: NextFunction)=>{
    try{
        const token:string | undefined = req.headers.authorization?.split(' ')[1]
        const id:number = Number(req.params.id)
        if(!token){
            return res.json({
                msg: "нет токена"
            })
        }
        const payload =  jwt.verify(token, SecretKey, (err, data)=>{
            if(err){
                return undefined
            }else{
                return data
            }
        }) as {id:number, role: string} | undefined

        if(!payload){
            return res.json({
                msg: "вы не авторизованы"
            })
        }

        const post = await prisma.post.findFirst({
            where:{
                id
            }
        })
        if(!post){
            return res.json({
                msg: "такого поста не существует"
            })
        }

        if(post.userId!=payload.id){
            return res.json({
                msg: "у вас нет прав чтобы добавлять контент на этот пост"
            })
        }
        next()

    }catch(e){
        console.log(e)
        return res.json({
            mes: "Eror"
        })
    }
}