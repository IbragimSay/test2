import {Router, Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import express from "express"
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import multer from 'multer'
import MiddelwareContent from '../Middleware/content'

const prisma = new PrismaClient()

const router = Router()

const SecretKey = process.env.SecretKey || 'my-secret'

const getPayload = (req:Request, res:Response):{id:number, role: string} | undefined=>{
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

router.post("/", async (req: Request, res: Response)=>{
    try{
        const {title}: {title:string} = req.body
        const payload = getPayload(req, res)

        if(!title){
            return res.json({
                msg: "данные невалидные"
            })
        }

        if(!payload){
            return res.json({
                msg: "вы не авторизованы"
            })
        }

        await prisma.post.create({
            data: {
                userId: payload.id,
                title: title
            }
        })
        
        return res.json({
            msg: "пост добавлен"
        })

    }catch(e){
        console.log(e)
        res.json({
            msg: "Eror"
        })
    }
})


router.delete("/:id", async (req:Request, res:Response)=>{
    try{
        const id:number = Number(req.params.id)
    
        const payload = getPayload(req, res)
        if(!payload){
            return res.json({
                msg: "вы не авторизованы"
            })
        }
    
        const post = await prisma.post.findFirst({
            where: {
                id
            }
        })
    
        if(!post){
            return res.json({
                msg: "такого поста не существует"
            })
        }
    
        if(payload.role == "Admin"){
            await prisma.post.delete({
                where: {
                    id
                }
            })
        }
    
    
        if(post.userId != payload.id){
            return res.json({
                msg: "у вас нет прав чтобы удалять пост"
            })
        }
    
        await prisma.post.delete({
            where: {
                id
            }
        })
    
        return res.json({
            msg: "пост был удалён"
        })
        
    }catch(e){
        console.log(e)
        return res.json({
            msg: "Eror"
        })
    }
})
router.patch('/:id', async (req:Request, res:Response)=>{
    try{
        const id:number = Number(req.params.id)

        const {title}: {title:string} = req.body
        if(!title){
            return res.json({
                msg: "данные невалидные"
            })
        }

        const payload = getPayload(req, res)
        if(!payload){
            return res.json({
                msg: "вы не авторизованы"
            })
        }

        const post = await prisma.post.findFirst({
            where: {
                id
            }
        })
    
        if(!post){
            return res.json({
                msg: "такого поста не существует"
            })
        }

        if(payload.role == "Admin"){
            await prisma.post.update({
                where: {
                    id
                },
                data: {
                    title
                }
            })
        }

        if(post.userId != payload.id){
            return res.json({
                msg: "у вас нет прав чтобы изменить этот пост"
            })
        }
        await prisma.post.update({
            where: {
                id
            },
            data:{
                title
            }
        })
    
        return res.json({
            msg: "пост был изменён"
        })
    }catch(e){
        console.log(e)
        return res.json({
            msg: "Eror"
        })

    }
})


const storage = multer.diskStorage({
    destination: (_, __, cb)=>{
        cb(null, "image")
    },
    filename:(_, file, cb)=>{
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const upload = multer({storage:storage})



router.post('/content/:id',MiddelwareContent, upload.single('content'), async (req:Request, res: Response)=>{
    try{
        const id:number = Number(req.params.id)
        await prisma.post.update({
            where: {
                id
            },
            data:{
                content: req.file?.filename
            }
        })
        res.json({
            msg: `ваш контент: ${req.file?.filename}`
        })

    }catch(e){
        console.log(e)
        return res.json({
            msg: "Eror"
        })
    }
    
})

router.use('/content', express.static("image"))
export = router