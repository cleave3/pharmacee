const { User } = require("..");
const { genHash, genToken, genUUID, throwError, verifyHash } = require("../../utils");

class AuthService {
    static async getUserRole(id) {
        const user = await User.findFirst({ where: { id }, select: { role: true } });

        return user?.role;
    }
    
    static async getUser(val) {
        const user = await User.findFirst({
            where: { OR: [{ email: val }, { telephone: val }, { id: val }] },
        });

        if (!user) throwError("user not found", 404);

        return user;
    }

    static async registerUser(data) {
        const emailExist = await User.findUnique({ where: { email: data.email } });
        if (emailExist) throwError("Email already exist", 409);
        const telExist = await User.findUnique({ where: { telephone: data.telephone } });
        if (telExist) throwError("Telephone already exist", 409);

        const user = await User.create({ data: { ...data, id: genUUID(), password: genHash(data.password) } });

        return user;
    }

    static async login(username, password) {
        const user = await this.getUser(username);

        if (!user) throwError("invalid login credentials", 403);

        if (!verifyHash(password, user.password)) throwError("invalid login credentials", 403);

        return { token: genToken({ id: user.id }) };
    }

    static async changePassword(id, oldpassword, newpassword) {
        const user = await this.getUser(id);

        if (!verifyHash(oldpassword, user.password)) throwError("current password does not match", 403);

        await User.update({ where: { id }, data: { password: genHash(newpassword), passwordType: "PERM" } });

        return "password changed successfully";
    }

    static async resetPassword(id, password) {
        await User.update({ where: { id }, data: { password: genHash(password), passwordType: "TEMP" } });

        return "password reset successfully";
    }

    static async getUsers() {
        const users = await User.findMany();

        return users;
    }
}

module.exports = AuthService;
