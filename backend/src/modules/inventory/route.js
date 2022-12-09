const { Router } = require("express");
const { checkAuth } = require("../../middleware/auth");
const Validator = require("../../middleware/validator");
const { inventory } = require("./validation");
const InventoryController = require("./controller");

const router = Router();

router.post("/add", checkAuth(), Validator(inventory), InventoryController.registerInventory);
router.get("/", checkAuth(), InventoryController.getInventory);

module.exports = router;
