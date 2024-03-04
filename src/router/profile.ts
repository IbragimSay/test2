import {Router} from 'express'
import {getMyProfil, getProfil} from "../controllers/profileController"

const router = Router()

router.get("/", getMyProfil)





/**
 * @openapi
 * /api/profile/{userId}:
 *  get:
 *      tags:
 *          - Profile
 *      description: get user profile by id
 *      parameters:
 *          - name: userId
 *            in: path
 *            required: true
 *            default: 7
 *      responses:
 *          200: 
 *              desription: all good
 *          500:
 *              description: durak
 * 
 */
router.get("/:id", getProfil)

export = router