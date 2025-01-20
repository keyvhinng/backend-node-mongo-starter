import { Request, Response } from 'express';

import { ApiError } from '../utils/api-error';
import { UserService } from '../services/user.service';

export class UserController {
  constructor(private readonly userService: UserService) {}

  async getUserById(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const user = await this.userService.getUserById(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error',
      });
    }
    return;
  }

  async getAllUsers(_: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json({
        users: users.map((user) => ({
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        })),
      });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }

    return;
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const userData = req.body;

      const updatedUser = await this.userService.updateUser(userId, userData);

      if (!updatedUser) {
        res.status(404).json({
          message: 'User not found',
        });
        return;
      }

      res.status(200).json({
        sucess: true,
        data: {
          id: updatedUser._id,
          email: updatedUser.email,
          name: updatedUser.name,
          role: updatedUser.role,
        },
      });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({
          message: 'Internal server error',
        });
      }
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      await this.userService.deleteUser(userId);
      res.status(204).send();
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}
