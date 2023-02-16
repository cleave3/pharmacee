const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient({ log: ["query", "info"]})

exports.User = prisma.user;
exports.Inventory = prisma.inventory;
exports.InventoryHistory = prisma.inventoryHistory;

module.exports = prisma;