"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importStar(require("express"));
const content_1 = __importDefault(require("../Middleware/content"));
const postController_1 = require("../controllers/postController");
const router = (0, express_1.Router)();
/**
* @openapi
* /api/post/:
*  post:
*     tags:
*     - API post
*     description: add new post
*     responses:
*       200:
*         description: App is up and running
*       400:
*         description: Error on the client side
*       500:
*         description: Server side problems
*/
router.post("/", postController_1.createPostController);
router.delete("/:id", postController_1.deletePostController);
router.patch('/:id', postController_1.updataPostController);
router.post('/content/:id', content_1.default, postController_1.upload.single('content'), postController_1.addContentController);
router.use('/content', express_1.default.static("image"));
module.exports = router;
