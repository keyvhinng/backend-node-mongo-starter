import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { AuthService } from '../services/auth.service';

interface JWTPayload {
  id: string;
}

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async signup(req: Request, res: Response): Promise<void> {
    try {
      const { user, token } = await this.authService.registerUser(req.body);

      res
        .status(201)
        .json({ message: 'User created successfully', user, token });
    } catch (err) {
      res.status(400).json({ message: 'Failed to create user', error: err });
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new Error('Please provide username and password'));
      }

      const { user, token } = await this.authService.loginUser(email, password);

      res.status(200).json({ message: 'Login successful', user, token });
    } catch (err) {
      res.status(400).json({ message: 'Failed to login', error: err });
    }
  }
}
