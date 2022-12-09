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

    static async getInventory(
        page = 1,
        limit = 20,
        trackingId = undefined,
        status = undefined,
        userId = undefined,
        title = undefined,
        start = undefined,
        end = undefined,
        otherFilter = undefined
    ) {
        page = Number(page);
        limit = Number(limit)
        const offset = (page - 1) * limit;

        let query = {};
        if (trackingId) query.trackingId = { equals: trackingId };
        if (status) query.status = { equals: status };
        if (userId) query.userId = { equals: userId };
        if (title) query.title = { contains: title };
        if (start || end) query.createdAt = { lte: start, gte: end };
        if (otherFilter)
            query.OR = [
                { senderName: { contains: otherFilter } },
                { sendePhone: { contains: otherFilter } },
                { recipientName: { contains: otherFilter } },
                { recipientPhone: { contains: otherFilter } },
            ];

        const total = await Inventory.count({ where: { ...query } });

        const result = await Inventory.findMany({
            where: { ...query },
            include: {
                creator: true,
                InventoryHistory: true
            },
            skip: offset,
            take: limit,
            orderBy: {
                createdAt: "desc"
            },
        });

        return { page, limit, loaded: result.length, total, inventory: result };
    }
}

module.exports = InventoryService;
