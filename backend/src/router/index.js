const { Router } = require("express");
const authRoute = require("../modules/auth/route")
const inventoryRoute = require("../modules/inventory/route")

const router = Router()

router.use("/auth", authRoute)
router.use("/inventory", inventoryRoute)

module.exports = router;