const { badRequest } = require("../utils");

module.exports = schema => (req, res, next) => {
    try {
        schema(req);
        next();
    } catch ({ code, message }) {
        return badRequest(res, code || 500, message);
    }
};
