const express = require("express");
const router = express.Router();
const { signin, signup, signout, fetchuser } = require("../controllers/Auth");
const authenticateUser = require("../middlewares/authenticateUser");

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signout", signout);
router.get("/fetchuser", authenticateUser, fetchuser);

module.exports = router;
