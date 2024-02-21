import express,{Router} from 'express'
import MiddelwareContent from '../Middleware/content'
import { addContentController, createPostController, deletePostController, updataPostController, upload } from '../controllers/postController'

const router = Router()

router.post("/", createPostController)
router.delete("/:id", deletePostController)
router.patch('/:id', updataPostController)
router.post('/content/:id',MiddelwareContent, upload.single('content'), addContentController)
router.use('/content', express.static("image"))
export = router