"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPosts = void 0;
const postsModel_1 = require("../models/postsModel");
const getAllPosts = async (req, res) => {
    try {
        const posts = await (0, postsModel_1.getPosts)();
        return res.status(200).json({
            ...posts
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Eror"
        });
    }
};
exports.getAllPosts = getAllPosts;
