const { Inventory, InventoryHistory } = require("..");
const { throwError, generateTracking } = require("../../utils");

class InventoryService {
    static async addItems(userId, data) {
        const result = await Inventory.create({
            data: {
                ...data,
                trackingId: generateTracking(),
                userId,
                InventoryHistory: {
                    create: [{ status: "PENDING", userId, comment: "Record added" }],
                },
            },
            include: {
                creator: true,
                InventoryHistory: true,
            },
        });

        return result;
    }
}

module.exports = InventoryService;
