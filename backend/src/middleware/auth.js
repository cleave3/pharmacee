const { throwError, badRequest, verifyToken } = require("../utils");

exports.checkAuth =
    (roles = []) =>
    async (req, res, next) => {
        try {
            const accesstoken = req.headers["x-access-token"];

            if (!accesstoken) throwError("Authentication failed. no token provided", 403);

            const decoded = verifyToken(accesstoken);

            if (roles.length > 0 && !roles.includes(payload.role))
                throwError("You are not allowed to perform this operation", 401);

            req.user = decoded;

            next();
        } catch ({ code, message }) {
            return badRequest(res, code || 401, message || "Authentication failed. invalid token");
        }
    };
