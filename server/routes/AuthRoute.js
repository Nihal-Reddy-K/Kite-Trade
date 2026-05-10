const { Signup, Login, Logout, GetUser } = require("../controllers/AuthController");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/logout", Logout);
router.get("/user", GetUser);

module.exports = router;
