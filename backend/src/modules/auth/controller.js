const { badRequest, success } = require("../../utils");
const AuthService = require("./service");

class AuthController {

    static async signup({ body }, res) {
        try {
            const signup = await AuthService.registerUser(body)
            return success(res, 201, signup);
        } catch ({ message, code }) {
            return badRequest(res, code || 500, message)
        }
    }

    static async login({ body: { userName, password } }, res) {
        try {
            const login = await AuthService.login(userName, password)
            return success(res, 200, login, "login successful");
        } catch ({ message, code }) {
            return badRequest(res, code || 500, message)
        }
    }

    static async changePassword({ body: { oldpassword, newpassword }, user: { id } }, res) {
        try {
            const result = await AuthService.changePassword(id, oldpassword, newpassword)
            return success(res, 200, null, result);
        } catch ({ message, code }) {
            return badRequest(res, code || 500, message)
        }
    }

    static async resetPassword({ body: { id, password } }, res) {
        try {
            const result = await AuthService.resetPassword(id, password)
            return success(res, 200, null, result);
        } catch ({ message, code }) {
            return badRequest(res, code || 500, message)
        }
    }

    static async getUsers(_, res) {
        try {
            const result = await AuthService.getUsers()
            return success(res, 200,result);
        } catch ({ message, code }) {
            return badRequest(res, code || 500, message)
        }
    }
}

module.exports = AuthController;