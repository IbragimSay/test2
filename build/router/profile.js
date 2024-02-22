"use strict";
const express_1 = require("express");
const profileController_1 = require("../controllers/profileController");
const router = (0, express_1.Router)();
router.get("/", profileController_1.getMyProfil);
router.get("/:userName", profileController_1.getProfil);
module.exports = router;
