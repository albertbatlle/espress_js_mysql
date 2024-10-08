// TODO: Desarrollar el código para las rutas de "/signin", "/signup"
const express = require("express");
const router = express.Router();
// importamos controlador y middleware
const authController = require("../controllers/auth.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

// rutas
router.post("/auth/signin", authController.signinUser);
router.post("/auth/signup", authController.signupUser);

// privada
router.get("/profile", authMiddleware, authController.profile);

module.exports = router;