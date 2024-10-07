// TODO: Desarrollar el código para las rutas de "/signin", "/signup"
const express = require("express");
const router = express.Router();
// importamos controlador
const authController = require("../controllers/auth.controller.js");

// rutas

router.post("/auth/signin", authController.signinUser);
router.post("/auth/signup", authController.signupUser);


module.exports = router;