export const formatError = (error: string) => {
    return capitalize(error.replace(/auth|\/|-/gi, " "));
};

export const formatDate = (date: string) => new Date(date).toString().substring(0, 24)

export const capitalize = (text: string) => {
    text = text.trimStart();
    if (!text) return;
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const mapFilter = (filter: Record<string, any>) => {
    let query = "?";

    for (const key in filter) {
        if (filter[key]) query += `${key}=${filter[key]}&`;
    }
    return query.substring(0, query.length - 1);
};

export const formatCurrency = (value: number) => {
    return "₦ " + new Intl.NumberFormat("en-US", { minimumSignificantDigits: 2 }).format(value);
};

export const percentageMap = {
    CANCELLED: 0,
    PENDING: 10,
    PROCESSING: 40,
    INTRANSIT: 75,
    DELIVERED: 100,
};

export const percentageReverseMap = {
    0: "CANCELLED",
    10: "PENDING",
    40: "PROCESSING",
    75: "INTRANSIT",
    100: "DELIVERED",
};

export const statusMap = {
    CANCELLED: "#fc0331",
    PENDING: "#fca503",
    PROCESSING: "#98fc03",
    ADMIN: "#98fc03",
    TEMP: "#98fc03",
    INTRANSIT: "#03befc",
    SUPERADMIN: "#03befc",
    PERM: "#03befc",
    DELIVERED: "#0bbf62",
    ACTIVE: "#0bbf62",
    BLOCKED: "#fc0331",
    PAID: "#0bbf62",
};

export const INVENTORYSTATUS = ["CANCELLED", "DELIVERED", "INTRANSIT", "PENDING", "PROCESSING"];

export const PAYMENTSTATUS = ["CANCELLED", "PAID", "PENDING"];
