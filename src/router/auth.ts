import {Router} from 'express'
import  {regController, logController}  from '../controllers/authController'

const router = Router()

router.post('/reg', regController)
router.post('/log', logController)

export = router