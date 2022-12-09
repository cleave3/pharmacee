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

    static async trackItem({ query: { trackingId }}, res) {
        try {
            const result = await InventoryService.trackItem(trackingId);
            return success(res, 200, result);
        } catch ({ message, code }) {
            return badRequest(res, code || 500, message);
        }
    }

    static async getInventory(
        { query: { page, limit, trackingId, status, userId, title, start, end, otherFilter, payment } = {} },
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
                otherFilter,
                payment
            );
            return success(res, 200, result);
        } catch ({ message, code }) {
            return badRequest(res, code || 500, message);
        }
    }

    static async updateInventory({ body, params: { itemId }, user: { id } }, res) {
        try {
            const result = await InventoryService.updateItem(itemId, id, body);
            return success(res, 200, result);
        } catch ({ message, code }) {
            return badRequest(res, code || 500, message);
        }
    }
}

module.exports = InventoryController;
