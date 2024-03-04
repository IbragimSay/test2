import { PrismaClient } from "@prisma/client"
import { TPost } from "../type"

const prisma = new PrismaClient()

const getPosts = async():Promise<TPost[]>=>{
    const posts = await prisma.post.findMany()
    return posts
}

export {getPosts}
