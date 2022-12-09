const { Router } = require("express")
const { checkAuth } = require("../../middleware/auth")
const AuthController = require("./controller")
const Validator = require("../../middleware/validator");
const { register, login, changepassword, resetpassword } = require("./validation");

const router = Router();

router.post("/register", Validator(register), AuthController.signup);
router.post("/login", Validator(login), AuthController.login);
router.patch("/reset-password", checkAuth(["SUPERADMIN"]), Validator(resetpassword), AuthController.resetPassword);
router.patch("/change-password", checkAuth(), Validator(changepassword), AuthController.changePassword);
router.get("/users", checkAuth(), AuthController.getUsers);

module.exports = router;
