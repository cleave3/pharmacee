const { throwError } = require("../../utils");

exports.register = ({ body: { firstName, lastName, email, telephone, password } }) => {
    if (!firstName) throwError("firstName is required");
    if (firstName.length < 3) throwError("firstName must be atleast 3 characters");
    if (!lastName) throwError("lastName is required");
    if (lastName.length < 3) throwError("lastName must be atleast 3 characters");
    if (!password) throwError("password is required");
    if (password.length < 6) throwError("password must be atleast 6 characters");
    if (!telephone) throwError("telephone is required");
    if (telephone.length < 10) throwError("telephone must be atleast 10 characters");
    if (!email) throwError("email is required");
};

exports.login = ({ body: { userName, password } }) => {
    if (!userName) throwError("userName is required");
    if (!password) throwError("password is required");
};

exports.changepassword = ({ body: { oldpassword, newpassword } }) => {
    if (!oldpassword) throwError("oldpassword is required");
    if (!newpassword) throwError("newpassword is required");
    if (newpassword.length < 6) throwError("newpassword must be atleast 6 characters");
};

exports.resetpassword = ({ body: { id, password } }) => {
    if (!id) throwError("id is required");
    if (!password) throwError("password is required");
    if (password.length < 6) throwError("password must be atleast 6 characters");
};