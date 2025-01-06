import { IUser, User } from '../models/user.model';

export class AuthService {
  async createUser(userData: Partial<IUser>): Promise<IUser> {
    const newUser = new User();
    newUser.save();
    return newUser;
  }
}
