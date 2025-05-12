"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const appError_1 = require("../../utils/appError");
const user_model_1 = require("./user.model");
const logging_1 = require("../../utils/logging");
const apiFeatures_1 = require("../../utils/apiFeatures");
class UserService {
    async getUserById(id) {
        const user = await user_model_1.UserModel.findById(id);
        if (!user) {
            (0, logging_1.log)('warn', 'User not found in DB', { userId: id });
            throw new appError_1.AppError('User not found', 404);
        }
        (0, logging_1.log)('info', 'User retrieved from DB', { userId: id });
        return user;
    }
    async updateUser(id, update) {
        const user = await user_model_1.UserModel.findByIdAndUpdate(id, update, { new: true });
        if (!user) {
            (0, logging_1.log)('warn', 'User not found for update', { userId: id });
            throw new appError_1.AppError('User not found', 404);
        }
        (0, logging_1.log)('info', 'User updated in DB', { userId: id, update });
        return user;
    }
    async deleteUser(id) {
        const user = await user_model_1.UserModel.findByIdAndDelete(id);
        if (!user) {
            (0, logging_1.log)('warn', 'User not found for deletion', { userId: id });
            throw new appError_1.AppError('User not found', 404);
        }
        (0, logging_1.log)('info', 'User deleted from DB', { userId: id });
        return user;
    }
    async getAllUsers(req) {
        let page = parseInt(req.query.page, 10) || 1;
        let limit = parseInt(req.query.limit, 10) || 10;
        if (page < 1)
            page = 1;
        if (limit < 1 || limit > 100)
            limit = 10;
        let query = user_model_1.UserModel.find();
        const apiFeatures = new apiFeatures_1.APIFeatures(query, req.query).filter().sort().limitFields().paginate();
        const users = await apiFeatures.getQuery();
        (0, logging_1.log)('info', `All users retrieved from DB (Page: ${page}, Limit: ${limit})`);
        return users;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map