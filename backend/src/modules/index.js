const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

exports.User = prisma.user;
exports.Inventory = prisma.inventory;
exports.InventoryHistory = prisma.inventoryHistory;

module.exports = prisma;