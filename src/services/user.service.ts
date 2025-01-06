export class UserService {
  public async createUser() {
    return {};
  }

  public async getUsers() {
    return [];
  }

  public async getUserById(id: string) {
    const user = { name: 'key' };
    return user;
  }

  public async getUserByEmail(email: string) {
    const user = { name: 'key' };
    return user;
  }

  public async updateUser(userId: string, userData: unknown) {
    return {};
  }

  public async deleteUser(userId: string) {
    return;
  }
}
