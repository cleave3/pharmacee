const { Router } = require("express");
const { checkAuth } = require("../../middleware/auth");
const Validator = require("../../middleware/validator");
const { inventory } = require("./validation");
const InventoryController = require("./controller");

const router = Router();

router.get("/track-package", InventoryController.trackItem);
router.post("/add", checkAuth(), Validator(inventory), InventoryController.registerInventory);
router.get("/", checkAuth(), InventoryController.getInventory);
router.patch("/:itemId", checkAuth(), InventoryController.updateInventory);

module.exports = router;
