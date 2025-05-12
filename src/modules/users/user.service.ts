import { AppError } from '../../utils/appError';
import { UserModel } from './user.model';
import { log } from '../../utils/logging';
import { APIFeatures } from '../../utils/apiFeatures';
import { UpdateUserDto } from './users.dto';

export class UserService {
  async getUserById(id: string) {
    const user = await UserModel.findById(id);
    if (!user) {
      log('warn', 'User not found in DB', { userId: id });
      throw new AppError('User not found', 404);
    }

    log('info', 'User retrieved from DB', { userId: id });
    return user;
  }

  async updateUser(id: string, update: UpdateUserDto) {
    const user = await UserModel.findByIdAndUpdate(id, update, { new: true });
    if (!user) {
      log('warn', 'User not found for update', { userId: id });
      throw new AppError('User not found', 404);
    }

    log('info', 'User updated in DB', { userId: id, update });
    return user;
  }

  async deleteUser(id: string) {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      log('warn', 'User not found for deletion', { userId: id });
      throw new AppError('User not found', 404);
    }

    log('info', 'User deleted from DB', { userId: id });
    return user;
  }

  async getAllUsers(req: any) {
    let page = parseInt(req.query.page, 10) || 1;
    let limit = parseInt(req.query.limit, 10) || 10;
    if (page < 1) page = 1;
    if (limit < 1 || limit > 100) limit = 10;

    let query = UserModel.find();
    const apiFeatures = new APIFeatures(query, req.query).filter().sort().limitFields().paginate();
    const users = await apiFeatures.getQuery();

    log('info', `All users retrieved from DB (Page: ${page}, Limit: ${limit})`);
    return users;
  }
}
