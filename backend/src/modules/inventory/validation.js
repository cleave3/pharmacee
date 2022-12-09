const { throwError } = require("../../utils");

exports.inventory = ({ body: { fee, title, description } }) => {
    if (!title) throwError("title is required");
    if (title.length < 3) throwError("title must be atleast 3 characters");
    if (!description) throwError("description is required");
    if (description.length < 10) throwError("description must be atleast 10 characters");
    if (!fee) throwError("fee is required");
    if (isNaN(Number(fee))) throwError("fee must be a number");
};