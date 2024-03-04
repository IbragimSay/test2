import jwt from 'jsonwebtoken';
import {Request, Response} from 'express'
import "dotenv/config"
import { getUserById } from '../models/profileModel';
import {createClient} from 'redis'

const client = createClient()

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
        await client.connect()
        const payload = getPayload(req)
        if(!payload){
            return res.status(400).json({
                msg: 'вы не авторизованы'
            })
        }
        const userID = await client.get(`user${payload.id}`)
        if(userID){
            await client.disconnect()
            return res.status(200).json(JSON.parse(userID))
        }
        const user = await getUserById(payload.id)
        await client.set(`user${payload.id}`, JSON.stringify(user))
        await client.disconnect()
        return res.status(200).json(user)
    }catch(e){
        console.log(e)
        res.status(500).json({
            msg: "Eror"
        })
    }
}
const getProfil = async (req:Request, res:Response)=>{
    try{
        await client.connect()
        const id:number = Number(req.params.id)

        const userID = await client.get(`user${id}`)
        if(userID){
            await client.disconnect()
            return res.status(200).json(JSON.parse(userID))
        }
        const user = await getUserById(id)
        if(!user){
            await client.disconnect()
            return res.status(400).json({
                msg: "такого пользователя не существует"
            })
        }
        await client.set(`user${id}`, JSON.stringify(user))
        await client.disconnect()
        return res.status(200).json(user)
    }catch(e){
        await client.disconnect()
        console.log(e)
        res.json({
            msg: "Eror"
        })
    }
}
export {getMyProfil, getProfil}