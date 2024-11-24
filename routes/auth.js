const express = require("express");
const oauth2orize = require("oauth2orize");
const authController = require("../controllers/authController");
const { validateLogin } = require("../middleware/validation");

const server = oauth2orize.createServer();
const router = express.Router();

router.post("/login", validateLogin, authController.login);
router.post("/token", server.token(), server.errorHandler());
router.get("/authorize", authController.authorize);
router.post("/authorize/decision", server.decision());

module.exports = router;
