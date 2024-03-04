import {Router} from 'express'
import authRouter  from './router/auth'
import postRouter from "./router/post"
import profileRouter from './router/profile'
import postsRouter from './router/posts'
const route:Router = Router()

route.use('/auth', authRouter)
route.use('/post', postRouter)
route.use('/posts', postsRouter)
route.use('/profile', profileRouter)

export = route