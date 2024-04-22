import { Request, Response } from 'express'
import bcryt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { TypeInfoBodyLog, TypeInfoBodyReg } from "../type"
import { getUserByMail, createUser } from '../models/authModel'

const SecretKey: string = process.env.SecretKey || "my-secret"




const isValidMail = (mail: string): boolean => {
    return /^\S+@\S+\.\S+$/.test(mail)
}


const regController = async (req: Request, res: Response) => {
    try {
        const { mail, password, name }: TypeInfoBodyReg = req.body

        if (!mail || !password || !name) {
            return res.status(401).json({
                msg: "невалидные данные"
            })
        }
        if (!isValidMail(mail) || password.replace(" ", '').length < 3, name.replace(" ", "").length < 3) {
            return res.status(401).json({
                msg: "невалидные данные"
            })
        }

        const user_mail = await getUserByMail(mail)

        if (user_mail) {
            return res.status(402).json({
                msg: "пользователь с таким mail уже существует"
            })
        }

        const hashPassword = bcryt.hashSync(password, 5)

        await createUser(mail, hashPassword, name)

        return res.status(200).json({
            msg: 'пользователь был создан'
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            msg: 'Eror'
        })
    }
}
const logController = async (req: Request, res: Response) => {
    try {
        const { mail, password }: TypeInfoBodyLog = req.body
        if (!mail || !password) {
            return res.status(401).json({
                msg: "невалидные данные"
            })
        }
        if (!isValidMail(mail) || password.replace(" ", '').length < 3) {
            return res.status(401).json({
                msg: "невалидные данные"
            })
        }

        const user = await getUserByMail(mail)

        if (!user) {
            return res.status(402).json({
                msg: "неправильный логин или пароль"
            })
        }

        const isValidPassword = await bcryt.compare(password, user.password)

        if (!isValidPassword) {
            return res.status(402).json({
                msg: "неправильный логин или пароль"
            })
        }
        const token = jwt.sign({ id: user.id, role: user.role }, SecretKey)

        return res.status(200).json({
            token: "Bearer " + token
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            msg: "Eror"
        })
    }
}


export { regController, logController }