import {Router} from 'express'
import authRouter  from './router/auth'
const route:Router = Router()

route.use('/auth', authRouter)

export = route