import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getUserById = async (id: number)=>{
        const user = await prisma.user.findFirst({
            where:{
                id
            },
            include: {
                posts: true
            }
        })
        return user
}
export {getUserById}