const { Inventory } = require("..");
const { generateTracking } = require("../../utils");
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
        if (start) query.createdAt = { gte: new Date(start).toISOString(), lte: new Date(end).toISOString() };
        if (otherFilter)
            query.OR = [
                { senderName: { contains: otherFilter, mode: "insensitive" } },
                { senderPhone: { contains: otherFilter, mode: "insensitive" } },
                { recipientName: { contains: otherFilter, mode: "insensitive" } },
                { recipientPhone: { contains: otherFilter, mode: "insensitive" } },
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
        const item = await Inventory.findFirstOrThrow({ where: { id: Number(itemId) } });

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
            status: data?.status || item?.status,
            description: data?.description || item?.description,
            payment: data?.payment || item?.payment,
        };

        const updatedData = await Inventory.update({
            where: { id: Number(itemId) },
            data: {
                ...dataToUpdate,
                inventoryHistory: {
                    create: [{ status: dataToUpdate.status, userId, comment: data?.updateComment || "Record updated" }],
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
        const item = await Inventory.findFirstOrThrow({
            where: { trackingId: String(trackingId).toUpperCase() },
            include: { inventoryHistory: true },
        });

        return item;
    }

    static async getInventoryStats() {
        const stats = await Inventory.groupBy({ by: ["status"], _count: { status: true } });

        let resultMap = {
            PENDING: "pending",
            PROCESSING: "processing",
            INTRANSIT: "intransit",
            DELIVERED: "delivered",
        };

        let result = {
            pending: 0,
            processing: 0,
            intransit: 0,
            delivered: 0,
        };

        for (let i = 0; i < stats.length; i++) {
            const element = stats[i];
            let key = resultMap[element.status];
            result[key] = element._count.status;
        }

        return result;
    }
}

module.exports = InventoryService;
