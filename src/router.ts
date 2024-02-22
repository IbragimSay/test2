import {Router} from 'express'
import authRouter  from './router/auth'
import postRouter from "./router/post"
import profileRouter from './router/profile'
const route:Router = Router()

route.use('/auth', authRouter)
route.use('/post', postRouter)
route.use('/profile', profileRouter)

export = route