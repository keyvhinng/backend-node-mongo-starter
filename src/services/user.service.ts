import { IUser, User } from '../models/user.model';

export class UserService {
  public async updateUser(
    userId: string,
    updates: Partial<IUser>,
  ): Promise<IUser | null> {
    const { password, role, ...safeUpdates } = updates;
    const user = await User.findByIdAndUpdate(userId, safeUpdates, {
      new: true,
    });
    return user;
  }

  public async getAllUsers(): Promise<IUser[]> {
    return User.find({}, { password: 0 });
  }

  public async getUserById(id: string): Promise<IUser | null> {
    return User.findById(id, { password: 0 });
  }

  public async getUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }, { password: 0 });
  }

  public async deleteUser(userId: string): Promise<boolean> {
    const result = await User.findByIdAndDelete(userId);
    return result !== null;
  }
}
