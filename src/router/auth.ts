import {Router} from 'express'
import  {regController, logController}  from '../controllers/authController'

const router = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *      RegInput:
 *          type: object
 *          required:
 *              - mail
 *              - password
 *              - userName
 *          properties:
 *                mail: 
 *                  type: string
 *                  default: argen32@mail.ru
 *                password: 
 *                  type: string
 *                  default: 12345
 *                userName: 
 *                  type: string
 *                  default: argenuser
 */

/**
 * @swagger
 * /api/auth/reg:
 *  post:
 *      tags: 
 *          - Auth
 *      description: add new user
 *      requestBody:
 *          description: get info or new user
 *          required: true
 *          content:
 *              application/json:
 *                  type: object
 *                  schema:
 *                          $ref: '#/components/schemas/RegInput'   
 *      responses:
 *          200:
 *              description: all good   
 *              required: true
 *              content:            
 *                  application/json:
 *                      type: object
 *                      schema:
 *                          required:
 *                              - mes
 *                          properties:
 *                              mes:
 *                                  type: string
 *                                  default: пользователь был создан         
 *          400:
 *              description: all good   
 *              required: true
 *              content:            
 *                  application/json:
 *                      type: object
 *                      schema:
 *                          required:
 *                              - mes
 *                          properties:
 *                              mes:
 *                                  type: string
 *                                  default: пользователь с таким mail уже существует         
 *          500:
 *              description: all good   
 *              required: true
 *              content:            
 *                  application/json:
 *                      type: object
 *                      schema:
 *                          required:
 *                              - mes
 *                          properties:
 *                              mes:
 *                                  type: string
 *                                  default: Eror       
 *      
 */
router.post('/reg', regController)
router.post('/log', logController)

export = router