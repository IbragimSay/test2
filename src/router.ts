import {Router} from 'express'
import authRouter  from './router/auth'
import postRouter from "./router/post"
const route:Router = Router()

route.use('/auth', authRouter)
route.use('/post', postRouter)

export = route