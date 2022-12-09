const { Router } = require("express")
const { checkAuth } = require("../../middleware/auth")
// const Validator = require("../../middleware/validator");
// const {  } = require("./validation");
const InventoryController = require("./controller");

const router = Router();

router.post("/add", checkAuth(), InventoryController.registerInventory);

module.exports = router;
