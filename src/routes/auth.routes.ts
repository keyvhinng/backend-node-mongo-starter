import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';

const router = Router();

const authService = new AuthService(process.env.JWT_ACCESS_SECRET || '');
const authController = new AuthController(authService);

router.post('/signup', authController.signup.bind(authController));
router.post('/login', authController.login.bind(authController));

export default router;
