"use strict";
const express_1 = require("express");
const profileController_1 = require("../controllers/profileController");
const router = (0, express_1.Router)();
router.get("/", profileController_1.getMyProfil);
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
router.get("/:id", profileController_1.getProfil);
module.exports = router;
