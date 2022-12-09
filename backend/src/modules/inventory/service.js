const { Inventory } = require("..");
const { throwError, generateTracking } = require("../../utils");
const AuthService = require("../auth/service");

class InventoryService {
    static async addItems(userId, data) {
        const result = await Inventory.create({
            data: {
                ...data,
                trackingId: generateTracking(),
                userId,
                inventoryHistory: {
                    create: [{ status: "PENDING", userId, comment: "Record added" }],
                },
            },
            include: {
                creator: true,
                inventoryHistory: {
                    include: { initiator: true },
                },
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
        otherFilter = undefined,
        payment = undefined
    ) {
        page = Number(page);
        limit = Number(limit);
        const offset = (page - 1) * limit;

        let query = {};
        if (trackingId) query.trackingId = { equals: trackingId };
        if (status) query.status = { equals: status };
        if (payment) query.payment = { equals: payment };
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
                inventoryHistory: {
                    include: { initiator: true },
                },
            },
            skip: offset,
            take: limit,
            orderBy: {
                createdAt: "desc",
            },
        });

        return { page, limit, loaded: result.length, total, inventory: result };
    }

    static async updateItem(itemId, userId, data) {
        const item = await Inventory.findFirstOrThrow({ where: { id: itemId } });

        const userRole = await AuthService.getUserRole(userId);
        const isSuperAdmin = userRole === "SUPERADMIN";

        const dataToUpdate = {
            title: data?.title || item?.title,
            ...(isSuperAdmin && { fee: data?.fee || item?.fee }),
            senderName: data?.senderName || item?.senderName,
            sendePhone: data?.sendePhone || item?.sendePhone,
            senderAddress: data?.senderAddress || item?.senderAddress,
            recipientName: data?.recipientName || item?.recipientName,
            recipientPhone: data?.recipientPhone || item?.recipientPhone,
            recipientAddress: data?.recipientAddress || item?.recipientAddress,
            comment: data?.comment || item?.comment,
            updateComment: data?.updateComment || item?.updateComment,
            status: data?.status || item?.status,
            description: data?.description || item?.description,
        };

        const updatedData = await Inventory.update({
            where: { id: itemId },
            data: {
                ...dataToUpdate,
                inventoryHistory: {
                    create: [{ status: dataToUpdate.status, userId, comment: dataToUpdate.updateComment }],
                },
            },
            include: {
                creator: true,
                inventoryHistory: {
                    include: { initiator: true },
                },
            },
        });

        return updatedData;
    }

    static async trackItem(trackingId) {
        const item = await Inventory.findFirstOrThrow({ where: { trackingId } });

        return item;
    }
}

module.exports = InventoryService;
