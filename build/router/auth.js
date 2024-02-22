"use strict";
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post('/reg', authController_1.regController);
router.post('/log', authController_1.logController);
module.exports = router;
