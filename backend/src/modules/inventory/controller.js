const { badRequest, success } = require("../../utils");
const InventoryService = require("./service");

class InventoryController {
    static async registerInventory({ body, user: { id } }, res) {
        try {
            const result = await InventoryService.addItems(id, body);
            return success(res, 201, result);
        } catch ({ message, code }) {
            return badRequest(res, code || 500, message);
        }
    }

    static async getInventory(
        { query: { page, limit, trackingId, status, userId, title, start, end, otherFilter } = {} },
        res
    ) {
        try {
            const result = await InventoryService.getInventory(
                page,
                limit,
                trackingId,
                status,
                userId,
                title,
                start,
                end,
                otherFilter
            );
            return success(res, 200, result);
        } catch ({ message, code }) {
            return badRequest(res, code || 500, message);
        }
    }
}

module.exports = InventoryController;
