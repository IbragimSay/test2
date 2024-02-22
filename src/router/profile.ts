import {Router} from 'express'
import {getMyProfil, getProfil} from "../controllers/profileController"

const router = Router()

router.get("/", getMyProfil)
router.get("/:userName", getProfil)

export = router