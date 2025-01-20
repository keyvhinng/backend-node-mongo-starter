import { Router } from 'express';

import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

const userService = new UserService();
const userController = new UserController(userService);


// Public route
router.get('/', userController.getAllUsers.bind(userController));

// Protected routes
router.get('/:id', authenticate, userController.getUserById.bind(userController));
router.put('/:id', authenticate, userController.updateUser.bind(userController));
router.delete('/:id', authenticate, userController.deleteUser.bind(userController));

export default router;
