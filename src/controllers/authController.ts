import {Request, Response} from 'express'
import bcryt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import {TypeInfoBodyLog, TypeInfoBodyReg} from "../type"
import {getUserByName, getUserByMail, createUser} from '../models/authModel'

const SecretKey:string = process.env.SecretKey || "my-secret"


const getToken = (id:number, role: string):string | undefined=>{
        return jwt.sign({id, role}, SecretKey)  
}

const isValidMail = (mail:string):boolean=>{
    return /^\S+@\S+\.\S+$/.test(mail)
}


const regController = async (req:Request, res:Response)=>{
    try{
        const {mail, password, userName, name}:TypeInfoBodyReg= req.body

        if(!isValidMail(mail) || password.replace(" ", '').length < 3 || userName.replace(" ", "").length < 3){
            return res.json({
                msg: "невалидные данные"
            })
        }
    
        const user_mail = await getUserByMail(mail)

        if(user_mail){
            return res.json({
                msg: "пользователь с таким mail уже существует"
            })
        }

        const user_userName = await  getUserByName(userName)

        if(user_userName){
            return res.json({
                msg: "пользователь с таким userName уже существует"
            })
        }
    
        const hashPassword = bcryt.hashSync(password, 5)

        await createUser(mail, hashPassword, userName.toLowerCase(), name)

        return res.json({
            msg: 'пользователь был создан'
        })

    }catch(e){
        console.log(e)
        return res.json({
            msg: 'Eror'
        })
    }
}
const logController = async (req:Request, res:Response)=>{
    try{
        const {mail, password}:TypeInfoBodyLog= req.body
        
        if(!isValidMail(mail) || password.replace(" ", '').length < 3){
            return res.json({
                msg: "невалидные данные"
            })
        }

        const user = await getUserByMail(mail)

        if(!user){
            return res.json({
                msg: "неправильный логин или пароль"
            })
        }

        const isValidPassword = await bcryt.compare(password, user.password)

        if(!isValidPassword){
            return res.json({
                msg: "неправильный логин или пароль"
            })
        }

        const token = getToken(user.id, user.role)

        res.json({
            token: "Bearer " + token
        })
    }catch(e){
        console.log(e)
        res.json({
            msg: "Eror"
        })
    }


}


export  {regController, logController}