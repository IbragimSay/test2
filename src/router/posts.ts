import express,{Router} from 'express'
import MiddelwareContent from '../Middleware/content'
import { addContentController, createPostController, deletePostController, updataPostController, upload } from '../controllers/postController'
import { getAllPosts } from '../controllers/postsController'

const router = Router()

/**
 * @openapi
* /api/posts/:
*  get:
*     tags:
*     - API posts
*     description: argentiono
*     responses:
*       200:
*         description: App is up and running
*       500:
*         description: Server side problems
*/
router.get("/", getAllPosts)

export = router