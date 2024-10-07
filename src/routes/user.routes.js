const express = require("express");
const router = express.Router();
// importamos controlador
const userController = require("../controllers/user.controller.js");
// rutas
router.get("/users", userController.getAllUsers);
router.get("/user/:id", userController.getUserById);
router.post("/user", userController.createUser);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;