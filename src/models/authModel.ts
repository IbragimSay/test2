import { PrismaClient } from '@prisma/client'
import { TUser } from '../type'

const prisma = new PrismaClient()



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

const createUser = async (mail:string, password:string, name:string):Promise<TUser>=>{
    const user = await prisma.user.create({
        data: {
            mail,
            password,
            name
        }
    })
    return user
}


export { getUserByMail, createUser}