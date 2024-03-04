import { Request, Response} from 'express'
import { getPosts } from '../models/postsModel'



const getAllPosts = async(req: Request, res: Response)=> {
    try{
        const posts = await getPosts()
        return res.status(200).json({
            ...posts
        })
    }catch(e){
        console.log(e)
        res.status(500).json({
            msg: "Eror"
        })
    }
}

export {getAllPosts}