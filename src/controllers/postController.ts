
import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import multer from 'multer'
import { addContent, createPost, deletePost, getPost, updataPost } from '../models/postModel'

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

const createPostController = async (req: Request, res: Response)=>{
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

        await createPost(payload, title)
        
        return res.json({
            msg: "пост добавлен"
        })

    }catch(e){
        console.log(e)
        res.json({
            msg: "Eror"
        })
    }
}

const deletePostController = async (req:Request, res:Response)=>{
    try{
        const id:number = Number(req.params.id)
        console.log(id)
    
        const payload = getPayload(req, res)
        if(!payload){
            return res.json({
                msg: "вы не авторизованы"
            })
        }
    
        const post = await getPost(id)
    
        if(!post){
            return res.json({
                msg: "такого поста не существует"
            })
        }
    
        if(payload.role == "Admin"){
            deletePost(id)
        }
    
        if(post.userId != payload.id){
            return res.json({
                msg: "у вас нет прав чтобы удалять пост"
            })
        }
    
        await deletePost(id)
    
        return res.json({
            msg: "пост был удалён"
        })
        
    }catch(e){
        console.log(e)
        return res.json({
            msg: "Eror"
        })
    }
}

const updataPostController = async (req:Request, res:Response)=>{
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

        const post = await getPost(id)
    
        if(!post){
            return res.json({
                msg: "такого поста не существует"
            })
        }

        if(payload.role == "Admin"){
            await updataPost(id, title)
        }

        if(post.userId != payload.id){
            return res.json({
                msg: "у вас нет прав чтобы изменить этот пост"
            })
        }
        await updataPost(id, title)

        return res.json({
            msg: "пост был изменён"
        })
    }catch(e){
        console.log(e)
        return res.json({
            msg: "Eror"
        })

    }
}

const storage = multer.diskStorage({
    destination: (_, __, cb)=>{
        cb(null, "image")
    },
    filename:(_, file, cb)=>{
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const upload = multer({storage:storage})

const addContentController = async (req:Request, res: Response)=>{
    try{
        const id:number = Number(req.params.id)
        await addContent(id, req)
        res.json({
            msg: `ваш контент: ${req.file?.filename}`
        })
    }catch(e){
        console.log(e)
        return res.json({
            msg: "Eror"
        })
    }
    
}


export {createPostController, deletePostController, updataPostController, addContentController, upload}