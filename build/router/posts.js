"use strict";
const express_1 = require("express");
const postsController_1 = require("../controllers/postsController");
const router = (0, express_1.Router)();
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
router.get("/", postsController_1.getAllPosts);
module.exports = router;
