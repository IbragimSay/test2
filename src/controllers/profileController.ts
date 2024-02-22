import jwt from 'jsonwebtoken';
import {Request, Response} from 'express'
import "dotenv/config"
import { getUserById, getUserByUserName } from '../models/profileModel';

const SecretKey = process.env.SecretKey || "my-secret"

const getPayload = (req:Request):{id:number, role: string} | undefined=>{
    const token:string | undefined = req.headers.authorization?.split(' ')[1]
    if(!token){
        return undefined
    }
    return jwt.verify(token, SecretKey, (err, data)=>{
        if(err){
            return undefined
        }else{
            return data
        }
    }) as {id:number, role: string} | undefined
}
const getMyProfil =  async (req:Request, res:Response)=>{
    try{
        const payload = getPayload(req)
        if(!payload){
            return res.json({
                msg: 'вы не авторизованы'
            })
        }
        const user = await getUserById(payload.id)

        res.json({
            msg: user
        })
    }catch(e){
        console.log(e)
        res.json({
            msg: "Eror"
        })
    }
}
const getProfil = async (req:Request, res:Response)=>{
    try{
        const userName:string = req.params.userName

        const user = await getUserByUserName(userName)

        if(!user){
            return res.json({
                msg: "такого пользователя не существует"
            })
        }
        
        res.json({
            msg: user
        })
    }catch(e){
        console.log(e)
        res.json({
            msg: "Eror"
        })
    }
}
export {getMyProfil, getProfil}