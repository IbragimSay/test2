import {Request} from 'express'
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { TPost } from '../type'

const prisma = new PrismaClient()
const createPost = async (payload:{id:number, role: string}, title: string):Promise<TPost | null>=>{
    const post = await prisma.post.create({
        data: {
            userId: payload.id,
            title: title
        }
    })
    return post
}

const getPost = async(id:number):Promise<TPost | null>=>{
    const post = await prisma.post.findFirst({
        where: {
            id
        }
    })
    if(!post){
        return null
    }
    return post

}

const deletePost = async (id:number):Promise<TPost | null>=>{
    const post = await prisma.post.delete({
        where: {
            id
        }
    })
    if(!post){
        return null
    }
    return post
}

const updataPost = async(id:number, title:string)=>{
    await prisma.post.update({
        where: {
            id
        },
        data:{
            title
        }
    })
}

const addContent = async (id:number, req:Request)=>{
    await prisma.post.update({
        where: {
            id
        },
        data:{
            content: req.file?.filename
        }
    })
}


export {createPost, getPost, deletePost, updataPost, addContent}