import {Request, Response} from 'express'
import bcryt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import {TypeInfoBodyLog, TypeInfoBodyReg} from "../type"
import { getUserByMail, createUser} from '../models/authModel'

const SecretKey:string = process.env.SecretKey || "my-secret"


export const getToken = (id:number, role: string):string | undefined=>{
        return jwt.sign({id, role}, SecretKey)  
}
export const getHashPassword =  async (password:string)=> bcryt.hashSync(password, 5)

const isValidMail = (mail:string):boolean=>{
    return /^\S+@\S+\.\S+$/.test(mail)
}

const regController = async (req:Request, res:Response)=>{
    try{
        const {mail, password, name}:TypeInfoBodyReg= req.body

        if(!mail || !password || !name){
            return res.status(400).json({
                msg: "невалидные данные"
            })
        }

        if(!isValidMail(mail) || password.replace(" ", '').length < 3, name.replace(" ", "").length < 3){
            return res.status(400).json({
                msg: "невалидные данные"
            })
        }
    
        const user_mail = await getUserByMail(mail)

        if(user_mail){
            return res.status(400).json({
                msg: "пользователь с таким mail уже существует"
            })
        }
    
        const hashPassword = await getHashPassword(password)

        await createUser(mail, hashPassword, name)

        return res.status(200).json({
            msg: 'пользователь был создан'
        })
    }catch(e){
        console.log(e)
        return res.status(500).json({
            msg: 'Eror'
        })
    }
}
const logController = async (req:Request, res:Response)=>{
    try{
        const {mail, password}:TypeInfoBodyLog= req.body
        
        if(!isValidMail(mail) || password.replace(" ", '').length < 3){
            return res.status(400).json({
                msg: "невалидные данные"
            })
        }

        const user = await getUserByMail(mail)

        if(!user){
            return res.status(400).json({
                msg: "неправильный логин или пароль"
            })
        }

        const isValidPassword = await bcryt.compare(password, user.password)

        if(!isValidPassword){
            return res.status(400).json({
                msg: "неправильный логин или пароль"
            })
        }
        const token = getToken(user.id, user.role)

        return res.status(200).json({
            token: "Bearer " + token
        })
    }catch(e){
        console.log(e)
        res.status(500).json({
            msg: "Eror"
        })
    }
}


export  {regController, logController}