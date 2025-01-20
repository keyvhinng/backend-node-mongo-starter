import { IUser, User } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

interface AuthResponse {
  user: Partial<IUser>;
  token: string;
}

export class AuthService {
  constructor(
    private readonly jwtSecret: string,
    private readonly jwtExpiresIn: string = '24h',
  ) {}

  async validateCredentials(email: string, password: string): Promise<IUser> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    return user;
  }

  async generateToken(user: IUser): Promise<string> {
    const payload: TokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn,
    });
    return token;
  }

  async verifyToken(token: string): Promise<IUser> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as TokenPayload;
      const user = await User.findById(decoded.userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async registerUser(userData: Partial<IUser>): Promise<AuthResponse> {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const newUser = new User(userData);
    await newUser.save();

    const token = await this.generateToken(newUser);

    return {
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
      token,
    };
  }

  async loginUser(email: string, password: string): Promise<AuthResponse> {
    const user = await this.validateCredentials(email, password);
    const token = await this.generateToken(user);

    return {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    };
  }
}
