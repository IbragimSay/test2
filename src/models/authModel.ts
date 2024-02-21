import { PrismaClient } from '@prisma/client'
import { TUser } from '../type'

const prisma = new PrismaClient()


const getUserByName = async (userName:string):Promise<TUser | undefined>=>{
    const user = await prisma.user.findFirst({
        where:{
            userName
        }
    })
    if(!user){
        return undefined
    }
    return user
}


const getUserByMail = async (mail:string):Promise<TUser | undefined>=>{
    const user = await prisma.user.findFirst({
        where:{
            mail
        }
    })
    if(!user){
        return undefined
    }
    return user
}

const createUser = async (mail:string, password:string, userName:string, name:string):Promise<TUser>=>{
    const user = await prisma.user.create({
        data: {
            mail,
            password,
            userName,
            name
        }
    })
    return user
}


export {getUserByName, getUserByMail, createUser}