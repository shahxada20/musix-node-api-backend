const userModel = require("../models/user.model");

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(403).json({ message: "Access denied! unauthorized user" });
            }

            const user = userModel.findById(req.user._id);
            if (!user) {
                return res.status(403).json({ message: "User not found" });
            }

            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({ message: `Access denied! Only ${allowedRoles.join(', ')} are allowed to perform this action.` });
            }
        } catch (error) { next(error) };
    };
};

module.exports = { authorizeRoles };