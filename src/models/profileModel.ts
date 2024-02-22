import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const getUserById = async (id:number)=>{
    const user = await prisma.user.findFirst({
        where:{
            id
        },
        include: {
            posts:true
        }
    })
    if(!user){
        return null
    }
    return user
}
const getUserByUserName = async (userName: string)=>{
    const user = await prisma.user.findFirst({
        where:{
            userName
        },
        include: {
            posts: true
        }
    })
    if(!user){
        return null
    }
    return user
}

export {getUserById, getUserByUserName}