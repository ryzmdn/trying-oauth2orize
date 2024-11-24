const express = require("express");
const userController = require("../controllers/userController");
const { validateUserUpdate } = require("../middleware/validation");
const { authenticateJWT, requireRole } = require("../middleware/auth");

const router = express.Router();

router.use(authenticateJWT);

router.get("/users/me", userController.getCurrentUser);
router.put("/users/me", validateUserUpdate, userController.updateUser);
router.get("/users", requireRole("admin"), userController.getAllUsers);

module.exports = router;
