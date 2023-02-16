const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { randomUUID } = require("crypto");
require("dotenv").config();

const APP_SECRET = process.env.APP_SECRET;

const handleCode = code => {
    if (![200, 201, 400, 401, 403, 409, 500].includes(code)) return 500;

    return code;
};

exports.success = (res, code, data = null, message = "success") => {
    code = handleCode(code);
    return res.status(code).json({ status: true, code, message, data });
};

exports.badRequest = (res, code, message) => {
    code = handleCode(code);
    return res.status(code).json({ status: false, code, message, data: null });
};

exports.throwError = (message, code = 400) => {
    throw { code, message };
};

exports.genUUID = () => randomUUID();

exports.genToken = payload => jwt.sign(payload, APP_SECRET, { expiresIn: "24hr", algorithm: "HS384" });

exports.verifyToken = token => jwt.verify(token, APP_SECRET, { algorithms: "HS384" });

exports.decodeToken = token => jwt.decode(token);

exports.genHash = password => bcrypt.hashSync(password, 10);

exports.verifyHash = (password, hash) => bcrypt.compareSync(password, hash);

exports.generateTracking = (prefix = "PH") => {
    const id = this.genUUID().split("-").reverse().join("").substring(0, 10).toUpperCase()

    return `${prefix}-${id}`
}