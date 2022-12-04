const authController = require("../controller/authController");
const router = require("express").Router();

//Login
router.get("/login" ,authController.getLogin);
router.post("/login",authController.postLogin);

// Register
router.get("/register", authController.getRegister);
router.post("/register", authController.postRegister);

// Logout
router.get("/logout", authController.getLogout);
router.post("/logout" ,authController.postLogout);

// Edit Info
router.get("/edit/:id", authController.getInfoUser);
router.post("/edit/:id", authController.postUserInfo);

// Show User Info
router.get("/:id", authController.getUser);

module.exports = router;