import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

interface JWTPayload {
  id: string;
}

export class AuthController {
  private authService: AuthService;
  private userService: UserService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
  }

  async signup(req: Request, res: Response): Promise<void> {
    const newUser = await this.authService.createUser(req.body);
    const secret = process.env.JWT_ACCESS_SECRET || '';

    const token = jwt.sign({ id: newUser._id }, secret);

    res.status(201).json({ token, newUser });
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new Error('Please provide username and password'));
    }

    const user = await this.userService.getUserByEmail(email);
  }

  async protect(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const secret = process.env.JWT_ACCESS_SECRET || '';
    const token = req.headers.authorization?.split('')[1] || '';
    const decoded = jwt.verify(token, secret) as JWTPayload;
    const id = decoded.id;
    next();
  }
}
